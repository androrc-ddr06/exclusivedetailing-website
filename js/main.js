// ---- Navbar scroll shadow ----
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
}, { passive: true });

// ---- Mobile nav toggle ----
const toggle  = document.querySelector('.navbar__toggle');
const mobileNav = document.querySelector('.navbar__mobile');
if (toggle && mobileNav) {
  toggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    const [s1, s2, s3] = toggle.querySelectorAll('span');
    if (open) {
      s1.style.transform = 'rotate(45deg) translate(5px,5px)';
      s2.style.opacity   = '0';
      s3.style.transform = 'rotate(-45deg) translate(5px,-5px)';
    } else {
      s1.style.transform = s2.style.opacity = s3.style.transform = '';
    }
  });
  mobileNav.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      toggle.querySelectorAll('span').forEach(s => {
        s.style.transform = s.style.opacity = '';
      });
    });
  });
}

// ---- Active nav link ----
const page = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.navbar__links a').forEach(a => {
  if (a.getAttribute('href') === page) a.classList.add('active');
});

// ---- Smooth scroll ----
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const target = document.querySelector(a.getAttribute('href'));
    if (target) {
      e.preventDefault();
      window.scrollTo({ top: target.getBoundingClientRect().top + scrollY - 80, behavior: 'smooth' });
    }
  });
});

// ---- Scroll reveal ----
const revealEls = document.querySelectorAll('.reveal');
if (revealEls.length) {
  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }});
  }, { threshold: 0.1 });
  revealEls.forEach(el => obs.observe(el));
}

// ---- Hero word cycling ----
const heroWords = document.querySelectorAll('#hero-words .hero-word');
if (heroWords.length) {
  let current = 0;
  setInterval(() => {
    heroWords[current].classList.remove('active');
    heroWords[current].classList.add('exit');
    const prev = current;
    current = (current + 1) % heroWords.length;
    heroWords[current].classList.add('active');
    setTimeout(() => heroWords[prev].classList.remove('exit'), 500);
  }, 2200);
}

// ---- Inquiry form (Formspree AJAX) ----
const form = document.getElementById('inquiry-form');
if (form) {
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      } else {
        btn.textContent = 'Submit Inquiry';
        btn.disabled = false;
        alert('Something went wrong. Please try again or call us directly.');
      }
    } catch {
      btn.textContent = 'Submit Inquiry';
      btn.disabled = false;
      alert('Something went wrong. Please try again or call us directly.');
    }
  });
}
