(function () {
    'use strict';

    // Modal — open / close with keyboard support
    document.addEventListener('DOMContentLoaded', function () {
        const modals = document.querySelectorAll('.modal');

        modals.forEach(function (modal) {
            // Close on backdrop click
            modal.addEventListener('click', function (e) {
                if (e.target === modal) {
                    modal.close();
                }
            });

            // Close button
            const closeBtn = modal.querySelector('.modal-close');
            if (closeBtn) {
                closeBtn.addEventListener('click', function () {
                    modal.close();
                });
            }
        });

        // Escape key is handled natively by <dialog>
        // Open triggers — any element with data-modal-target="#modal-id"
        document.querySelectorAll('[data-modal-target]').forEach(function (trigger) {
            trigger.addEventListener('click', function () {
                const target = document.querySelector(trigger.dataset.modalTarget);
                if (target) {
                    target.showModal();
                }
            });
        });

        // Stats boxes — live value updates every 3.5s
        // Each .stat-percent carries data-min/max/decimals/pct-max.
        // --num (0–100) drives the SVG arc via CSS; dot rotation set directly.
        (function initStatsBoxes() {
            function updateBox(box) {
                var pct = box.querySelector('.stat-percent');
                var dot = box.querySelector('.stat-dot');
                var valEl = box.querySelector('.stat-val');
                if (!pct || !dot || !valEl) { return; }

                var min = parseFloat(pct.dataset.min);
                var max = parseFloat(pct.dataset.max);
                var decimals = parseInt(pct.dataset.decimals, 10);
                var pctMax = parseFloat(pct.dataset.pctMax);

                var value = min + Math.random() * (max - min);
                value = parseFloat(value.toFixed(decimals));

                var num = Math.min(100, Math.max(0, Math.round((value / pctMax) * 100)));

                pct.style.setProperty('--num', num);
                dot.style.transform = 'rotate(' + (num * 3.6) + 'deg)';
                valEl.textContent = value;
            }

            function updateAll() {
                document.querySelectorAll('.stat-box').forEach(function (box, i) {
                    setTimeout(function () { updateBox(box); }, i * 250);
                });
            }

            updateAll();
            setInterval(updateAll, 3500);
        }());
    });

}());
