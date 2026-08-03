// Intro logo reveal (home page only, plays on every fresh load/reload)
const introOverlay = document.querySelector('#intro-overlay');
if (introOverlay) {
  document.body.classList.add('intro-active');
  window.addEventListener('load', () => {
    setTimeout(() => {
      introOverlay.classList.add('intro-hide');
      document.body.classList.remove('intro-active');
      setTimeout(() => introOverlay.remove(), 700);
    }, 1900);
  });
}

// Header scroll state
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
});

// Mobile menu
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const navOverlay = document.querySelector('.nav-overlay');

function closeMenu() {
  navLinks.classList.remove('mobile-open');
  navOverlay.classList.remove('active');
  menuToggle.classList.remove('open');
}

if (menuToggle) {
  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('mobile-open');
    navOverlay.classList.toggle('active');
    menuToggle.classList.toggle('open');
  });
  navOverlay.addEventListener('click', closeMenu);
  navLinks.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
}

// Reveal on scroll
const revealEls = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('active');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => observer.observe(el));

// Contact form -> sends enquiry to WhatsApp
const WHATSAPP_NUMBER = '919892404091';

const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fname = contactForm.querySelector('#fname').value.trim();
    const phone = contactForm.querySelector('#phone').value.trim();
    const email = contactForm.querySelector('#email').value.trim();
    const society = contactForm.querySelector('#society').value.trim();
    const location = contactForm.querySelector('#location').value.trim();
    const message = contactForm.querySelector('#message').value.trim();

    const lines = [
      'New Redevelopment Enquiry, Vistaar Apaar Developers',
      '',
      `Name: ${fname}`,
      `Phone: ${phone}`,
      `Email: ${email}`,
      `Society Name: ${society}`,
      `Building Location: ${location}`,
      '',
      `Message: ${message}`,
    ];

    const text = encodeURIComponent(lines.join('\n'));
    const waUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${text}`;

    window.open(waUrl, '_blank', 'noopener');
    contactForm.reset();
  });
}

// Current year in footer
document.querySelectorAll('.current-year').forEach(el => {
  el.textContent = new Date().getFullYear();
});
