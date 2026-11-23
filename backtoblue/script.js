(() => {
  'use strict';

  document.documentElement.classList.add('js-enabled');

  /* ========================================================================
     MERKEZİ KAMPANYA VERİLERİ (İçeriği ve sayıları buradan güncelleyin)
     ======================================================================== */
  const CAMPAIGN_DATA = {
    links: {
      surveyUrl: 'https://forms.google.com/', // Google Forms anket linkinizi buraya ekleyin
      instagramUrl: 'https://instagram.com/',
      linkedinUrl: 'https://linkedin.com/',
      email: 'backtoblue.izmir@example.com'
    },

    survey: {
      current: 168,
      target: 350
    },

    districts: {
      cigli: {
        coords: '38.49° K · 26.95° D',
        tag: 'Gediz Deltası Kalbi · Çiğli',
        title: 'Çiğli & Sasalı Kıyı Hattı',
        summary: 'İzmir Kuş Cenneti’nin eşsiz sulak alan ekosistemi ile yoğun sanayi ve arıtma altyapısının yan yana geldiği en hassas geçiş noktası.',
        pressure: 'Endüstriyel atık yükü, çamur birikimi ve mevsimsel oksijen düşüşü hem sulak alan biyoçeşitliliğini hem de çevre mahallelerdeki yaşam kalitesini zorluyor.',
        approach: 'Sulak alan ekosisteminin kırılganlığını bilimsel verilerle görünür kılmak ve sanayi-belediye-sivil toplum arasında şeffaf izleme diyaloğunu desteklemek.',
        pills: ['Gediz Deltası', 'İzmir Kuş Cenneti', 'Endüstriyel Atık', 'Sulak Alan']
      },
      karsiyaka: {
        coords: '38.46° K · 27.11° D',
        tag: 'Kentsel Koku Algısı · Karşıyaka',
        title: 'Karşıyaka Sahil Şeridi',
        summary: 'İzmirlilerin Körfez ile en yoğun günlük temas kurduğu, özellikle sıcak dönemlerde koku ve su rengi değişimlerinin doğrudan hissedildiği kıyı bandı.',
        pressure: 'Mevsimsel koku algısı ve su berraklığındaki dalgalanmalar kent sakinlerinin denizle kurduğu bağı ve çözüm süreçlerine olan güveni zedeliyor.',
        approach: '350 katılımcılı çevrimiçi algı anketiyle kentlilerin koku ve kirlilik deneyimini ölçüp somut raporlara ve farkındalık içeriklerine dönüştürmek.',
        pills: ['Koku Algısı', 'Kent Yaşamı', 'Anket Odağı', 'Sahil Bandı']
      },
      menemen: {
        coords: '38.60° K · 27.07° D',
        tag: 'Havza Girişi · Menemen',
        title: 'Menemen & Gediz Düzlüğü',
        summary: 'Gediz Nehri’nin iç kesimlerden taşıdığı sanayi ve tarım kaynaklı kirlilik yükünün deltaya ulaşmadan önceki kritik izleme eşiği.',
        pressure: 'Üst havzadan taşınan kontrolsüz deşarjlar kaynakta önlenemediğinde doğrudan delta ve Körfez ekosistemine ek yük bindiriyor.',
        approach: 'Sorunun yalnızca kıyıdan değil tüm Gediz Havzası’ndan başladığını anlatan veri hikâyeleri üretmek ve temiz üretim odaklı kurumsal diyalogu büyütmek.',
        pills: ['Gediz Havzası', 'Kaynakta Önleme', 'İZTO & EBSO']
      },
      foca: {
        coords: '38.67° K · 26.75° D',
        tag: 'Dış Körfez Koruma Sınırı · Foça',
        title: 'Foça & Kuzey Kıyı Ekosistemi',
        summary: 'Gediz Deltası’nın açık denizle buluştuğu, hassas deniz çayırları ve kıyı canlılığı açısından yüksek koruma değerine sahip geçiş hattı.',
        pressure: 'İç ve orta körfez kaynaklı kirlilik baskısının dış kıyılara taşınma riski, uzun vadede denizel biyoçeşitlilik için tehdit oluşturuyor.',
        approach: 'Körfez’in korunabilir mavi mirasını vurgulayan yapıcı çevre iletişimi kurmak ve bütüncül iyileştirme çağrısını genişletmek.',
        pills: ['Dış Körfez', 'Biyoçeşitlilik', 'Kıyı Koruma']
      }
    },

    pillars: [
      {
        num: '01 / FARKINDALIK',
        title: 'Sosyal Medya Kampanyası',
        desc: 'Bilimsel verileri ve uzman görüşlerini kısa video serileri ve akılda kalıcı görsel hikâyelerle kent sakinlerine ve gençlere ulaştırıyoruz.'
      },
      {
        num: '02 / ARAŞTIRMA',
        title: '350 Katılımcılı Algı Anketi',
        desc: 'Google Forms üzerinden yürüttüğümüz anketle İzmir Körfezi’ndeki endüstriyel kirlilik ve koku algısına dair güncel, ölçülebilir veriler topluyoruz.'
      },
      {
        num: '03 / DİJİTAL PLATFORM',
        title: 'Etkileşimli Web Deneyimi',
        desc: 'Çiğli, Karşıyaka, Menemen ve Foça eksenindeki çevresel verileri herkesin kolayca keşfedebileceği şeffaf bir dijital merkezde birleştiriyoruz.'
      },
      {
        num: '04 / SAVUNUCULUK',
        title: 'Araştırma Raporu & Paydaş Diyaloğu',
        desc: 'Anket bulgularını ve uzman önerilerini kapsayan raporu İzmir Kent Konseyi, İZTO, EBSO ve yerel belediyelerle paylaşarak yapıcı adımları destekliyoruz.'
      }
    ],

    stakeholders: [
      {
        role: 'Proje Ortağı',
        name: 'İzmir Kent Konseyi',
        desc: 'Sivil toplum katılımı, kent gündemi oluşturma ve yerel iletişim ağı desteği.',
        featured: true
      },
      {
        role: 'Sanayi & Ticaret',
        name: 'İZTO & EBSO',
        desc: 'Endüstriyel atık yönetiminde şeffaflık, temiz üretim ve kurumsal diyalog.',
        featured: false
      },
      {
        role: 'Yerel Yönetimler',
        name: '4 İlçe Belediyesi',
        desc: 'Çiğli, Karşıyaka, Menemen ve Foça kıyı hattında kentsel farkındalık eşgüdümü.',
        featured: false
      },
      {
        role: 'Akademik Çerçeve',
        name: 'Yaşar Üniversitesi',
        desc: 'Yeni Medya ve İletişim Bölümü son sınıf bitirme projesi kapsamında geliştirildi.',
        featured: false
      }
    ]
  };

  /* ========================================================================
     1. Fizik Tabanlı Etkileşimli Dalga, Su Halkası ve Baloncuk Canvas'ı
     ======================================================================== */
  function initOceanCanvas() {
    const canvas = document.getElementById('oceanCanvas');
    const hero = document.getElementById('top');
    if (!canvas || !hero) return;

    const ctx = canvas.getContext('2d');
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let dpr = 1;
    let time = 0;

    // 1D Yay-Kütle Su Yüzeyi Kolonları
    const SPRING_COUNT = 72;
    const springs = Array.from({ length: SPRING_COUNT }, () => ({ y: 0, v: 0 }));
    const ripples = [];
    const bubbles = Array.from({ length: 28 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: 1.2 + Math.random() * 2.8,
      speed: 0.0004 + Math.random() * 0.0009,
      drift: Math.random() * Math.PI * 2
    }));

    function resize() {
      const rect = hero.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }

    function splash(clientX, strength = 14) {
      const rect = hero.getBoundingClientRect();
      const relX = (clientX - rect.left) / Math.max(width, 1);
      const index = Math.floor(relX * (SPRING_COUNT - 1));
      if (index >= 0 && index < SPRING_COUNT) {
        springs[index].v = Math.max(-28, Math.min(28, springs[index].v + strength));
      }
    }

    function addRipple(clientX, clientY, strong = false) {
      const rect = hero.getBoundingClientRect();
      ripples.push({
        x: clientX - rect.left,
        y: clientY - rect.top,
        r: strong ? 10 : 4,
        maxR: strong ? 140 : 72,
        alpha: strong ? 0.55 : 0.28
      });
      if (ripples.length > 24) ripples.shift();
    }

    let lastMoveTime = 0;
    hero.addEventListener('pointermove', (e) => {
      if (prefersReduced) return;
      const now = performance.now();
      if (now - lastMoveTime > 45) {
        splash(e.clientX, 6.5);
        addRipple(e.clientX, e.clientY, false);
        lastMoveTime = now;
      }
    });

    hero.addEventListener('pointerdown', (e) => {
      if (prefersReduced) return;
      splash(e.clientX, 20);
      addRipple(e.clientX, e.clientY, true);
    });

    function updateSprings() {
      const tension = 0.024;
      const dampening = 0.036;
      const spread = 0.2;

      for (let i = 0; i < SPRING_COUNT; i++) {
        const s = springs[i];
        const accel = -tension * s.y - dampening * s.v;
        s.v += accel;
        s.y += s.v;
      }

      const leftDeltas = new Array(SPRING_COUNT).fill(0);
      const rightDeltas = new Array(SPRING_COUNT).fill(0);

      for (let pass = 0; pass < 3; pass++) {
        for (let i = 0; i < SPRING_COUNT; i++) {
          if (i > 0) {
            leftDeltas[i] = spread * (springs[i].y - springs[i - 1].y);
            springs[i - 1].v += leftDeltas[i];
          }
          if (i < SPRING_COUNT - 1) {
            rightDeltas[i] = spread * (springs[i].y - springs[i + 1].y);
            springs[i + 1].v += rightDeltas[i];
          }
        }
      }
    }

    function drawAmbientWave(baseY, amp, freq, speed, fillStyle, strokeStyle) {
      ctx.beginPath();
      ctx.moveTo(0, height);
      for (let x = 0; x <= width; x += 24) {
        const y = baseY + Math.sin(x * freq + time * speed) * amp + Math.cos(x * freq * 0.5 - time * speed * 0.7) * (amp * 0.45);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(width, height);
      ctx.closePath();
      ctx.fillStyle = fillStyle;
      ctx.fill();

      if (strokeStyle) {
        ctx.strokeStyle = strokeStyle;
        ctx.lineWidth = 1.2;
        ctx.stroke();
      }
    }

    function drawInteractiveWave(baseY) {
      const step = width / (SPRING_COUNT - 1);
      ctx.beginPath();
      ctx.moveTo(0, height);

      for (let i = 0; i < SPRING_COUNT; i++) {
        const x = i * step;
        const ambient = Math.sin(i * 0.24 + time * 1.45) * 9;
        const y = baseY + ambient + springs[i].y;
        if (i === 0) {
          ctx.lineTo(x, y);
        } else {
          const prevX = (i - 1) * step;
          const prevAmbient = Math.sin((i - 1) * 0.24 + time * 1.45) * 9;
          const prevY = baseY + prevAmbient + springs[i - 1].y;
          const cpX = (prevX + x) * 0.5;
          ctx.quadraticCurveTo(prevX, prevY, cpX, (prevY + y) * 0.5);
        }
      }

      ctx.lineTo(width, height);
      ctx.closePath();

      const grad = ctx.createLinearGradient(0, baseY - 40, 0, height);
      grad.addColorStop(0, 'rgba(0, 212, 255, 0.24)');
      grad.addColorStop(0.55, 'rgba(0, 119, 255, 0.20)');
      grad.addColorStop(1, 'rgba(3, 11, 23, 0.72)');
      ctx.fillStyle = grad;
      ctx.fill();

      ctx.strokeStyle = 'rgba(125, 211, 252, 0.55)';
      ctx.lineWidth = 1.6;
      ctx.stroke();
    }

    function drawFrame() {
      ctx.clearRect(0, 0, width, height);

      // Arka Katman Dalgaları
      drawAmbientWave(height * 0.72, 16, 0.0045, 0.85, 'rgba(0, 119, 255, 0.14)', null);
      drawAmbientWave(height * 0.78, 12, 0.006, 1.15, 'rgba(0, 180, 255, 0.16)', 'rgba(0, 212, 255, 0.2)');

      // Etkileşimli Ön Su Yüzeyi
      updateSprings();
      drawInteractiveWave(height * 0.83);

      // Yükselen Baloncuklar
      bubbles.forEach((b) => {
        b.y -= b.speed;
        if (b.y < -0.05) {
          b.y = 1.05;
          b.x = Math.random();
        }
        const bx = b.x * width + Math.sin(time * 1.2 + b.drift) * 14;
        const by = b.y * height;
        ctx.beginPath();
        ctx.arc(bx, by, b.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(186, 230, 253, 0.28)';
        ctx.fill();
      });

      // Tıklama ve İmleç Su Halkaları
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 2.1;
        rp.alpha *= 0.96;
        if (rp.alpha < 0.015 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
          continue;
        }
        ctx.beginPath();
        ctx.ellipse(rp.x, rp.y, rp.r, rp.r * 0.55, 0, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(125, 211, 252, ${rp.alpha.toFixed(3)})`;
        ctx.lineWidth = 1.4;
        ctx.stroke();
      }

      if (!prefersReduced) {
        time += 0.018;
        requestAnimationFrame(drawFrame);
      }
    }

    resize();
    window.addEventListener('resize', resize);
    drawFrame();
  }

  /* ========================================================================
     2. Etkileşimli "Maviye Dönüş" Su Berraklığı Kaydırıcısı
     ======================================================================== */
  function initClarityExperience() {
    const slider = document.getElementById('claritySlider');
    const clearLayer = document.getElementById('waterClearLayer');
    const particles = document.getElementById('waterParticles');
    const badge = document.getElementById('clarityBadge');
    const headline = document.getElementById('clarityHeadline');
    const copy = document.getElementById('clarityCopy');
    const metricClarity = document.getElementById('metricClarity');
    const metricOdor = document.getElementById('metricOdor');
    const metricEco = document.getElementById('metricEco');

    if (!slider) return;

    function updateClarity(val) {
      const v = Number(val);
      const ratio = v / 100;

      if (clearLayer) clearLayer.style.opacity = String(ratio);
      if (particles) particles.style.opacity = String(Math.max(0.06, 0.82 - ratio * 0.76));

      const clarityPct = Math.round(18 + ratio * 74);
      if (metricClarity) metricClarity.textContent = `%${clarityPct}`;

      if (v < 35) {
        badge.textContent = 'Endüstriyel Baskı';
        headline.textContent = 'Atık Yükü ve Yüksek Koku Algısı';
        copy.textContent = 'Gediz Havzası’ndan taşınan sanayi atıkları ve arıtma eksiklikleri su berraklığını düşürürken kıyı hattında koku algısını artırıyor.';
        metricOdor.textContent = 'Yüksek';
        metricEco.textContent = 'Risk Altında';
      } else if (v < 75) {
        badge.textContent = 'Dönüşüm Süreci';
        headline.textContent = 'Veri Şeffaflığı ve Ortak Eylem';
        copy.textContent = 'Anket bulguları, İzmir Kent Konseyi iş birliği ve sanayi odalarıyla kurulan yapıcı diyalog ölçülebilir iyileştirme adımlarını hızlandırıyor.';
        metricOdor.textContent = 'Azalıyor';
        metricEco.textContent = 'Toparlanıyor';
      } else {
        badge.textContent = 'Back to Blue Hedefi';
        headline.textContent = 'Nefes Alan Delta, Temiz Körfez';
        copy.textContent = 'Kaynakta önlenen endüstriyel kirlilik ve sürekli izleme sayesinde Gediz Deltası’nın biyoçeşitliliği korunur, kentli yeniden maviyle buluşur.';
        metricOdor.textContent = 'Düşük';
        metricEco.textContent = 'Dengeli';
      }
    }

    slider.addEventListener('input', (e) => updateClarity(e.target.value));
    updateClarity(slider.value);
  }

  /* ========================================================================
     3. Etkileşimli İzmir Körfezi Haritası & 4 İlçe Paneli
     ======================================================================== */
  function initDistrictExplorer() {
    const tabs = document.querySelectorAll('.district-tab');
    const nodes = document.querySelectorAll('.map-node');
    const coordsEl = document.getElementById('mapCoords');
    const tagEl = document.getElementById('districtTag');
    const titleEl = document.getElementById('districtTitle');
    const summaryEl = document.getElementById('districtSummary');
    const pressureEl = document.getElementById('districtPressure');
    const approachEl = document.getElementById('districtApproach');
    const pillsEl = document.getElementById('districtPills');

    function selectDistrict(key) {
      const d = CAMPAIGN_DATA.districts[key];
      if (!d) return;

      tabs.forEach((tab) => {
        const active = tab.dataset.district === key;
        tab.classList.toggle('is-active', active);
        tab.setAttribute('aria-selected', String(active));
      });

      nodes.forEach((node) => {
        node.classList.toggle('is-active', node.dataset.district === key);
      });

      if (coordsEl) coordsEl.textContent = d.coords;
      if (tagEl) tagEl.textContent = d.tag;
      if (titleEl) titleEl.textContent = d.title;
      if (summaryEl) summaryEl.textContent = d.summary;
      if (pressureEl) pressureEl.textContent = d.pressure;
      if (approachEl) approachEl.textContent = d.approach;

      if (pillsEl) {
        pillsEl.innerHTML = '';
        d.pills.forEach((text) => {
          const span = document.createElement('span');
          span.className = 'pill-tag';
          span.textContent = text;
          pillsEl.appendChild(span);
        });
      }
    }

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => selectDistrict(tab.dataset.district));
    });

    nodes.forEach((node) => {
      node.addEventListener('click', () => selectDistrict(node.dataset.district));
      node.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          selectDistrict(node.dataset.district);
        }
      });
    });

    selectDistrict('cigli');
  }

  /* ========================================================================
     4. Dinamik Bölümler (Kampanya Bileşenleri, Paydaşlar, Anket Halkası)
     ======================================================================== */
  function renderCampaignSections() {
    const pillarsGrid = document.getElementById('pillarsGrid');
    if (pillarsGrid) {
      pillarsGrid.innerHTML = '';
      CAMPAIGN_DATA.pillars.forEach((item) => {
        const card = document.createElement('article');
        card.className = 'pillar-card glass-card reveal';

        const num = document.createElement('span');
        num.className = 'pillar-num';
        num.textContent = item.num;

        const h3 = document.createElement('h3');
        h3.textContent = item.title;

        const p = document.createElement('p');
        p.textContent = item.desc;

        card.append(num, h3, p);
        pillarsGrid.appendChild(card);
      });
    }

    const stakeholderGrid = document.getElementById('stakeholderGrid');
    if (stakeholderGrid) {
      stakeholderGrid.innerHTML = '';
      CAMPAIGN_DATA.stakeholders.forEach((st) => {
        const card = document.createElement('article');
        card.className = `stakeholder-card glass-card reveal${st.featured ? ' stakeholder-card--featured' : ''}`;

        const role = document.createElement('span');
        role.className = 'stakeholder-role';
        role.textContent = st.role;

        const h3 = document.createElement('h3');
        h3.textContent = st.name;

        const p = document.createElement('p');
        p.textContent = st.desc;

        card.append(role, h3, p);
        stakeholderGrid.appendChild(card);
      });
    }

    // Bağlantılar & Anket Dairesel Halkası
    const { surveyUrl, instagramUrl, linkedinUrl } = CAMPAIGN_DATA.links;
    const surveyLink = document.getElementById('surveyCtaLink');
    const igLink = document.getElementById('footerInstagram');
    const liLink = document.getElementById('footerLinkedin');

    if (surveyLink) surveyLink.href = surveyUrl;
    if (igLink) igLink.href = instagramUrl;
    if (liLink) liLink.href = linkedinUrl;

    const { current, target } = CAMPAIGN_DATA.survey;
    const pct = Math.min(100, Math.round((current / target) * 100));
    const circumference = 2 * Math.PI * 66;
    const offset = circumference * (1 - pct / 100);

    const ringFill = document.getElementById('surveyRingFill');
    const ringPct = document.getElementById('surveyRingPercent');
    const ringNums = document.getElementById('surveyRingNumbers');

    if (ringPct) ringPct.textContent = `%${pct}`;
    if (ringNums) ringNums.textContent = `${current} / ${target}`;
    if (ringFill) {
      requestAnimationFrame(() => {
        ringFill.style.strokeDashoffset = String(offset);
      });
    }
  }

  /* ========================================================================
     5. Etkileşim Detayları (Spotlight Glow, Header, Scroll Bar, Toast)
     ======================================================================== */
  function initInteractions() {
    // Cam Kartlarda İmleci Takip Eden Işık
    document.querySelectorAll('.glass-card').forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
        card.style.setProperty('--my', `${e.clientY - rect.top}px`);
      });
    });

    // Üst Gezinme ve Su Seviyesi Çubuğu
    const header = document.getElementById('siteHeader');
    const waterBar = document.getElementById('scrollWaterBar');

    function onScroll() {
      const y = window.scrollY;
      header?.classList.toggle('is-scrolled', y > 24);
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (waterBar && maxScroll > 0) {
        waterBar.style.width = `${Math.min(100, (y / maxScroll) * 100)}%`;
      }
    }

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // Mobil Menü
    const menuToggle = document.getElementById('menuToggle');
    const mobileNav = document.getElementById('mobileNav');

    menuToggle?.addEventListener('click', () => {
      const open = !mobileNav.hidden;
      mobileNav.hidden = open;
      menuToggle.setAttribute('aria-expanded', String(!open));
    });

    mobileNav?.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        mobileNav.hidden = true;
        menuToggle?.setAttribute('aria-expanded', 'false');
      });
    });

    // Toast & Kopyalama
    const toast = document.getElementById('toast');
    let toastTimer = null;

    function showToast(msg) {
      if (!toast) return;
      toast.textContent = msg;
      toast.hidden = false;
      clearTimeout(toastTimer);
      toastTimer = setTimeout(() => {
        toast.hidden = true;
      }, 2400);
    }

    document.getElementById('shareLinkBtn')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(window.location.href);
        showToast('Kampanya bağlantısı kopyalandı');
      } catch {
        showToast('Bağlantı kopyalanamadı');
      }
    });

    document.getElementById('footerEmailBtn')?.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(CAMPAIGN_DATA.links.email);
        showToast(`E-posta kopyalandı: ${CAMPAIGN_DATA.links.email}`);
      } catch {
        showToast(CAMPAIGN_DATA.links.email);
      }
    });

    // Kaydırma Reveal Animasyonları
    const reveals = document.querySelectorAll('.reveal');
    if ('IntersectionObserver' in window) {
      const obs = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -24px 0px' }
      );
      reveals.forEach((el) => obs.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('is-visible'));
    }
  }

  // Başlat
  renderCampaignSections();
  initOceanCanvas();
  initClarityExperience();
  initDistrictExplorer();
  initInteractions();
})();