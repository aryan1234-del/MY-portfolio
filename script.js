document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Navigation Toggle
    const mobileMenu = document.getElementById('mobile-menu');
    const navbar = document.querySelector('.navbar');

    if (mobileMenu && navbar) {
        mobileMenu.addEventListener('click', () => {
            navbar.classList.toggle('active');
            mobileMenu.classList.toggle('active'); // Optional: Add an 'X' icon animation
        });

        // Close navbar when a link is clicked on mobile
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navbar.classList.contains('active')) {
                    navbar.classList.remove('active');
                    mobileMenu.classList.remove('active');
                }
            });
        });
    }

    // 2. Smooth Scrolling for Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Get header height to adjust scroll position
                const headerOffset = document.querySelector('.header').offsetHeight;
                const elementPosition = targetElement.getBoundingClientRect().top + window.scrollY;
                const offsetPosition = elementPosition - headerOffset - 20; // -20px for extra padding

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // 3. Dynamic Footer Year
    const currentYearSpan = document.getElementById('current-year');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // 4. Simple Scroll Reveal Animation (Optional, but adds uniqueness)
    // We'll use Intersection Observer API for performance
    const sections = document.querySelectorAll('.section-padding');

    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    };

    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null, // viewport as root
        threshold: 0.15 // Trigger when 15% of the section is visible
    });

    sections.forEach(section => {
        section.classList.add('hidden-section'); // Initial state for animation
        sectionObserver.observe(section);
    });
});

// Add these CSS classes to style.css for the scroll reveal animation
/*
.hidden-section {
    opacity: 0;
    transform: translateY(50px);
    transition: opacity 0.8s ease-out, transform 0.8s ease-out;
}

.fade-in-up {
    opacity: 1;
    transform: translateY(0);
}
*/