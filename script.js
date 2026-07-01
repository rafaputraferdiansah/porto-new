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

// Contact form -> Google Sheets via Google Apps Script Web App
// GANTI URL di bawah ini dengan Web App URL hasil deploy Apps Script kamu
const FORM_ENDPOINT = 'https://script.google.com/macros/s/AKfycbypCU4YbDLnqCZ8pHoWxJC8M_CMWDRREBe37-t5AiblhxfvWF1AvxbPkj_diP9OIUrN/exec';

const form = document.getElementById('contactForm');
const submitBtn = form.querySelector('button[type="submit"]');
const originalBtnText = submitBtn.textContent;

form.addEventListener('submit', async (e) => {
  e.preventDefault();

  const formData = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    message: document.getElementById('message').value
  };

  submitBtn.disabled = true;
  submitBtn.textContent = 'Mengirim...';

  try {
    await fetch(FORM_ENDPOINT, {
      method: 'POST',
      mode: 'no-cors', // Apps Script tidak mengembalikan header CORS standar
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(formData)
    });

    // Dengan mode 'no-cors' kita tidak bisa membaca response,
    // jadi kita anggap berhasil selama tidak ada error jaringan.
    alert('Terima kasih! Pesan Anda telah terkirim.');
    form.reset();
  } catch (err) {
    console.error('Gagal mengirim pesan:', err);
    alert('Maaf, terjadi kesalahan saat mengirim pesan. Silakan coba lagi atau hubungi saya lewat email.');
  } finally {
    submitBtn.disabled = false;
    submitBtn.textContent = originalBtnText;
  }
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
