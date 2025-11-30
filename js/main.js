document.addEventListener('DOMContentLoaded', function () {
    // Mobile nav toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;
    const icon = themeToggle ? themeToggle.querySelector('i') : null;

    // Check for saved user preference, if any, on load of the website
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'light') {
        body.classList.add('light');
        if (icon) icon.classList.replace('fa-moon', 'fa-sun');
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            body.classList.toggle('light');
            const isLight = body.classList.contains('light');

            // Update icon
            if (icon) {
                if (isLight) {
                    icon.classList.replace('fa-moon', 'fa-sun');
                } else {
                    icon.classList.replace('fa-sun', 'fa-moon');
                }
            }

            // Save preference
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // Add active class to nav link matching current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(a => {
        const href = a.getAttribute('href');
        // Skip theme toggle button if it's inside nav-links (though it shouldn't be)
        if (!href) return;

        if (href === currentPage) {
            a.classList.add('active');
        } else {
            // Also handle root path
            if (currentPage === 'index.html' && href === './') {
                a.classList.add('active');
            } else {
                a.classList.remove('active');
            }
        }
    });

    // Contact form handling (if present)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            // basic validation
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();

            if (!name || !email || !message) {
                alert('Please fill all fields before submitting.');
                return;
            }

            // Placeholder for actual submission logic
            alert('Thanks ' + name + '! Your message has been sent (Simulation).');
            contactForm.reset();
        });
    }
});
