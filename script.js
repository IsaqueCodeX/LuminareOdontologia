/**
 * LUMINARE ODONTOLOGIA - MAIN SCRIPT
 * Pure JS (ES6+) implementation of UI interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollReveal();
    initHeaderScroll();
    initBeforeAfterSlider();
    // Tab function is global or attached here
});

/* =========================================
   SCROLL REVEAL (Intersection Observer)
   ========================================= */
function initScrollReveal() {
    const options = {
        threshold: 0.1, // Trigger when 10% of element is visible
        rootMargin: "0px 0px -50px 0px" // Trigger slightly before element is fully in view
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                observer.unobserve(entry.target); // Animate only once
            }
        });
    }, options);

    // Target elements with .reveal classes
    const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');
    revealElements.forEach(el => observer.observe(el));
}

/* =========================================
   HEADER SCROLL EFFECT
   ========================================= */
function initHeaderScroll() {
    const header = document.getElementById('main-header');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

/* =========================================
   BEFORE / AFTER SLIDER LOGIC
   ========================================= */
function initBeforeAfterSlider() {
    const container = document.getElementById('comparison-slider');
    const afterWrapper = document.getElementById('after-wrapper');
    const handle = document.getElementById('slider-handle');
    const line = document.getElementById('slider-line');

    if (!container || !afterWrapper || !handle) return;

    let active = false;

    // Keep inner image width synced with container to prevent distortion
    const afterImage = document.getElementById('img-after-inner');

    function syncImageWidth() {
        if (afterImage && container) {
            afterImage.style.width = container.offsetWidth + 'px';
        }
    }

    window.addEventListener('resize', syncImageWidth);
    syncImageWidth(); // Initial call

    // Mouse Events
    handle.addEventListener('mousedown', () => active = true);
    document.body.addEventListener('mouseup', () => active = false);
    document.body.addEventListener('mouseleave', () => active = false);
    document.body.addEventListener('mousemove', (e) => {
        if (!active) return;
        let x = e.pageX;
        x -= container.getBoundingClientRect().left;
        slide(x);
    });

    // Touch Events (Mobile)
    handle.addEventListener('touchstart', () => active = true);
    document.body.addEventListener('touchend', () => active = false);
    document.body.addEventListener('touchmove', (e) => {
        if (!active) return;
        let x = e.touches[0].pageX;
        x -= container.getBoundingClientRect().left;
        slide(x);
    });

    function slide(x) {
        let containerWidth = container.offsetWidth;

        // Boundaries
        if (x < 0) x = 0;
        if (x > containerWidth) x = containerWidth;

        // Calculate percentage for width
        const percentage = (x / containerWidth) * 100;

        // Update styling
        afterWrapper.style.width = percentage + "%";
        handle.style.left = percentage + "%";
        line.style.left = percentage + "%"; // Move the line with the handle
    }
}

/* =========================================
   TABS LOGIC
   ========================================= */
window.openTab = function (evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
        tabContents[i].style.display = "none"; // Ensure clean switch
    }

    // Deactivate all buttons
    const tabLinks = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabLinks.length; i++) {
        tabLinks[i].classList.remove("active");
    }

    // Show current tab and activate button
    const activeTab = document.getElementById(tabName);
    activeTab.style.display = "grid"; // Restore grid layout
    // Small timeout to allow display:grid to apply before adding opacity class for transition
    setTimeout(() => {
        activeTab.classList.add("active");
    }, 10);

    evt.currentTarget.classList.add("active");
};
