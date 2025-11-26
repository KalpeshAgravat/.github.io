// Enhanced site JS: mobile nav toggle, theme, nav active, contact form and simple animations
document.addEventListener('DOMContentLoaded', function() {
    // Mobile nav toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const nav = document.querySelector('.nav');
    if (mobileToggle && nav) {
        mobileToggle.addEventListener('click', () => {
            nav.classList.toggle('open');
            mobileToggle.classList.toggle('open');
        });
    }

    // Theme toggle (respect prefers-color-scheme and saved preference)
    const saved = localStorage.getItem('theme');
    if (saved === 'light') document.body.classList.add('light');

    // Add active class to nav link matching current page
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav a').forEach(a => {
        const href = a.getAttribute('href');
        if (href === currentPage) a.classList.add('active');
        else a.classList.remove('active');
    });

    // Contact form handling: if form has an action attribute it will POST there (e.g., Formspree),
    // otherwise fallback to a client-side confirmation. This enables wiring a serverless form
    // endpoint without changing the JS.
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            // basic validation
            const name = contactForm.name.value.trim();
            const email = contactForm.email.value.trim();
            const message = contactForm.message.value.trim();
            if (!name || !email || !message) {
                alert('Please fill all fields before submitting.');
                return;
            }

            const endpoint = contactForm.getAttribute('action') || contactForm.dataset.endpoint || '';
            if (endpoint) {
                // submit via fetch using FormData so services like Formspree accept it
                try {
                    const formData = new FormData(contactForm);
                    // add an extra field for easier email formatting
                    formData.append('sent_at', new Date().toISOString());
                    const res = await fetch(endpoint, { method: 'POST', body: formData, headers: { 'Accept': 'application/json' } });
                    if (res.ok) {
                        // try to parse JSON response for helpful message
                        let json = null;
                        try { json = await res.json(); } catch (err) { /* ignore */ }
                        alert((json && json.message) ? json.message : ('Thanks ' + name + '! Your message was sent.') );
                        contactForm.reset();
                    } else {
                        const text = await res.text();
                        console.error('Form submit failed', res.status, text);
                        alert('Sorry — sending failed (server returned ' + res.status + '). Please try again later.');
                    }
                } catch (err) {
                    console.error('Form submit error', err);
                    alert('Network error while sending message. Please check your connection and try again.');
                }
            } else {
                // no endpoint configured — preserve the friendly fallback
                alert('Thanks ' + name + '! Your message was received locally. To receive messages by email, configure a form endpoint (Formspree/Netlify) and set it in the form action.');
                contactForm.reset();
            }
        });
    }

    // Small reveal animation for elements with .fade-up
    const reveal = () => {
        document.querySelectorAll('.fade-up').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < window.innerHeight - 40) el.classList.add('show');
        });
    };
    reveal();
    window.addEventListener('scroll', reveal, {passive:true});
  
        // Theme toggle button (if present)
        const themeToggle = document.getElementById('themeToggle');
        if (themeToggle) {
            themeToggle.addEventListener('click', () => {
                const isLight = document.body.classList.toggle('light');
                localStorage.setItem('theme', isLight ? 'light' : 'dark');
                // update aria-pressed for accessibility
                themeToggle.setAttribute('aria-pressed', String(isLight));
            });
            // initialize aria-pressed state
            themeToggle.setAttribute('aria-pressed', String(document.body.classList.contains('light')));
        }
});
