/**
 * ملف JavaScript النظيف لصفحة محفظة الأعمال
 * يحتوي على جميع الوظائف التفاعلية
 */

// انتظار تحميل المستند
document.addEventListener('DOMContentLoaded', function () {
  // تهيئة جميع الوظائف
  initNavigation();
  initContactForm();
  initScrollEffects();
  initTypeWriter();
  initSmoothScrolling();
  initStarBackground(); // إضافة تهيئة النجوم
  initProjectCards(); // إضافة تهيئة الكروت

  console.log('تم تحميل جميع الوظائف بنجاح! 🚀');
});

/**
 * تهيئة التنقل
 */
function initNavigation() {
  const menuBtn = document.querySelector('.menu-btn');
  const navLinks = document.querySelector('.nav-links');
  const header = document.querySelector('header');

  if (!menuBtn || !navLinks || !header) return;

  // تبديل قائمة التنقل للهواتف المحمولة
  menuBtn.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');

    // تغيير أيقونة القائمة
    const icon = menuBtn.querySelector('i');
    if (icon) {
      if (icon.classList.contains('fa-bars')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-times');
      } else {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    }
  });

  // إغلاق القائمة عند النقر على رابط
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', function () {
      navLinks.classList.remove('active');
      menuBtn.classList.remove('active');

      const icon = menuBtn.querySelector('i');
      if (icon) {
        icon.classList.remove('fa-times');
        icon.classList.add('fa-bars');
      }
    });
  });

  // تغيير شكل الرأس عند التمرير
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

/**
 * تهيئة نموذج الاتصال
 */
function initContactForm() {
  const contactForm = document.getElementById('contactForm');

  if (!contactForm) return;

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    // الحصول على قيم النموذج
    const formData = new FormData(this);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');

    // التحقق من صحة النموذج
    if (validateForm(name, email, subject, message)) {
      // إظهار رسالة نجاح
      showNotification('تم إرسال رسالتك بنجاح! سنتواصل معك قريباً.', 'success');

      // إعادة تعيين النموذج
      contactForm.reset();

      // هنا يمكنك إرسال البيانات إلى الخادم (تشفير اختياري)
      // const sanitized = {
      //   name: sanitizeInput(name),
      //   email: sanitizeInput(email),
      //   subject: sanitizeInput(subject),
      //   message: sanitizeInput(message)
      // };
      // const encrypted = await encryptPayload(sanitized);
      // await fetch('/api/contact', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(encrypted)
      // });

      // sendFormData(formData);
    }
  });
}

/**
 * التحقق من صحة النموذج
 */
function validateForm(name, email, subject, message) {
  if (!name || !email || !subject || !message) {
    showNotification('يرجى ملء جميع الحقول المطلوبة.', 'error');
    return false;
  }

  // التحقق من صحة البريد الإلكتروني
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showNotification('يرجى إدخال بريد إلكتروني صحيح.', 'error');
    return false;
  }

  return true;
}

/**
 * إظهار إشعار
 */
function showNotification(message, type = 'info') {
  // إنشاء عنصر الإشعار
  const notification = document.createElement('div');
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
    `;

  // إضافة الأنماط
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#10b981' : type === 'error' ? '#ef4444' : '#3b82f6'};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 8px;
        box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 400px;
        font-family: inherit;
    `;

  // إضافة إلى الصفحة
  document.body.appendChild(notification);

  // إظهار الإشعار
  setTimeout(() => {
    notification.style.transform = 'translateX(0)';
  }, 100);

  // إخفاء الإشعار بعد 5 ثوانٍ
  setTimeout(() => {
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        notification.parentNode.removeChild(notification);
      }
    }, 300);
  }, 5000);
}

/**
 * تهيئة تأثيرات التمرير
 */
function initScrollEffects() {
  const scrollElements = document.querySelectorAll(
    '.service-card, .about-image, .about-text, .contact-info, .contact-form'
  );

  if (!scrollElements.length) return;

  const elementInView = (el, percentageScroll = 100) => {
    const elementTop = el.getBoundingClientRect().top;
    return elementTop <= (window.innerHeight || document.documentElement.clientHeight) * (percentageScroll / 100);
  };

  const displayScrollElement = element => {
    element.classList.add('scrolled');
  };

  const hideScrollElement = element => {
    element.classList.remove('scrolled');
  };

  const handleScrollAnimation = () => {
    scrollElements.forEach(el => {
      if (elementInView(el, 80)) {
        displayScrollElement(el);
      } else {
        hideScrollElement(el);
      }
    });
  };

  // إضافة فئات CSS للتأثيرات
  scrollElements.forEach(el => {
    el.classList.add('scroll-animation');
  });

  // تشغيل التأثيرات عند التمرير
  window.addEventListener('scroll', handleScrollAnimation, { passive: true });

  // تشغيل التأثيرات عند تحميل الصفحة
  handleScrollAnimation();
}

/**
 * تهيئة تأثير الكتابة
 */
function initTypeWriter() {
  const heroTitle = document.querySelector('.hero-content h1 span');

  if (!heroTitle) return;

  const text = heroTitle.textContent;
  heroTitle.textContent = '';

  let i = 0;
  const typeWriter = () => {
    if (i < text.length) {
      heroTitle.textContent += text.charAt(i);
      i++;
      setTimeout(typeWriter, 100);
    }
  };

  // بدء الكتابة بعد نصف ثانية
  setTimeout(typeWriter, 500);
}

/**
 * تهيئة التمرير السلس
 */
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (!targetElement) return;
      e.preventDefault();
      const headerEl = document.querySelector('header');
      const headerHeight = headerEl ? headerEl.offsetHeight : 0;
      const targetPosition = targetElement.offsetTop - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
}

/**
 * إرسال بيانات النموذج إلى الخادم
 */
async function sendFormData(formData) {
  try {
    // هنا يمكنك إرسال البيانات إلى الخادم
    // مثال باستخدام fetch:
    /*
        const response = await fetch('/api/contact', {
            method: 'POST',
            body: formData
        });

        if (response.ok) {
            showNotification('تم إرسال رسالتك بنجاح!', 'success');
        } else {
            throw new Error('فشل في إرسال الرسالة');
        }
        */

    console.log('تم إرسال البيانات:', Object.fromEntries(formData));
  } catch (error) {
    console.error('خطأ في إرسال البيانات:', error);
    showNotification('حدث خطأ في إرسال الرسالة. يرجى المحاولة مرة أخرى.', 'error');
  }
}

/**
 * تحسين الأداء - تقليل عدد مرات استدعاء الدوال
 */
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * تهيئة خلفية النجوم المتحركة
 */
function initStarBackground() {
  // إنشاء نجوم إضافية ديناميكياً
  createDynamicStars();

  // تحسين أداء النجوم
  optimizeStarPerformance();

  // إضافة تأثير التمرير للنجوم
  addStarParallaxEffect();
}

/**
 * إنشاء نجوم ديناميكية
 */
function createDynamicStars() {
  const starsContainer = document.getElementById('stars');
  const stars2Container = document.getElementById('stars2');
  const stars3Container = document.getElementById('stars3');

  if (!starsContainer || !stars2Container || !stars3Container) return;

  // إضافة نجوم عشوائية إضافية
  addRandomStars(starsContainer, 100, 1); // نجوم صغيرة
  addRandomStars(stars2Container, 50, 2); // نجوم متوسطة
  addRandomStars(stars3Container, 25, 3); // نجوم كبيرة
}

/**
 * إضافة نجوم عشوائية
 */
function addRandomStars(container, count, size) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement('div');
    star.className = 'dynamic-star';
    star.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--star-color);
            border-radius: 50%;
            top: ${Math.random() * 2000}px;
            left: ${Math.random() * window.innerWidth}px;
            opacity: ${Math.random() * 0.8 + 0.2};
            animation: twinkle ${Math.random() * 3 + 2}s ease-in-out infinite alternate;
            z-index: -${size};
        `;
    container.appendChild(star);
  }
}

/**
 * تحسين أداء النجوم
 */
function optimizeStarPerformance() {
  // تقليل عدد النجوم على الشاشات الصغيرة
  const screenWidth = window.innerWidth;
  const stars = document.querySelectorAll('#stars, #stars2, #stars3');

  if (screenWidth < 768) {
    stars.forEach(container => {
      container.style.animationDuration = '30s';
    });
  } else if (screenWidth < 1024) {
    stars.forEach(container => {
      container.style.animationDuration = '40s';
    });
  }

  // إيقاف النجوم عند عدم التركيز على الصفحة
  document.addEventListener('visibilitychange', function () {
    if (document.hidden) {
      stars.forEach(container => {
        container.style.animationPlayState = 'paused';
      });
    } else {
      stars.forEach(container => {
        container.style.animationPlayState = 'running';
      });
    }
  });
}

/**
 * إضافة تأثير التمرير للنجوم
 */
function addStarParallaxEffect() {
  let ticking = false;

  function updateStarParallax() {
    const scrolled = window.pageYOffset;
    const stars = document.getElementById('stars');
    const stars2 = document.getElementById('stars2');
    const stars3 = document.getElementById('stars3');

    if (stars && stars2 && stars3) {
      // تأثير التمرير للنجوم (Parallax Effect)
      stars.style.transform = `translateY(${scrolled * 0.1}px)`;
      stars2.style.transform = `translateY(${scrolled * 0.2}px)`;
      stars3.style.transform = `translateY(${scrolled * 0.3}px)`;
    }

    ticking = false;
  }

  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(updateStarParallax);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestTick, { passive: true });
}

/**
 * تهيئة الكروت
 */
function initProjectCards() {
  const projectCards = document.querySelectorAll('.project-card');

  if (!projectCards.length) return;

  // إضافة تأثيرات تفاعلية للكروت
  addCardInteractions(projectCards);

  // إضافة تأثيرات التمرير
  addCardScrollEffects(projectCards);

  // إضافة تأثيرات العد التنازلي
  addCountdownEffects(projectCards);

  // إضافة تأثيرات شريط التقدم
  addProgressBarEffects(projectCards);
}

/**
 * إضافة التفاعلات للكروت
 */
function addCardInteractions(cards) {
  cards.forEach(card => {
    // تأثير التمرير
    card.addEventListener('mouseenter', () => {
      card.style.transform = 'translateY(-15px) scale(1.03)';
      card.style.boxShadow = '0 25px 50px rgba(0, 0, 0, 0.95)';
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'translateY(0) scale(1)';
      card.style.boxShadow = '0.063em 0.75em 1.563em rgba(0, 0, 0, 0.78)';
    });

    // تأثير النقر
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.98)';
      setTimeout(() => {
        card.style.transform = 'scale(1)';
      }, 150);
    });

    // تأثير الأزرار
    const btnAdd = card.querySelector('.btn-add');
    const btnCountdown = card.querySelector('.btn-countdown');

    if (btnAdd) {
      btnAdd.addEventListener('click', e => {
        e.stopPropagation();
        showNotification('تم إضافة عضو جديد إلى الفريق!', 'success');
      });
    }

    if (btnCountdown) {
      btnCountdown.addEventListener('click', e => {
        e.stopPropagation();
        showNotification('عرض تفاصيل المشروع...', 'info');
      });
    }
  });
}

/**
 * إضافة تأثيرات التمرير للكروت
 */
function addCardScrollEffects(cards) {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };

  const cardObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('card-visible');
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'all 0.8s ease';
    cardObserver.observe(card);
  });
}

/**
 * إضافة تأثيرات العد التنازلي
 */
function addCountdownEffects(cards) {
  cards.forEach(card => {
    const countdownBtn = card.querySelector('.btn-countdown');
    if (!countdownBtn) return;

    // تحليل النص للحصول على الوقت المتبقي
    const countdownText = countdownBtn.textContent;
    let timeLeft = 0;

    if (countdownText.includes('يومان')) timeLeft = 2;
    else if (countdownText.includes('أسبوعان')) timeLeft = 14;
    else if (countdownText.includes('3 أسابيع')) timeLeft = 21;
    else if (countdownText.includes('4 أسابيع')) timeLeft = 28;

    // إضافة تأثير النبض عند اقتراب الموعد النهائي
    if (timeLeft <= 7) {
      countdownBtn.style.animation = 'pulse 2s infinite';
    }
  });
}

/**
 * إضافة تأثيرات شريط التقدم
 */
function addProgressBarEffects(cards) {
  cards.forEach(card => {
    const progressBar = card.querySelector('.progress-bar');
    const progressText = card.querySelector('.progress span:last-of-type');
    if (!progressBar || !progressText) return;

    // إعداد العرض الابتدائي بناءً على النص
    const initial = parseInt(progressText.textContent) || 0;
    progressBar.style.setProperty('--progress-width', initial + '%');
    progressBar.classList.add('has-progress');

    // تحديث دوري آمن
    setInterval(() => {
      const current = parseInt(progressText.textContent) || 0;
      if (current < 100) {
        const next = Math.min(current + Math.random() * 2, 100);
        progressText.textContent = Math.round(next) + '%';
        progressBar.style.setProperty('--progress-width', Math.round(next) + '%');
        progressBar.classList.add('updating');
        setTimeout(() => progressBar.classList.remove('updating'), 600);
      }
    }, 30000);
  });
}

/**
 * دالة مساعدة لإنشاء عناصر DOM
 */
function createElement(tag, className, textContent = '') {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (textContent) element.textContent = textContent;
  return element;
}

/**
 * دالة مساعدة لإضافة مستمعي الأحداث
 */
function addEventListeners(elements, event, handler) {
  if (Array.isArray(elements)) {
    elements.forEach(element => {
      if (element) element.addEventListener(event, handler);
    });
  } else if (elements) {
    elements.addEventListener(event, handler);
  }
}

// تصدير الدوال للاستخدام الخارجي (إذا لزم الأمر)
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    initNavigation,
    initContactForm,
    initScrollEffects,
    initTypeWriter,
    initSmoothScrolling,
  };
}

// ===== Security helpers: sanitize inputs and encrypt payload before sending =====
function sanitizeInput(value) {
  if (typeof value !== 'string') return value;
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

async function encryptPayload(dataObj) {
  // Note: In production, derive a key via server-provided secret or WebCrypto key agreement
  const enc = new TextEncoder();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const rawKey = enc.encode('CodeByIslam-demo-key-please-replace');
  const key = await crypto.subtle.importKey('raw', rawKey, { name: 'AES-GCM' }, false, ['encrypt']);
  const plain = enc.encode(JSON.stringify(dataObj));
  const cipher = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, plain);
  return { iv: Array.from(iv), cipher: Array.from(new Uint8Array(cipher)) };
}

// ===== Back to Top: show on scroll and smooth scroll to top =====
(function setupBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  const onScroll = () => {
    if (window.scrollY > 400) btn.classList.add('is-visible');
    else btn.classList.remove('is-visible');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
  onScroll();
})();

// ===== Live form validation (instant feedback) =====
(function setupLiveValidation() {
  const form = document.getElementById('contactForm');
  if (!form) return;
  const nameEl = form.querySelector('#name');
  const emailEl = form.querySelector('#email');
  const subjectEl = form.querySelector('#subject');
  const messageEl = form.querySelector('#message');

  const setValidity = (el, valid, msg = '') => {
    if (!el) return;
    if (valid) {
      el.setCustomValidity('');
      el.classList.remove('is-invalid');
      el.classList.add('is-valid');
    } else {
      el.setCustomValidity(msg || '');
      el.classList.remove('is-valid');
      el.classList.add('is-invalid');
    }
  };

  const validateName = () => {
    const v = (nameEl?.value || '').trim();
    const ok = v.length >= 2;
    setValidity(nameEl, ok, 'الاسم قصير جداً');
    return ok;
  };
  const validateEmail = () => {
    const v = (emailEl?.value || '').trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
    setValidity(emailEl, ok, 'البريد الإلكتروني غير صالح');
    return ok;
  };
  const validateSubject = () => {
    const v = (subjectEl?.value || '').trim();
    const ok = v.length >= 3;
    setValidity(subjectEl, ok, 'الموضوع قصير');
    return ok;
  };
  const validateMessage = () => {
    const v = (messageEl?.value || '').trim();
    const ok = v.length >= 10;
    setValidity(messageEl, ok, 'الرسالة قصيرة');
    return ok;
  };

  nameEl?.addEventListener('input', validateName, { passive: true });
  emailEl?.addEventListener('input', validateEmail, { passive: true });
  subjectEl?.addEventListener('input', validateSubject, { passive: true });
  messageEl?.addEventListener('input', validateMessage, { passive: true });

  form.addEventListener('submit', e => {
    const allOk = validateName() & validateEmail() & validateSubject() & validateMessage();
    if (!allOk) {
      e.preventDefault();
      showNotification('يرجى تصحيح الحقول المميزة باللون الأحمر.', 'error');
    }
  });
})();

// ===== Basic anti-tamper (best-effort, not real security) =====
(function hardenShortcuts() {
  const isDevToolsKey = e => {
    const k = e.key.toLowerCase();
    return (
      // F12
      e.keyCode === 123 ||
      // Ctrl+Shift+I / J / C
      (e.ctrlKey && e.shiftKey && (k === 'i' || k === 'j' || k === 'c')) ||
      // Ctrl+U (view-source)
      (e.ctrlKey && k === 'u')
    );
  };
  window.addEventListener('keydown', e => {
    if (isDevToolsKey(e)) {
      e.preventDefault();
    }
  });
  // Disable context menu (optional)
  window.addEventListener('contextmenu', e => {
    e.preventDefault();
  });
})();
