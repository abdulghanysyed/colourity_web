/* =====================================================
   THE COLOURITY CORE — Continuous Scroll & Real Imagery Script
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. ANTIGRAVITY PARTICLES CANVAS ENGINE
  // ===================================================
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 70;
  let mouse = { x: null, y: null, active: false };

  class Particle {
    constructor() {
      this.reset();
    }
    reset() {
      this.x = Math.random() * width;
      this.y = height + Math.random() * 100;
      this.size = Math.random() * 2.5 + 0.5;
      this.speedY = Math.random() * 0.8 + 0.2;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.alpha = Math.random() * 0.5 + 0.15;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      // Antigravity Mouse Force
      if (mouse.active && mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 140) {
          const force = (140 - dist) / 140;
          this.x += (dx / dist) * force * 2;
          this.y += (dy / dist) * force * 2;
        }
      }

      if (this.y < -10 || this.x < -10 || this.x > width + 10) {
        this.reset();
      }
    }
    draw() {
      ctx.save();
      ctx.globalAlpha = this.alpha;
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  // Initialize
  for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
  }

  // Resize handler
  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  // Mouse tracker
  window.addEventListener('mousemove', (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
    mouse.active = true;
  });
  window.addEventListener('mouseleave', () => {
    mouse.active = false;
  });

  // Main RAF loop
  function animateParticles() {
    ctx.clearRect(0, 0, width, height);
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    requestAnimationFrame(animateParticles);
  }
  animateParticles();


  // ===================================================
  // 2. WARDROBE OPENING TRIGGER
  // ===================================================
  const wardrobe = document.getElementById('main-wardrobe');
  const btnOpen = document.getElementById('btn-open-wardrobe');

  btnOpen.addEventListener('click', () => {
    wardrobe.classList.add('open');
    btnOpen.disabled = true;

    // Smooth scroll down to Core section
    setTimeout(() => {
      document.getElementById('sec-core').scrollIntoView({ behavior: 'smooth' });
    }, 1200);
  });


  // ===================================================
  // 3. REAL PHOTO GARMENT MAGNETIC DRAG & CORE INGESTION
  // ===================================================
  const coreOrb = document.getElementById('colourity-core');
  const statusText = document.getElementById('core-status-text');

  function initializeGarmentDragging() {
    const garments = document.querySelectorAll('.draggable-garment');

    garments.forEach(g => {
      let isDragging = false;
      let startX, startY;
      let shiftX = 0, shiftY = 0;

      const dragStart = (e) => {
        isDragging = true;
        g.style.transition = 'none';
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        startX = clientX - shiftX;
        startY = clientY - shiftY;
        g.style.cursor = 'grabbing';
      };

      const dragMove = (e) => {
        if (!isDragging) return;
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        shiftX = clientX - startX;
        shiftY = clientY - startY;

        g.style.transform = `translate(${shiftX}px, ${shiftY}px)`;

        // Magnetic Attraction to Core
        const coreBounds = coreOrb.getBoundingClientRect();
        const coreCenterX = coreBounds.left + coreBounds.width / 2;
        const coreCenterY = coreBounds.top + coreBounds.height / 2;

        const bounds = g.getBoundingClientRect();
        const gCenterX = bounds.left + bounds.width / 2;
        const gCenterY = bounds.top + bounds.height / 2;

        const dx = coreCenterX - gCenterX;
        const dy = coreCenterY - gCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 140) {
          isDragging = false;
          g.style.pointerEvents = 'none';
          g.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          g.style.transform = `translate(${shiftX + dx}px, ${shiftY + dy}px) scale(0)`;
          g.style.opacity = '0';
          
          triggerCoreIngestion();
        }
      };

      const dragEnd = () => {
        if (!isDragging) return;
        isDragging = false;
        g.style.cursor = 'grab';
        g.style.transition = 'transform 0.5s ease';
        g.style.transform = 'translate(0px, 0px)';
        shiftX = 0;
        shiftY = 0;
      };

      g.addEventListener('mousedown', dragStart);
      window.addEventListener('mousemove', dragMove);
      window.addEventListener('mouseup', dragEnd);

      g.addEventListener('touchstart', dragStart, { passive: true });
      window.addEventListener('touchmove', dragMove);
      window.addEventListener('touchend', dragEnd);
    });
  }

  initializeGarmentDragging();

  function triggerCoreIngestion() {
    coreOrb.classList.add('active');
    statusText.textContent = 'Understanding...';

    // Smooth scroll down to Specialists section after pause
    setTimeout(() => {
      document.getElementById('sec-specialists').scrollIntoView({ behavior: 'smooth' });
      runSpecialistSlides();
    }, 1500);
  }


  // ===================================================
  // 4. SPECIALISTS SLIDER CONTROLLER
  // ===================================================
  const slides = document.querySelectorAll('.specialist-slide');

  function runSpecialistSlides() {
    let currentSlide = 0;

    const showNextSlide = () => {
      slides.forEach(s => s.classList.remove('active'));
      
      if (currentSlide < slides.length) {
        slides[currentSlide].classList.add('active');
        currentSlide++;
        setTimeout(showNextSlide, 3500);
      } else {
        // Smooth scroll to Decision Pipeline
        document.getElementById('sec-pipeline').scrollIntoView({ behavior: 'smooth' });
      }
    };

    setTimeout(showNextSlide, 300);
  }


  // ===================================================
  // 5. DECISION PIPELINE & COUNTER
  // ===================================================
  const pipeNodes = document.querySelectorAll('.pipe-node');
  const countStepText = document.getElementById('counter-step-text');
  const countNumVal = document.getElementById('counter-number-val');
  const finalPipelineHeader = document.getElementById('pipeline-final-headline');
  let pipelineTriggered = false;

  function triggerPipelineSection() {
    if (pipelineTriggered) return;
    pipelineTriggered = true;

    let activeIdx = 0;
    
    const countSequence = [
      { step: 'Understanding Colours...', number: 8 },
      { step: 'Matching Wardrobe...', number: 21 },
      { step: 'Styling Outfit...', number: 37 }
    ];

    const cycleNodes = () => {
      pipeNodes.forEach(n => n.classList.remove('active'));

      if (activeIdx < pipeNodes.length) {
        pipeNodes[activeIdx].classList.add('active');

        if (activeIdx < 2) {
          countStepText.textContent = countSequence[0].step;
          animateNumber(parseInt(countNumVal.textContent), countSequence[0].number, 400);
        } else if (activeIdx < 4) {
          countStepText.textContent = countSequence[1].step;
          animateNumber(parseInt(countNumVal.textContent), countSequence[1].number, 400);
        } else {
          countStepText.textContent = countSequence[2].step;
          animateNumber(parseInt(countNumVal.textContent), countSequence[2].number, 400);
        }

        activeIdx++;
        setTimeout(cycleNodes, 800);
      } else {
        setTimeout(() => {
          finalPipelineHeader.classList.add('visible');
        }, 600);
      }
    };

    setTimeout(cycleNodes, 500);
  }

  function animateNumber(start, end, duration) {
    if (start === end) return;
    const range = end - start;
    let current = start;
    const increment = end > start ? 1 : -1;
    const stepTime = Math.abs(Math.floor(duration / range));
    
    const timer = setInterval(() => {
      current += increment;
      countNumVal.textContent = current;
      if (current === end) {
        clearInterval(timer);
      }
    }, stepTime);
  }


  // ===================================================
  // 6. CONTINUOUS SCROLL OBSERVER FOR ALL SECTIONS
  // ===================================================
  const observerOptions = {
    threshold: 0.25,
    rootMargin: '0px 0px -50px 0px'
  };

  const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');

        if (entry.target.id === 'sec-pipeline') {
          triggerPipelineSection();
        }
        if (entry.target.id === 'sec-invisible') {
          triggerParticleCollision();
        }
        if (entry.target.id === 'sec-ending') {
          triggerBrandingEnding();
        }
      }
    });
  }, observerOptions);

  document.querySelectorAll('.story-section').forEach(sec => {
    sectionObserver.observe(sec);
  });


  // ===================================================
  // 7. INVISIBLE WORK COLLISION CANVAS ENGINE
  // ===================================================
  let collisionCanvas, colCtx;
  let collisionParticles = [];
  let isColliding = false;
  let collisionFrameId;

  function initializeCollisionCanvas() {
    collisionCanvas = document.getElementById('collision-canvas');
    if (!collisionCanvas) return;
    colCtx = collisionCanvas.getContext('2d');
    collisionCanvas.width = collisionCanvas.parentElement.clientWidth;
    collisionCanvas.height = 360;

    class ColParticle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * collisionCanvas.width;
        this.y = Math.random() * collisionCanvas.height;
        this.targetX = collisionCanvas.width / 2;
        this.targetY = collisionCanvas.height / 2;
        this.vx = Math.random() * 2 - 1;
        this.vy = Math.random() * 2 - 1;
        this.size = Math.random() * 2.5 + 1;
        this.color = Math.random() > 0.5 ? '#7C3AED' : '#3B82F6';
      }
      update() {
        if (isColliding) {
          const dx = this.targetX - this.x;
          const dy = this.targetY - this.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist > 5) {
            this.vx += (dx / dist) * 0.15;
            this.vy += (dy / dist) * 0.15;
          } else {
            this.vx = 0;
            this.vy = 0;
          }
        }
        this.x += this.vx;
        this.y += this.vy;

        if (!isColliding) {
          if (this.x < 0 || this.x > collisionCanvas.width) this.vx *= -1;
          if (this.y < 0 || this.y > collisionCanvas.height) this.vy *= -1;
        }
      }
      draw() {
        colCtx.fillStyle = this.color;
        colCtx.beginPath();
        colCtx.arc(this.x, this.y, this.size, 0, Math.PI*2);
        colCtx.fill();
      }
    }

    for (let i = 0; i < 150; i++) {
      collisionParticles.push(new ColParticle());
    }

    function animateCollision() {
      colCtx.clearRect(0, 0, collisionCanvas.width, collisionCanvas.height);
      collisionParticles.forEach(p => {
        p.update();
        p.draw();
      });
      collisionFrameId = requestAnimationFrame(animateCollision);
    }
    animateCollision();
  }

  initializeCollisionCanvas();

  function triggerParticleCollision() {
    if (isColliding) return;
    isColliding = true;
    setTimeout(() => {
      const mergedEl = document.getElementById('merged-outfit-silhouette');
      if (mergedEl) mergedEl.classList.add('merged');
      cancelAnimationFrame(collisionFrameId);
    }, 2000);
  }


  // ===================================================
  // 8. LOGO DOT MORPH & ENDING SEQUENCE
  // ===================================================
  const morphDot = document.getElementById('morphing-dot');
  const morphLogoWrap = document.getElementById('morph-logo-wrap');
  const finalCtaWrap = document.getElementById('final-cta-wrap');
  let endingTriggered = false;

  function triggerBrandingEnding() {
    if (endingTriggered) return;
    endingTriggered = true;

    morphDot.style.opacity = '1';
    
    setTimeout(() => {
      const textLines = document.querySelectorAll('.fade-line');
      textLines.forEach((line, idx) => {
        setTimeout(() => line.classList.add('visible'), idx * 800);
      });
    }, 500);

    setTimeout(() => {
      morphDot.style.transform = 'translate(-48px, 0px) scale(0.6)';
      morphDot.style.background = '#7C3AED';
    }, 4500);

    setTimeout(() => {
      morphDot.style.opacity = '0';
      morphLogoWrap.classList.add('active');
      morphLogoWrap.style.opacity = '1';
    }, 6000);

    setTimeout(() => {
      finalCtaWrap.classList.add('active');
    }, 7500);
  }

});
