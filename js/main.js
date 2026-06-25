/* ─────────────────────────────────────────────
   NAVBAR — scroll state
───────────────────────────────────────────── */
(function () {
  const navbar = document.getElementById('navbar');

  function onScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();


/* ─────────────────────────────────────────────
   HAMBURGER / MOBILE MENU
───────────────────────────────────────────── */
(function () {
  const btn   = document.getElementById('hamburger');
  const menu  = document.getElementById('mobileMenu');
  const links = document.querySelectorAll('.mobile-link');

  function closeMenu() {
    menu.classList.remove('open');
    btn.setAttribute('aria-expanded', 'false');
  }

  btn.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('open');
    btn.setAttribute('aria-expanded', String(isOpen));
  });

  links.forEach(link => link.addEventListener('click', closeMenu));

  document.addEventListener('click', (e) => {
    if (!menu.contains(e.target) && !btn.contains(e.target)) {
      closeMenu();
    }
  });
})();


/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
(function () {
  const els = document.querySelectorAll('.reveal');

  if (!els.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  els.forEach((el) => observer.observe(el));
})();


/* ─────────────────────────────────────────────
   SMOOTH ACTIVE NAV LINK HIGHLIGHT
───────────────────────────────────────────── */
(function () {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  function setActive() {
    let current = '';
    sections.forEach((sec) => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) {
        current = sec.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.style.color = '';
      const href = link.getAttribute('href').replace('#', '');
      if (href === current) {
        link.style.color = 'var(--text-1)';
      }
    });
  }

  window.addEventListener('scroll', setActive, { passive: true });
  setActive();
})();


/* ─────────────────────────────────────────────
   TYPEWRITER EFFECT — hero title
───────────────────────────────────────────── */
(function () {
  const el = document.querySelector('.hero-sub');
  if (!el) return;

  const text = el.textContent;
  el.textContent = '';
  el.style.opacity = '1';

  let i = 0;
  const delay = 1200;
  const speed = 18;

  setTimeout(() => {
    const timer = setInterval(() => {
      if (i < text.length) {
        el.textContent += text.charAt(i);
        i++;
      } else {
        clearInterval(timer);
      }
    }, speed);
  }, delay);
})();


/* ─────────────────────────────────────────────
   STAGGERED SKILL ITEMS ON HOVER
───────────────────────────────────────────── */
(function () {
  const cats = document.querySelectorAll('.skill-category');

  cats.forEach((cat) => {
    const items = cat.querySelectorAll('.skill-list li');

    cat.addEventListener('mouseenter', () => {
      items.forEach((item, i) => {
        item.style.transitionDelay = `${i * 35}ms`;
        item.style.paddingLeft = '6px';
      });
    });

    cat.addEventListener('mouseleave', () => {
      items.forEach((item) => {
        item.style.transitionDelay = '0ms';
        item.style.paddingLeft = '';
      });
    });
  });
})();


/* ─────────────────────────────────────────────
   PROJECT CARD TILT (subtle 3D)
───────────────────────────────────────────── */
(function () {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach((card) => {
    card.addEventListener('mousemove', (e) => {
      const rect  = card.getBoundingClientRect();
      const cx    = rect.left + rect.width  / 2;
      const cy    = rect.top  + rect.height / 2;
      const dx    = (e.clientX - cx) / (rect.width  / 2);
      const dy    = (e.clientY - cy) / (rect.height / 2);
      const tiltX = dy * -4;
      const tiltY = dx *  4;

      card.style.transform = `translateY(-5px) perspective(600px) rotateX(${tiltX}deg) rotateY(${tiltY}deg)`;
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });
})();


/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
(function () {
  const form = document.getElementById('contactForm');
  const note = document.getElementById('formNote');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name    = form.name.value.trim();
    const email   = form.email.value.trim();
    const message = form.message.value.trim();

    // Basic validation
    if (!name || !email || !message) {
      showNote('Please fill in all required fields.', 'error');
      return;
    }

    if (!isValidEmail(email)) {
      showNote('Please enter a valid email address.', 'error');
      return;
    }

    // Build mailto link and open the user's email client
    const subject  = form.subject.value.trim() || 'Portfolio Contact';
    const body     = `Hi Mamoon,\n\n${message}\n\nBest regards,\n${name}\n${email}`;
    const mailto   = `mailto:mamoonali926568@gmail.com`
                   + `?subject=${encodeURIComponent(subject)}`
                   + `&body=${encodeURIComponent(body)}`;

    window.location.href = mailto;

    showNote('Opening your email client… 🚀', 'success');
    form.reset();
  });

  function isValidEmail(val) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val);
  }

  function showNote(msg, type) {
    note.textContent = msg;
    note.className   = 'form-note ' + type;

    clearTimeout(note._timer);
    note._timer = setTimeout(() => {
      note.textContent = '';
      note.className   = 'form-note';
    }, 5000);
  }
})();