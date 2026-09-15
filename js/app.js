/*
 * Un girasol antes del amanecer · V2
 * Experiencia narrativa sin dependencias.
 */
(function () {
  'use strict';

  const line = (text, className) => ({ text, className: className || '' });
  const page = (lines, options) => Object.assign({
    lines: lines.map((item) => typeof item === 'string' ? line(item) : item)
  }, options || {});

  const LOVE_ECHOES = [
    '¿Llegaste bien?',
    'Buenas noches.',
    'Dios te bendiga.',
    'Llámame cuando puedas.',
    'Descansa.',
    'Te quiero.',
    '¿Cómo te fue hoy?',
    'Avísame cuando llegues.'
  ];

  const CONFIG = {
    images: {
      foto1: 'assets/images/foto-1.jpg',
      foto2: 'assets/images/foto-2.jpg'
    },
    voiceTranscript: '',
    audio: {
      scorePath: 'assets/audio/yellow.mp3',
      voicePath: 'assets/audio/joseph-voz.mp3',
      cues: {
        intro: 0.12,
        night: 0.14,
        constellation: 0.16,
        reveal: 0.15,
        painting: 0.18,
        truth: 0.03,
        love: 0.025,
        better: 0.035,
        threshold: 0,
        awakening: 0.16,
        dawn: 0.17,
        growth: 0.21,
        brighter: 0.23,
        field: 0.25,
        letter: 0.17,
        final: 0.26,
        epilogue: 0.21
      }
    },
    timings: {
      transition: 1050,
      awakening: 5200,
      introStarWake: 900,
      nightBurst: 950,
      resultDelay: 550,
      revealHold: 2300,
      dawnHold: 3100,
      dawnFallback: 1700,
      growthVisual: 4300,
      voiceSilence: 1600,
      voiceProbe: 1800,
      focus: 90
    },
    sequences: {
      intro: [
        page(['Quiero hacer las cosas bien para que puedas volver a sentir, no convencerte de sentir.'], { hold: 4300 }),
        page(['No quiero volver a lo que éramos.'], { hold: 2800 }),
        page(['Quiero que, si algún día volvemos a elegirnos, construyamos algo todavía más verdadero.'], { hold: 4800 })
      ],
      night: [
        page(['La noche guarda distancia.', 'Errores.', 'Cosas que dejaron de decirse.'], { hold: 4200 }),
        page(['También guarda incertidumbre.', 'Recuerdos.', 'Y lo que todavía permanece.'], { hold: 4200 })
      ],
      constellationIntro: [
        page(['Las estrellas revelan cosas que antes parecían pequeñas pero tenían mucho significado.'], { hold: 3900 })
      ],
      constellationResult: [
        page([line('Extraño esas cosas.', 'narrative-line--accent')], { hold: 2800 }),
        page(['Pero no quiero que vuelvan solamente porque las extraño.'], { hold: 3900 }),
        page(['Quiero que si algún día regresan…', '…sea porque volvieron a nacer.'], { hold: 4200 })
      ],
      revealIntro: [
        page(['Algunas cosas fueron deteriorándose.'], { hold: 3000 }),
        page(['Y mirar de verdad también significa reconocerlo.', 'Sin esconderlo detrás de algo bonito.'], { hold: 4300 })
      ],
      revealResult: [
        page(['Lo que todavía permanece no borra lo que dolió.'], { hold: 3300 }),
        page(['Pero puede ser un lugar honesto desde el cual empezar a aprender.'], { hold: 3900 })
      ],
      paintingIntro: [
        page(['No quiero pintar encima de mis errores como si nunca hubieran ocurrido.', 'Quiero aprender de ellos.'], { hold: 5000 })
      ],
      paintingResult: [
        page(['No puedo prometerte que nunca volveré a equivocarme.', 'Pero sí quiero aprender a quererte mejor.'], { hold: 5000 }),
        page(['Que lo que siento no se quede solamente dentro de mí.', 'Que también puedas sentirlo en mi forma de tratarte.'], { hold: 5000 }),
        page(['Y si algún día volvemos a pintar algo juntos…', 'No quiero que sea como antes.'], { hold: 4600 }),
        page([line('Quiero que sea mejor.', 'narrative-line--statement narrative-line--accent')], { hold: 3500 })
      ],
      truth: [
        page([line('Andrea…', 'narrative-line--address')], { minHold: 3100 }),
        page(['Hay algo que no quiero esconder detrás de una página bonita.'], { minHold: 2400 }),
        page(['La verdad es que me duele cómo se han dado las cosas últimamente.'], { minHold: 2600 }),
        page(['Me duele sentir que algunas cosas que antes nos salían tan natural…', '…hoy parecen tan lejos.'], { minHold: 2800 }),
        page(['Sé que me he equivocado.', 'Sé que no soy perfecto.', 'Y sé que hubo momentos en los que te demostré mucho menos de lo que realmente sentía.'], { minHold: 3900 }),
        page(['Pero hay algo que quiero decirte sin adornarlo.'], { minHold: 2400 }),
        page([line('Te quiero.', 'narrative-line--statement truth-emphasis')], { minHold: 4200 }),
        page([line('De verdad te quiero.', 'narrative-line--statement truth-emphasis')], { minHold: 3100 }),
        page(['Y sí…', 'espero volver a escuchar algún día un ‘te quiero’ tuyo.'], { minHold: 3000 }),
        page(['Espero volver a escuchar un ‘buenas noches, mi amor’.', 'Un ‘Dios te bendiga’.', 'Espero volver a escuchar tu voz en llamadas que duren mucho más de lo que planeábamos.'], { minHold: 3900 }),
        page(['Espero que vuelvan esas ganas de buscarnos.'], { minHold: 2400 }),
        page(['Y también espero…', '…que todavía no sea demasiado tarde para recuperarte.'], { minHold: 3100 }),
        page(['Porque si algún día descubro que sí lo fue…', '…claro que me va a doler.'], { minHold: 2900 }),
        page([line('Probablemente mil y una noches.', 'narrative-line--human')], { minHold: 2800 }),
        page(['Pero tampoco quiero convertir mi dolor en una responsabilidad tuya.'], { minHold: 3300 }),
        page(['No quiero presionarte.', 'No quiero hostigarte.', 'No quiero convencerte hasta cansarte.'], { minHold: 3300 }),
        page(['No quiero que vuelvas porque me viste mal.', 'No quiero que vuelvas por lástima.', 'No quiero que vuelvas porque sientas que me debes algo.'], { minHold: 3600 }),
        page(['Si algún día vuelves a elegirme…', '…quiero que sea porque te nació.', 'Porque volvió el sentimiento.'], { minHold: 3500 }),
        page(['Porque volviste a sentir ganas.', 'Porque te sentiste bien conmigo otra vez.', 'Porque también quisiste quedarte.'], { minHold: 3500 })
      ],
      love: [
        page(['Qué palabra tan sencilla parecía…'], { hold: 3000 }),
        page(['…hasta que dejamos de decirla.'], { hold: 3200 }),
        page(['Y entonces entendí que nunca fueron solamente cuatro letras.'], { hold: 4200, effect: 'echoes', accessibleLines: LOVE_ECHOES }),
        page(['Todo eso también cabía dentro de ‘amor’.'], { hold: 3400 }),
        page(['No quiero recuperar esa palabra a la fuerza.'], { hold: 3500 }),
        page(['Ni quiero volver simplemente a como éramos antes.'], { hold: 3900 }),
        page([line('Quiero algo mejor.', 'narrative-line--statement narrative-line--accent')], { hold: 3900, effect: 'warmth' })
      ],
      better: [
        page([line('Quiero algo mejor que antes.', 'narrative-line--statement narrative-line--accent')], { hold: 3600 }),
        page(['Si algún día volvemos a decirnos amor…', 'quiero que esa palabra signifique todavía más.'], { hold: 4500 }),
        page(['Que podamos querernos sin tanto miedo.', 'Sin dejar que el orgullo gane.', 'Sin esconder lo que sentimos.'], { hold: 4700 }),
        page(['Sin guardarnos un ‘te quiero’ solamente por miedo a decir demasiado.', 'Sin hacer como si no nos importara cuando sí nos importa.'], { hold: 4800 }),
        page(['Quiero que podamos dejarnos llevar…', '…no por impulsos vacíos…', '…sino por todo ese amor que alguna vez sentimos y por todo el que todavía podamos construir.'], { hold: 5600 }),
        page(['No quiero repetir nuestra historia.'], { hold: 3000 }),
        page([line('Quiero escribir contigo una versión más verdadera.', 'narrative-line--accent')], { hold: 4300, effect: 'warmth' })
      ],
      threshold: [
        page(['No quiero pedirte el amanecer.'], { hold: 3200 }),
        page(['Quiero seguir haciendo las cosas necesarias…', '…para merecer la posibilidad de verlo contigo.'], { hold: 4900 })
      ],
      dawnIntro: [
        page(['Quizás amar también es esto…', 'aprender.', 'corregir.'], { hold: 4300 }),
        page(['volver a intentar.', 'demostrar.'], { hold: 3300 }),
        page(['Pero hay algo que no depende solamente de mí.'], { hold: 3700 }),
        page([line('Que vuelva a nacer en ti.', 'narrative-line--accent')], { hold: 3600 })
      ],
      dawnResult: [
        page(['Yo puedo sembrar.', 'Puedo cuidar.', 'Puedo demostrar.'], { hold: 4100 }),
        page([line('Pero una flor solamente abre cuando está lista.', 'narrative-line--accent')], { hold: 4300 })
      ],
      growth: [
        page(['Por eso no quiero pedirte que vuelvas a sentir.'], { hold: 3900 }),
        page(['Quiero darte razones para que quizá algún día vuelva a suceder.'], { hold: 4500 }),
        page(['Que vuelva un ‘te quiero’.', 'Que algún día vuelva un ‘mi amor’.'], { hold: 4100 }),
        page(['Que vuelvan las llamadas.', 'Que vuelva esa tranquilidad de saber que podemos buscarnos.', 'Que vuelvan las ganas.'], { hold: 5000 }),
        page(['Pero no exactamente como antes.'], { hold: 3500 }),
        page([line('Mejor.', 'narrative-line--statement narrative-line--accent')], { hold: 3300 })
      ],
      brighter: [
        page(['Más sincero.', 'Más tranquilo.', 'Más intenso.'], { hold: 3700 }),
        page([line('Más nuestro.', 'narrative-line--accent')], { hold: 2800 }),
        page(['Sin tanto miedo.', 'Sin orgullo.', 'Sin juegos.'], { hold: 3700 }),
        page(['Sin esconder lo que sentimos.'], { hold: 3000 }),
        page(['Solo dos personas…', '…dejándose querer.', '…dejándose cuidar.'], { hold: 4300 }),
        page(['…dejándose llevar por todo lo bonito que pueda volver a crecer.'], { hold: 4300 }),
        page([line('Eso es lo que quisiera construir contigo.', 'narrative-line--accent')], { hold: 4100 })
      ],
      field: [
        page(['El 21 es el Día de las Flores Amarillas.'], { hold: 3500 }),
        page(['Pero este año las tuyas llegaron antes.', 'Porque hay cosas bonitas…', '…que no deberían esperar una fecha.'], { hold: 5000 }),
        page(['Y estas flores no vienen a pedirte una respuesta.', 'Ni a pedirte que me elijas hoy.'], { hold: 4700 }),
        page(['Son solamente otra forma de seguir demostrándote que me importas.'], { hold: 4200 }),
        page(['Porque si algún día vuelves a elegirme…', '…quiero que sea porque realmente te nació.'], { hold: 4600 }),
        page(['Y si alguna vez volvemos a decirnos ‘amor’…', '…quiero que sea porque esa palabra volvió a quedarnos pequeña para todo lo que sentimos.'], { hold: 5400 })
      ],
      letter: [
        page(['sé que me he equivocado.', 'Y sé que reconocerlo no borra nada.', 'Hubo momentos en los que te quise muchísimo y aun así te demostré mucho menos de lo que sentía.'], { minHold: 700 }),
        page(['Y ahora entiendo algo que antes quizá no entendía igual:', 'querer a alguien no basta si esa persona no logra sentir ese cariño en nuestros actos.'], { minHold: 700 }),
        page(['Por eso no quiero esconder mis errores detrás de esta página.', 'Ni detrás de unas flores.', 'Ni detrás de palabras bonitas.', 'Quiero aprender de ellos.'], { minHold: 700 }),
        page(['Quiero escucharte mejor.', 'Estar más.', 'Cuidarte mejor.', 'Demostrar más.', 'Y sí…', 'quiero volver a conquistarte.'], { minHold: 700 }),
        page(['Porque me duele cómo se han dado las cosas últimamente.', 'Me duele que un ‘te quiero’ que antes parecía tan sencillo ahora pueda sentirse tan lejos.', 'Me duele extrañar un ‘buenas noches, mi amor’.', 'Un ‘Dios te bendiga’.', 'Una llamada sin mirar cuánto tiempo llevábamos hablando.'], { minHold: 700 }),
        page(['Pero aunque me duela, no quiero que ese dolor se convierta en presión para ti.', 'No quiero hostigarte.', 'No quiero insistir hasta conseguir una respuesta.', 'No quiero que vuelvas por lástima.'], { minHold: 700 }),
        page(['Quiero que, si algún día me vuelves a elegir, sea porque algo dentro de ti volvió a sentirlo.', 'Porque nuevamente tuviste ganas de buscarme.', 'Porque volviste a sentir tranquilidad conmigo.', 'Porque un ‘te quiero’ volvió a nacer sin que nadie tuviera que pedirlo.'], { minHold: 700 }),
        page(['Y también quiero decirte algo más.', 'No quiero simplemente volver a como éramos antes.', 'Si algún día tenemos la oportunidad de encontrarnos nuevamente de esa manera…', 'quiero algo mejor.'], { minHold: 700 }),
        page(['Quiero que podamos querernos sin tanto miedo.', 'Sin dejar que el orgullo nos haga guardar palabras.', 'Sin fingir indiferencia cuando algo sí nos importa.', 'Quiero que podamos decir ‘te quiero’ cuando lo sintamos.', 'Que podamos decir ‘te extraño’.'], { minHold: 700 }),
        page(['Que podamos llamarnos solamente porque queremos escuchar la voz del otro.', 'Que podamos volver a decirnos ‘amor’…', 'pero que esa palabra signifique incluso más que antes.', 'Algo más sincero.', 'Más consciente.', 'Más intenso.', 'Más verdadero.'], { minHold: 700 }),
        page(['No porque seamos perfectos.', 'Nunca lo vamos a ser.', 'Sino porque aprendimos.', 'Porque elegimos hablar.', 'Porque elegimos cuidar.', 'Porque elegimos demostrar.', 'Porque dejamos de tenerle tanto miedo a sentir.'], { minHold: 700 }),
        page(['Yo te quiero mucho, Andrea.', 'Mucho más de lo que algunas veces supe demostrarte.', 'Y sí…', 'espero que todavía no sea demasiado tarde.', 'Espero poder volver a escucharte decirme ‘te quiero’.'], { minHold: 700 }),
        page(['Espero que algún día vuelva ese ‘mi amor’.', 'Espero volver a sentir que una llamada contigo puede durar horas y seguir pareciendo corta.', 'Y espero que quizá podamos construir algo incluso más bonito de lo que tuvimos.'], { minHold: 700 }),
        page(['Pero no quiero saltarme ningún paso para llegar ahí.', 'Primero quiero seguir conquistándote.', 'Seguir demostrando.', 'Seguir aprendiendo.', 'Y dejarte completamente libre para decidir qué quieres que vuelva a florecer.'], { minHold: 700 }),
        page(['Si algún día me eliges otra vez…', 'quiero que sea porque te nació.', 'Y si algún día volvemos a llamarnos amor…', 'quiero que no sea porque regresamos al pasado.', 'Quiero que sea porque construimos algo mejor.'], { minHold: 900 })
      ],
      final: [
        page(['No sé qué va a pasar cuando termine esta noche.'], { hold: 3500 }),
        page(['Pero sí sé qué quiero hacer cuando empiece mañana.'], { hold: 4300 }),
        page([line('Seguir conquistándote.', 'narrative-line--statement narrative-line--accent')], { hold: 4200 }),
        page(['Sin presionarte.', 'Sin apresurarte.', 'Con hechos.'], { hold: 4000 }),
        page(['Y si algún día vuelve a florecer…', '…no quiero que sea como antes.'], { hold: 4400 }),
        page([line('Quiero que sea mejor.', 'narrative-line--statement narrative-line--accent')], { hold: 3900 }),
        page(['Más sincero.', 'Más intenso.', 'Más verdadero.'], { hold: 3900 }),
        page(['Sin miedo.', 'Sin orgullo.', 'Simplemente dejándonos sentir.'], { hold: 4300 })
      ],
      epilogue: [
        page(['Y si algún día vuelve el amor…'], { hold: 3500 }),
        page([line('…ojalá nos encuentre siendo mejores para vivirlo. 🌻', 'narrative-line--statement narrative-line--accent')], { hold: 4600 })
      ]
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
  const byId = (id) => document.getElementById(id);
  const experience = byId('experience');
  const sceneElements = Array.from(document.querySelectorAll('.scene[data-scene]'));
  const sceneNames = sceneElements.map((scene) => scene.dataset.scene);
  const previewMode = sceneNames.includes(previewRequest);
  const supportsInert = 'inert' in HTMLElement.prototype;
  const entryScale = selfTestMode ? 0.006 : fastMode || previewMode ? 0.045 : 1;
  const transitionScale = selfTestMode ? 0.018 : fastMode || previewMode ? 0.12 : 1;

  root.dataset.reducedMotion = reducedMotion ? 'true' : 'false';
  if (fastMode) root.dataset.fast = 'true';
  if (previewMode) root.dataset.preview = previewRequest;
  if (selfTestMode) root.dataset.selfTest = 'running';

  const dom = {
    progress: byId('story-progress'),
    announcer: byId('scene-announcer'),
    veil: byId('transition-veil'),
    ambientStars: byId('ambient-stars'),
    ambientBrushes: byId('ambient-brushes'),
    introBefore: byId('intro-before'),
    introStar: byId('intro-star'),
    beginNight: byId('begin-night'),
    specialStar: byId('special-star'),
    nightStars: byId('night-new-stars'),
    nightNext: byId('night-next'),
    constellation: byId('constellation'),
    constellationNext: byId('constellation-next'),
    revealFrame: byId('reveal-frame'),
    fogCanvas: byId('fog-canvas'),
    revealMeter: byId('reveal-meter-fill'),
    revealMeterControl: document.querySelector('#scene-reveal .reveal-meter'),
    revealHold: byId('reveal-hold'),
    revealNext: byId('reveal-next'),
    painting: byId('unfinished-painting'),
    paintSpark: byId('paint-spark'),
    paintingNext: byId('painting-next'),
    truthNext: byId('truth-next'),
    loveNext: byId('love-next'),
    betterNext: byId('better-next'),
    voicePanel: byId('voice-note'),
    voiceControl: byId('voice-control'),
    voiceSkip: byId('voice-skip'),
    voiceStatus: byId('voice-status'),
    thresholdStar: byId('threshold-star'),
    thresholdInstruction: byId('threshold-instruction'),
    awakeningStage: byId('awakening-stage'),
    awakeningParticles: byId('awakening-particles'),
    dawnSun: byId('dawn-sun'),
    dawnAccessible: byId('dawn-accessible'),
    dawnMeter: document.querySelector('#scene-dawn .dawn-meter'),
    dawnMeterFill: document.querySelector('#scene-dawn .dawn-meter span'),
    dawnNext: byId('dawn-next'),
    growingFlower: byId('growing-flower'),
    growthNext: byId('growth-next'),
    brighterNext: byId('brighter-next'),
    fieldNext: byId('field-next'),
    letterOutput: byId('letter-text'),
    letterHint: byId('letter-hint'),
    letterNext: byId('letter-next-line'),
    letterFinish: byId('letter-finish'),
    letterSignature: byId('letter-signature'),
    letterMark: byId('letter-mark'),
    finalParticles: byId('final-particles'),
    finalNext: byId('final-next'),
    returningSunflower: byId('returning-sunflower'),
    replay: byId('replay-story'),
    score: byId('background-music'),
    audioControl: byId('audio-control'),
    audioIcon: document.querySelector('#audio-control .audio-control__icon'),
    audioLabel: document.querySelector('#audio-control .audio-control__label'),
    voice: byId('voice-player')
  };

  const storyState = {
    memories: new Set(),
    principles: new Set(),
    sunflowerGrown: false,
    truthRead: false,
    voiceGateComplete: false,
    awakeningComplete: false,
    dawnComplete: false
  };
  window.STORY_STATE = storyState;

  const sceneTimers = new Set();
  const globalTimers = new Set();
  let sceneManager = null;
  let audioController = null;

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
    if (target && target.addEventListener) target.addEventListener(type, safe(handler, type), options);
  }

  function scaleDuration(ms, kind) {
    if (kind === 'narrative') return Math.max(0, Math.round(ms * entryScale));
    if (kind === 'hold') {
      if (reducedMotion) return 1;
      if (selfTestMode) return 45;
      if (fastMode || previewMode) return Math.max(110, Math.round(ms * 0.08));
      return ms;
    }
    if (kind === 'cinematic') {
      if (reducedMotion && !fastMode) return 260;
      return Math.max(0, Math.round(ms * transitionScale));
    }
    if (kind === 'transition') {
      if (reducedMotion && !fastMode) return 1;
      return Math.max(0, Math.round(ms * transitionScale));
    }
    if (reducedMotion && !fastMode) return 0;
    return Math.max(0, Math.round(ms * entryScale));
  }

  function schedule(fn, ms, kind, global) {
    const collection = global ? globalTimers : sceneTimers;
    const id = window.setTimeout(() => {
      collection.delete(id);
      safe(fn, 'timer')();
    }, scaleDuration(ms, kind || 'entry'));
    collection.add(id);
    return id;
  }

  function wait(ms, kind) {
    return new Promise((resolve) => {
      const id = window.setTimeout(() => {
        globalTimers.delete(id);
        resolve();
      }, scaleDuration(ms, kind || 'entry'));
      globalTimers.add(id);
    });
  }

  function clearSceneTimers() {
    sceneTimers.forEach((id) => window.clearTimeout(id));
    sceneTimers.clear();
  }

  function setReady(element, ready, concealWhenDisabled) {
    if (!element) return;
    const conceal = concealWhenDisabled !== false;
    if (!ready && element === document.activeElement && typeof element.blur === 'function') element.blur();
    element.disabled = !ready;
    element.classList.toggle('is-ready', ready);
    element.setAttribute('aria-disabled', String(!ready));
    if (conceal) {
      if (ready) element.removeAttribute('aria-hidden');
      else element.setAttribute('aria-hidden', 'true');
    } else {
      element.removeAttribute('aria-hidden');
    }
  }

  function setVisible(element, visible) {
    if (!element) return;
    element.classList.toggle('is-visible', visible);
    element.classList.toggle('is-hidden', !visible);
    element.setAttribute('aria-hidden', String(!visible));
  }

  function announce(message) {
    if (!dom.announcer) return;
    dom.announcer.textContent = '';
    window.setTimeout(() => { dom.announcer.textContent = message; }, 20);
  }

  function currentIs(name, allowTransition) {
    return Boolean(sceneManager && sceneManager.currentSceneName === name && (allowTransition || !sceneManager.isTransitioning));
  }

  function activeIs(name) {
    return Boolean(sceneManager && sceneManager.currentSceneName === name && sceneManager.currentScene && sceneManager.currentScene.classList.contains('is-active'));
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
      particle.style.setProperty('--size', `${(0.7 + random() * 2.1).toFixed(2)}px`);
      particle.style.setProperty('--delay', `${(-random() * 9).toFixed(2)}s`);
      particle.style.setProperty('--duration', `${(5 + random() * 8).toFixed(2)}s`);
      const alpha = (0.22 + random() * 0.58).toFixed(2);
      particle.style.setProperty('--alpha', alpha);
      particle.style.setProperty('--opacity', alpha);
      container.appendChild(particle);
    }
  }

  function makeAmbientBrushes() {
    if (!dom.ambientBrushes || dom.ambientBrushes.childElementCount) return;
    const fragment = document.createDocumentFragment();
    for (let index = 0; index < 6; index += 1) {
      const brush = document.createElement('i');
      brush.style.setProperty('--i', String(index));
      brush.setAttribute('aria-hidden', 'true');
      fragment.appendChild(brush);
    }
    dom.ambientBrushes.appendChild(fragment);
  }

  const TITLES = {
    intro: 'Un girasol antes del amanecer',
    night: 'Acto uno: La noche',
    constellation: 'Recuerdos pequeños',
    reveal: 'Lo que todavía permanece',
    painting: 'Aprender a quererte mejor',
    truth: 'Acto dos: La verdad',
    love: 'Amor',
    better: 'Algo mejor',
    threshold: 'La posibilidad del amanecer',
    dawn: 'Acto tres: El amanecer',
    growth: 'Una flor abre cuando está lista',
    brighter: 'Mejor que antes',
    field: 'Flores amarillas',
    letter: 'Una carta para Andrea',
    final: 'Seguir conquistándote',
    epilogue: 'Un girasol antes del amanecer. Para Andrea.'
  };

  class NarrativeSequence {
    constructor(options) {
      const opts = options || {};
      this.sceneName = opts.sceneName || '';
      this.output = opts.output || null;
      this.control = opts.control || null;
      this.finishControl = opts.finishControl || null;
      this.manual = Boolean(opts.manual);
      this.nextLabel = opts.nextLabel || 'Seguir leyendo';
      this.finalLabel = opts.finalLabel || 'Continuar';
      this.pages = [];
      this.index = -1;
      this.active = false;
      this.completed = false;
      this.token = 0;
      this.timerIds = new Set();
      this.onPage = null;
      this.onComplete = null;
      this.onFinalControl = null;
      if (this.control) listen(this.control, 'click', () => this.advanceFromControl());
    }

    setTimer(fn, ms, kind) {
      const token = this.token;
      const id = schedule(() => {
        this.timerIds.delete(id);
        if (this.active && token === this.token) fn();
      }, ms, kind || 'narrative');
      this.timerIds.add(id);
      return id;
    }

    cancel() {
      this.active = false;
      this.token += 1;
      this.timerIds.forEach((id) => {
        window.clearTimeout(id);
        sceneTimers.delete(id);
      });
      this.timerIds.clear();
      if (this.output) this.output.removeAttribute('aria-busy');
    }

    reset() {
      this.cancel();
      this.pages = [];
      this.index = -1;
      this.completed = false;
      if (this.output) {
        this.output.replaceChildren();
        this.output.classList.remove('is-visible', 'is-complete');
      }
      setReady(this.control, false);
      setReady(this.finishControl, false);
    }

    start(pages, options) {
      this.cancel();
      const opts = options || {};
      this.pages = Array.isArray(pages) ? pages : [];
      this.index = -1;
      this.active = true;
      this.completed = false;
      this.onPage = opts.onPage || null;
      this.onComplete = opts.onComplete || null;
      this.onFinalControl = opts.onFinalControl || null;
      if (opts.nextLabel) this.nextLabel = opts.nextLabel;
      if (opts.finalLabel) this.finalLabel = opts.finalLabel;
      setReady(this.control, false);
      setReady(this.finishControl, false);
      if (!this.output || this.pages.length === 0) {
        this.finish();
        return;
      }
      this.output.classList.remove('is-complete');
      this.output.setAttribute('aria-busy', 'true');
      this.setTimer(() => this.showPage(0), opts.startDelay || 0, 'narrative');
    }

    render(pageData) {
      const isLetter = Boolean(this.output && this.output.hasAttribute('data-letter-output'));
      const wrapper = document.createElement('div');
      wrapper.className = `${isLetter ? 'letter-page' : 'narrative-page'}${pageData.pageClass ? ` ${pageData.pageClass}` : ''}`;
      pageData.lines.forEach((item) => {
        const paragraph = document.createElement('p');
        paragraph.className = isLetter
          ? `letter-paragraph${item.className ? ` ${item.className}` : ''}`
          : `narrative-line text-line${item.className ? ` ${item.className}` : ''}`;
        if (!isLetter && item.className && item.className.includes('narrative-line--accent')) paragraph.classList.add('accent-line');
        paragraph.dataset.line = '';
        paragraph.textContent = item.text;
        wrapper.appendChild(paragraph);
      });
      if (Array.isArray(pageData.accessibleLines) && pageData.accessibleLines.length) {
        const accessible = document.createElement('p');
        accessible.className = 'sr-only narrative-page__accessible';
        accessible.textContent = pageData.accessibleLines.join(' ');
        wrapper.appendChild(accessible);
      }
      if (isLetter) {
        const fragment = document.createDocumentFragment();
        while (wrapper.firstChild) fragment.appendChild(wrapper.firstChild);
        this.output.replaceChildren(fragment);
      } else {
        this.output.replaceChildren(wrapper);
      }
      this.output.classList.add('is-visible');
      this.output.setAttribute('aria-busy', 'false');
      window.requestAnimationFrame(() => {
        if (!this.active) return;
        if (!isLetter) wrapper.classList.add('is-visible');
        this.output.querySelectorAll('.narrative-line, .letter-paragraph').forEach((item) => item.classList.add('is-visible'));
      });
    }

    showPage(index) {
      if (!this.active || index < 0 || index >= this.pages.length) return;
      this.index = index;
      const pageData = this.pages[index];
      setReady(this.control, false);
      this.render(pageData);
      if (typeof this.onPage === 'function') this.onPage(index, pageData);
      const last = index === this.pages.length - 1;
      if (this.manual) {
        const pause = pageData.minHold == null ? 500 : pageData.minHold;
        this.setTimer(() => {
          if (last && this.finishControl) {
            this.finish();
            setReady(this.finishControl, true);
          } else if (this.control) {
            this.control.textContent = last ? this.finalLabel : this.nextLabel;
            setReady(this.control, true);
          }
        }, pause, 'narrative');
        return;
      }
      const hold = pageData.hold == null ? this.readingTime(pageData) : pageData.hold;
      this.setTimer(() => {
        if (last) this.finish();
        else this.showPage(index + 1);
      }, hold, 'narrative');
    }

    readingTime(pageData) {
      const length = pageData.lines.reduce((total, item) => total + item.text.length, 0);
      return Math.max(2200, Math.min(6500, 1200 + length * 34));
    }

    advanceFromControl() {
      if (!this.active || !this.manual || !this.control || this.control.disabled) return;
      setReady(this.control, false);
      if (this.index < this.pages.length - 1) {
        this.showPage(this.index + 1);
      } else {
        this.finish();
        if (typeof this.onFinalControl === 'function') this.onFinalControl();
      }
    }

    finish() {
      if (this.completed) return;
      this.completed = true;
      this.active = false;
      this.timerIds.forEach((id) => {
        window.clearTimeout(id);
        sceneTimers.delete(id);
      });
      this.timerIds.clear();
      if (this.output) {
        this.output.classList.add('is-complete');
        this.output.setAttribute('aria-busy', 'false');
      }
      if (typeof this.onComplete === 'function') this.onComplete();
    }
  }

  const activeSequences = new Set();

  function sequenceOutput(name) {
    return document.querySelector(`[data-sequence="${name}"] [data-sequence-output]`);
  }

  function playAutoSequence(sceneName, pages, options) {
    const opts = options || {};
    const sequence = new NarrativeSequence({ sceneName, output: opts.output || sequenceOutput(sceneName) });
    activeSequences.add(sequence);
    sequence.start(pages, {
      startDelay: opts.startDelay || 0,
      onPage: opts.onPage,
      onComplete: () => {
        activeSequences.delete(sequence);
        if (typeof opts.onComplete === 'function' && activeIs(sceneName)) opts.onComplete();
      }
    });
    return sequence;
  }

  function cancelSequencesFor(sceneName) {
    activeSequences.forEach((sequence) => {
      if (!sceneName || sequence.sceneName === sceneName) {
        sequence.cancel();
        activeSequences.delete(sequence);
      }
    });
  }

  class SceneManager {
    constructor(scenes) {
      this.scenes = scenes;
      this.index = -1;
      this.isTransitioning = false;
      this.lastTransition = 0;
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
      const act = scene.dataset.act || 'night';
      root.dataset.currentScene = name;
      if (experience) {
        experience.dataset.act = act;
        experience.dataset.timeOfDay = ['field', 'letter', 'final', 'epilogue'].includes(name)
          ? 'day'
          : act === 'dawn' ? 'dawn' : 'night';
      }
      const ratio = this.scenes.length > 1 ? this.index / (this.scenes.length - 1) : 0;
      if (dom.progress) {
        dom.progress.style.width = `${ratio * 100}%`;
        dom.progress.style.transform = `scaleX(${ratio})`;
        dom.progress.style.setProperty('--story-progress', ratio.toFixed(4));
      }
      window.requestAnimationFrame(() => {
        if (activeIs(name)) scene.classList.add('is-entered');
      });
      if (audioController) audioController.cue(name, act === 'truth' ? 2200 : 1300);
      runEnterHook(name);
      announce(TITLES[name] || 'Nueva escena');
      schedule(() => {
        if (!activeIs(name)) return;
        const heading = scene.querySelector('[aria-labelledby]') || scene.querySelector('h1[tabindex], h2[tabindex]');
        const target = scene.querySelector('h1[tabindex], h2[tabindex]') || heading;
        if (!target || typeof target.focus !== 'function') return;
        try { target.focus({ preventScroll: true }); } catch (error) { target.focus(); }
      }, CONFIG.timings.focus, 'entry');
    }

    async transitionToScene(target, options) {
      const opts = options || {};
      const nextIndex = this.resolve(target);
      const now = performance.now();
      const debounceWindow = fastMode ? 12 : 220;
      if (nextIndex < 0 || nextIndex >= this.scenes.length || nextIndex === this.index || this.isTransitioning || now - this.lastTransition < debounceWindow) return false;
      this.lastTransition = now;
      this.isTransitioning = true;
      root.dataset.transitioning = 'true';
      experience && experience.classList.add('is-transitioning');
      const oldScene = this.currentScene;
      try {
        if (opts.awakening) {
          oldScene && oldScene.classList.add('is-awakening');
          dom.awakeningStage && dom.awakeningStage.classList.add('is-awakening');
          experience && (experience.dataset.timeOfDay = 'dawn');
          revealAwakeningEchoes();
          makeParticles(dom.awakeningParticles, reducedMotion ? 7 : 15, 'awakening-particle', 93017);
          if (audioController) audioController.cue('awakening', 2600);
          await wait(CONFIG.timings.awakening, 'cinematic');
        } else {
          oldScene && oldScene.classList.add('is-leaving');
          if (dom.veil) {
            dom.veil.classList.toggle('is-returning', Boolean(opts.replay));
            dom.veil.classList.add('is-active');
          }
          await wait(CONFIG.timings.transition * 0.48, 'transition');
        }

        clearSceneTimers();
        cancelSequencesFor(this.currentSceneName);
        stopContinuousInteractions();
        if (oldScene && oldScene.contains(document.activeElement) && typeof document.activeElement.blur === 'function') document.activeElement.blur();
        this.setActive(oldScene, false);
        oldScene && oldScene.classList.remove('is-leaving');
        if (opts.replay) resetStoryState();
        this.index = nextIndex;
        this.setActive(this.currentScene, true);
        this.enter(this.currentScene);
        if (!opts.awakening) await wait(CONFIG.timings.transition * 0.52, 'transition');
        if (opts.awakening) storyState.awakeningComplete = true;
        return true;
      } catch (error) {
        reportError(error, 'scene-transition');
        if (!this.scenes.some((scene) => scene.classList.contains('is-active')) && oldScene) {
          this.index = this.scenes.indexOf(oldScene);
          this.setActive(oldScene, true);
        }
        return false;
      } finally {
        oldScene && oldScene.classList.remove('is-leaving', 'is-awakening');
        dom.awakeningStage && dom.awakeningStage.classList.remove('is-awakening');
        if (dom.veil) dom.veil.classList.remove('is-active', 'is-returning');
        experience && experience.classList.remove('is-transitioning');
        this.isTransitioning = false;
        delete root.dataset.transitioning;
      }
    }

    nextScene(options) {
      return this.transitionToScene(this.index + 1, options);
    }

    transitionTo(target, options) {
      return this.transitionToScene(target, options);
    }
  }

  class AudioController {
    constructor(options) {
      const opts = options || {};
      this.score = opts.score || null;
      this.control = opts.control || null;
      this.icon = opts.icon || null;
      this.label = opts.label || null;
      this.voice = opts.voice || null;
      this.voicePanel = opts.voicePanel || null;
      this.voiceControl = opts.voiceControl || null;
      this.voiceSkip = opts.voiceSkip || null;
      this.voiceStatus = opts.voiceStatus || null;
      this.wanted = false;
      this.scoreUnavailable = false;
      this.scoreTarget = CONFIG.audio.cues.intro;
      this.scoreFadeFrame = 0;
      this.voiceState = this.voice ? 'probing' : 'missing';
      this.voiceActive = false;
      this.scoreWasPlaying = false;
      this.voiceWasPlaying = false;
      this.onVoiceEnded = null;
      this.onVoiceFailure = null;
      this.voiceResolution = null;
      this.voiceReady = new Promise((resolve) => { this.voiceResolution = resolve; });
    }

    setup() {
      if (this.score) {
        this.score.volume = 0;
        listen(this.score, 'error', () => this.markScoreUnavailable());
        this.score.querySelectorAll('source').forEach((source) => listen(source, 'error', () => this.markScoreUnavailable()));
      }
      if (this.control) listen(this.control, 'click', () => this.toggleScore());
      this.updateScoreControl();
      this.setupVoice();
      this.setupTranscriptHook();
    }

    setupTranscriptHook() {
      const transcript = String(CONFIG.voiceTranscript || '').trim();
      if (!transcript || !this.voicePanel || this.voicePanel.querySelector('[data-voice-transcript]')) return;
      const details = document.createElement('details');
      details.className = 'voice-note__transcript';
      details.dataset.voiceTranscript = '';
      const summary = document.createElement('summary');
      summary.textContent = 'Leer transcripción';
      const copy = document.createElement('p');
      copy.textContent = transcript;
      details.append(summary, copy);
      this.voicePanel.appendChild(details);
    }

    setupVoice() {
      if (!this.voice) {
        this.resolveVoice(false);
        return;
      }
      const available = () => this.resolveVoice(true);
      const missing = () => this.resolveVoice(false);
      listen(this.voice, 'loadedmetadata', available, { once: true });
      listen(this.voice, 'canplay', available, { once: true });
      listen(this.voice, 'error', missing, { once: true });
      this.voice.querySelectorAll('source').forEach((source) => listen(source, 'error', missing, { once: true }));
      listen(this.voice, 'play', () => this.updateVoiceControl(true));
      listen(this.voice, 'pause', () => this.updateVoiceControl(false));
      listen(this.voice, 'ended', () => {
        this.voiceActive = false;
        this.updateVoiceControl(false);
        this.setVoiceStatus('La nota de voz terminó.');
        if (typeof this.onVoiceEnded === 'function') this.onVoiceEnded();
      });
      try { this.voice.load(); } catch (error) { missing(); }
    }

    resolveVoice(available) {
      if (this.voiceState !== 'probing') return;
      this.voiceState = available ? 'available' : 'missing';
      if (this.voiceResolution) this.voiceResolution(available);
    }

    async voiceAvailableWithin(timeout) {
      if (this.voiceState === 'available') return true;
      if (this.voiceState === 'missing') return false;
      const limit = fastMode ? 120 : timeout;
      return Promise.race([
        this.voiceReady,
        new Promise((resolve) => window.setTimeout(() => resolve(false), Math.max(1, limit)))
      ]);
    }

    updateScoreControl() {
      if (!this.control) return;
      const enabled = this.wanted && !this.scoreUnavailable;
      this.control.setAttribute('aria-pressed', String(enabled));
      this.control.setAttribute('aria-label', enabled ? 'Silenciar música' : 'Activar música');
      if (this.label) this.label.textContent = enabled ? 'Silenciar música' : 'Activar música';
      if (this.icon) this.icon.textContent = enabled ? '🔊' : '🔇';
      this.control.classList.toggle('is-playing', enabled);
    }

    updateVoiceControl(playing) {
      if (!this.voiceControl) return;
      this.voiceControl.setAttribute('aria-pressed', String(Boolean(playing)));
      this.voiceControl.setAttribute('aria-label', playing ? 'Pausar la nota de voz de Joseph' : 'Escuchar la nota de voz de Joseph');
      const labelNode = this.voiceControl.querySelector('[data-voice-label]');
      const iconNode = this.voiceControl.querySelector('[aria-hidden="true"]');
      if (labelNode) labelNode.textContent = playing ? 'Pausar' : this.voice && this.voice.currentTime > 0 ? 'Continuar escuchando' : 'Escucharme';
      if (iconNode) iconNode.textContent = playing ? 'Ⅱ' : '▶';
    }

    setVoiceStatus(message) {
      if (this.voiceStatus) this.voiceStatus.textContent = message;
    }

    markScoreUnavailable() {
      if (this.scoreUnavailable) return;
      this.scoreUnavailable = true;
      this.wanted = false;
      cancelAnimationFrame(this.scoreFadeFrame);
      this.scoreFadeFrame = 0;
      if (this.score) this.score.pause();
      if (this.control) {
        this.control.classList.add('is-unavailable');
        this.control.disabled = true;
        this.control.hidden = true;
        this.control.setAttribute('aria-label', 'Música no disponible');
      }
      this.updateScoreControl();
    }

    toggleScore() {
      if (!this.score || this.scoreUnavailable) return;
      if (this.wanted) {
        this.wanted = false;
        this.updateScoreControl();
        this.fadeScore(0, 520, true);
        return;
      }
      this.wanted = true;
      this.updateScoreControl();
      this.score.volume = Math.min(this.score.volume || 0, 0.02);
      const promise = this.score.play();
      if (promise && typeof promise.then === 'function') {
        promise.then(() => this.fadeScore(this.voiceActive ? 0 : this.scoreTarget, 1200)).catch(() => this.markScoreUnavailable());
      } else {
        this.fadeScore(this.voiceActive ? 0 : this.scoreTarget, 1200);
      }
    }

    cue(name, duration) {
      const cue = Object.prototype.hasOwnProperty.call(CONFIG.audio.cues, name) ? CONFIG.audio.cues[name] : this.scoreTarget;
      this.scoreTarget = Math.max(0, Math.min(0.32, cue));
      if (!this.wanted || !this.score || this.scoreUnavailable || this.voiceActive) return;
      if (this.score.paused) {
        const promise = this.score.play();
        if (promise && promise.catch) promise.catch(() => {});
      }
      this.fadeScore(this.scoreTarget, duration == null ? 1200 : duration, false);
    }

    fadeScore(target, duration, pauseAtEnd) {
      if (!this.score || this.scoreUnavailable) return;
      cancelAnimationFrame(this.scoreFadeFrame);
      this.scoreFadeFrame = 0;
      const from = Number(this.score.volume) || 0;
      const to = Math.max(0, Math.min(1, target));
      const motionDuration = reducedMotion ? 0 : scaleDuration(duration, 'cinematic');
      if (motionDuration <= 1 || Math.abs(from - to) < 0.002) {
        this.score.volume = to;
        if (pauseAtEnd && to <= 0.001) this.score.pause();
        return;
      }
      const started = performance.now();
      const tick = (now) => {
        const ratio = Math.min(1, (now - started) / motionDuration);
        const eased = 1 - Math.pow(1 - ratio, 3);
        this.score.volume = from + (to - from) * eased;
        if (ratio < 1) {
          this.scoreFadeFrame = requestAnimationFrame(tick);
        } else {
          this.scoreFadeFrame = 0;
          if (pauseAtEnd && to <= 0.001) this.score.pause();
        }
      };
      this.scoreFadeFrame = requestAnimationFrame(tick);
    }

    setDawnProgress(progress) {
      const low = CONFIG.audio.cues.dawn;
      const high = 0.225;
      this.scoreTarget = low + (high - low) * Math.max(0, Math.min(1, progress));
      if (this.wanted && this.score && !this.score.paused && !this.voiceActive && !this.scoreUnavailable) {
        this.score.volume = this.scoreTarget;
      }
    }

    toggleVoice() {
      if (!this.voice || this.voiceState !== 'available') {
        if (typeof this.onVoiceFailure === 'function') this.onVoiceFailure();
        return;
      }
      if (!this.voice.paused) {
        this.voice.pause();
        this.setVoiceStatus('Nota de voz en pausa.');
        return;
      }
      this.voiceActive = true;
      this.fadeScore(0, 420, true);
      const promise = this.voice.play();
      this.setVoiceStatus('Reproduciendo la nota de voz.');
      if (promise && typeof promise.then === 'function') {
        promise.catch(() => {
          this.voiceActive = false;
          this.voiceState = 'missing';
          this.updateVoiceControl(false);
          if (typeof this.onVoiceFailure === 'function') this.onVoiceFailure();
        });
      }
    }

    stopVoice(reset) {
      if (!this.voice) return;
      this.voice.pause();
      this.voiceActive = false;
      if (reset) {
        try { this.voice.currentTime = 0; } catch (error) { /* Optional media may not be seekable. */ }
      }
      this.updateVoiceControl(false);
    }

    suspend() {
      this.scoreWasPlaying = Boolean(this.score && !this.score.paused);
      this.voiceWasPlaying = Boolean(this.voice && !this.voice.paused);
      if (this.scoreWasPlaying) this.score.pause();
      if (this.voiceWasPlaying) this.voice.pause();
    }

    resume() {
      if (this.voiceWasPlaying && this.voice && this.voiceState === 'available') {
        this.voiceActive = true;
        const voicePromise = this.voice.play();
        if (voicePromise && voicePromise.catch) voicePromise.catch(() => {});
      } else if (this.scoreWasPlaying && this.wanted && this.score && !this.scoreUnavailable) {
        const scorePromise = this.score.play();
        if (scorePromise && scorePromise.catch) scorePromise.catch(() => {});
      }
      this.scoreWasPlaying = false;
      this.voiceWasPlaying = false;
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
    for (let index = 0; index < 42; index += 1) {
      context.beginPath();
      context.arc(random() * rect.width, random() * rect.height, 8 + random() * 32, 0, Math.PI * 2);
      context.fillStyle = index % 2 ? '#fff' : '#6e8190';
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
    if (!track || revealState.complete || !revealState.width || !revealState.height) return;
    const cellX = Math.max(0, Math.min(revealState.columns - 1, Math.floor(x / revealState.width * revealState.columns)));
    const cellY = Math.max(0, Math.min(revealState.rows - 1, Math.floor(y / revealState.height * revealState.rows)));
    for (let dx = -2; dx <= 2; dx += 1) {
      for (let dy = -2; dy <= 2; dy += 1) {
        const cx = cellX + dx;
        const cy = cellY + dy;
        if (cx >= 0 && cx < revealState.columns && cy >= 0 && cy < revealState.rows && dx * dx + dy * dy <= 5) revealState.cells.add(`${cx}:${cy}`);
      }
    }
    const coverage = revealState.cells.size / (revealState.columns * revealState.rows);
    updateRevealProgress(Math.min(1, coverage / 0.42));
  }

  function eraseFogTo(progress) {
    if (!revealState.context) return;
    revealState.context.save();
    revealState.context.globalCompositeOperation = 'destination-out';
    revealState.context.fillStyle = '#000';
    revealState.context.fillRect(0, 0, revealState.width * progress, revealState.height);
    revealState.context.restore();
  }

  function updateRevealProgress(value) {
    if (revealState.complete) return;
    revealState.progress = Math.max(revealState.progress, Math.min(1, value));
    const percent = Math.round(revealState.progress * 100);
    if (dom.revealMeter) dom.revealMeter.style.width = `${percent}%`;
    if (dom.revealMeterControl) dom.revealMeterControl.setAttribute('aria-valuenow', String(percent));
    if (dom.revealFrame) dom.revealFrame.style.setProperty('--reveal-progress', revealState.progress.toFixed(3));
    const scene = byId('scene-reveal');
    if (scene) scene.style.setProperty('--reveal-progress', revealState.progress.toFixed(3));
    eraseFogTo(revealState.progress);
    if (revealState.progress >= 0.995) completeReveal();
  }

  function completeReveal() {
    if (revealState.complete) return;
    revealState.complete = true;
    revealState.progress = 1;
    cancelAnimationFrame(revealState.holdFrame);
    cancelAnimationFrame(revealState.autoFrame);
    revealState.holdFrame = 0;
    revealState.autoFrame = 0;
    if (dom.revealMeter) dom.revealMeter.style.width = '100%';
    if (dom.revealMeterControl) dom.revealMeterControl.setAttribute('aria-valuenow', '100');
    if (dom.revealFrame) {
      dom.revealFrame.style.setProperty('--reveal-progress', '1');
      dom.revealFrame.classList.add('is-complete');
    }
    if (dom.fogCanvas) dom.fogCanvas.classList.add('is-cleared');
    setReady(dom.revealHold, false);
    schedule(() => {
      playAutoSequence('reveal', CONFIG.sequences.revealResult, {
        onComplete: () => {
          byId('scene-reveal')?.classList.add('is-complete');
          setReady(dom.revealNext, true);
          announce('El cristal está limpio. Puedes seguir.');
        }
      });
    }, CONFIG.timings.resultDelay, 'narrative');
  }

  function startRevealHold() {
    if (!currentIs('reveal') || revealState.complete || revealState.holdFrame) return;
    dom.revealHold?.classList.add('is-holding');
    const duration = scaleDuration(CONFIG.timings.revealHold, 'hold');
    revealState.holdStart = performance.now() - revealState.progress * duration;
    const tick = safe((now) => {
      if (!revealState.holdFrame || revealState.complete) return;
      updateRevealProgress((now - revealState.holdStart) / Math.max(1, duration));
      if (!revealState.complete) revealState.holdFrame = requestAnimationFrame(tick);
    }, 'reveal-hold');
    revealState.holdFrame = requestAnimationFrame(tick);
  }

  function stopRevealHold() {
    if (revealState.holdFrame) cancelAnimationFrame(revealState.holdFrame);
    revealState.holdFrame = 0;
    dom.revealHold?.classList.remove('is-holding');
  }

  function autoReveal() {
    if (!currentIs('reveal') || revealState.complete || revealState.autoFrame) return;
    stopRevealHold();
    const startProgress = revealState.progress;
    const started = performance.now();
    const duration = Math.max(1, scaleDuration(CONFIG.timings.revealHold, 'hold') * (1 - startProgress));
    const tick = safe((now) => {
      if (!revealState.autoFrame || revealState.complete) return;
      const ratio = Math.min(1, (now - started) / duration);
      updateRevealProgress(startProgress + (1 - startProgress) * ratio);
      if (!revealState.complete) revealState.autoFrame = requestAnimationFrame(tick);
    }, 'auto-reveal');
    revealState.autoFrame = requestAnimationFrame(tick);
  }

  function canvasPoint(event) {
    const rect = dom.fogCanvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  }

  const dawnState = {
    progress: 0,
    frame: 0,
    started: 0,
    startProgress: 0,
    automatic: false,
    milestone: 0,
    complete: false
  };

  function updateDawn(value) {
    if (dawnState.complete) return;
    dawnState.progress = Math.max(0, Math.min(1, value));
    const percent = Math.round(dawnState.progress * 100);
    experience?.style.setProperty('--dawn-progress', dawnState.progress.toFixed(4));
    byId('scene-dawn')?.style.setProperty('--dawn-progress', dawnState.progress.toFixed(4));
    if (dom.dawnMeter) dom.dawnMeter.setAttribute('aria-valuenow', String(percent));
    if (dom.dawnMeterFill) dom.dawnMeterFill.style.width = `${percent}%`;
    if (audioController) audioController.setDawnProgress(dawnState.progress);
    const milestone = Math.floor(percent / 25) * 25;
    if (milestone > dawnState.milestone && milestone < 100) {
      dawnState.milestone = milestone;
      announce(`El amanecer está al ${milestone} por ciento.`);
    }
    if (dawnState.progress >= 0.999) completeDawn();
  }

  function runDawn(automatic) {
    if (!currentIs('dawn') || dawnState.complete || dawnState.frame || dom.dawnSun?.disabled) return;
    dawnState.automatic = Boolean(automatic);
    dawnState.started = performance.now();
    dawnState.startProgress = dawnState.progress;
    dom.dawnSun?.classList.add('is-holding');
    if (automatic) setReady(dom.dawnAccessible, false);
    const total = scaleDuration(automatic ? CONFIG.timings.dawnFallback : CONFIG.timings.dawnHold, 'hold');
    const duration = Math.max(1, total * (1 - dawnState.startProgress));
    const tick = safe((now) => {
      if (!dawnState.frame || dawnState.complete) return;
      updateDawn(dawnState.startProgress + (now - dawnState.started) / duration * (1 - dawnState.startProgress));
      if (!dawnState.complete) dawnState.frame = requestAnimationFrame(tick);
    }, 'dawn-hold');
    dawnState.frame = requestAnimationFrame(tick);
  }

  function stopDawn(force) {
    if (dawnState.automatic && !force) return;
    if (dawnState.frame) cancelAnimationFrame(dawnState.frame);
    dawnState.frame = 0;
    dawnState.automatic = false;
    dom.dawnSun?.classList.remove('is-holding');
  }

  function completeDawn() {
    if (dawnState.complete) return;
    dawnState.complete = true;
    dawnState.progress = 1;
    storyState.dawnComplete = true;
    stopDawn(true);
    experience?.style.setProperty('--dawn-progress', '1');
    const scene = byId('scene-dawn');
    scene?.style.setProperty('--dawn-progress', '1');
    scene?.classList.add('is-complete');
    if (dom.dawnMeter) dom.dawnMeter.setAttribute('aria-valuenow', '100');
    if (dom.dawnMeterFill) dom.dawnMeterFill.style.width = '100%';
    if (audioController) audioController.setDawnProgress(1);
    setReady(dom.dawnSun, false, false);
    setReady(dom.dawnAccessible, false);
    playAutoSequence('dawn', CONFIG.sequences.dawnResult, {
      startDelay: CONFIG.timings.resultDelay,
      onComplete: () => {
        setReady(dom.dawnNext, true);
        announce('El amanecer está completo. Una flor abrirá cuando esté lista.');
      }
    });
  }

  let truthSequence = null;
  let letterSequence = null;
  let thresholdGateGeneration = 0;

  function setupManualSequences() {
    truthSequence = new NarrativeSequence({
      sceneName: 'truth',
      output: sequenceOutput('truth'),
      control: dom.truthNext,
      manual: true,
      nextLabel: 'Seguir leyendo',
      finalLabel: 'Seguir, sin adornos'
    });
    letterSequence = new NarrativeSequence({
      sceneName: 'letter',
      output: dom.letterOutput,
      control: dom.letterNext,
      finishControl: dom.letterFinish,
      manual: true,
      nextLabel: 'Seguir leyendo'
    });
  }

  function startTruthSequence() {
    truthSequence.start(CONFIG.sequences.truth, {
      startDelay: 750,
      onPage: (index) => {
        const scene = byId('scene-truth');
        scene?.classList.toggle('is-declaration', index === 6 || index === 7);
        scene?.classList.toggle('is-human', index === 13);
      },
      onComplete: () => { storyState.truthRead = true; },
      onFinalControl: () => currentIs('truth') && sceneManager.nextScene()
    });
  }

  function startLetterSequence() {
    if (dom.letterSignature) {
      dom.letterSignature.hidden = true;
      dom.letterSignature.classList.remove('is-visible');
    }
    if (dom.letterMark) {
      dom.letterMark.hidden = true;
      dom.letterMark.classList.remove('is-visible');
    }
    if (dom.letterHint) dom.letterHint.textContent = 'Una página a la vez.';
    letterSequence.start(CONFIG.sequences.letter, {
      startDelay: 350,
      onPage: (index) => {
        if (dom.letterHint) dom.letterHint.textContent = `Página ${index + 1} de ${CONFIG.sequences.letter.length}.`;
        if (dom.letterOutput) dom.letterOutput.scrollTop = 0;
      },
      onComplete: () => {
        if (dom.letterSignature) {
          dom.letterSignature.hidden = false;
          dom.letterSignature.classList.add('is-visible');
        }
        if (dom.letterMark) {
          dom.letterMark.hidden = false;
          dom.letterMark.classList.add('is-visible');
        }
        if (dom.letterHint) dom.letterHint.textContent = 'La carta es tuya.';
      }
    });
  }

  function revealLoveEchoes() {
    const scene = byId('scene-love');
    scene?.classList.add('is-echoing');
    document.querySelectorAll('.love-echoes > span').forEach((echo, index) => {
      schedule(() => echo.classList.add('is-visible'), index * 260, 'narrative');
    });
  }

  function revealAwakeningEchoes() {
    document.querySelectorAll('#awakening-stars [data-memory]').forEach((star) => {
      star.classList.toggle('is-visible', storyState.memories.has(star.dataset.memory));
    });
    document.querySelectorAll('#awakening-brushes [data-principle]').forEach((brush) => {
      brush.classList.toggle('is-visible', storyState.principles.has(brush.dataset.principle));
    });
  }

  function revealReturningEchoes() {
    document.querySelectorAll('.returning-star[data-memory]').forEach((star) => {
      star.classList.toggle('is-visible', storyState.memories.has(star.dataset.memory));
    });
    document.querySelectorAll('.returning-brush[data-principle]').forEach((brush) => {
      brush.classList.toggle('is-visible', storyState.principles.has(brush.dataset.principle));
    });
  }

  function revealThresholdStar(delay) {
    if (storyState.voiceGateComplete) return;
    storyState.voiceGateComplete = true;
    schedule(() => {
      if (!activeIs('threshold')) return;
      setReady(dom.thresholdStar, true);
      setVisible(dom.thresholdInstruction, true);
      byId('scene-threshold')?.classList.add('is-star-ready');
      announce('Ha aparecido una pequeña estrella. Tócala para comenzar el amanecer.');
    }, delay || 0, 'narrative');
  }

  function closeVoicePanel() {
    if (!dom.voicePanel) return;
    dom.voicePanel.classList.remove('is-visible');
    dom.voicePanel.setAttribute('aria-hidden', 'true');
    dom.voicePanel.hidden = true;
  }

  async function openThresholdGate() {
    const generation = ++thresholdGateGeneration;
    const available = audioController
      ? await audioController.voiceAvailableWithin(CONFIG.timings.voiceProbe)
      : false;
    if (generation !== thresholdGateGeneration || !activeIs('threshold')) return;
    if (!available) {
      closeVoicePanel();
      revealThresholdStar(fastMode ? 20 : 350);
      return;
    }
    if (dom.voicePanel) {
      dom.voicePanel.hidden = false;
      dom.voicePanel.classList.add('is-visible');
      dom.voicePanel.removeAttribute('aria-hidden');
    }
    setReady(dom.voiceControl, true, false);
    setReady(dom.voiceSkip, true, false);
    audioController.setVoiceStatus('La nota de voz está lista. Puedes escucharla o seguir en silencio.');
  }

  function finishThresholdVoice(delay) {
    if (!currentIs('threshold')) return;
    setReady(dom.voiceControl, false);
    setReady(dom.voiceSkip, false);
    closeVoicePanel();
    revealThresholdStar(delay);
  }

  function showNext(button) {
    setReady(button, true);
  }

  function runEnterHook(name) {
    const scene = document.querySelector(`[data-scene="${name}"]`);
    if (name === 'intro') {
      schedule(() => {
        dom.introStar?.classList.add('is-awake');
        setReady(dom.introStar, true, false);
      }, CONFIG.timings.introStarWake, 'entry');
    } else if (name === 'night') {
      playAutoSequence('night', CONFIG.sequences.night, {
        startDelay: 450,
        onComplete: () => setReady(dom.specialStar, true, false)
      });
    } else if (name === 'constellation') {
      playAutoSequence('constellation', CONFIG.sequences.constellationIntro, {
        startDelay: 350,
        onComplete: () => document.querySelectorAll('.constellation-star').forEach((star) => {
          if (!star.classList.contains('is-lit')) setReady(star, true, false);
        })
      });
    } else if (name === 'reveal') {
      window.requestAnimationFrame(() => { if (activeIs('reveal')) paintFog(); });
      playAutoSequence('reveal', CONFIG.sequences.revealIntro, {
        startDelay: 300,
        onComplete: () => {
          revealState.ready = true;
          dom.revealFrame?.classList.add('is-ready');
          setReady(dom.revealHold, true, false);
        }
      });
    } else if (name === 'painting') {
      playAutoSequence('painting', CONFIG.sequences.paintingIntro, {
        startDelay: 300,
        onComplete: () => {
          dom.painting?.classList.add('is-ready');
          document.querySelectorAll('.paint-point').forEach((point) => {
            if (!point.classList.contains('is-painted')) setReady(point, true, false);
          });
        }
      });
    } else if (name === 'truth') {
      startTruthSequence();
    } else if (name === 'love') {
      scene?.classList.add('is-awake');
      playAutoSequence('love', CONFIG.sequences.love, {
        startDelay: 450,
        onPage: (index, pageData) => {
          if (pageData.effect === 'echoes') revealLoveEchoes();
          if (pageData.effect === 'warmth') scene?.classList.add('is-warming');
        },
        onComplete: () => showNext(dom.loveNext)
      });
    } else if (name === 'better') {
      playAutoSequence('better', CONFIG.sequences.better, {
        startDelay: 350,
        onPage: (index, pageData) => pageData.effect === 'warmth' && scene?.classList.add('is-warming'),
        onComplete: () => showNext(dom.betterNext)
      });
    } else if (name === 'threshold') {
      storyState.voiceGateComplete = false;
      playAutoSequence('threshold', CONFIG.sequences.threshold, {
        startDelay: 550,
        onComplete: openThresholdGate
      });
    } else if (name === 'dawn') {
      revealReturningEchoes();
      playAutoSequence('dawn', CONFIG.sequences.dawnIntro, {
        startDelay: 350,
        onComplete: () => {
          setReady(dom.dawnSun, true, false);
          setReady(dom.dawnAccessible, true, false);
          announce('Mantén presionado el horizonte o usa el botón Dejar amanecer.');
        }
      });
    } else if (name === 'growth') {
      schedule(() => dom.growingFlower?.classList.add('is-growing'), 450, 'entry');
      schedule(() => {
        dom.growingFlower?.classList.add('is-grown');
        scene?.classList.add('is-grown');
        storyState.sunflowerGrown = true;
      }, CONFIG.timings.growthVisual, 'narrative');
      playAutoSequence('growth', CONFIG.sequences.growth, {
        startDelay: 300,
        onComplete: () => {
          storyState.sunflowerGrown = true;
          dom.growingFlower?.classList.add('is-grown');
          showNext(dom.growthNext);
        }
      });
    } else if (name === 'brighter') {
      scene?.classList.add('is-warming');
      playAutoSequence('brighter', CONFIG.sequences.brighter, {
        startDelay: 350,
        onComplete: () => showNext(dom.brighterNext)
      });
    } else if (name === 'field') {
      window.requestAnimationFrame(() => scene?.classList.add('is-growing'));
      playAutoSequence('field', CONFIG.sequences.field, {
        startDelay: 350,
        onComplete: () => showNext(dom.fieldNext)
      });
    } else if (name === 'letter') {
      startLetterSequence();
    } else if (name === 'final') {
      makeParticles(dom.finalParticles, reducedMotion ? 7 : 16, 'light-particle', 73421);
      scene?.classList.add('is-awake', 'is-growing');
      if (dom.returningSunflower) dom.returningSunflower.classList.toggle('is-visible', storyState.sunflowerGrown);
      playAutoSequence('final', CONFIG.sequences.final, {
        startDelay: 450,
        onComplete: () => showNext(dom.finalNext)
      });
    } else if (name === 'epilogue') {
      scene?.classList.add('is-awake');
      playAutoSequence('epilogue', CONFIG.sequences.epilogue, {
        startDelay: 650,
        onComplete: () => showNext(dom.replay)
      });
    }
  }

  function stopContinuousInteractions() {
    stopRevealHold();
    if (revealState.autoFrame) cancelAnimationFrame(revealState.autoFrame);
    revealState.autoFrame = 0;
    revealState.dragging = false;
    revealState.pointerId = null;
    revealState.lastPoint = null;
    stopDawn(true);
  }

  function setupOptionalImages() {
    document.querySelectorAll('img[data-optional-image]').forEach((image) => {
      const source = CONFIG.images[image.dataset.optionalImage];
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

  function resetStoryState() {
    clearSceneTimers();
    cancelSequencesFor();
    thresholdGateGeneration += 1;
    truthSequence?.reset();
    letterSequence?.reset();
    storyState.memories.clear();
    storyState.principles.clear();
    storyState.sunflowerGrown = false;
    storyState.truthRead = false;
    storyState.voiceGateComplete = false;
    storyState.awakeningComplete = false;
    storyState.dawnComplete = false;

    document.querySelectorAll('[data-sequence-output]').forEach((output) => {
      output.replaceChildren();
      output.classList.remove('is-visible', 'is-complete');
      output.removeAttribute('aria-busy');
    });
    document.querySelectorAll('.scene').forEach((scene) => {
      scene.classList.remove(
        'is-complete', 'is-growing', 'is-grown', 'is-awake', 'is-star-touched',
        'is-declaration', 'is-human', 'is-echoing', 'is-warming', 'is-star-ready',
        'is-awakening', 'is-leaving'
      );
    });

    dom.introBefore?.classList.remove('is-hidden');
    dom.introBefore?.setAttribute('aria-hidden', 'false');
    dom.introStar?.classList.remove('is-awake', 'is-touched');
    setReady(dom.introStar, false, false);
    setReady(dom.beginNight, false);

    dom.specialStar?.classList.remove('is-touched', 'is-lit');
    dom.specialStar?.removeAttribute('aria-pressed');
    setReady(dom.specialStar, false, false);
    if (dom.nightStars) {
      dom.nightStars.replaceChildren();
      dom.nightStars.classList.remove('is-visible');
    }
    setReady(dom.nightNext, false);

    document.querySelectorAll('.constellation-star').forEach((star) => {
      star.classList.remove('is-lit');
      star.removeAttribute('aria-pressed');
      setReady(star, false, false);
    });
    dom.constellation?.classList.remove('is-complete');
    setReady(dom.constellationNext, false);

    stopRevealHold();
    cancelAnimationFrame(revealState.autoFrame);
    revealState.autoFrame = 0;
    revealState.cells.clear();
    revealState.progress = 0;
    revealState.ready = false;
    revealState.complete = false;
    revealState.dragging = false;
    revealState.pointerId = null;
    revealState.lastPoint = null;
    if (dom.fogCanvas) dom.fogCanvas.classList.remove('is-cleared', 'is-unavailable');
    if (dom.revealMeter) dom.revealMeter.style.width = '0%';
    if (dom.revealMeterControl) dom.revealMeterControl.setAttribute('aria-valuenow', '0');
    dom.revealFrame?.classList.remove('is-complete', 'is-ready');
    dom.revealFrame?.style.setProperty('--reveal-progress', '0');
    byId('scene-reveal')?.style.setProperty('--reveal-progress', '0');
    setReady(dom.revealHold, false, false);
    setReady(dom.revealNext, false);

    document.querySelectorAll('[data-piece-layer], .paint-point').forEach((item) => item.classList.remove('is-painted'));
    document.querySelectorAll('.paint-point').forEach((point) => {
      point.removeAttribute('aria-pressed');
      setReady(point, false, false);
    });
    dom.painting?.classList.remove('is-ready', 'is-complete');
    dom.paintSpark?.classList.remove('is-active', 'is-visible');
    setReady(dom.paintingNext, false);

    setReady(dom.truthNext, false);
    setReady(dom.loveNext, false);
    setReady(dom.betterNext, false);
    document.querySelectorAll('.love-echoes > span').forEach((echo) => echo.classList.remove('is-visible'));

    audioController?.stopVoice(true);
    closeVoicePanel();
    setReady(dom.voiceControl, false);
    setReady(dom.voiceSkip, false);
    if (dom.voiceStatus) dom.voiceStatus.textContent = '';
    dom.awakeningStage?.classList.remove('is-awakening');
    document.querySelectorAll('#awakening-stage .is-visible').forEach((item) => item.classList.remove('is-visible'));
    if (dom.awakeningParticles) dom.awakeningParticles.replaceChildren();
    setReady(dom.thresholdStar, false);
    setVisible(dom.thresholdInstruction, false);

    document.querySelectorAll('.returning-star, .returning-brush').forEach((item) => item.classList.remove('is-visible'));
    dawnState.progress = 0;
    dawnState.complete = false;
    dawnState.milestone = 0;
    dawnState.frame = 0;
    dawnState.automatic = false;
    experience?.style.setProperty('--dawn-progress', '0');
    byId('scene-dawn')?.style.setProperty('--dawn-progress', '0');
    if (dom.dawnMeter) dom.dawnMeter.setAttribute('aria-valuenow', '0');
    if (dom.dawnMeterFill) dom.dawnMeterFill.style.width = '0%';
    setReady(dom.dawnSun, false, false);
    setReady(dom.dawnAccessible, false);
    setReady(dom.dawnNext, false);

    dom.growingFlower?.classList.remove('is-growing', 'is-grown');
    setReady(dom.growthNext, false);
    setReady(dom.brighterNext, false);
    setReady(dom.fieldNext, false);

    if (dom.letterSignature) {
      dom.letterSignature.hidden = true;
      dom.letterSignature.classList.remove('is-visible');
    }
    if (dom.letterMark) {
      dom.letterMark.hidden = true;
      dom.letterMark.classList.remove('is-visible');
    }
    if (dom.letterHint) dom.letterHint.textContent = 'Una página a la vez.';
    setReady(dom.letterNext, false);
    setReady(dom.letterFinish, false);

    if (dom.finalParticles) dom.finalParticles.replaceChildren();
    dom.returningSunflower?.classList.remove('is-visible');
    setReady(dom.finalNext, false);
    setReady(dom.replay, false);

    if (experience) {
      experience.dataset.act = 'night';
      experience.dataset.timeOfDay = 'night';
      experience.classList.remove('is-transitioning');
    }
  }

  function hydratePreviewState(targetName) {
    const targetIndex = sceneNames.indexOf(targetName);
    if (targetIndex < 0) return;
    const constellationIndex = sceneNames.indexOf('constellation');
    const paintingIndex = sceneNames.indexOf('painting');
    const dawnIndex = sceneNames.indexOf('dawn');
    const growthIndex = sceneNames.indexOf('growth');
    if (targetIndex > constellationIndex) {
      document.querySelectorAll('.constellation-star').forEach((star) => {
        storyState.memories.add(star.dataset.memory);
        star.classList.add('is-lit');
        star.setAttribute('aria-pressed', 'true');
        setReady(star, false, false);
      });
      dom.constellation?.classList.add('is-complete');
    }
    if (targetIndex > paintingIndex) {
      document.querySelectorAll('.paint-point').forEach((point) => {
        storyState.principles.add(point.dataset.principle);
        point.classList.add('is-painted');
        point.setAttribute('aria-pressed', 'true');
        document.querySelector(`[data-piece-layer="${point.dataset.paintPiece}"]`)?.classList.add('is-painted');
        setReady(point, false, false);
      });
      dom.painting?.classList.add('is-complete');
    }
    if (targetIndex > dawnIndex) {
      storyState.dawnComplete = true;
      dawnState.progress = 1;
      dawnState.complete = true;
    }
    if (targetIndex > growthIndex) {
      storyState.sunflowerGrown = true;
      dom.growingFlower?.classList.add('is-growing', 'is-grown');
    }
  }

  function bindNext(button, sceneName) {
    listen(button, 'click', () => {
      if (!currentIs(sceneName) || button.disabled) return;
      setReady(button, false);
      sceneManager.nextScene();
    });
  }

  function bindInteractions() {
    listen(dom.introStar, 'click', () => {
      if (!currentIs('intro') || dom.introStar.disabled || dom.introStar.classList.contains('is-touched')) return;
      dom.introStar.classList.add('is-touched');
      byId('scene-intro')?.classList.add('is-star-touched');
      setReady(dom.introStar, false, false);
      dom.introBefore?.classList.add('is-hidden');
      dom.introBefore?.setAttribute('aria-hidden', 'true');
      const hint = document.querySelector('#intro-stage [data-interaction-hint]');
      if (hint) setVisible(hint, false);
      playAutoSequence('intro', CONFIG.sequences.intro, {
        startDelay: 250,
        onComplete: () => showNext(dom.beginNight)
      });
    });
    bindNext(dom.beginNight, 'intro');

    listen(dom.specialStar, 'click', () => {
      if (!currentIs('night') || dom.specialStar.disabled || dom.specialStar.classList.contains('is-touched')) return;
      dom.specialStar.classList.add('is-touched', 'is-lit');
      dom.specialStar.setAttribute('aria-pressed', 'true');
      setReady(dom.specialStar, false, false);
      makeParticles(dom.nightStars, reducedMotion ? 8 : 19, 'new-star', 19842);
      setVisible(dom.nightStars, true);
      schedule(() => showNext(dom.nightNext), CONFIG.timings.nightBurst, 'narrative');
    });
    bindNext(dom.nightNext, 'night');

    document.querySelectorAll('.constellation-star').forEach((star) => listen(star, 'click', () => {
      if (!currentIs('constellation') || star.disabled || star.classList.contains('is-lit')) return;
      star.classList.add('is-lit');
      star.setAttribute('aria-pressed', 'true');
      storyState.memories.add(star.dataset.memory);
      setReady(star, false, false);
      announce(star.dataset.memory || 'Un recuerdo encendido');
      const stars = Array.from(document.querySelectorAll('.constellation-star'));
      if (stars.every((item) => item.classList.contains('is-lit'))) {
        dom.constellation?.classList.add('is-complete');
        const hint = document.querySelector('#constellation-stage [data-interaction-hint]');
        if (hint) setVisible(hint, false);
        schedule(() => playAutoSequence('constellation', CONFIG.sequences.constellationResult, {
          onComplete: () => showNext(dom.constellationNext)
        }), CONFIG.timings.resultDelay, 'narrative');
      }
    }));
    bindNext(dom.constellationNext, 'constellation');

    listen(dom.fogCanvas, 'pointerdown', (event) => {
      if (!currentIs('reveal') || !revealState.ready || revealState.complete) return;
      revealState.dragging = true;
      revealState.pointerId = event.pointerId;
      try { dom.fogCanvas.setPointerCapture(event.pointerId); } catch (error) { /* Pointer capture is optional. */ }
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
    const finishCanvas = () => {
      revealState.dragging = false;
      revealState.pointerId = null;
      revealState.lastPoint = null;
    };
    listen(dom.fogCanvas, 'pointerup', finishCanvas);
    listen(dom.fogCanvas, 'pointercancel', finishCanvas);
    listen(dom.fogCanvas, 'lostpointercapture', finishCanvas);
    listen(dom.revealHold, 'pointerdown', (event) => {
      if (dom.revealHold.disabled) return;
      try { dom.revealHold.setPointerCapture(event.pointerId); } catch (error) { /* Optional. */ }
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
        autoReveal();
      }
    });
    listen(dom.revealHold, 'click', () => autoReveal());
    bindNext(dom.revealNext, 'reveal');

    document.querySelectorAll('.paint-point').forEach((point) => listen(point, 'click', () => {
      if (!currentIs('painting') || point.disabled || point.classList.contains('is-painted')) return;
      const piece = point.dataset.paintPiece;
      const principle = point.dataset.principle;
      point.classList.add('is-painted');
      point.setAttribute('aria-pressed', 'true');
      storyState.principles.add(principle);
      setReady(point, false, false);
      document.querySelector(`[data-piece-layer="${piece}"]`)?.classList.add('is-painted');
      if (dom.paintSpark) {
        dom.paintSpark.style.setProperty('--spark-x', point.style.getPropertyValue('--x'));
        dom.paintSpark.style.setProperty('--spark-y', point.style.getPropertyValue('--y'));
        dom.paintSpark.classList.remove('is-active', 'is-visible');
        void dom.paintSpark.offsetWidth;
        dom.paintSpark.classList.add('is-active', 'is-visible');
      }
      announce(principle);
      const points = Array.from(document.querySelectorAll('.paint-point'));
      if (points.every((item) => item.classList.contains('is-painted'))) {
        dom.painting?.classList.add('is-complete');
        const hint = document.querySelector('#painting-stage [data-interaction-hint]');
        if (hint) setVisible(hint, false);
        schedule(() => playAutoSequence('painting', CONFIG.sequences.paintingResult, {
          onComplete: () => showNext(dom.paintingNext)
        }), CONFIG.timings.resultDelay, 'narrative');
      }
    }));
    bindNext(dom.paintingNext, 'painting');

    bindNext(dom.loveNext, 'love');
    bindNext(dom.betterNext, 'better');

    if (audioController) {
      audioController.onVoiceEnded = () => finishThresholdVoice(CONFIG.timings.voiceSilence);
      audioController.onVoiceFailure = () => finishThresholdVoice(fastMode ? 20 : 300);
    }
    listen(dom.voiceControl, 'click', () => {
      if (!currentIs('threshold') || dom.voiceControl.disabled) return;
      audioController?.toggleVoice();
    });
    listen(dom.voiceSkip, 'click', () => {
      if (!currentIs('threshold') || dom.voiceSkip.disabled) return;
      audioController?.stopVoice(true);
      finishThresholdVoice(fastMode ? 20 : 260);
    });
    listen(dom.thresholdStar, 'click', () => {
      if (!currentIs('threshold') || dom.thresholdStar.disabled || sceneManager.isTransitioning) return;
      setReady(dom.thresholdStar, false, false);
      setVisible(dom.thresholdInstruction, false);
      byId('scene-threshold')?.classList.add('is-awakening');
      dom.awakeningStage?.classList.add('is-awakening');
      sceneManager.transitionToScene('dawn', { awakening: true });
    });

    listen(dom.dawnSun, 'pointerdown', (event) => {
      if (dom.dawnSun.disabled) return;
      try { dom.dawnSun.setPointerCapture(event.pointerId); } catch (error) { /* Optional. */ }
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
    bindNext(dom.dawnNext, 'dawn');
    bindNext(dom.growthNext, 'growth');
    bindNext(dom.brighterNext, 'brighter');
    bindNext(dom.fieldNext, 'field');
    bindNext(dom.letterFinish, 'letter');
    bindNext(dom.finalNext, 'final');
    listen(dom.replay, 'click', () => {
      if (!currentIs('epilogue') || dom.replay.disabled) return;
      setReady(dom.replay, false);
      sceneManager.transitionToScene('intro', { replay: true });
    });
  }

  function setViewportUnit() {
    root.style.setProperty('--app-height', `${window.innerHeight}px`);
  }

  function setupEnvironment() {
    let parallaxFrame = 0;
    makeParticles(dom.ambientStars, reducedMotion ? 13 : 28, 'ambient-star', 481516);
    makeAmbientBrushes();
    setViewportUnit();
    listen(window, 'resize', () => {
      setViewportUnit();
      if (currentIs('reveal') && !revealState.complete) paintFog();
    }, { passive: true });
    listen(document, 'visibilitychange', () => {
      if (document.hidden) {
        stopContinuousInteractions();
        audioController?.suspend();
      } else {
        audioController?.resume();
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
      if (reducedMotion || (event.pointerType && event.pointerType !== 'mouse') || parallaxFrame) return;
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
    const limit = timeout || 12000;
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
    const ready = (element) => Boolean(element && !element.disabled && element.getAttribute('aria-hidden') !== 'true');
    const inScene = (name) => sceneManager.currentSceneName === name && !sceneManager.isTransitioning;

    await waitFor(() => ready(dom.introStar), 'intro star');
    dom.introStar.click();
    await waitFor(() => ready(dom.beginNight), 'intro sequence');
    dom.beginNight.click();

    await waitFor(() => inScene('night'), 'night scene');
    await waitFor(() => ready(dom.specialStar), 'night star');
    dom.specialStar.click();
    await waitFor(() => ready(dom.nightNext), 'night completion');
    dom.nightNext.click();

    await waitFor(() => inScene('constellation'), 'constellation scene');
    await waitFor(() => Array.from(document.querySelectorAll('.constellation-star')).every((star) => !star.disabled), 'constellation controls');
    document.querySelectorAll('.constellation-star').forEach((star) => star.click());
    await waitFor(() => ready(dom.constellationNext), 'constellation completion');
    dom.constellationNext.click();

    await waitFor(() => inScene('reveal'), 'reveal scene');
    await waitFor(() => !dom.revealHold.disabled, 'reveal fallback');
    completeReveal();
    await waitFor(() => ready(dom.revealNext), 'reveal completion');
    dom.revealNext.click();

    await waitFor(() => inScene('painting'), 'painting scene');
    await waitFor(() => Array.from(document.querySelectorAll('.paint-point')).every((point) => !point.disabled), 'painting controls');
    document.querySelectorAll('.paint-point').forEach((point) => point.click());
    await waitFor(() => ready(dom.paintingNext), 'painting completion');
    dom.paintingNext.click();

    await waitFor(() => inScene('truth'), 'truth scene');
    let truthTurns = 0;
    while (inScene('truth') && truthTurns < CONFIG.sequences.truth.length + 2) {
      await waitFor(() => ready(dom.truthNext), `truth page ${truthTurns + 1}`);
      dom.truthNext.click();
      truthTurns += 1;
      if (!inScene('truth')) break;
    }
    await waitFor(() => inScene('love'), 'love scene');
    await waitFor(() => ready(dom.loveNext), 'love completion');
    dom.loveNext.click();

    await waitFor(() => inScene('better'), 'better scene');
    await waitFor(() => ready(dom.betterNext), 'better completion');
    dom.betterNext.click();

    await waitFor(() => inScene('threshold'), 'threshold scene');
    await waitFor(() => ready(dom.thresholdStar) || (dom.voicePanel && !dom.voicePanel.hidden), 'threshold gate');
    if (!ready(dom.thresholdStar) && dom.voiceSkip && !dom.voiceSkip.disabled) dom.voiceSkip.click();
    await waitFor(() => ready(dom.thresholdStar), 'threshold star');
    dom.thresholdStar.click();

    await waitFor(() => inScene('dawn'), 'dawn scene');
    await waitFor(() => !dom.dawnAccessible.disabled, 'dawn fallback');
    dom.dawnAccessible.click();
    /* Headless virtual time does not guarantee requestAnimationFrame ticks. */
    completeDawn();
    await waitFor(() => ready(dom.dawnNext), 'dawn completion');
    dom.dawnNext.click();

    await waitFor(() => inScene('growth'), 'growth scene');
    await waitFor(() => ready(dom.growthNext), 'growth completion');
    dom.growthNext.click();

    await waitFor(() => inScene('brighter'), 'brighter scene');
    await waitFor(() => ready(dom.brighterNext), 'brighter completion');
    dom.brighterNext.click();

    await waitFor(() => inScene('field'), 'field scene');
    await waitFor(() => ready(dom.fieldNext), 'field completion');
    dom.fieldNext.click();

    await waitFor(() => inScene('letter'), 'letter scene');
    let letterTurns = 0;
    while (!ready(dom.letterFinish) && letterTurns < CONFIG.sequences.letter.length + 2) {
      await waitFor(() => ready(dom.letterNext) || ready(dom.letterFinish), `letter page ${letterTurns + 1}`);
      if (ready(dom.letterNext)) dom.letterNext.click();
      letterTurns += 1;
    }
    await waitFor(() => ready(dom.letterFinish), 'letter completion');
    dom.letterFinish.click();

    await waitFor(() => inScene('final'), 'final scene');
    await waitFor(() => ready(dom.finalNext), 'final completion');
    dom.finalNext.click();

    await waitFor(() => inScene('epilogue'), 'epilogue scene');
    await waitFor(() => ready(dom.replay), 'epilogue completion');
    if (storyState.memories.size !== 5) throw new Error('Persistent memory state is incomplete');
    if (storyState.principles.size !== 4) throw new Error('Persistent principle state is incomplete');
    if (!storyState.sunflowerGrown) throw new Error('Persistent sunflower state is incomplete');
    dom.replay.click();
    await waitFor(() => inScene('intro'), 'replay');
    if (storyState.memories.size || storyState.principles.size || storyState.sunflowerGrown) throw new Error('Replay did not reset story state');
    if (root.dataset.selfTest !== 'failed') root.dataset.selfTest = 'passed';
  }

  function init() {
    if (!experience || sceneElements.length !== 16) throw new Error(`Se esperaban 16 escenas y se encontraron ${sceneElements.length}.`);
    setupManualSequences();
    setupOptionalImages();
    audioController = new AudioController({
      score: dom.score,
      control: dom.audioControl,
      icon: dom.audioIcon,
      label: dom.audioLabel,
      voice: dom.voice,
      voicePanel: dom.voicePanel,
      voiceControl: dom.voiceControl,
      voiceSkip: dom.voiceSkip,
      voiceStatus: dom.voiceStatus
    });
    audioController.setup();
    bindInteractions();
    setupEnvironment();
    resetStoryState();
    if (previewMode) hydratePreviewState(previewRequest);
    sceneManager = new SceneManager(sceneElements);
    window.sceneManager = sceneManager;
    sceneManager.start(selfTestMode ? 'intro' : previewMode ? previewRequest : 'intro');
    root.dataset.appReady = 'true';
    if (selfTestMode) selfTest().catch((error) => reportError(error, 'self-test'));
  }

  listen(window, 'error', (event) => {
    if (event.error) reportError(event.error, 'window-error');
  });
  listen(window, 'unhandledrejection', (event) => {
    if (selfTestMode) event.preventDefault();
    reportError(event.reason || new Error('Unhandled promise rejection'), 'promise');
  });

  try {
    init();
  } catch (error) {
    reportError(error, 'initialization');
  }
})();
