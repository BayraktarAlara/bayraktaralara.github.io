(() => {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  /* ------------------------------------------------------------------------
     Proje Verileri (Kendi projelerinizle kolayca güncelleyebilirsiniz)
     ------------------------------------------------------------------------ */
  const PROJECTS = [
    {
      category: 'Arayüz Tasarımı · 2026',
      title: 'Focus — Odaklanma Uygulaması',
      summary: 'Dikkat dağınıklığını azaltan, uyarlanabilir tipografi ve sakin renk paletine sahip üretkenlik arayüzü.',
      details: 'Kullanıcı araştırmaları doğrultusunda gereksiz menüler kaldırıldı, tüm temel aksiyonlar tek el erişimine uygun alt araç çubuğunda toplandı. Dinamik yazı boyutu ve koyu mod desteği baştan sona HIG ölçütleriyle kurgulandı.',
      tags: ['UI Tasarımı', 'Tasarım Sistemi', 'Erişilebilirlik', 'Prototip'],
      url: 'https://github.com/'
    },
    {
      category: 'Web Geliştirme · 2026',
      title: 'Lumina Tasarım Sistemi',
      summary: 'Sıfır bağımlılıkla çalışan, WCAG AAA uyumlu bileşen kütüphanesi ve dokümantasyon sitesi.',
      details: 'CSS Custom Properties ve semantik HTML kullanılarak 24 yeniden kullanılabilir bileşen geliştirildi. Lighthouse performans ve erişilebilirlik testlerinde 99+ puan elde edildi.',
      tags: ['HTML5', 'CSS Variables', 'Vanilla JS', 'WCAG AAA'],
      url: 'https://github.com/'
    },
    {
      category: 'Marka Kimliği · 2025',
      title: 'Kıyı Dijital Yayın',
      summary: 'Kültür ve teknoloji odaklı bağımsız yayın için görsel dil, editoryal ızgara ve web deneyimi.',
      details: 'Uzun okuma deneyimini yormayan satır uzunlukları, net tipografik hiyerarşi ve sade görsel yerleşimlerle modern bir dergi estetiği oluşturuldu.',
      tags: ['Marka Kimliği', 'Tipografi', 'Editoryal Tasarım'],
      url: 'https://github.com/'
    },
    {
      category: 'Etkileşimli Web · 2025',
      title: 'Rota Hava & Rüzgar Haritası',
      summary: 'Gerçek zamanlı meteoroloji verilerini sade grafiklerle sunan hafif web uygulaması.',
      details: 'Karmaşık hava durumu tabloları yerine tek bakışta anlaşılabilen kartlar ve mikro animasyonlar tasarlandı. Mobil cihazlarda düşük veri tüketimi için önbellekleme eklendi.',
      tags: ['JavaScript', 'REST API', 'Veri Görselleştirme'],
      url: 'https://github.com/'
    }
  ];

  /* ------------------------------------------------------------------------
     1. Tema Yönetimi (Sistem Tercihi + Manuel Geçiş)
     ------------------------------------------------------------------------ */
  const themeToggle = document.getElementById('themeToggle');
  const systemDark = window.matchMedia('(prefers-color-scheme: dark)');

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(theme === 'dark'));
    }
  }

  const savedTheme = localStorage.getItem('portfolio-theme');
  applyTheme(savedTheme || (systemDark.matches ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('portfolio-theme', next);
  });

  systemDark.addEventListener('change', (event) => {
    if (!localStorage.getItem('portfolio-theme')) {
      applyTheme(event.matches ? 'dark' : 'light');
    }
  });

  /* ------------------------------------------------------------------------
     2. Mobil Menü
     ------------------------------------------------------------------------ */
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');

  menuToggle?.addEventListener('click', () => {
    const isOpen = !mobileNav.hidden;
    mobileNav.hidden = isOpen;
    menuToggle.setAttribute('aria-expanded', String(!isOpen));
  });

  mobileNav?.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mobileNav.hidden = true;
      menuToggle?.setAttribute('aria-expanded', 'false');
    });
  });

  /* ------------------------------------------------------------------------
     3. Segmented Control Proje Filtreleme
     ------------------------------------------------------------------------ */
  const segments = document.querySelectorAll('.segment');
  const projectCards = document.querySelectorAll('.project-card');

  segments.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      segments.forEach((seg) => {
        const active = seg === button;
        seg.classList.toggle('is-active', active);
        seg.setAttribute('aria-selected', String(active));
      });

      projectCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.category === filter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  /* ------------------------------------------------------------------------
     4. Apple HIG Sheet (Proje Detay Penceresi)
     ------------------------------------------------------------------------ */
  const sheet = document.getElementById('projectSheet');
  const sheetPanel = sheet?.querySelector('.sheet-panel');
  const sheetClose = document.getElementById('sheetClose');
  const sheetCategory = document.getElementById('sheetCategory');
  const sheetTitle = document.getElementById('sheetTitle');
  const sheetSummary = document.getElementById('sheetSummary');
  const sheetDetails = document.getElementById('sheetDetails');
  const sheetTags = document.getElementById('sheetTags');
  const sheetLink = document.getElementById('sheetLink');

  let lastFocusedElement = null;

  function openSheet(projectIndex, triggerEl) {
    const project = PROJECTS[Number(projectIndex)];
    if (!project || !sheet) return;

    lastFocusedElement = triggerEl || document.activeElement;
    sheetCategory.textContent = project.category;
    sheetTitle.textContent = project.title;
    sheetSummary.textContent = project.summary;
    sheetDetails.textContent = project.details;
    sheetLink.href = project.url;

    sheetTags.innerHTML = '';
    project.tags.forEach((tag) => {
      const li = document.createElement('li');
      li.textContent = tag;
      sheetTags.appendChild(li);
    });

    sheet.hidden = false;
    document.body.classList.add('sheet-open');
    sheetClose?.focus();
  }

  function closeSheet() {
    if (!sheet || sheet.hidden) return;
    sheet.hidden = true;
    document.body.classList.remove('sheet-open');
    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
      lastFocusedElement.focus();
    }
  }

  document.querySelectorAll('.project-trigger').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      openSheet(btn.dataset.projectId, btn);
    });
  });

  sheetClose?.addEventListener('click', closeSheet);

  sheet?.addEventListener('click', (event) => {
    if (event.target === sheet) {
      closeSheet();
    }
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && sheet && !sheet.hidden) {
      closeSheet();
    }
  });

  /* ------------------------------------------------------------------------
     5. E-posta Kopyalama & Toast Bildirimi
     ------------------------------------------------------------------------ */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const toast = document.getElementById('toast');
  let toastTimer = null;

  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.hidden = true;
    }, 2400);
  }

  copyEmailBtn?.addEventListener('click', async () => {
    const email = copyEmailBtn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      showToast('E-posta adresi kopyalandı');
    } catch {
      showToast(email);
    }
  });

  /* ------------------------------------------------------------------------
     6. Kaydırma Animasyonları (IntersectionObserver) & Dinamik Yıl
     ------------------------------------------------------------------------ */
  const revealElements = document.querySelectorAll('.reveal');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            obs.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -30px 0px' }
    );

    revealElements.forEach((el) => observer.observe(el));
  } else {
    revealElements.forEach((el) => el.classList.add('is-visible'));
  }

  const yearEl = document.getElementById('currentYear');
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
})();