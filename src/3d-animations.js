/**
 * ملف الرسوميات ثلاثية الأبعاد - مكتبات حديثة ومتطورة
 * يحتوي على أمثلة لاستخدام مكتبات الرسوميات المتقدمة
 *
 * المكتبات المستخدمة:
 * - Three.js: الرسوميات الأساسية 3D
 * - GSAP: الرسوميات المتقدمة
 * - Lottie: الرسوميات المتحركة
 * - Particles.js: تأثيرات الجزيئات
 * - Anime.js: الرسوميات اليابانية
 * - Matter.js: محرك الفيزياء
 * - PixiJS: محرك الرسوميات 2D/3D
 * - Cannon.js: محرك الفيزياء 3D
 * - Tween.js: الانتقالات
 * - Stats.js: مراقب الأداء
 */

/* global THREE, gsap, lottie, particlesJS, anime, Matter, PIXI, TWEEN, Stats */

// ===== THREE.JS - الرسوميات الأساسية 3D =====
class ThreeJSAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.scene = null;
    this.camera = null;
    this.renderer = null;
    this.cube = null;
    this.animationId = null;

    this.init();
  }

  init() {
    // إنشاء المشهد
    this.scene = new THREE.Scene();

    // إنشاء الكاميرا
    this.camera = new THREE.PerspectiveCamera(75, this.container.clientWidth / this.container.clientHeight, 0.1, 1000);
    this.camera.position.z = 5;

    // إنشاء العارض
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setSize(this.container.clientWidth, this.container.clientHeight);
    this.renderer.setClearColor(0x000000, 0);
    this.container.appendChild(this.renderer.domElement);

    // إنشاء مكعب متحرك
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      wireframe: true,
    });
    this.cube = new THREE.Mesh(geometry, material);
    this.scene.add(this.cube);

    // بدء الرسوم المتحركة
    this.animate();

    // إضافة مراقب الأداء
    this.addStats();
  }

  animate() {
    this.animationId = requestAnimationFrame(() => this.animate());

    // تدوير المكعب
    this.cube.rotation.x += 0.01;
    this.cube.rotation.y += 0.01;

    this.renderer.render(this.scene, this.camera);
  }

  addStats() {
    if (typeof Stats !== 'undefined') {
      this.stats = new Stats();
      this.stats.dom.style.position = 'absolute';
      this.stats.dom.style.top = '0px';
      this.container.appendChild(this.stats.dom);

      // تحديث الإحصائيات
      const animate = () => {
        this.stats.begin();
        this.stats.end();
        requestAnimationFrame(animate);
      };
      animate();
    }
  }

  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
    if (this.container && this.renderer) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}

// ===== GSAP - الرسوميات المتقدمة =====
class GSAPAnimation {
  constructor() {
    this.init();
  }

  init() {
    if (
      typeof gsap !== 'undefined' &&
      typeof ScrollTrigger !== 'undefined' &&
      typeof gsap.registerPlugin === 'function'
    ) {
      gsap.registerPlugin(ScrollTrigger);
    }
    // رسوم متحركة للعناوين
    if (typeof gsap !== 'undefined') {
      gsap.from('.hero h1', {
        duration: 1.5,
        y: 100,
        opacity: 0,
        ease: 'power3.out',
        stagger: 0.2,
      });

      // رسوم متحركة للأزرار
      gsap.from('.hero-buttons .btn', {
        duration: 1,
        scale: 0,
        opacity: 0,
        ease: 'back.out(1.7)',
        stagger: 0.3,
      });

      // رسوم متحركة للبطاقات
      gsap.from('.service-card', {
        duration: 0.8,
        y: 50,
        opacity: 0,
        ease: 'power2.out',
        stagger: 0.2,
        immediateRender: false,
        scrollTrigger: {
          trigger: '.services',
          start: 'top 80%',
        },
        onComplete: function () {
          gsap.set(this.targets(), { clearProps: 'transform,opacity' });
        },
      });
    }
  }

  // تأثير الكتابة
  typewriterEffect(element, text, speed = 100) {
    element.textContent = '';
    let i = 0;

    const timer = setInterval(() => {
      element.textContent += text.charAt(i);
      i++;

      if (i > text.length) {
        clearInterval(timer);
      }
    }, speed);
  }
}

// ===== PARTICLES.JS - تأثيرات الجزيئات =====
class ParticlesAnimation {
  constructor(containerId) {
    this.containerId = containerId;
    this.init();
  }

  init() {
    if (typeof particlesJS !== 'undefined') {
      particlesJS(this.containerId, {
        particles: {
          number: {
            value: 80,
            density: {
              enable: true,
              value_area: 800,
            },
          },
          color: {
            value: '#ffffff',
          },
          shape: {
            type: 'circle',
          },
          opacity: {
            value: 0.5,
            random: false,
          },
          size: {
            value: 3,
            random: true,
          },
          line_linked: {
            enable: true,
            distance: 150,
            color: '#ffffff',
            opacity: 0.4,
            width: 1,
          },
          move: {
            enable: true,
            speed: 6,
            direction: 'none',
            random: false,
            straight: false,
            out_mode: 'out',
            bounce: false,
          },
        },
        interactivity: {
          detect_on: 'canvas',
          events: {
            onhover: {
              enable: true,
              mode: 'repulse',
            },
            onclick: {
              enable: true,
              mode: 'push',
            },
            resize: true,
          },
        },
        retina_detect: true,
      });
    }
  }
}

// ===== ANIME.JS - الرسوميات اليابانية =====
class AnimeJSAnimation {
  constructor() {
    this.init();
  }

  init() {
    if (typeof anime !== 'undefined') {
      // رسوم متحركة للمهارات
      anime({
        targets: '.skill-level',
        width: [0, anime.get('.skill-level', 'width')],
        duration: 2000,
        easing: 'easeOutExpo',
        delay: anime.stagger(200),
      });

      // رسوم متحركة للبطاقات
      anime({
        targets: '.project-card',
        translateY: [50, 0],
        opacity: [0, 1],
        duration: 1000,
        easing: 'easeOutExpo',
        delay: anime.stagger(200),
      });
    }
  }

  // تأثير النبض
  pulseEffect(element) {
    if (typeof anime !== 'undefined') {
      anime({
        targets: element,
        scale: [1, 1.1, 1],
        duration: 1000,
        easing: 'easeInOutQuad',
        loop: true,
      });
    }
  }
}

// ===== MATTER.JS - محرك الفيزياء =====
class MatterJSAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.engine = null;
    this.render = null;
    this.world = null;
    this.bodies = [];

    this.init();
  }

  init() {
    if (typeof Matter !== 'undefined') {
      // إنشاء المحرك
      this.engine = Matter.Engine.create();
      this.world = this.engine.world;

      // إنشاء العارض
      this.render = Matter.Render.create({
        element: this.container,
        engine: this.engine,
        options: {
          width: this.container.clientWidth,
          height: this.container.clientHeight,
          wireframes: false,
          background: 'transparent',
        },
      });

      // إنشاء كرات متحركة
      this.createBalls();

      // بدء المحرك والعرض
      Matter.Engine.run(this.engine);
      Matter.Render.run(this.render);
    }
  }

  createBalls() {
    // إنشاء كرات ملونة
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#feca57'];

    for (let i = 0; i < 10; i++) {
      const ball = Matter.Bodies.circle(
        Math.random() * this.container.clientWidth,
        Math.random() * this.container.clientHeight,
        20,
        {
          restitution: 0.8,
          friction: 0.005,
          render: {
            fillStyle: colors[Math.floor(Math.random() * colors.length)],
          },
        }
      );

      this.bodies.push(ball);
      Matter.World.add(this.world, ball);
    }
  }

  destroy() {
    if (this.render) {
      Matter.Render.stop(this.render);
    }
    if (this.engine) {
      Matter.Engine.clear(this.engine);
    }
  }
}

// ===== PIXIJS - محرك الرسوميات 2D/3D =====
class PixiJSAnimation {
  constructor(containerId) {
    this.container = document.getElementById(containerId);
    this.app = null;
    this.init();
  }

  init() {
    if (typeof PIXI !== 'undefined') {
      // إنشاء التطبيق
      this.app = new PIXI.Application({
        width: this.container.clientWidth,
        height: this.container.clientHeight,
        backgroundColor: 0x1099bb,
        transparent: true,
        antialias: true,
      });

      this.container.appendChild(this.app.view);

      // إنشاء رسوم متحركة
      this.createAnimation();
    }
  }

  createAnimation() {
    // إنشاء دائرة متحركة
    const graphics = new PIXI.Graphics();
    graphics.beginFill(0xff0000);
    graphics.drawCircle(0, 0, 50);
    graphics.endFill();

    graphics.x = this.app.screen.width / 2;
    graphics.y = this.app.screen.height / 2;

    this.app.stage.addChild(graphics);

    // رسوم متحركة للدائرة
    this.app.ticker.add(() => {
      graphics.rotation += 0.01;
      graphics.x += Math.sin(graphics.rotation) * 2;
      graphics.y += Math.cos(graphics.rotation) * 2;
    });
  }

  destroy() {
    if (this.app) {
      this.app.destroy(true);
    }
  }
}

// ===== LOTTIE - الرسوميات المتحركة =====
class LottieAnimation {
  constructor(containerId, animationPath) {
    this.container = document.getElementById(containerId);
    this.animationPath = animationPath;
    this.animation = null;
    this.init();
  }

  init() {
    if (typeof lottie !== 'undefined') {
      this.animation = lottie.loadAnimation({
        container: this.container,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: this.animationPath,
      });
    }
  }

  play() {
    if (this.animation) {
      this.animation.play();
    }
  }

  pause() {
    if (this.animation) {
      this.animation.pause();
    }
  }

  stop() {
    if (this.animation) {
      this.animation.stop();
    }
  }
}

// ===== TWEEN.JS - مكتبة الانتقالات =====
class TweenJSAnimation {
  constructor() {
    this.init();
  }

  init() {
    // رسوم متحركة للعناصر
    this.animateElements();

    // بدء حلقة الرسوم المتحركة
    this.animate();
  }

  animateElements() {
    if (typeof TWEEN !== 'undefined') {
      // انتقال للأزرار
      const buttons = document.querySelectorAll('.btn');
      buttons.forEach(button => {
        new TWEEN.Tween(button).to({ scale: 1.1 }, 200).easing(TWEEN.Easing.Quadratic.Out).start();
      });
    }
  }

  animate() {
    requestAnimationFrame(() => this.animate());
    if (typeof TWEEN !== 'undefined') {
      TWEEN.update();
    }
  }
}

// ===== إدارة جميع الرسوم المتحركة =====
class AnimationManager {
  constructor() {
    this.animations = new Map();
    this.init();
  }

  init() {
    // تهيئة الرسوم المتحركة عند تحميل الصفحة
    document.addEventListener('DOMContentLoaded', () => {
      this.initializeAnimations();
    });

    // تهيئة الرسوم المتحركة عند التمرير
    this.initScrollAnimations();
  }

  initializeAnimations() {
    // GSAP
    this.animations.set('gsap', new GSAPAnimation());

    // Anime.js
    this.animations.set('anime', new AnimeJSAnimation());

    // Tween.js
    this.animations.set('tween', new TweenJSAnimation());

    // إضافة تأثيرات الجزيئات للخلفية
    if (document.getElementById('particles-bg')) {
      this.animations.set('particles', new ParticlesAnimation('particles-bg'));
    }
  }

  initScrollAnimations() {
    // مراقب التمرير للرسوم المتحركة
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };

    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, observerOptions);

    // مراقبة العناصر
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => observer.observe(el));
  }

  // إضافة رسوم متحركة جديدة
  addAnimation(name, animation) {
    this.animations.set(name, animation);
  }

  // إزالة رسوم متحركة
  removeAnimation(name) {
    const animation = this.animations.get(name);
    if (animation && animation.destroy) {
      animation.destroy();
    }
    this.animations.delete(name);
  }

  // إيقاف جميع الرسوم المتحركة
  stopAllAnimations() {
    this.animations.forEach((animation, name) => {
      if (animation.destroy) {
        animation.destroy();
      }
    });
    this.animations.clear();
  }
}

// ===== تصدير الكلاسات =====
window.ThreeJSAnimation = ThreeJSAnimation;
window.GSAPAnimation = GSAPAnimation;
window.ParticlesAnimation = ParticlesAnimation;
window.AnimeJSAnimation = AnimeJSAnimation;
window.MatterJSAnimation = MatterJSAnimation;
window.PixiJSAnimation = PixiJSAnimation;
window.LottieAnimation = LottieAnimation;
window.TweenJSAnimation = TweenJSAnimation;
window.AnimationManager = AnimationManager;

// ===== تهيئة مدير الرسوم المتحركة =====
const animationManager = new AnimationManager();

// ===== أمثلة للاستخدام =====
document.addEventListener('DOMContentLoaded', () => {
  // مثال: إضافة رسوم متحركة 3D للخلفية
  if (document.getElementById('hero-3d-bg')) {
    const threeJS = new ThreeJSAnimation('hero-3d-bg');
    animationManager.addAnimation('hero-3d', threeJS);
  }

  // مثال: إضافة تأثيرات الجزيئات
  if (document.getElementById('particles-container')) {
    const particles = new ParticlesAnimation('particles-container');
    animationManager.addAnimation('particles', particles);
  }

  // مثال: إضافة رسوم متحركة فيزيائية
  if (document.getElementById('physics-container')) {
    const physics = new MatterJSAnimation('physics-container');
    animationManager.addAnimation('physics', physics);
  }

  // مثال: إضافة رسوم متحركة PixiJS
  if (document.getElementById('pixi-container')) {
    const pixi = new PixiJSAnimation('pixi-container');
    animationManager.addAnimation('pixi', pixi);
  }
});

// eslint-disable-next-line no-console
console.log('🎨 مكتبات الرسوميات ثلاثية الأبعاد جاهزة للاستخدام!');
