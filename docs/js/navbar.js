document.addEventListener('DOMContentLoaded', function () {

    // Handles smooth scrolling when a nav link is clicked
    if (document.querySelector("nav a")) {
        document.querySelectorAll('nav a').forEach(anchor => {
            anchor.addEventListener('click', function (e) {

                const href = this.getAttribute('href');
                if (!href) return;

                if (href.startsWith("#") && href != "#") {
                    const targetElement = document.querySelector(href);

                    if (targetElement) {
                        e.preventDefault();
                        targetElement.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });
                        history.pushState(null, null, href);
                    }
                }
            });
        });
    }


       if (navLinks) {
        navLinks.querySelectorAll('a:not(.dropdown-toggle)').forEach(link => {
            link.addEventListener('click', () => {
                // Only close if the menu is active (on mobile)
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }

    // Handles dropdown menu functionality, especially for mobile view
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    if (dropdownToggles.length > 0) {
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('click', function (e) {
                e.preventDefault();
                const dropdown = this.closest('.dropdown');

                if (window.innerWidth <= 992) {
                    const isActive = dropdown.classList.toggle('active');
                    this.setAttribute('aria-expanded', isActive);
                    
                    // Close other open dropdowns
                    dropdownToggles.forEach(otherToggle => {
                        const otherDropDown = otherToggle.closest('.dropdown');
                        if (otherDropDown !== dropdown) {
                            otherDropDown.classList.remove('active');
                            otherToggle.setAttribute('aria-expanded', false);
                        }
                    });
                }
            });
        });

        // Close dropdown if the user clicks outside of it
        document.addEventListener('click', function (e) {
            if (!e.target.closest('.dropdown')) {
                dropdownToggles.forEach(toggle => {
                    const dropdownElement = toggle.closest('.dropdown');
                    dropdownElement.classList.remove('active');
                    toggle.setAttribute('aria-expanded', false);
                });
            }
        });

        // Keyboard accessibility for dropdowns
        dropdownToggles.forEach(toggle => {
            toggle.addEventListener('keydown', function (e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Hamburger menu toggle functionality
    const menuToggle = document.getElementById('menu-toggle');
    const navLinks = document.getElementById('nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const isExpanded = navLinks.classList.contains('active');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }
});