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
    const response = await fetch(notifyForm.action, {
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
    console.error('Form submission error:', err);
    
    // Check if we are running locally via file:// protocol
    const isFileProtocol = window.location.protocol === 'file:';
    const message = isFileProtocol 
      ? 'CORS restriction detected (local file://). Submitting form...'
      : 'Network error or ad-blocker detected. Submitting form...';
    
    showError(message);
    
    // Fallback to standard form submission which bypasses CORS and ad-blockers
    setTimeout(() => {
      notifyForm.submit();
    }, 1200);
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

// --- Interactive Season Tester Widget Logic ---
const SEASON_DATA = {
  'fair-warm': {
    badge: 'Spring Season',
    title: 'Bright Spring',
    desc: 'Your complexion is illuminated by bright, clear, warm shades with golden bases. You look radiant in peaches, warm coral, butter yellows, and light warm greens.',
    palette: [
      { color: '#FB923C', name: 'Peach Coral' },
      { color: '#FCD34D', name: 'Butter Yellow' },
      { color: '#86EFAC', name: 'Warm Mint' },
      { color: '#F472B6', name: 'Blush Pink' }
    ],
    garments: [
      { name: 'Peach Coral', bg: '#FB923C' },
      { name: 'Butter Yellow', bg: '#FCD34D' },
      { name: 'Warm Mint', bg: '#86EFAC' }
    ]
  },
  'fair-cool': {
    badge: 'Summer Season',
    title: 'Soft Summer',
    desc: 'Your skin has cool, blue-pink undertones that harmonize with soft, blended, and muted pastel shades. Cool lavenders, powder blues, and dusty roses are your absolute best.',
    palette: [
      { color: '#93C5FD', name: 'Powder Blue' },
      { color: '#C084FC', name: 'Lavender' },
      { color: '#F472B6', name: 'Dusty Rose' },
      { color: '#2DD4BF', name: 'Soft Teal' }
    ],
    garments: [
      { name: 'Powder Blue', bg: '#93C5FD' },
      { name: 'Lavender', bg: '#C084FC' },
      { name: 'Dusty Rose', bg: '#F472B6' }
    ]
  },
  'medium-warm': {
    badge: 'Autumn Season',
    title: 'Warm Autumn',
    desc: 'Your golden-olive wheatish complexion looks incredibly rich in earthy, saturated warm shades. Mustard yellow, terracotta, rust orange, and deep forest greens are your signature colors.',
    palette: [
      { color: '#D97706', name: 'Mustard Yellow' },
      { color: '#C2410C', name: 'Rust Orange' },
      { color: '#9A3412', name: 'Terracotta' },
      { color: '#166534', name: 'Forest Green' }
    ],
    garments: [
      { name: 'Terracotta', bg: '#9A3412' },
      { name: 'Mustard Yellow', bg: '#D97706' },
      { name: 'Forest Green', bg: '#166534' }
    ]
  },
  'medium-cool': {
    badge: 'Winter Season',
    title: 'Deep Winter',
    desc: 'Your cool-toned wheatish skin stands out in high-contrast, saturated jewel tones. Sapphire blue, royal emerald green, deep plum, and crimson make your complexion pop.',
    palette: [
      { color: '#1D4ED8', name: 'Sapphire Blue' },
      { color: '#047857', name: 'Royal Emerald' },
      { color: '#7E22CE', name: 'Deep Plum' },
      { color: '#DC2626', name: 'Crimson' }
    ],
    garments: [
      { name: 'Sapphire Blue', bg: '#1D4ED8' },
      { name: 'Royal Emerald', bg: '#047857' },
      { name: 'Deep Plum', bg: '#7E22CE' }
    ]
  },
  'dusky-warm': {
    badge: 'Autumn Season',
    title: 'Deep Autumn',
    desc: 'Your deep, golden-brown skin radiates luxury and warmth. Saturated warm tones like saffron, golden marigold, deep metallic gold, and warm amber create a spectacular glow.',
    palette: [
      { color: '#EA580C', name: 'Deep Saffron' },
      { color: '#F59E0B', name: 'Marigold' },
      { color: '#D97706', name: 'Amber Gold' },
      { color: '#78350F', name: 'Warm Bronze' }
    ],
    garments: [
      { name: 'Deep Saffron', bg: '#EA580C' },
      { name: 'Marigold', bg: '#F59E0B' },
      { name: 'Warm Bronze', bg: '#78350F' }
    ]
  },
  'dusky-cool': {
    badge: 'Winter Season',
    title: 'Deep Winter',
    desc: 'Your rich, cool-toned dusky skin looks most powerful in vivid, highly-saturated cool tones and stark contrasts. Electric blue, fuchsia pink, magenta, and crisp white are your power shades.',
    palette: [
      { color: '#2563EB', name: 'Electric Blue' },
      { color: '#DB2777', name: 'Fuchsia Pink' },
      { color: '#475569', name: 'Slate Blue' },
      { color: '#FFFFFF', name: 'Crisp White' }
    ],
    garments: [
      { name: 'Electric Blue', bg: '#2563EB' },
      { name: 'Fuchsia Pink', bg: '#DB2777' },
      { name: 'Crisp White', bg: '#FFFFFF' }
    ]
  }
};

let activeDepth = 'fair';
let activeUndertone = 'warm';

const depthBtns = document.querySelectorAll('#depth-tabs .tab-btn');
const undertoneBtns = document.querySelectorAll('#undertone-tabs .tab-btn');

const updateSeasonTester = () => {
  const key = `${activeDepth}-${activeUndertone}`;
  const data = SEASON_DATA[key];
  if (!data) return;

  // Update text content with quick fade animation
  const infoSection = document.querySelector('.tester-info');
  infoSection.style.opacity = '0.5';
  infoSection.style.transition = 'opacity 0.2s ease';

  setTimeout(() => {
    document.getElementById('season-badge').textContent = data.badge;
    document.getElementById('season-title').textContent = data.title;
    document.getElementById('season-desc').textContent = data.desc;
    
    // Update Palette Dots
    const dotsContainer = document.getElementById('palette-dots');
    dotsContainer.innerHTML = '';
    data.palette.forEach(item => {
      const dot = document.createElement('div');
      dot.className = 'palette-dot';
      dot.style.backgroundColor = item.color;
      dot.setAttribute('data-tooltip', item.name);
      dotsContainer.appendChild(dot);
    });

    // Update Garments
    data.garments.forEach((garment, idx) => {
      const cardNum = idx + 1;
      const preview = document.getElementById(`garment-${cardNum}-preview`);
      const label = document.getElementById(`garment-${cardNum}-color`);
      
      // Update preview background and color contrasts
      preview.style.backgroundColor = garment.bg;
      // Calculate text/icon color contrast simply
      const isWhite = garment.bg.toUpperCase() === '#FFFFFF';
      preview.style.color = isWhite ? '#0F172A' : '#FFFFFF';
      
      label.textContent = garment.name;
    });

    infoSection.style.opacity = '1';
  }, 200);
};

if (depthBtns.length && undertoneBtns.length) {
  depthBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      depthBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeDepth = btn.getAttribute('data-depth');
      updateSeasonTester();
    });
  });

  undertoneBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      undertoneBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      activeUndertone = btn.getAttribute('data-undertone');
      updateSeasonTester();
    });
  });

  // Initialize
  updateSeasonTester();
}

