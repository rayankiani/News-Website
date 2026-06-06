/* ============================================
   RAK NEWS — Interactions & Animations
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Lenis smooth scroll ----------
  let lenis;
  if (window.Lenis) {
    lenis = new Lenis({ duration: 1.15, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    if (window.gsap) {
      gsap.ticker.add(t => lenis.raf(t * 1000));
      gsap.ticker.lagSmoothing(0);
    }
  }

  // ---------- GSAP setup ----------
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    if (window.SplitText) gsap.registerPlugin(SplitText);
  }

  // ---------- Reading progress bar ----------
  const progress = document.querySelector('.progress-bar');
  if (progress) {
    const onScroll = () => {
      const h = document.documentElement;
      const total = h.scrollHeight - h.clientHeight;
      const pct = total > 0 ? (h.scrollTop || document.body.scrollTop) / total * 100 : 0;
      progress.style.width = pct + '%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---------- Back to top ----------
  const backTop = document.querySelector('.back-top');
  if (backTop) {
    window.addEventListener('scroll', () => {
      backTop.classList.toggle('visible', window.scrollY > 600);
    }, { passive: true });
    backTop.addEventListener('click', () => {
      if (lenis) lenis.scrollTo(0, { duration: 1.2 });
      else window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ---------- Hamburger ----------
  const hamb = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamb && navLinks) {
    hamb.addEventListener('click', () => navLinks.classList.toggle('mobile-open'));
  }

  // ---------- Live date in masthead ----------
  const dateEl = document.querySelector('[data-date]');
  if (dateEl) {
    const d = new Date();
    dateEl.textContent = d.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  }

  // ---------- Page load sequence (homepage) ----------
  if (window.gsap && document.body.dataset.page === 'home') {
    const tl = gsap.timeline();
    tl.from('.utility-bar', { y: -20, opacity: 0, duration: .5, ease: 'power2.out' })
      .from('.logo', { scale: .85, opacity: 0, duration: .7, ease: 'power3.out' }, 0.15)
      .from('.masthead-meta', { y: 10, opacity: 0, duration: .5 }, 0.3)
      .from('.nav-links a', { y: 20, opacity: 0, duration: .5, stagger: 0.06, ease: 'power2.out' }, 0.35)
      .from('.nav-right', { opacity: 0, duration: .4 }, 0.5)
      .from('.ticker', { x: -60, opacity: 0, duration: .6, ease: 'power2.out' }, 0.5)
      .from('.hero', { clipPath: 'inset(0 0 100% 0)', duration: 1.1, ease: 'power3.inOut' }, 0.65)
      .from('.hero-content > *', { y: 30, opacity: 0, duration: .7, stagger: 0.08 }, 1.2);
  }

  // ---------- Hero parallax ----------
  if (window.gsap && window.ScrollTrigger) {
    const heroImg = document.querySelector('.hero-image');
    if (heroImg) {
      gsap.to(heroImg, {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true }
      });
    }
  }

  // ---------- Section heading reveals (SplitText) ----------
  if (window.gsap && window.ScrollTrigger) {
    document.querySelectorAll('.section-heading, .cat-hero h1, .about-hero h1').forEach(el => {
      let split;
      if (window.SplitText) {
        try { split = new SplitText(el, { type: 'words' }); } catch(e) {}
      }
      if (split && split.words) {
        gsap.from(split.words, {
          y: 40, opacity: 0, duration: .7, stagger: 0.05, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' }
        });
      } else {
        gsap.from(el, { y: 30, opacity: 0, duration: .7, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 85%' } });
      }
    });
  }

  // ---------- Card reveal ----------
  if (window.gsap && window.ScrollTrigger) {
    ScrollTrigger.batch('.card, .opinion-card, .value-card, .team-card, .video-card', {
      start: 'top 88%',
      onEnter: batch => gsap.from(batch, {
        y: 30, opacity: 0, duration: .7, stagger: 0.08, ease: 'power2.out', overwrite: true
      })
    });
  }

  // ---------- Sidebar trending items ----------
  if (window.gsap && window.ScrollTrigger) {
    const trending = document.querySelectorAll('.trending-item');
    if (trending.length) {
      gsap.from(trending, {
        x: 40, opacity: 0, duration: .6, stagger: 0.06, ease: 'power2.out',
        scrollTrigger: { trigger: trending[0], start: 'top 90%' }
      });
    }
  }

  // ---------- Stats counter (about page) ----------
  if (window.gsap && window.ScrollTrigger) {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.dataset.count || el.textContent, 10);
      const suffix = el.dataset.suffix || '';
      el.textContent = '0' + suffix;
      ScrollTrigger.create({
        trigger: el, start: 'top 80%', once: true,
        onEnter: () => {
          const obj = { val: 0 };
          gsap.to(obj, {
            val: target, duration: 2, ease: 'power2.out',
            onUpdate: () => { el.textContent = Math.floor(obj.val).toLocaleString() + suffix; }
          });
        }
      });
    });
  }

  // ---------- FAQ accordion ----------
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    const a = item.querySelector('.faq-a');
    const inner = item.querySelector('.faq-a-inner');
    q.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      if (isOpen) {
        if (window.gsap) gsap.to(a, { height: 0, duration: .4, ease: 'power2.inOut', onComplete: () => item.classList.remove('open') });
        else { a.style.height = '0'; item.classList.remove('open'); }
      } else {
        item.classList.add('open');
        const h = inner.offsetHeight;
        if (window.gsap) gsap.fromTo(a, { height: 0 }, { height: h, duration: .45, ease: 'power2.inOut', onComplete: () => { a.style.height = 'auto'; } });
        else a.style.height = h + 'px';
      }
    });
  });

  // ---------- Share bar fade in (article) ----------
  const shareBar = document.querySelector('.share-bar');
  if (shareBar) {
    window.addEventListener('scroll', () => {
      shareBar.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });
  }

  // ---------- Share icons bounce hover ----------
  document.querySelectorAll('.share-icons .social, .socials .social').forEach(s => {
    s.addEventListener('mouseenter', () => {
      if (window.gsap) gsap.fromTo(s, { y: 0 }, { y: -4, yoyo: true, repeat: 1, duration: .25, ease: 'power2.out' });
    });
  });

  // ---------- Load more (category) ----------
  const loadMore = document.querySelector('.load-more');
  if (loadMore) {
    loadMore.addEventListener('click', () => {
      loadMore.classList.add('loading');
      setTimeout(() => {
        const grid = document.querySelector('.masonry');
        const newCards = buildExtraCards(6);
        newCards.forEach(c => grid.appendChild(c));
        loadMore.classList.remove('loading');
        if (window.gsap) {
          gsap.from(newCards, { y: 30, opacity: 0, duration: .6, stagger: 0.08, ease: 'power2.out' });
        }
      }, 700);
    });
  }

  // ---------- Pill / tab toggling ----------
  document.querySelectorAll('.subcat-tabs .pill').forEach(p => {
    p.addEventListener('click', () => {
      p.parentElement.querySelectorAll('.pill').forEach(x => x.classList.remove('active'));
      p.classList.add('active');
    });
  });

  // ---------- Forms (prevent default) ----------
  document.querySelectorAll('form').forEach(f => {
    f.addEventListener('submit', e => {
      e.preventDefault();
      const btn = f.querySelector('button[type="submit"], .btn');
      if (btn) {
        const orig = btn.innerHTML;
        btn.innerHTML = '<span>Thank you!</span>';
        setTimeout(() => { btn.innerHTML = orig; f.reset(); }, 2200);
      }
    });
  });

  // ---------- Newsletter button label ----------
});

// ---------- Helpers ----------
function buildExtraCards(n) {
  const cats = ['Politics', 'Business', 'Tech', 'Culture', 'Science', 'Sports'];
  const titles = [
    'Markets steady as policy talks reshape global trade outlook',
    'New climate accord pushes industries toward zero-emission targets',
    'Breakthrough study redefines understanding of deep ocean ecosystems',
    'Quiet revolution in design studios sparks fresh aesthetic movement',
    'Diplomatic visit underscores shifting alliances in the region',
    'Public health agencies coordinate response to emerging variant',
  ];
  const cards = [];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('article');
    c.className = 'card';
    const phNum = ((i + Math.floor(Math.random() * 9)) % 9) + 1;
    c.innerHTML = `
      <div class="card-image"><div class="ph ph-${phNum}"></div></div>
      <div class="card-body">
        <div class="card-label">${cats[i % cats.length]}</div>
        <h3 class="card-title">${titles[i % titles.length]}</h3>
        <p class="card-excerpt">Reporters in the field detail what changed in the past 24 hours and what to watch next.</p>
        <div class="card-meta">By RAK Desk <span>•</span> 5 min read</div>
      </div>`;
    cards.push(c);
  }
  return cards;
}
