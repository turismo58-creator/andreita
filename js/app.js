/*
 * Un girasol antes del amanecer
 * Experiencia narrativa sin dependencias. La carta puede editarse en CONFIG.
 */
(function () {
  'use strict';

  const CONFIG = {
    letter: [
      [
        'No hice todo esto porque una fecha dijera que tenía que regalarte flores.',
        'Lo hice porque me gusta seguir creando momentos contigo.'
      ],
      [
        'No sé exactamente qué colores tendrá todo lo que viene, y creo que ahí también está lo bonito.',
        'Solo sé que me gusta lo que estamos construyendo, sin correr, sin intentar que sea perfecto y disfrutando cada pincelada.'
      ],
      [
        'Así que estas flores llegaron antes.',
        'No para adelantar el 21.'
      ],
      [
        'Sino para recordarte que no necesito esperar al calendario para tener ganas de darte algo bonito.'
      ]
    ],
    images: {
      foto1: 'assets/images/foto-1.jpg',
      foto2: 'assets/images/foto-2.jpg',
      special: 'assets/images/foto-especial.jpg'
    },
    audioVolume: 0.18,
    timings: {
      transition: 1050,
      introStarWake: 500,
      introLines: [350, 2800, 5700],
      introButton: 7600,
      nightBurst: 1350,
      result: 850,
      bloom: 3300,
      pause: 15000,
      revealHold: 2200,
      dawnHold: 2700,
      dawnFallback: 1500,
      growth: 4200,
      letterChange: 420,
      easterEgg: 4800
    }
  };

  window.STORY_CONFIG = CONFIG;

  const params = new URLSearchParams(window.location.search);
  const selfTestMode = params.get('test') === '1';
  const fastMode = params.get('fast') === '1' || selfTestMode;
  const previewRequest = (params.get('preview') || '').trim().toLowerCase();
  const reduceQuery = window.matchMedia
    ? window.matchMedia('(prefers-reduced-motion: reduce)')
    : { matches: false, addEventListener: null };
  let reducedMotion = Boolean(reduceQuery.matches);

  const root = document.documentElement;
  const experience = document.getElementById('experience');
  const sceneElements = Array.from(document.querySelectorAll('.scene[data-scene]'));
  const sceneNames = sceneElements.map((scene) => scene.dataset.scene);
  const supportsInert = 'inert' in HTMLElement.prototype;
  const previewMode = sceneNames.includes(previewRequest);

  const entryScale = selfTestMode ? 0.006 : fastMode ? 0.045 : previewMode ? 0.045 : 1;
  const transitionScale = selfTestMode ? 0.018 : fastMode || previewMode ? 0.12 : 1;

  root.dataset.reducedMotion = reducedMotion ? 'true' : 'false';
  if (fastMode) root.dataset.fast = 'true';
  if (previewMode) root.dataset.preview = previewRequest;
  if (selfTestMode) root.dataset.selfTest = 'running';

  const byId = (id) => document.getElementById(id);
  const dom = {
    progress: byId('story-progress'),
    announcer: byId('scene-announcer'),
    veil: byId('transition-veil'),
    introStar: byId('intro-star'),
    introBefore: byId('intro-before'),
    introAfter: byId('intro-after'),
    beginNight: byId('begin-night'),
    specialStar: byId('special-star'),
    nightStars: byId('night-new-stars'),
    constellation: byId('constellation'),
    constellationResult: byId('constellation-result'),
    constellationNext: byId('constellation-next'),
    easterStar: byId('easter-star'),
    easterMessage: byId('easter-message'),
    revealFrame: byId('reveal-frame'),
    fogCanvas: byId('fog-canvas'),
    revealMeter: byId('reveal-meter-fill'),
    revealHold: byId('reveal-hold'),
    revealResult: byId('reveal-result'),
    revealNext: byId('reveal-next'),
    painting: byId('unfinished-painting'),
    paintSpark: byId('paint-spark'),
    paintingResult: byId('painting-result'),
    paintingNext: byId('painting-next'),
    sunflower: byId('sunflower-bloom'),
    sunflowerCenter: byId('sunflower-center'),
    sunflowerResult: byId('sunflower-result'),
    sunflowerNext: byId('sunflower-next'),
    pauseCopy: byId('pause-copy'),
    memory: byId('memory'),
    pauseSkip: byId('pause-skip'),
    pauseNext: byId('pause-next'),
    dawnSun: byId('dawn-sun'),
    dawnAccessible: byId('dawn-accessible'),
    dawnMeter: document.querySelector('.dawn-meter'),
    dawnMeterFill: document.querySelector('.dawn-meter span'),
    dawnResult: byId('dawn-result'),
    dawnNext: byId('dawn-next'),
    growingFlower: byId('growing-flower'),
    growthNext: byId('growth-next'),
    fieldNext: byId('field-next'),
    letterText: byId('letter-text'),
    letterHint: byId('letter-hint'),
    letterNext: byId('letter-next-line'),
    letterFinish: byId('letter-finish'),
    letterSignature: byId('letter-signature'),
    letterMark: byId('letter-mark'),
    replay: byId('replay-story'),
    audio: byId('background-music'),
    audioControl: byId('audio-control'),
    audioIcon: document.querySelector('#audio-control .audio-control__icon'),
    audioLabel: document.querySelector('#audio-control .audio-control__label'),
    ambientStars: byId('ambient-stars'),
    finalParticles: byId('final-particles')
  };

  let sceneManager = null;
  const sceneTimers = new Set();
  const globalTimers = new Set();

  function reportError(error, context) {
    root.dataset.appError = context || 'unknown';
    root.dataset.appErrorMessage = String(error && error.message ? error.message : error || 'Error desconocido').slice(0, 240);
    if (selfTestMode) root.dataset.selfTest = 'failed';
    if (window.console && typeof window.console.error === 'function') {
      console.error('[Un girasol]', context || 'Error', error);
    }
  }

  function safe(fn, context) {
    return function safeHandler() {
      try {
        const result = fn.apply(this, arguments);
        if (result && typeof result.then === 'function' && typeof result.catch === 'function') {
          result.catch((error) => reportError(error, context || 'async-handler'));
        }
        return result;
      } catch (error) {
        reportError(error, context);
        return undefined;
      }
    };
  }

  function listen(target, type, handler, options) {
    if (target && target.addEventListener) {
      target.addEventListener(type, safe(handler, type), options);
    }
  }

  function scaled(ms, kind) {
    const scale = kind === 'transition' ? transitionScale : entryScale;
    if (reducedMotion && !fastMode && kind !== 'hold') return 0;
    return Math.max(0, Math.round(ms * scale));
  }

  function holdDuration(ms) {
    if (reducedMotion) return 1;
    if (selfTestMode) return 55;
    if (fastMode || previewMode) return Math.max(130, Math.round(ms * 0.09));
    return ms;
  }

  function schedule(fn, ms, global) {
    const collection = global ? globalTimers : sceneTimers;
    const id = window.setTimeout(() => {
      collection.delete(id);
      safe(fn, 'timer')();
    }, scaled(ms, 'entry'));
    collection.add(id);
    return id;
  }

  function wait(ms, kind) {
    return new Promise((resolve) => {
      const id = window.setTimeout(() => {
        globalTimers.delete(id);
        resolve();
      }, scaled(ms, kind || 'entry'));
      globalTimers.add(id);
    });
  }

  function clearSceneTimers() {
    sceneTimers.forEach((id) => window.clearTimeout(id));
    sceneTimers.clear();
  }

  function setReady(button, ready) {
    if (!button) return;
    if (!ready && button === document.activeElement && typeof button.blur === 'function') button.blur();
    button.disabled = !ready;
    button.classList.toggle('is-ready', ready);
    button.setAttribute('aria-disabled', String(!ready));
    if (ready) button.removeAttribute('aria-hidden');
    else button.setAttribute('aria-hidden', 'true');
  }

  function show(element, visible) {
    if (!element) return;
    element.classList.toggle('is-visible', visible);
    element.setAttribute('aria-hidden', String(!visible));
  }

  function announce(message) {
    if (!dom.announcer) return;
    dom.announcer.textContent = '';
    window.setTimeout(() => { dom.announcer.textContent = message; }, 20);
  }

  function currentIs(name) {
    return Boolean(sceneManager && sceneManager.currentSceneName === name && !sceneManager.isTransitioning);
  }

  function activeIs(name) {
    return Boolean(sceneManager && sceneManager.currentSceneName === name && sceneManager.currentScene?.classList.contains('is-active'));
  }

  function seededRandom(seed) {
    let value = seed >>> 0;
    return function random() {
      value = (value * 1664525 + 1013904223) >>> 0;
      return value / 4294967296;
    };
  }

  function makeParticles(container, count, className, seed) {
    if (!container || container.childElementCount) return;
    const random = seededRandom(seed);
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < count; index += 1) {
      const particle = document.createElement('span');
      particle.className = className;
      particle.setAttribute('aria-hidden', 'true');
      particle.style.setProperty('--x', `${(random() * 100).toFixed(2)}%`);
      particle.style.setProperty('--y', `${(random() * 100).toFixed(2)}%`);
      particle.style.setProperty('--size', `${(0.7 + random() * 2.4).toFixed(2)}px`);
      particle.style.setProperty('--delay', `${(-random() * 9).toFixed(2)}s`);
      particle.style.setProperty('--duration', `${(4 + random() * 8).toFixed(2)}s`);
      const alpha = (0.25 + random() * 0.7).toFixed(2);
      particle.style.setProperty('--opacity', alpha);
      particle.style.setProperty('--alpha', alpha);
      fragment.appendChild(particle);
    }
    container.appendChild(fragment);
  }

  function revealEntryCopy(scene) {
    scene.querySelectorAll('.reveal-copy').forEach((element) => {
      const delay = Number(element.dataset.enterDelay || 0);
      schedule(() => {
        if (!activeIs(scene.dataset.scene)) return;
        element.classList.add('is-visible');
        element.removeAttribute('aria-hidden');
        const target = element.dataset.enableTarget && byId(element.dataset.enableTarget);
        if (target) setReady(target, true);
      }, delay);
    });
  }

  const titles = {
    intro: 'Una estrella para Andrea',
    night: 'Todo empieza de noche',
    constellation: 'Los momentos toman forma',
    reveal: 'Mirar con tiempo',
    painting: 'Un cuadro por pintar',
    sunflower: 'Un girasol para ti',
    pause: 'Un momento para quedarse',
    dawn: 'Empieza a cambiar el cielo',
    growth: 'El amarillo estaba aquí',
    field: 'Las flores llegaron antes',
    letter: 'Una carta para Andrea',
    final: 'Un girasol antes del amanecer'
  };

  class SceneManager {
    constructor(scenes) {
      this.scenes = scenes;
      this.index = -1;
      this.isTransitioning = false;
    }

    get currentScene() {
      return this.scenes[this.index] || null;
    }

    get currentSceneName() {
      return this.currentScene ? this.currentScene.dataset.scene : null;
    }

    resolve(target) {
      if (typeof target === 'number') return Number.isInteger(target) ? target : -1;
      if (target && target.nodeType === 1) return this.scenes.indexOf(target);
      return this.scenes.findIndex((scene) => scene.dataset.scene === target);
    }

    start(target) {
      const requested = this.resolve(target);
      this.scenes.forEach((scene) => this.setActive(scene, false));
      this.index = requested >= 0 ? requested : 0;
      this.setActive(this.currentScene, true);
      this.enter(this.currentScene);
    }

    setActive(scene, active) {
      if (!scene) return;
      scene.classList.toggle('is-active', active);
      if (!active) scene.classList.remove('is-entered');
      scene.setAttribute('aria-hidden', String(!active));
      if (supportsInert) {
        scene.inert = !active;
      } else {
        scene.querySelectorAll('a[href], button, input, select, textarea, [tabindex]').forEach((element) => {
          if (!active && element.dataset.storyTabindex === undefined) {
            element.dataset.storyTabindex = element.hasAttribute('tabindex') ? element.getAttribute('tabindex') : '__none__';
            element.setAttribute('tabindex', '-1');
          } else if (active && element.dataset.storyTabindex !== undefined) {
            const previous = element.dataset.storyTabindex;
            if (previous === '__none__') element.removeAttribute('tabindex');
            else element.setAttribute('tabindex', previous);
            delete element.dataset.storyTabindex;
          }
        });
      }
      if (active) scene.removeAttribute('inert');
      else scene.setAttribute('inert', '');
    }

    enter(scene) {
      if (!scene) return;
      const name = scene.dataset.scene;
      root.dataset.currentScene = name;
      if (experience) {
        experience.dataset.timeOfDay = ['dawn'].includes(name)
          ? 'dawn'
          : ['growth', 'field', 'letter', 'final'].includes(name) ? 'day' : 'night';
      }
      const ratio = this.scenes.length > 1 ? this.index / (this.scenes.length - 1) : 0;
      if (dom.progress) {
        dom.progress.style.width = `${ratio * 100}%`;
        dom.progress.style.transform = `scaleX(${ratio})`;
        dom.progress.style.setProperty('--story-progress', ratio.toFixed(4));
      }
      window.requestAnimationFrame(safe(() => {
        if (activeIs(name)) scene.classList.add('is-entered');
      }, 'scene-enter'));
      revealEntryCopy(scene);
      runEnterHook(name);
      announce(titles[name] || 'Nueva escena');
      schedule(() => {
        if (!activeIs(name)) return;
        scene.setAttribute('tabindex', '-1');
        scene.setAttribute('aria-label', titles[name] || 'Nueva escena');
        try { scene.focus({ preventScroll: true }); } catch (error) { scene.focus(); }
      }, 90);
    }

    async transitionToScene(target, options) {
      const opts = options || {};
      const nextIndex = this.resolve(target);
      if (nextIndex < 0 || nextIndex >= this.scenes.length || this.isTransitioning || nextIndex === this.index) return false;
      this.isTransitioning = true;
      root.dataset.transitioning = 'true';
      const oldScene = this.currentScene;
      try {
        oldScene && oldScene.classList.add('is-leaving');
        if (dom.veil) {
          dom.veil.classList.toggle('is-returning', Boolean(opts.replay));
          dom.veil.classList.add('is-active');
        }
        await wait(CONFIG.timings.transition * 0.48, 'transition');
        clearSceneTimers();
        stopContinuousInteractions();
        if (oldScene && oldScene.contains(document.activeElement) && typeof document.activeElement.blur === 'function') {
          document.activeElement.blur();
        }
        this.setActive(oldScene, false);
        oldScene && oldScene.classList.remove('is-leaving');
        if (opts.replay) resetStoryState();
        this.index = nextIndex;
        this.setActive(this.currentScene, true);
        this.enter(this.currentScene);
        await wait(CONFIG.timings.transition * 0.52, 'transition');
        return true;
      } catch (error) {
        reportError(error, 'scene-transition');
        if (!this.scenes.some((scene) => scene.classList.contains('is-active')) && oldScene) {
          this.index = this.scenes.indexOf(oldScene);
          this.setActive(oldScene, true);
        }
        return false;
      } finally {
        oldScene && oldScene.classList.remove('is-leaving');
        if (dom.veil) dom.veil.classList.remove('is-active', 'is-returning');
        this.isTransitioning = false;
        delete root.dataset.transitioning;
      }
    }

    nextScene() {
      return this.transitionToScene(this.index + 1);
    }

    previousScene() {
      return this.transitionToScene(this.index - 1);
    }

    transitionTo(target, options) {
      return this.transitionToScene(target, options);
    }
  }

  const revealState = {
    context: null,
    width: 0,
    height: 0,
    dragging: false,
    pointerId: null,
    lastPoint: null,
    cells: new Set(),
    columns: 18,
    rows: 12,
    progress: 0,
    ready: false,
    complete: false,
    holdFrame: 0,
    holdStart: 0,
    autoFrame: 0
  };

  function paintFog() {
    const canvas = dom.fogCanvas;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (rect.width < 2 || rect.height < 2) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.75);
    canvas.width = Math.round(rect.width * dpr);
    canvas.height = Math.round(rect.height * dpr);
    revealState.width = rect.width;
    revealState.height = rect.height;
    let context = null;
    try { context = canvas.getContext('2d', { alpha: true }); } catch (error) { context = null; }
    revealState.context = context;
    if (!context) {
      canvas.classList.add('is-unavailable');
      return;
    }
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
    context.globalCompositeOperation = 'source-over';
    const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
    gradient.addColorStop(0, 'rgba(213,221,224,.95)');
    gradient.addColorStop(0.52, 'rgba(170,184,192,.91)');
    gradient.addColorStop(1, 'rgba(224,214,199,.94)');
    context.fillStyle = gradient;
    context.fillRect(0, 0, rect.width, rect.height);
    const random = seededRandom(9127);
    context.globalAlpha = 0.13;
    for (let i = 0; i < 42; i += 1) {
      context.beginPath();
      context.arc(random() * rect.width, random() * rect.height, 8 + random() * 32, 0, Math.PI * 2);
      context.fillStyle = i % 2 ? '#fff' : '#6e8190';
      context.fill();
    }
    context.globalAlpha = 1;
    revealState.cells.forEach((cell) => {
      const parts = cell.split(':').map(Number);
      eraseFogPoint((parts[0] + 0.5) * rect.width / revealState.columns, (parts[1] + 0.5) * rect.height / revealState.rows, false);
    });
    if (revealState.progress > 0) eraseFogTo(revealState.progress);
  }

  function eraseFogPoint(x, y, track) {
    const context = revealState.context;
    const radius = Math.max(26, Math.min(54, revealState.width * 0.115));
    if (context) {
      context.save();
      context.globalCompositeOperation = 'destination-out';
      const fade = context.createRadialGradient(x, y, radius * 0.25, x, y, radius);
      fade.addColorStop(0, 'rgba(0,0,0,1)');
      fade.addColorStop(0.72, 'rgba(0,0,0,.92)');
      fade.addColorStop(1, 'rgba(0,0,0,0)');
      context.fillStyle = fade;
      context.beginPath();
      context.arc(x, y, radius, 0, Math.PI * 2);
      context.fill();
      context.restore();
    }
    if (!track || revealState.complete) return;
    const cellX = Math.max(0, Math.min(revealState.columns - 1, Math.floor(x / revealState.width * revealState.columns)));
    const cellY = Math.max(0, Math.min(revealState.rows - 1, Math.floor(y / revealState.height * revealState.rows)));
    const reach = 2;
    for (let dx = -reach; dx <= reach; dx += 1) {
      for (let dy = -reach; dy <= reach; dy += 1) {
        const cx = cellX + dx;
        const cy = cellY + dy;
        if (cx >= 0 && cx < revealState.columns && cy >= 0 && cy < revealState.rows && dx * dx + dy * dy <= 5) {
          revealState.cells.add(`${cx}:${cy}`);
        }
      }
    }
    const coverage = revealState.cells.size / (revealState.columns * revealState.rows);
    updateRevealProgress(Math.min(1, coverage / 0.42));
  }

  function eraseFogTo(progress) {
    if (!revealState.context) return;
    const context = revealState.context;
    context.save();
    context.globalCompositeOperation = 'destination-out';
    context.fillStyle = '#000';
    context.fillRect(0, 0, revealState.width * progress, revealState.height);
    context.restore();
  }

  function updateRevealProgress(value) {
    if (revealState.complete) return;
    revealState.progress = Math.max(revealState.progress, Math.min(1, value));
    if (dom.revealMeter) dom.revealMeter.style.width = `${Math.round(revealState.progress * 100)}%`;
    if (dom.revealFrame) dom.revealFrame.style.setProperty('--reveal-progress', revealState.progress.toFixed(3));
    document.querySelector('#scene-reveal')?.style.setProperty('--reveal-progress', revealState.progress.toFixed(3));
    eraseFogTo(revealState.progress);
    if (revealState.progress >= 0.995) completeReveal();
  }

  function completeReveal() {
    if (revealState.complete) return;
    revealState.complete = true;
    revealState.progress = 1;
    cancelAnimationFrame(revealState.holdFrame);
    cancelAnimationFrame(revealState.autoFrame);
    if (dom.revealMeter) dom.revealMeter.style.width = '100%';
    document.querySelector('#scene-reveal')?.style.setProperty('--reveal-progress', '1');
    dom.revealFrame && dom.revealFrame.classList.add('is-complete');
    dom.fogCanvas && dom.fogCanvas.classList.add('is-cleared');
    setReady(dom.revealHold, false);
    schedule(() => {
      show(dom.revealResult, true);
      setReady(dom.revealNext, true);
      document.querySelector('#scene-reveal')?.classList.add('is-complete');
      announce('La imagen ha aparecido. Me gusta lo que estoy descubriendo de ti.');
    }, CONFIG.timings.result);
  }

  function startRevealHold() {
    if (!currentIs('reveal') || revealState.complete || revealState.holdFrame) return;
    dom.revealHold && dom.revealHold.classList.add('is-holding');
    const duration = holdDuration(CONFIG.timings.revealHold);
    revealState.holdStart = performance.now() - revealState.progress * duration;
    const tick = safe((now) => {
      if (!revealState.holdFrame || revealState.complete) return;
      updateRevealProgress((now - revealState.holdStart) / duration);
      if (!revealState.complete) revealState.holdFrame = requestAnimationFrame(tick);
    }, 'reveal-hold');
    revealState.holdFrame = requestAnimationFrame(tick);
  }

  function stopRevealHold() {
    if (revealState.holdFrame) cancelAnimationFrame(revealState.holdFrame);
    revealState.holdFrame = 0;
    dom.revealHold && dom.revealHold.classList.remove('is-holding');
  }

  function autoReveal() {
    if (revealState.complete || revealState.autoFrame) return;
    const startProgress = revealState.progress;
    const started = performance.now();
    const duration = holdDuration(CONFIG.timings.revealHold) * (1 - startProgress);
    const tick = safe((now) => {
      const ratio = duration <= 1 ? 1 : (now - started) / duration;
      updateRevealProgress(startProgress + (1 - startProgress) * ratio);
      if (!revealState.complete) revealState.autoFrame = requestAnimationFrame(tick);
    }, 'auto-reveal');
    revealState.autoFrame = requestAnimationFrame(tick);
  }

  function canvasPoint(event) {
    const rect = dom.fogCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  const dawnState = { progress: 0, frame: 0, started: 0, startProgress: 0, automatic: false, milestone: 0, complete: false };

  function updateDawn(value) {
    if (dawnState.complete) return;
    dawnState.progress = Math.max(0, Math.min(1, value));
    const percent = Math.round(dawnState.progress * 100);
    experience && experience.style.setProperty('--dawn-progress', dawnState.progress.toFixed(4));
    document.querySelector('#scene-dawn')?.style.setProperty('--dawn-progress', dawnState.progress.toFixed(4));
    if (dom.dawnMeter) dom.dawnMeter.setAttribute('aria-valuenow', String(percent));
    if (dom.dawnMeterFill) dom.dawnMeterFill.style.width = `${percent}%`;
    const milestone = Math.floor(percent / 25) * 25;
    if (milestone > dawnState.milestone && milestone < 100) {
      dawnState.milestone = milestone;
      announce(`El amanecer está al ${milestone} por ciento.`);
    }
    if (dawnState.progress >= 0.999) completeDawn();
  }

  function runDawn(automatic) {
    if (!currentIs('dawn') || dawnState.complete || dawnState.frame) return;
    dawnState.automatic = automatic;
    dawnState.started = performance.now();
    dawnState.startProgress = dawnState.progress;
    dom.dawnSun && dom.dawnSun.classList.add('is-holding');
    const total = holdDuration(automatic ? CONFIG.timings.dawnFallback : CONFIG.timings.dawnHold);
    const duration = Math.max(1, total * (1 - dawnState.startProgress));
    const tick = safe((now) => {
      if (!dawnState.frame || dawnState.complete) return;
      updateDawn(dawnState.startProgress + (now - dawnState.started) / duration * (1 - dawnState.startProgress));
      if (!dawnState.complete) dawnState.frame = requestAnimationFrame(tick);
    }, 'dawn');
    dawnState.frame = requestAnimationFrame(tick);
  }

  function stopDawn(force) {
    if (dawnState.automatic && !force) return;
    if (dawnState.frame) cancelAnimationFrame(dawnState.frame);
    dawnState.frame = 0;
    dawnState.automatic = false;
    dom.dawnSun && dom.dawnSun.classList.remove('is-holding');
  }

  function completeDawn() {
    if (dawnState.complete) return;
    dawnState.complete = true;
    dawnState.progress = 1;
    stopDawn(true);
    experience && experience.style.setProperty('--dawn-progress', '1');
    experience && (experience.dataset.timeOfDay = 'day');
    const dawnScene = document.querySelector('#scene-dawn');
    dawnScene && dawnScene.classList.add('is-complete');
    dawnScene && dawnScene.style.setProperty('--dawn-progress', '1');
    if (dom.dawnMeter) dom.dawnMeter.setAttribute('aria-valuenow', '100');
    if (dom.dawnMeterFill) dom.dawnMeterFill.style.width = '100%';
    setReady(dom.dawnSun, false);
    setReady(dom.dawnAccessible, false);
    schedule(() => {
      show(dom.dawnResult, true);
      setReady(dom.dawnNext, true);
      announce('Ha amanecido. Ya casi llega el amarillo.');
    }, CONFIG.timings.result * 0.65);
  }

  const letterState = { index: -1, changing: false };

  function setLetterPage(page) {
    if (!dom.letterText) return;
    const lines = Array.isArray(page) ? page : [String(page || '')];
    const fragment = document.createDocumentFragment();
    lines.forEach((line, index) => {
      if (index) fragment.appendChild(document.createElement('br'));
      if (index) fragment.appendChild(document.createElement('br'));
      fragment.appendChild(document.createTextNode(line));
    });
    dom.letterText.replaceChildren(fragment);
  }

  function renderLetter(index, immediate) {
    if (letterState.changing || index < 0 || index >= CONFIG.letter.length) return;
    letterState.changing = true;
    setReady(dom.letterNext, false);
    dom.letterText && dom.letterText.classList.add('is-changing');
    const change = immediate || reducedMotion ? 0 : CONFIG.timings.letterChange;
    schedule(() => {
      letterState.index = index;
      setLetterPage(CONFIG.letter[index]);
      dom.letterText && dom.letterText.classList.remove('is-changing');
      dom.letterText && dom.letterText.classList.add('is-visible');
      letterState.changing = false;
      const last = index === CONFIG.letter.length - 1;
      if (last) {
        dom.letterNext && dom.letterNext.classList.add('is-hidden');
        if (dom.letterSignature) {
          dom.letterSignature.hidden = false;
          dom.letterSignature.classList.add('is-visible');
        }
        if (dom.letterMark) {
          dom.letterMark.hidden = false;
          dom.letterMark.classList.add('is-visible');
        }
        if (dom.letterHint) dom.letterHint.textContent = 'La carta es tuya.';
        schedule(() => setReady(dom.letterFinish, true), CONFIG.timings.result * 0.7);
      } else {
        setReady(dom.letterNext, true);
        if (dom.letterHint) dom.letterHint.textContent = index ? 'Un poquito más.' : 'Una línea a la vez.';
      }
    }, change);
  }

  function showMemory() {
    if (!activeIs('pause') || dom.memory?.classList.contains('is-visible')) return;
    document.querySelector('#scene-pause')?.classList.add('is-showing-memory');
    dom.pauseCopy && dom.pauseCopy.classList.add('is-dimmed');
    show(dom.memory, true);
    setReady(dom.pauseNext, true);
    setReady(dom.pauseSkip, false);
    announce('Hay recuerdos que no necesitan explicación.');
  }

  function runEnterHook(name) {
    const scene = document.querySelector(`[data-scene="${name}"]`);
    if (name === 'intro') {
      schedule(() => dom.introStar?.classList.add('is-awake'), CONFIG.timings.introStarWake);
    } else if (name === 'reveal') {
      window.requestAnimationFrame(safe(() => { if (activeIs('reveal')) paintFog(); }, 'fog-init'));
      schedule(() => {
        revealState.ready = true;
        dom.revealFrame?.classList.add('is-ready');
        setReady(dom.revealHold, true);
      }, 2500);
    } else if (name === 'constellation') {
      schedule(() => document.querySelectorAll('.constellation-star').forEach((star) => setReady(star, true)), 900);
    } else if (name === 'painting') {
      schedule(() => {
        dom.painting?.classList.add('is-ready');
        document.querySelectorAll('.paint-point').forEach((point) => setReady(point, true));
      }, 6600);
    } else if (name === 'sunflower') {
      schedule(() => setReady(dom.sunflowerCenter, true), 2900);
    } else if (name === 'pause') {
      schedule(showMemory, CONFIG.timings.pause);
    } else if (name === 'dawn') {
      const accessDelay = Number(dom.dawnAccessible?.dataset.enterDelay || 7600);
      schedule(() => setReady(dom.dawnAccessible, true), accessDelay);
    } else if (name === 'growth') {
      schedule(() => dom.growingFlower?.classList.add('is-growing'), 650);
      schedule(() => {
        dom.growingFlower?.classList.add('is-grown');
        scene?.classList.add('is-grown');
      }, CONFIG.timings.growth);
    } else if (name === 'field') {
      window.requestAnimationFrame(() => { if (activeIs('field')) scene?.classList.add('is-growing'); });
    } else if (name === 'letter') {
      if (letterState.index < 0) schedule(() => renderLetter(0, true), 450);
      else setReady(dom.letterNext, letterState.index < CONFIG.letter.length - 1);
    } else if (name === 'final') {
      makeParticles(dom.finalParticles, reducedMotion ? 7 : 16, 'light-particle', 73421);
      scene?.classList.add('is-awake');
    }
  }

  function stopContinuousInteractions() {
    stopRevealHold();
    cancelAnimationFrame(revealState.autoFrame);
    revealState.autoFrame = 0;
    revealState.dragging = false;
    revealState.pointerId = null;
    revealState.lastPoint = null;
    stopDawn(true);
    show(dom.easterMessage, false);
  }

  function resetStoryState() {
    clearSceneTimers();
    document.querySelectorAll('.reveal-copy').forEach((element) => {
      element.classList.remove('is-visible');
      element.setAttribute('aria-hidden', 'true');
    });
    document.querySelectorAll('.scene').forEach((scene) => scene.classList.remove('is-complete', 'is-grown', 'is-growing', 'is-showing-memory', 'is-awake', 'is-star-touched'));
    dom.introStar?.classList.remove('is-awake', 'is-touched');
    dom.introBefore?.classList.remove('is-hidden');
    dom.introBefore?.setAttribute('aria-hidden', 'false');
    show(dom.introAfter, false);
    dom.introAfter?.querySelectorAll('.story-line').forEach((line) => {
      line.classList.remove('is-visible');
      line.setAttribute('aria-hidden', 'true');
    });
    setReady(dom.introStar, false);
    setReady(dom.beginNight, false);
    dom.specialStar?.classList.remove('is-touched');
    setReady(dom.specialStar, false);
    show(dom.nightStars, false);
    document.querySelectorAll('.constellation-star').forEach((star) => {
      star.classList.remove('is-lit');
      star.removeAttribute('aria-pressed');
      setReady(star, false);
    });
    dom.constellation?.classList.remove('is-complete');
    show(dom.constellationResult, false);
    setReady(dom.constellationNext, false);
    show(dom.easterMessage, false);
    easterCount = 0;
    revealState.cells.clear();
    revealState.progress = 0;
    revealState.ready = false;
    revealState.complete = false;
    if (dom.fogCanvas) {
      dom.fogCanvas.classList.remove('is-cleared');
      dom.fogCanvas.style.opacity = '';
    }
    if (dom.revealMeter) dom.revealMeter.style.width = '0%';
    document.querySelector('#scene-reveal')?.style.setProperty('--reveal-progress', '0');
    dom.revealFrame?.classList.remove('is-complete', 'is-ready');
    show(dom.revealResult, false);
    setReady(dom.revealHold, false);
    setReady(dom.revealNext, false);
    document.querySelectorAll('[data-piece-layer], .paint-point').forEach((piece) => piece.classList.remove('is-painted'));
    dom.paintSpark?.classList.remove('is-active', 'is-visible');
    document.querySelectorAll('.paint-point').forEach((point) => {
      point.removeAttribute('aria-pressed');
      setReady(point, false);
    });
    dom.painting?.classList.remove('is-complete', 'is-ready');
    show(dom.paintingResult, false);
    setReady(dom.paintingNext, false);
    dom.sunflower?.classList.remove('is-blooming', 'is-bloomed');
    show(dom.sunflowerResult, false);
    setReady(dom.sunflowerCenter, false);
    setReady(dom.sunflowerNext, false);
    dom.pauseCopy?.classList.remove('is-dimmed');
    show(dom.memory, false);
    setReady(dom.pauseNext, false);
    setReady(dom.pauseSkip, true);
    dawnState.progress = 0;
    dawnState.complete = false;
    dawnState.milestone = 0;
    experience && experience.style.setProperty('--dawn-progress', '0');
    document.querySelector('#scene-dawn')?.style.setProperty('--dawn-progress', '0');
    document.querySelector('#scene-dawn')?.classList.remove('is-complete');
    if (dom.dawnMeter) dom.dawnMeter.setAttribute('aria-valuenow', '0');
    if (dom.dawnMeterFill) dom.dawnMeterFill.style.width = '0%';
    show(dom.dawnResult, false);
    setReady(dom.dawnSun, false);
    setReady(dom.dawnAccessible, false);
    setReady(dom.dawnNext, false);
    dom.growingFlower?.classList.remove('is-growing', 'is-grown');
    setReady(dom.growthNext, false);
    setReady(dom.fieldNext, false);
    letterState.index = -1;
    letterState.changing = false;
    if (dom.letterText) {
      dom.letterText.textContent = '';
      dom.letterText.classList.remove('is-visible', 'is-changing');
    }
    if (dom.letterHint) dom.letterHint.textContent = 'Una línea a la vez.';
    if (dom.letterNext) dom.letterNext.classList.remove('is-hidden');
    setReady(dom.letterNext, false);
    setReady(dom.letterFinish, false);
    if (dom.letterSignature) {
      dom.letterSignature.hidden = true;
      dom.letterSignature.classList.remove('is-visible');
    }
    if (dom.letterMark) {
      dom.letterMark.hidden = true;
      dom.letterMark.classList.remove('is-visible');
    }
    setReady(dom.replay, false);
    if (experience) experience.dataset.timeOfDay = 'night';
  }

  let easterCount = 0;

  function bindInteractions() {
    listen(dom.introStar, 'click', () => {
      if (!currentIs('intro') || dom.introStar.disabled || dom.introStar.classList.contains('is-touched')) return;
      dom.introStar.classList.add('is-touched');
      document.querySelector('#scene-intro')?.classList.add('is-star-touched');
      setReady(dom.introStar, false);
      dom.introBefore?.classList.add('is-hidden');
      dom.introBefore?.setAttribute('aria-hidden', 'true');
      show(dom.introAfter, true);
      const lines = Array.from(dom.introAfter?.querySelectorAll('.story-line') || []);
      lines.forEach((line, index) => schedule(() => {
        line.classList.add('is-visible');
        line.removeAttribute('aria-hidden');
      }, CONFIG.timings.introLines[index] || index * 2500));
      schedule(() => setReady(dom.beginNight, true), CONFIG.timings.introButton);
    });
    listen(dom.beginNight, 'click', () => currentIs('intro') && sceneManager.nextScene());
    listen(dom.specialStar, 'click', () => {
      if (!currentIs('night') || dom.specialStar.disabled || dom.specialStar.classList.contains('is-touched')) return;
      dom.specialStar.classList.add('is-touched');
      setReady(dom.specialStar, false);
      makeParticles(dom.nightStars, reducedMotion ? 9 : 21, 'new-star', 19842);
      show(dom.nightStars, true);
      playChime();
      schedule(() => sceneManager.nextScene(), CONFIG.timings.nightBurst);
    });
    document.querySelectorAll('.constellation-star').forEach((star) => listen(star, 'click', () => {
      if (!currentIs('constellation') || star.disabled || star.classList.contains('is-lit')) return;
      star.classList.add('is-lit');
      star.setAttribute('aria-pressed', 'true');
      setReady(star, false);
      announce(star.dataset.word || 'Una estrella encendida');
      const stars = Array.from(document.querySelectorAll('.constellation-star'));
      if (stars.every((item) => item.classList.contains('is-lit'))) {
        dom.constellation?.classList.add('is-complete');
        schedule(() => {
          show(dom.constellationResult, true);
          setReady(dom.constellationNext, true);
        }, CONFIG.timings.result);
      }
    }));
    listen(dom.easterStar, 'click', () => {
      if (!currentIs('constellation')) return;
      easterCount += 1;
      dom.easterStar?.classList.add('is-tapped');
      window.setTimeout(() => dom.easterStar?.classList.remove('is-tapped'), 160);
      if (easterCount === 3) {
        show(dom.easterMessage, true);
        schedule(() => show(dom.easterMessage, false), CONFIG.timings.easterEgg);
      }
    });
    listen(dom.constellationNext, 'click', () => currentIs('constellation') && sceneManager.nextScene());

    listen(dom.fogCanvas, 'pointerdown', (event) => {
      if (!currentIs('reveal') || !revealState.ready || revealState.complete) return;
      revealState.dragging = true;
      revealState.pointerId = event.pointerId;
      try { dom.fogCanvas.setPointerCapture(event.pointerId); } catch (error) { /* capture is optional */ }
      const point = canvasPoint(event);
      revealState.lastPoint = point;
      eraseFogPoint(point.x, point.y, true);
    });
    listen(dom.fogCanvas, 'pointermove', (event) => {
      if (!revealState.dragging || event.pointerId !== revealState.pointerId) return;
      if (event.cancelable) event.preventDefault();
      const point = canvasPoint(event);
      const previous = revealState.lastPoint || point;
      const distance = Math.hypot(point.x - previous.x, point.y - previous.y);
      const steps = Math.max(1, Math.ceil(distance / 20));
      for (let step = 1; step <= steps; step += 1) {
        const ratio = step / steps;
        eraseFogPoint(previous.x + (point.x - previous.x) * ratio, previous.y + (point.y - previous.y) * ratio, true);
      }
      revealState.lastPoint = point;
    }, { passive: false });
    const endCanvas = () => { revealState.dragging = false; revealState.pointerId = null; revealState.lastPoint = null; };
    listen(dom.fogCanvas, 'pointerup', endCanvas);
    listen(dom.fogCanvas, 'pointercancel', endCanvas);
    listen(dom.fogCanvas, 'lostpointercapture', endCanvas);

    listen(dom.revealHold, 'pointerdown', (event) => {
      if (dom.revealHold.disabled) return;
      try { dom.revealHold.setPointerCapture(event.pointerId); } catch (error) { /* optional */ }
      startRevealHold();
    });
    listen(dom.revealHold, 'pointerup', stopRevealHold);
    listen(dom.revealHold, 'pointercancel', stopRevealHold);
    listen(dom.revealHold, 'lostpointercapture', stopRevealHold);
    listen(dom.revealHold, 'keydown', (event) => {
      if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
        event.preventDefault();
        startRevealHold();
      }
    });
    listen(dom.revealHold, 'keyup', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        stopRevealHold();
        autoReveal();
      }
    });
    listen(dom.revealHold, 'click', (event) => { if (event.detail === 0) autoReveal(); });
    listen(dom.revealNext, 'click', () => currentIs('reveal') && sceneManager.nextScene());

    document.querySelectorAll('.paint-point').forEach((point) => listen(point, 'click', () => {
      if (!currentIs('painting') || point.disabled || point.classList.contains('is-painted')) return;
      const piece = point.dataset.paintPiece;
      point.classList.add('is-painted');
      point.setAttribute('aria-pressed', 'true');
      setReady(point, false);
      document.querySelector(`[data-piece-layer="${piece}"]`)?.classList.add('is-painted');
      if (dom.paintSpark) {
        dom.paintSpark.style.setProperty('--spark-x', point.style.getPropertyValue('--x'));
        dom.paintSpark.style.setProperty('--spark-y', point.style.getPropertyValue('--y'));
        dom.paintSpark.style.left = point.style.getPropertyValue('--x');
        dom.paintSpark.style.top = point.style.getPropertyValue('--y');
        dom.paintSpark.classList.remove('is-active', 'is-visible');
        void dom.paintSpark.offsetWidth;
        dom.paintSpark.classList.add('is-active', 'is-visible');
      }
      const points = Array.from(document.querySelectorAll('.paint-point'));
      if (points.every((item) => item.classList.contains('is-painted'))) {
        dom.painting?.classList.add('is-complete');
        schedule(() => {
          show(dom.paintingResult, true);
          setReady(dom.paintingNext, true);
        }, CONFIG.timings.result);
      }
    }));
    listen(dom.paintingNext, 'click', () => currentIs('painting') && sceneManager.nextScene());
    listen(dom.sunflowerCenter, 'click', () => {
      if (!currentIs('sunflower') || dom.sunflowerCenter.disabled) return;
      setReady(dom.sunflowerCenter, false);
      dom.sunflower?.classList.add('is-blooming');
      schedule(() => {
        dom.sunflower?.classList.add('is-bloomed');
        document.querySelector('#scene-sunflower')?.classList.add('is-complete');
        show(dom.sunflowerResult, true);
        setReady(dom.sunflowerNext, true);
        announce('El girasol se ha abierto. Me basta con que seas tú.');
      }, CONFIG.timings.bloom);
    });
    listen(dom.sunflowerNext, 'click', () => currentIs('sunflower') && sceneManager.nextScene());
    listen(dom.pauseSkip, 'click', showMemory);
    listen(dom.pauseNext, 'click', () => currentIs('pause') && sceneManager.nextScene());
    listen(dom.dawnSun, 'pointerdown', (event) => {
      if (dom.dawnSun.disabled) return;
      try { dom.dawnSun.setPointerCapture(event.pointerId); } catch (error) { /* optional */ }
      runDawn(false);
    });
    listen(dom.dawnSun, 'pointerup', () => stopDawn(false));
    listen(dom.dawnSun, 'pointercancel', () => stopDawn(false));
    listen(dom.dawnSun, 'lostpointercapture', () => stopDawn(false));
    listen(dom.dawnSun, 'keydown', (event) => {
      if ((event.key === ' ' || event.key === 'Enter') && !event.repeat) {
        event.preventDefault();
        runDawn(false);
      }
    });
    listen(dom.dawnSun, 'keyup', (event) => {
      if (event.key === ' ' || event.key === 'Enter') {
        event.preventDefault();
        stopDawn(false);
      }
    });
    listen(dom.dawnAccessible, 'click', () => runDawn(true));
    listen(dom.dawnNext, 'click', () => currentIs('dawn') && sceneManager.nextScene());
    listen(dom.growthNext, 'click', () => currentIs('growth') && sceneManager.nextScene());
    listen(dom.fieldNext, 'click', () => currentIs('field') && sceneManager.nextScene());
    listen(dom.letterNext, 'click', () => {
      if (!currentIs('letter') || letterState.changing) return;
      renderLetter(letterState.index + 1, false);
    });
    listen(dom.letterFinish, 'click', () => currentIs('letter') && sceneManager.nextScene());
    listen(dom.replay, 'click', () => {
      if (!currentIs('final')) return;
      sceneManager.transitionToScene('intro', { replay: true });
    });
  }

  function setupOptionalImages() {
    document.querySelectorAll('img[data-optional-image]').forEach((image) => {
      const key = image.dataset.optionalImage;
      const source = CONFIG.images[key];
      image.hidden = true;
      if (!source) {
        image.classList.add('is-missing');
        return;
      }
      listen(image, 'load', () => {
        if (!image.naturalWidth) return;
        image.hidden = false;
        image.classList.add('is-loaded');
        image.classList.remove('is-missing');
        image.parentElement?.classList.add('has-optional-image');
      }, { once: true });
      listen(image, 'error', () => {
        image.hidden = true;
        image.classList.add('is-missing');
        image.parentElement?.classList.add('uses-fallback');
      }, { once: true });
      image.decoding = 'async';
      image.src = source;
    });
  }

  let audioWanted = false;
  let audioUnavailable = false;

  function updateAudioControl(playing) {
    if (!dom.audioControl) return;
    dom.audioControl.setAttribute('aria-pressed', String(playing));
    dom.audioControl.setAttribute('aria-label', playing ? 'Silenciar música' : 'Activar música');
    if (dom.audioLabel) dom.audioLabel.textContent = playing ? 'Silenciar música' : 'Activar música';
    if (dom.audioIcon) dom.audioIcon.textContent = playing ? '♫' : '♪';
    dom.audioControl.classList.toggle('is-playing', playing);
  }

  function audioFailed() {
    audioUnavailable = true;
    audioWanted = false;
    if (dom.audio) dom.audio.pause();
    updateAudioControl(false);
    if (dom.audioControl) {
      dom.audioControl.classList.add('is-unavailable');
      dom.audioControl.disabled = true;
      dom.audioControl.setAttribute('aria-label', 'Música no disponible');
    }
  }

  function toggleAudio() {
    if (!dom.audio || audioUnavailable) return;
    if (audioWanted && !dom.audio.paused) {
      audioWanted = false;
      dom.audio.pause();
      updateAudioControl(false);
      return;
    }
    audioWanted = true;
    dom.audio.volume = CONFIG.audioVolume;
    const promise = dom.audio.play();
    if (promise && typeof promise.then === 'function') {
      promise.then(() => updateAudioControl(true)).catch(audioFailed);
    } else {
      updateAudioControl(true);
    }
  }

  function playChime() {
    if (!audioWanted || audioUnavailable) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!AudioContext) return;
      const context = new AudioContext();
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.frequency.value = 659.25;
      oscillator.type = 'sine';
      gain.gain.setValueAtTime(0.0001, context.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.025, context.currentTime + 0.025);
      gain.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.48);
      oscillator.connect(gain).connect(context.destination);
      oscillator.start();
      oscillator.stop(context.currentTime + 0.5);
      oscillator.addEventListener('ended', safe(() => {
        if (typeof context.close === 'function') {
          const closing = context.close();
          if (closing && typeof closing.catch === 'function') closing.catch(() => {});
        }
      }, 'audio-context-close'), { once: true });
    } catch (error) {
      /* The optional chime must never affect the story. */
    }
  }

  function setupAudio() {
    if (!dom.audio || !dom.audioControl) return;
    dom.audio.volume = CONFIG.audioVolume;
    updateAudioControl(false);
    listen(dom.audioControl, 'click', toggleAudio);
    listen(dom.audio, 'error', audioFailed);
    dom.audio.querySelectorAll('source').forEach((source) => listen(source, 'error', audioFailed));
  }

  function setViewportUnit() {
    root.style.setProperty('--app-height', `${window.innerHeight}px`);
  }

  function setupEnvironment() {
    let parallaxFrame = 0;
    makeParticles(dom.ambientStars, reducedMotion ? 14 : 30, 'ambient-star', 481516);
    setViewportUnit();
    listen(window, 'resize', () => {
      setViewportUnit();
      if (currentIs('reveal') && !revealState.complete) paintFog();
    }, { passive: true });
    listen(document, 'visibilitychange', () => {
      if (document.hidden) {
        stopContinuousInteractions();
        if (dom.audio && !dom.audio.paused) dom.audio.pause();
      } else if (audioWanted && dom.audio && !audioUnavailable) {
        const promise = dom.audio.play();
        if (promise && promise.catch) promise.then(() => updateAudioControl(true)).catch(audioFailed);
      }
    });
    if (reduceQuery.addEventListener) {
      reduceQuery.addEventListener('change', safe((event) => {
        reducedMotion = event.matches;
        root.dataset.reducedMotion = reducedMotion ? 'true' : 'false';
        if (reducedMotion) {
          if (parallaxFrame) cancelAnimationFrame(parallaxFrame);
          parallaxFrame = 0;
          experience?.style.removeProperty('--pointer-x');
          experience?.style.removeProperty('--pointer-y');
          stopContinuousInteractions();
        }
      }, 'motion-change'));
    }
    listen(window, 'pointermove', (event) => {
      if (reducedMotion || (event.pointerType && event.pointerType !== 'mouse')) return;
      if (parallaxFrame) return;
      const x = event.clientX / Math.max(1, window.innerWidth) - 0.5;
      const y = event.clientY / Math.max(1, window.innerHeight) - 0.5;
      parallaxFrame = requestAnimationFrame(() => {
        parallaxFrame = 0;
        if (reducedMotion) return;
        experience?.style.setProperty('--pointer-x', x.toFixed(3));
        experience?.style.setProperty('--pointer-y', y.toFixed(3));
      });
    }, { passive: true });
  }

  function waitFor(predicate, label, timeout) {
    const started = performance.now();
    const limit = timeout || 5000;
    return new Promise((resolve, reject) => {
      const check = () => {
        let result = false;
        try { result = Boolean(predicate()); } catch (error) { reject(error); return; }
        if (result) { resolve(); return; }
        if (performance.now() - started > limit) { reject(new Error(`Self-test timeout: ${label}`)); return; }
        window.setTimeout(check, 8);
      };
      check();
    });
  }

  async function selfTest() {
    const ready = (element) => element && !element.disabled;
    const inScene = (name) => sceneManager.currentSceneName === name && !sceneManager.isTransitioning;
    await waitFor(() => ready(dom.introStar), 'intro star');
    dom.introStar.click();
    await waitFor(() => ready(dom.beginNight), 'intro narrative');
    dom.beginNight.click();
    await waitFor(() => inScene('night'), 'night');
    await waitFor(() => ready(dom.specialStar), 'special star');
    dom.specialStar.click();
    await waitFor(() => inScene('constellation'), 'constellation');
    dom.easterStar.click(); dom.easterStar.click(); dom.easterStar.click();
    if (!dom.easterMessage.classList.contains('is-visible')) throw new Error('Easter egg did not open');
    await waitFor(() => Array.from(document.querySelectorAll('.constellation-star')).every(ready), 'constellation controls');
    document.querySelectorAll('.constellation-star').forEach((star) => star.click());
    await waitFor(() => ready(dom.constellationNext), 'constellation complete');
    dom.constellationNext.click();
    await waitFor(() => inScene('reveal'), 'reveal');
    await waitFor(() => ready(dom.revealHold), 'reveal fallback');
    completeReveal();
    await waitFor(() => ready(dom.revealNext), 'fog reveal');
    dom.revealNext.click();
    await waitFor(() => inScene('painting'), 'painting');
    await waitFor(() => Array.from(document.querySelectorAll('.paint-point')).every(ready), 'painting controls');
    document.querySelectorAll('.paint-point').forEach((point) => point.click());
    await waitFor(() => ready(dom.paintingNext), 'painting complete');
    dom.paintingNext.click();
    await waitFor(() => inScene('sunflower'), 'sunflower');
    await waitFor(() => ready(dom.sunflowerCenter), 'sunflower control');
    dom.sunflowerCenter.click();
    await waitFor(() => ready(dom.sunflowerNext), 'sunflower bloom');
    dom.sunflowerNext.click();
    await waitFor(() => inScene('pause'), 'pause');
    dom.pauseSkip.click();
    await waitFor(() => ready(dom.pauseNext), 'memory');
    dom.pauseNext.click();
    await waitFor(() => inScene('dawn'), 'dawn');
    await waitFor(() => ready(dom.dawnAccessible), 'accessible dawn');
    completeDawn();
    await waitFor(() => ready(dom.dawnNext), 'dawn complete');
    dom.dawnNext.click();
    await waitFor(() => inScene('growth'), 'growth');
    await waitFor(() => ready(dom.growthNext), 'growth complete');
    dom.growthNext.click();
    await waitFor(() => inScene('field'), 'field');
    await waitFor(() => ready(dom.fieldNext), 'field narrative');
    dom.fieldNext.click();
    await waitFor(() => inScene('letter'), 'letter');
    await waitFor(() => ready(dom.letterNext), 'letter first page');
    let turns = 0;
    while (!ready(dom.letterFinish) && turns < CONFIG.letter.length + 2) {
      await waitFor(() => ready(dom.letterNext) || ready(dom.letterFinish), 'letter page');
      if (ready(dom.letterNext)) dom.letterNext.click();
      turns += 1;
    }
    await waitFor(() => ready(dom.letterFinish), 'letter finish');
    dom.letterFinish.click();
    await waitFor(() => inScene('final'), 'final scene');
    await waitFor(() => ready(dom.replay), 'final narrative');
    if (root.dataset.selfTest !== 'failed') root.dataset.selfTest = 'passed';
  }

  function init() {
    if (!experience || sceneElements.length === 0) throw new Error('No se encontró la estructura de escenas.');
    setupOptionalImages();
    setupAudio();
    setupEnvironment();
    bindInteractions();
    resetStoryState();
    sceneManager = new SceneManager(sceneElements);
    window.sceneManager = sceneManager;
    const startScene = selfTestMode ? 'intro' : previewMode ? previewRequest : 'intro';
    sceneManager.start(startScene);
    root.dataset.appReady = 'true';
    if (selfTestMode) selfTest().catch((error) => reportError(error, 'self-test'));
  }

  listen(window, 'error', (event) => {
    if (selfTestMode && event.error) reportError(event.error, 'window-error');
  });
  listen(window, 'unhandledrejection', (event) => {
    if (selfTestMode) {
      event.preventDefault();
      reportError(event.reason || new Error('Unhandled promise rejection'), 'promise');
    }
  });

  try {
    init();
  } catch (error) {
    reportError(error, 'initialization');
  }
})();
