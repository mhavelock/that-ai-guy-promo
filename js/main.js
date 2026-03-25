(function () {
    'use strict';

    // Stats boxes — live value updates every 3.5s.
    // Each .stat-percent carries data-min/max/decimals/pct-max.
    // --num (0–100) drives the SVG arc via CSS; dot rotation set directly.
    document.addEventListener('DOMContentLoaded', function () {

        (function initStatsBoxes() {
            const boxes = document.querySelectorAll('.stat-box');
            if (!boxes.length) { return; }

            // Cache element references once on init
            const targets = Array.from(boxes).map(function (box) {
                return {
                    pct:   box.querySelector('.stat-percent'),
                    dot:   box.querySelector('.stat-dot'),
                    valEl: box.querySelector('.stat-val'),
                };
            }).filter(function (t) { return t.pct && t.dot && t.valEl; });

            function updateBox(t) {
                const min      = parseFloat(t.pct.dataset.min);
                const max      = parseFloat(t.pct.dataset.max);
                const decimals = parseInt(t.pct.dataset.decimals, 10);
                const pctMax   = parseFloat(t.pct.dataset.pctMax);

                let value = min + Math.random() * (max - min);
                value = parseFloat(value.toFixed(decimals));

                const num = Math.min(100, Math.max(0, Math.round((value / pctMax) * 100)));

                t.pct.style.setProperty('--num', num);
                t.dot.style.transform = 'rotate(' + (num * 3.6) + 'deg)';
                t.valEl.textContent = value;
            }

            function updateAll() {
                targets.forEach(function (t, i) {
                    setTimeout(function () { updateBox(t); }, i * 250);
                });
            }

            updateAll();
            setInterval(updateAll, 3500);
        }());

    });

}());
