/**
 * theme.js — light / dark mode toggle
 * Reads from localStorage, falls back to system preference.
 * Sets data-theme on <html> so CSS [data-theme] selectors apply.
 * (Early initialization is in the inline <script> in <head>
 *  to prevent flash of wrong theme — this file handles events
 *  and the toggle button after the DOM is ready.)
 */

(function () {
    'use strict';

    const STORAGE_KEY = 'thaiaiguy:theme';

    function setTheme(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(STORAGE_KEY, theme);
    }

    function toggleTheme() {
        const current = document.documentElement.dataset.theme;
        setTheme(current === 'dark' ? 'light' : 'dark');
    }

    // Listen for system theme changes — only if the user hasn't
    // saved an explicit preference.
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    prefersDark.addEventListener('change', function (e) {
        if (!localStorage.getItem(STORAGE_KEY)) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Bind the toggle button once the DOM is ready.
    document.addEventListener('DOMContentLoaded', function () {
        const btn = document.getElementById('theme-toggle-btn');
        if (btn) {
            btn.addEventListener('click', toggleTheme);
        }
    });

}());
