(() => {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  /* ------------------------------------------------------------------------
     Anket İlerleme Ayarı (Güncel yanıt sayısını buradan değiştirebilirsiniz)
     ------------------------------------------------------------------------ */
  const SURVEY_STATUS = {
    current: 142,
    target: 350
  };

  /* ------------------------------------------------------------------------
     Odak Bölge Detay Verileri (Apple HIG Sheet içeriği)
     ------------------------------------------------------------------------ */
  const REGIONS = [
    {
      meta: 'Gediz Deltası Kalbi · Çiğli',
      title: 'Çiğli & Sasalı Kıyı Hattı',
      summary: 'İzmir Kuş Cenneti sulak alan ekosistemi ile yoğun sanayi ve arıtma bölgelerinin kesiştiği en kritik saha.',
      challenge: 'Endüstriyel deşarj baskısı, çamur birikimi ve mevsimsel oksijen düşüşü hem sulak alan biyoçeşitliliğini hem de çevre mahallelerdeki yaşam kalitesini etkiliyor.',
      action: 'Kuş Cenneti ve kıyı ekosisteminin kırılganlığını görünür kılan görsel hikâyeler üretmek, sanayi ve yerel yönetim paydaşlarıyla şeffaf izleme diyaloğunu güçlendirmek.',
      tags: ['Gediz Deltası', 'Endüstriyel Atık', 'Sulak Alan', 'İzmir Kuş Cenneti']
    },
    {
      meta: 'Kentsel Koku Algısı · Karşıyaka',
      title: 'Karşıyaka Sahil Şeridi',
      summary: 'İzmirlilerin Körfez ile en yoğun fiziksel temas kurduğu, koku ve su berraklığı algısının merkezindeki kıyı bandı.',
      challenge: 'Özellikle sıcak dönemlerde artan koku sorunu ve renk değişimi, kent sakinlerinin denizle kurduğu gündelik ilişkiyi ve çözüm sürecine olan güveni zedeliyor.',
      action: 'Çevrimiçi anket verileriyle koku algısını haritalamak, kentlilerin gözlemlerini sosyal medya kampanyası ve kent konseyi raporlarıyla ortak gündeme taşımak.',
      tags: ['Koku Algısı', 'Kent Yaşamı', 'Anket Odağı', 'Kıyı Hafızası']
    },
    {
      meta: 'Nehir & Tarım Havzası · Menemen',
      title: 'Menemen & Gediz Düzlüğü',
      summary: 'Gediz Nehri’nin iç kesimlerden taşıdığı sanayi ve tarım kaynaklı yüklerin deltaya ulaşmadan önceki ana geçiş hattı.',
      challenge: 'Havza boyunca biriken endüstriyel atık sular ve kontrolsüz deşarjlar, kirliliğin kaynağında önlenemediği durumlarda doğrudan Körfez’e taşınıyor.',
      action: 'Körfez sorununun yalnızca kıyıdan değil havza bütünlüğünden kaynaklandığını anlatan bilgilendirici içerikler ve İZTO/EBSO ekseninde temiz üretim farkındalığı oluşturmak.',
      tags: ['Gediz Havzası', 'Kaynakta Önleme', 'İZTO & EBSO', 'Temiz Üretim']
    },
    {
      meta: 'Dış Körfez Sınırı · Foça',
      title: 'Foça & Kuzey Kıyı Ekosistemi',
      summary: 'Gediz Deltası’nın açık denizle buluştuğu, hassas kıyı habitatları ve deniz canlılığı açısından stratejik koruma hattı.',
      challenge: 'İç ve orta körfezden taşınan kirlilik baskısının dış kıyı ekosistemlerine yayılma riski, uzun vadede denizel biyoçeşitlilik ve kıyı ekonomisi için tehdit oluşturuyor.',
      action: 'Koruma bilincini artıran pozitif çevre iletişimi kurmak ve bölgenin temiz kalabilmesi için bütüncül Körfez iyileştirme çağrısını büyütmek.',
      tags: ['Biyoçeşitlilik', 'Dış Körfez', 'Kıyı Koruma', 'Sürdürülebilirlik']
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

  const savedTheme = localStorage.getItem('backtoblue-theme');
  applyTheme(savedTheme || (systemDark.matches ? 'dark' : 'light'));

  themeToggle?.addEventListener('click', () => {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    localStorage.setItem('backtoblue-theme', next);
  });

  systemDark.addEventListener('change', (event) => {
    if (!localStorage.getItem('backtoblue-theme')) {
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
     3. Segmented Control Bölge Filtreleme
     ------------------------------------------------------------------------ */
  const segments = document.querySelectorAll('.segment');
  const regionCards = document.querySelectorAll('.region-card');

  segments.forEach((button) => {
    button.addEventListener('click', () => {
      const filter = button.dataset.filter;

      segments.forEach((seg) => {
        const active = seg === button;
        seg.classList.toggle('is-active', active);
        seg.setAttribute('aria-selected', String(active));
      });

      regionCards.forEach((card) => {
        const matches = filter === 'all' || card.dataset.region === filter;
        card.classList.toggle('is-hidden', !matches);
      });
    });
  });

  /* ------------------------------------------------------------------------
     4. Apple HIG Sheet (Bölge Detay Penceresi)
     ------------------------------------------------------------------------ */
  const sheet = document.getElementById('regionSheet');
  const sheetClose = document.getElementById('sheetClose');
  const sheetMeta = document.getElementById('sheetMeta');
  const sheetTitle = document.getElementById('sheetTitle');
  const sheetSummary = document.getElementById('sheetSummary');
  const sheetChallenge = document.getElementById('sheetChallenge');
  const sheetAction = document.getElementById('sheetAction');
  const sheetTags = document.getElementById('sheetTags');
  const sheetSurveyBtn = document.getElementById('sheetSurveyBtn');

  let lastFocusedElement = null;

  function openSheet(regionIndex, triggerEl) {
    const data = REGIONS[Number(regionIndex)];
    if (!data || !sheet) return;

    lastFocusedElement = triggerEl || document.activeElement;
    sheetMeta.textContent = data.meta;
    sheetTitle.textContent = data.title;
    sheetSummary.textContent = data.summary;
    sheetChallenge.textContent = data.challenge;
    sheetAction.textContent = data.action;

    sheetTags.innerHTML = '';
    data.tags.forEach((tag) => {
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

  document.querySelectorAll('.region-trigger').forEach((btn) => {
    btn.addEventListener('click', (event) => {
      event.stopPropagation();
      openSheet(btn.dataset.regionId, btn);
    });
  });

  sheetClose?.addEventListener('click', closeSheet);
  sheetSurveyBtn?.addEventListener('click', closeSheet);

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
     5. Anket İlerleme Çubuğu
     ------------------------------------------------------------------------ */
  const surveyCountLabel = document.getElementById('surveyCountLabel');
  const surveyProgressBar = document.getElementById('surveyProgressBar');
  const surveyProgressFill = document.getElementById('surveyProgressFill');

  const safeCurrent = Math.min(SURVEY_STATUS.current, SURVEY_STATUS.target);
  const percent = Math.round((safeCurrent / SURVEY_STATUS.target) * 100);

  if (surveyCountLabel) {
    surveyCountLabel.textContent = `${SURVEY_STATUS.current} / ${SURVEY_STATUS.target} katılımcı (%${percent})`;
  }
  if (surveyProgressBar) {
    surveyProgressBar.setAttribute('aria-valuemax', String(SURVEY_STATUS.target));
    surveyProgressBar.setAttribute('aria-valuenow', String(SURVEY_STATUS.current));
  }
  if (surveyProgressFill) {
    requestAnimationFrame(() => {
      surveyProgressFill.style.width = `${percent}%`;
    });
  }

  /* ------------------------------------------------------------------------
     6. Kampanya Bağlantısı Kopyalama & Toast Bildirimi
     ------------------------------------------------------------------------ */
  const shareCampaignBtn = document.getElementById('shareCampaignBtn');
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

  shareCampaignBtn?.addEventListener('click', async () => {
    const shareUrl = window.location.href;
    try {
      await navigator.clipboard.writeText(shareUrl);
      showToast('Kampanya bağlantısı kopyalandı');
    } catch {
      showToast('Bağlantı kopyalanamadı');
    }
  });

  /* ------------------------------------------------------------------------
     7. Kaydırma Animasyonları & Dinamik Yıl
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