/* =====================================================
   THE COLOURITY CORE — Interactive Script
   ===================================================== */

document.addEventListener('DOMContentLoaded', () => {

  // ===================================================
  // 1. BACKGROUND PARTICLES CANVAS
  // ===================================================
  const canvas = document.getElementById('particle-canvas');
  const ctx = canvas.getContext('2d');
  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const particles = [];
  const particleCount = 60;
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
      this.alpha = Math.random() * 0.5 + 0.1;
    }
    update() {
      this.y -= this.speedY;
      this.x += this.speedX;

      // Mouse influence
      if (mouse.active && mouse.x !== null) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          this.x += (dx / dist) * force * 1.5;
          this.y += (dy / dist) * force * 1.5;
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

  // Main canvas loop
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
  // 2. WARDROBE OPENING & SECTION TRANSITIONS
  // ===================================================
  const wardrobe = document.getElementById('main-wardrobe');
  const btnOpen = document.getElementById('btn-open-wardrobe');
  const secWardrobe = document.getElementById('sec-wardrobe');
  const secCore = document.getElementById('sec-core');

  btnOpen.addEventListener('click', () => {
    wardrobe.classList.add('open');
    btnOpen.disabled = true;

    // Transition to Core section after doors open
    setTimeout(() => {
      secWardrobe.classList.remove('active');
      secCore.classList.add('active');
      initializeGarmentDragging();
    }, 1800);
  });


  // ===================================================
  // 3. MAGNETIC GARMENT DRAGGING & CORE INGESTION
  // ===================================================
  const coreOrb = document.getElementById('colourity-core');
  const statusText = document.getElementById('core-status-text');
  const secSpecialists = document.getElementById('sec-specialists');

  function initializeGarmentDragging() {
    const garments = document.querySelectorAll('.draggable-garment');
    const coreBounds = coreOrb.getBoundingClientRect();
    const coreCenterX = coreBounds.left + coreBounds.width / 2;
    const coreCenterY = coreBounds.top + coreBounds.height / 2;

    garments.forEach(g => {
      let isDragging = false;
      let startX, startY;
      let shiftX = 0, shiftY = 0;

      // Start drag
      const dragStart = (e) => {
        isDragging = true;
        g.style.transition = 'none';
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        startX = clientX - shiftX;
        startY = clientY - shiftY;
        g.style.cursor = 'grabbing';
      };

      // Move drag
      const dragMove = (e) => {
        if (!isDragging) return;
        const clientX = e.type.startsWith('touch') ? e.touches[0].clientX : e.clientX;
        const clientY = e.type.startsWith('touch') ? e.touches[0].clientY : e.clientY;
        shiftX = clientX - startX;
        shiftY = clientY - startY;

        g.style.transform = `translate(${shiftX}px, ${shiftY}px)`;

        // Magnetic Attraction Check
        const bounds = g.getBoundingClientRect();
        const gCenterX = bounds.left + bounds.width / 2;
        const gCenterY = bounds.top + bounds.height / 2;

        const dx = coreCenterX - gCenterX;
        const dy = coreCenterY - gCenterY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          // Snap magnetically into Core
          isDragging = false;
          g.style.pointerEvents = 'none';
          g.style.transition = 'all 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
          g.style.transform = `translate(${shiftX + dx}px, ${shiftY + dy}px) scale(0)`;
          g.style.opacity = '0';
          
          triggerCoreIngestion();
        }
      };

      // End drag
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

  function triggerCoreIngestion() {
    coreOrb.classList.add('active');
    statusText.textContent = 'Understanding...';

    // 0.5s anticipating pause -> transition to Specialists
    setTimeout(() => {
      secCore.classList.remove('active');
      secSpecialists.classList.add('active');
      runSpecialistSlides();
    }, 1500);
  }


  // ===================================================
  // 4. SPECIALISTS TIMELINE CONTROLLER
  // ===================================================
  const slides = document.querySelectorAll('.specialist-slide');
  const secPipeline = document.getElementById('sec-pipeline');

  function runSpecialistSlides() {
    let currentSlide = 0;

    const showNextSlide = () => {
      slides.forEach(s => s.classList.remove('active'));
      
      if (currentSlide < slides.length) {
        slides[currentSlide].classList.add('active');
        currentSlide++;
        setTimeout(showNextSlide, 3500); // 3.5s per specialist
      } else {
        // Move to Pipeline after final specialist
        secSpecialists.classList.remove('active');
        secPipeline.classList.add('active');
        triggerPipelineSection();
      }
    };

    setTimeout(showNextSlide, 300);
  }


  // ===================================================
  // 5. THE PIPELINE & DECISION COUNTER
  // ===================================================
  const pipeNodes = document.querySelectorAll('.pipe-node');
  const countStepText = document.getElementById('counter-step-text');
  const countNumVal = document.getElementById('counter-number-val');
  const finalPipelineHeader = document.getElementById('pipeline-final-headline');

  function triggerPipelineSection() {
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

        // Dynamically adjust counter based on node indices
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
        // Show final layout
        setTimeout(() => {
          finalPipelineHeader.classList.add('visible');
          // Proceed automatically to final sections after 3s
          setTimeout(activateScrollSections, 2500);
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

  function activateScrollSections() {
    // Show remaining sections on scroll
    const secDifferent = document.getElementById('sec-different');
    const secMemory = document.getElementById('sec-memory');
    const secStory = document.getElementById('sec-story');
    const secTransformation = document.getElementById('sec-transformation');
    const secInvisible = document.getElementById('sec-invisible');
    const secPhilosophy = document.getElementById('sec-philosophy');
    const secEnding = document.getElementById('sec-ending');

    const scrollSections = [secDifferent, secMemory, secStory, secTransformation, secInvisible, secPhilosophy, secEnding];
    scrollSections.forEach(sec => {
      sec.style.display = 'flex';
    });

    // Scroll down smoothly to show comparative philosophy
    secDifferent.scrollIntoView({ behavior: 'smooth' });

    initializeCollisionCanvas();
    setupIntersectionObserver();
  }


  // ===================================================
  // 6. SCROLL DETECTORS & INTERSECTION OBSERVERS
  // ===================================================
  function setupIntersectionObserver() {
    const observerOptions = {
      threshold: 0.2,
      rootMargin: '0px 0px -50px 0px'
    };

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
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
  }


  // ===================================================
  // 7. INVISIBLE WORK COLLISION CANVAS ENGINE
  // ===================================================
  let collisionCanvas, colCtx;
  let collisionParticles = [];
  let isColliding = false;
  let collisionFrameId;

  function initializeCollisionCanvas() {
    collisionCanvas = document.getElementById('collision-canvas');
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
          // Gravity pull to center target
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
        
        // Bounce on wall bounds
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

    // Populate
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

  function triggerParticleCollision() {
    isColliding = true;
    setTimeout(() => {
      // Fade in the merged silhouette outline
      document.getElementById('merged-outfit-silhouette').classList.add('merged');
      cancelAnimationFrame(collisionFrameId);
    }, 2000);
  }


  // ===================================================
  // 8. LOGO DOT MORPH & ENDING SEQUENCE
  // ===================================================
  const morphDot = document.getElementById('morphing-dot');
  const morphLogoWrap = document.getElementById('morph-logo-wrap');
  const finalCtaWrap = document.getElementById('final-cta-wrap');

  function triggerBrandingEnding() {
    // 1. Reveal Core Dot
    morphDot.style.opacity = '1';
    
    // 2. Shrink dot and fade lines
    setTimeout(() => {
      const textLines = document.querySelectorAll('.fade-line');
      textLines.forEach((line, idx) => {
        setTimeout(() => line.classList.add('visible'), idx * 800);
      });
    }, 500);

    // 3. Morph dot -> logo start position
    setTimeout(() => {
      morphDot.style.transform = 'translate(-48px, 0px) scale(0.6)';
      morphDot.style.background = '#7C3AED';
    }, 4500);

    // 4. Reveal & draw logo paths
    setTimeout(() => {
      morphDot.style.opacity = '0';
      morphLogoWrap.classList.add('active');
      morphLogoWrap.style.opacity = '1';
    }, 6000);

    // 5. Fade in the call-to-action button
    setTimeout(() => {
      finalCtaWrap.classList.add('active');
    }, 7500);
  }

});
