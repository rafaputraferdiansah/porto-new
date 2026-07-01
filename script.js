// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const menuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Smooth scroll for navigation links
const navLinks = document.querySelectorAll('nav a[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const targetId = link.getAttribute('href');
    const targetSection = document.querySelector(targetId);
    
    if (targetSection) {
      // Close mobile menu if open
      mobileMenu.classList.add('hidden');
      
      // Smooth scroll to section
      targetSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
      
      // Add fade animation on scroll
      targetSection.style.animation = 'fadeInUp 0.6s ease-out';
    }
  });
});

// Simple form demo (prevent actual submit, show alert)
const form = document.getElementById('contactForm');
form.addEventListener('submit', e => {
  e.preventDefault();
  alert('Terima kasih! Pesan Anda telah dikirim (demo).');
  form.reset();
});

// Scroll‑reveal animation for sections
const sections = document.querySelectorAll('[data-animate]');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

sections.forEach(sec => observer.observe(sec));