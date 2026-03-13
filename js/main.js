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
    });

}());
