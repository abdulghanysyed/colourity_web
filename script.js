/* =====================================================
   COLOURITY — JavaScript
   ===================================================== */

// --- Navbar scroll effect ---
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
}, { passive: true });

// --- Mobile hamburger menu ---
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');

hamburger.addEventListener('click', () => {
  mobileMenu.classList.toggle('open');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.mobile-link').forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
  });
});

// --- Scroll reveal animation ---
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1,
  rootMargin: '0px 0px -40px 0px'
});

document.querySelectorAll('.reveal').forEach(el => {
  revealObserver.observe(el);
});

// --- Email form submission via Formspree ---
const notifyForm = document.getElementById('notifyForm');
const submitBtn = document.getElementById('notify-submit-btn');
const btnText = submitBtn.querySelector('.btn-text');
const btnSpinner = submitBtn.querySelector('.btn-spinner');
const formSuccess = document.getElementById('formSuccess');

notifyForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  // Show loading state
  btnText.style.display = 'none';
  btnSpinner.style.display = 'flex';
  submitBtn.disabled = true;

  try {
    const formData = new FormData(notifyForm);
    const response = await fetch(action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      // Show success
      notifyForm.querySelector('.form-row').style.display = 'none';
      notifyForm.querySelector('.form-privacy').style.display = 'none';
      formSuccess.style.display = 'flex';

      // Track with analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'sign_up', { method: 'email_notify' });
      }
    } else {
      const data = await response.json();
      const errorMsg = data.errors ? data.errors.map(e => e.message).join(', ') : 'Submission failed. Please try again.';
      showError(errorMsg);
    }
  } catch (err) {
    showError('Network error. Please check your connection and try again.');
  } finally {
    btnText.style.display = 'inline';
    btnSpinner.style.display = 'none';
    submitBtn.disabled = false;
  }
});

function showError(message) {
  const existingError = notifyForm.querySelector('.form-error');
  if (existingError) existingError.remove();

  const errorEl = document.createElement('p');
  errorEl.className = 'form-error';
  errorEl.style.cssText = 'color:#EF4444;font-size:0.83rem;margin-top:10px;text-align:center;';
  errorEl.textContent = message;
  notifyForm.appendChild(errorEl);
}

// --- Smooth anchor scroll ---
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// --- Active nav link highlight on scroll ---
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${entry.target.id}`) {
          link.style.color = 'var(--purple)';
        }
      });
    }
  });
}, { threshold: 0.4 });

sections.forEach(s => sectionObserver.observe(s));

// --- FAQ Accordion ---
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const item = btn.closest('.faq-item');
    const isOpen = item.classList.contains('open');

    // Close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
    });

    // Open clicked (unless it was already open)
    if (!isOpen) {
      item.classList.add('open');
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

// --- How It Works Interactive Steps ---
const steps = document.querySelectorAll('.step');
const hiwImages = document.querySelectorAll('.hiw-image');

if (steps.length && hiwImages.length) {
  steps.forEach(step => {
    const activateStep = () => {
      steps.forEach(s => s.classList.remove('active'));
      step.classList.add('active');
      
      const stepNum = step.getAttribute('data-step');
      hiwImages.forEach(img => {
        if (img.getAttribute('id') === `hiw-img-${stepNum}`) {
          img.classList.add('active');
        } else {
          img.classList.remove('active');
        }
      });
    };

    step.addEventListener('click', activateStep);
    step.addEventListener('mouseenter', activateStep);
  });
}
