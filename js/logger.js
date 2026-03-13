/**
 * Logger — build activity log
 * ============================================================
 * Stores structured log entries in localStorage with an
 * in-memory fallback (e.g. private browsing, quota exceeded).
 *
 * Kept separate from main.js so logging concerns stay isolated
 * and can be stripped for production without touching app code.
 *
 * Storage key : 'thaiaiguy:buildlog'
 * Max entries : 500 (oldest trimmed automatically)
 *
 * Quick reference
 * ---------------
 *   Logger.info(message[, data])              INFO entry
 *   Logger.warn(message[, data])              WARN entry
 *   Logger.error(message[, data])             ERROR entry
 *   Logger.log(category, message[, data])     entry with custom category
 *   Logger.logStorage()                       snapshot localStorage + sessionStorage
 *   Logger.logImageLoadTime(target[, label])  image resource timing
 *   Logger.logScripts()                       all <script src> + timing
 *   Logger.getLogs([filters])                 retrieve entries
 *   Logger.print([filters])                   pretty-print to console
 *   Logger.clear()                            wipe all entries
 *
 * To inspect at any time, open the browser console and run:
 *   Logger.print()
 *   Logger.getLogs({ level: 'WARN' })
 * ============================================================
 */

(function (global) {
    'use strict';

    const STORAGE_KEY = 'thaiaiguy:buildlog';
    const MAX_ENTRIES = 500;

    // In-memory fallback used when localStorage is unavailable
    let _memLog = [];
    let _useMemory = false;

    // ---------------------------------------------------------
    // Storage helpers
    // ---------------------------------------------------------

    function _storageAvailable() {
        try {
            localStorage.setItem('__logtest', '1');
            localStorage.removeItem('__logtest');
            return true;
        } catch (e) {
            return false;
        }
    }

    _useMemory = !_storageAvailable();

    function _read() {
        if (_useMemory) { return _memLog.slice(); }
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch (e) {
            return [];
        }
    }

    function _write(entries) {
        const trimmed = entries.slice(-MAX_ENTRIES);
        if (_useMemory) {
            _memLog = trimmed;
            return;
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(trimmed));
        } catch (e) {
            // Quota exceeded — fall back to memory
            _useMemory = true;
            _memLog = trimmed;
        }
    }

    function _push(level, category, message, data) {
        const entry = {
            ts:       new Date().toISOString(),
            level:    level,
            category: category,
            message:  message,
            data:     data !== undefined ? data : null,
        };
        const entries = _read();
        entries.push(entry);
        _write(entries);
        return entry;
    }

    // ---------------------------------------------------------
    // Public API
    // ---------------------------------------------------------

    const Logger = {

        /**
         * Generic entry with a custom category.
         * @param {string} category
         * @param {string} message
         * @param {*}      [data]
         */
        log: function (category, message, data) {
            return _push('INFO', category, message, data);
        },

        /** @param {string} message  @param {*} [data] */
        info: function (message, data) {
            return _push('INFO', 'general', message, data);
        },

        /** @param {string} message  @param {*} [data] */
        warn: function (message, data) {
            return _push('WARN', 'general', message, data);
        },

        /** @param {string} message  @param {*} [data] */
        error: function (message, data) {
            return _push('ERROR', 'general', message, data);
        },

        // ---------------------------------------------------------

        /**
         * Snapshot the current state of localStorage and sessionStorage.
         * Useful for verifying nothing unexpected is being persisted.
         */
        logStorage: function () {
            const local   = { itemCount: 0, items: {} };
            const session = { itemCount: 0, items: {} };

            try {
                local.itemCount = localStorage.length;
                for (let i = 0; i < localStorage.length; i++) {
                    const k = localStorage.key(i);
                    local.items[k] = localStorage.getItem(k);
                }
            } catch (e) {
                local.error = e.message;
            }

            try {
                session.itemCount = sessionStorage.length;
                for (let i = 0; i < sessionStorage.length; i++) {
                    const k = sessionStorage.key(i);
                    session.items[k] = sessionStorage.getItem(k);
                }
            } catch (e) {
                session.error = e.message;
            }

            return _push('STORAGE', 'storage', 'Storage snapshot', {
                localStorage:   local,
                sessionStorage: session,
                logBackend:     _useMemory ? 'memory (localStorage unavailable)' : 'localStorage',
            });
        },

        // ---------------------------------------------------------

        /**
         * Log the load time of an image using the Performance Resource
         * Timing API. Falls back to a load-event timer if the resource
         * entry isn't available (e.g. cross-origin without CORS headers).
         *
         * @param {string|HTMLImageElement} target  CSS selector or element
         * @param {string}                 [label]  Human-readable label
         */
        logImageLoadTime: function (target, label) {
            const img = typeof target === 'string'
                ? document.querySelector(target)
                : target;

            if (!img) {
                return _push('WARN', 'image', 'logImageLoadTime: element not found', { target: String(target) });
            }

            const src          = img.currentSrc || img.src || '';
            const displayLabel = label || src.split('/').pop() || 'unknown';

            // Try Performance Resource Timing first
            if (typeof performance !== 'undefined' && performance.getEntriesByType) {
                const match = performance
                    .getEntriesByType('resource')
                    .filter(function (e) { return e.initiatorType === 'img' && e.name === src; })
                    .pop();

                if (match) {
                    return _push('PERF', 'image', 'Image load time: ' + displayLabel, {
                        src:               src,
                        durationMs:        Math.round(match.duration),
                        startTimeMs:       Math.round(match.startTime),
                        transferSizeKB:    match.transferSize > 0
                            ? (match.transferSize  / 1024).toFixed(1)
                            : 'cached or cross-origin',
                        encodedBodySizeKB: match.encodedBodySize > 0
                            ? (match.encodedBodySize / 1024).toFixed(1)
                            : 'n/a',
                    });
                }
            }

            // Image already loaded but no timing entry available
            if (img.complete && img.naturalWidth > 0) {
                return _push('PERF', 'image', 'Image load time: ' + displayLabel, {
                    src:    src,
                    status: 'already loaded — timing entry unavailable',
                });
            }

            // Attach event listeners for images still in flight
            const start = performance.now();

            img.addEventListener('load', function onLoad() {
                img.removeEventListener('load', onLoad);
                _push('PERF', 'image', 'Image loaded: ' + displayLabel, {
                    src:        src,
                    durationMs: Math.round(performance.now() - start),
                    note:       'Timed from listener registration, not navigation start',
                });
            });

            img.addEventListener('error', function onError() {
                img.removeEventListener('error', onError);
                _push('ERROR', 'image', 'Image failed to load: ' + displayLabel, { src: src });
            });
        },

        // ---------------------------------------------------------

        /**
         * Log all <script src="..."> elements found in the document,
         * with resource timing data where available.
         */
        logScripts: function () {
            const scripts = Array.from(document.querySelectorAll('script[src]'));

            const resourceEntries = (typeof performance !== 'undefined')
                ? performance.getEntriesByType('resource').filter(function (e) {
                    return e.initiatorType === 'script';
                })
                : [];

            const data = scripts.map(function (s) {
                const timing = resourceEntries.find(function (e) { return e.name === s.src; });
                return {
                    src:           s.src,
                    defer:         s.defer,
                    async:         s.async,
                    durationMs:    timing ? Math.round(timing.duration) : 'n/a',
                    transferSizeKB: timing && timing.transferSize > 0
                        ? (timing.transferSize / 1024).toFixed(1)
                        : 'cached or cross-origin',
                };
            });

            return _push('SCRIPT', 'scripts', scripts.length + ' script(s) detected', data);
        },

        // ---------------------------------------------------------

        /**
         * Return stored log entries, optionally filtered.
         * @param {{ level?: string, category?: string }} [filters]
         * @returns {Array}
         */
        getLogs: function (filters) {
            const entries = _read();
            if (!filters) { return entries; }
            return entries.filter(function (e) {
                if (filters.level    && e.level    !== filters.level)    { return false; }
                if (filters.category && e.category !== filters.category) { return false; }
                return true;
            });
        },

        /** Wipe all stored log entries. */
        clear: function () {
            _write([]);
        },

        /**
         * Pretty-print entries to the browser console.
         * @param {{ level?: string, category?: string }} [filters]
         */
        print: function (filters) {
            const entries = Logger.getLogs(filters);
            const suffix  = filters ? ' matching filters' : '';

            if (entries.length === 0) {
                console.log('[Logger] No entries' + suffix + '.');
                return;
            }

            console.groupCollapsed(
                '[Logger] ' + entries.length + ' entr' + (entries.length === 1 ? 'y' : 'ies') + suffix
            );

            entries.forEach(function (e) {
                const line = '[' + e.ts + '] [' + e.level + '] [' + e.category + '] ' + e.message;
                if (e.level === 'ERROR')      { console.error(line, e.data); }
                else if (e.level === 'WARN')  { console.warn(line, e.data);  }
                else                          { console.log(line, e.data);   }
            });

            console.groupEnd();
        },

    };

    global.Logger = Logger;

}(window));


// =============================================================
// Test log — demonstrates all Logger capabilities.
// The hero section is a CSS-only phone mockup (no <img>), so
// the logo is used here as the image timing demo. Replace with
// the hero image selector once real images are added.
//
// Remove or gate behind a debug flag before going to production.
// =============================================================

document.addEventListener('DOMContentLoaded', function () {

    // Page load context
    Logger.info('Page loaded', {
        url:       window.location.href,
        referrer:  document.referrer || 'direct',
        userAgent: navigator.userAgent,
    });

    // localStorage + sessionStorage state
    Logger.logStorage();

    // All <script src="..."> elements + resource timing
    Logger.logScripts();

    // Image load time — logo img (hero is CSS-only at this stage)
    Logger.logImageLoadTime('.site-logo-img', 'Site logo');

    // Manual build notes
    Logger.warn('App Store URL is a placeholder — update href on download buttons before launch');
    Logger.warn('og:image and og:url are placeholder values — update once domain and asset are confirmed');
    Logger.warn('apple-touch-icon.png is missing from assets/ — add before launch');
    Logger.log('build', 'Phase 1 complete', {
        pages:   ['index.html', 'privacy.html'],
        pending: ['App Store URL', 'real logo', 'og:image', 'apple-touch-icon.png'],
    });

    // Print everything to the console
    Logger.print();

});
