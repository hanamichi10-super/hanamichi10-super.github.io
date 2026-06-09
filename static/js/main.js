// ── PAGE LOADER ───────────────────────────────────────
window.addEventListener('load', () => {
  setTimeout(() => {
    document.getElementById('loader').classList.add('hidden');
  }, 1500);
});

// ── CUSTOM CURSOR ─────────────────────────────────────
const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
if (!isTouchDevice) {
  const dot  = document.querySelector('.cursor-dot');
  const ring = document.querySelector('.cursor-ring');
  let mouseX = 0, mouseY = 0;
  let ringX  = 0, ringY  = 0;

  document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.left = mouseX + 'px';
    dot.style.top  = mouseY + 'px';
  });

  (function animateRing() {
    ringX += (mouseX - ringX) * 0.14;
    ringY += (mouseY - ringY) * 0.14;
    ring.style.left = ringX + 'px';
    ring.style.top  = ringY + 'px';
    requestAnimationFrame(animateRing);
  })();

  const hoverEls = document.querySelectorAll(
    'a, button, .skill, .card, .contact-card, .highlight-item, .stat'
  );
  hoverEls.forEach(el => {
    el.addEventListener('mouseenter', () => {
      dot.classList.add('hovered');
      ring.classList.add('hovered');
    });
    el.addEventListener('mouseleave', () => {
      dot.classList.remove('hovered');
      ring.classList.remove('hovered');
    });
  });
}

// ── HERO CURSOR-TRACKING GLOW ─────────────────────────
const heroSection = document.getElementById('hero');
const heroGlow    = document.querySelector('.hero-glow');

heroSection.addEventListener('mousemove', (e) => {
  const rect = heroSection.getBoundingClientRect();
  heroGlow.style.left = (e.clientX - rect.left) + 'px';
  heroGlow.style.top  = (e.clientY - rect.top)  + 'px';
});

// ── SCROLL PROGRESS BAR ───────────────────────────────
function updateProgress() {
  const scrollTop  = window.scrollY;
  const docHeight  = document.body.scrollHeight - window.innerHeight;
  const progress   = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
  document.getElementById('progress-bar').style.width = progress + '%';
}

// ── TYPING ANIMATION ──────────────────────────────────
const roles = [
  "Full Stack Developer",
  "AI & Computer Vision Engineer",
  "Android App Developer",
  "Machine Learning Enthusiast",
];

let roleIndex = 0, charIndex = 0, isDeleting = false;
const typedEl = document.getElementById('typed-text');

function type() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = current.substring(0, charIndex + 1);
    charIndex++;
  }
  let delay = isDeleting ? 55 : 95;
  if (!isDeleting && charIndex === current.length) {
    delay = 1800;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    delay = 400;
  }
  setTimeout(type, delay);
}
type();

// ── SCROLL-IN FADE ────────────────────────────────────
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);
document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// ── 3D CARD TILT ──────────────────────────────────────
document.querySelectorAll('.card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const rect   = card.getBoundingClientRect();
    const x      = e.clientX - rect.left;
    const y      = e.clientY - rect.top;
    const cx     = rect.width  / 2;
    const cy     = rect.height / 2;
    const rotX   = ((y - cy) / cy) * -5;
    const rotY   = ((x - cx) / cx) *  5;
    card.style.transition = 'box-shadow 0.25s';
    card.style.transform  = `translateY(-6px) perspective(700px) rotateX(${rotX}deg) rotateY(${rotY}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transition = 'transform 0.5s ease, box-shadow 0.25s';
    card.style.transform  = '';
  });
});

// ── SCROLL EVENTS ─────────────────────────────────────
const sections  = document.querySelectorAll('section[id]');
const navLinks  = document.querySelectorAll('nav ul a:not(.nav-github)');
const scrollBtn = document.getElementById('scroll-top');

window.addEventListener('scroll', () => {
  updateProgress();

  // active nav highlight
  let current = '';
  sections.forEach((section) => {
    if (window.scrollY >= section.offsetTop - 110) {
      current = section.getAttribute('id');
    }
  });
  navLinks.forEach((link) => {
    link.style.color = link.getAttribute('href') === `#${current}` ? '#4f46e5' : '';
  });

  // scroll-to-top button
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});

// ── SCROLL TO TOP ─────────────────────────────────────
scrollBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
