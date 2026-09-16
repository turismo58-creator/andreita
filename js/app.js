(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const TEST_MODE = new URLSearchParams(location.search).get("test") === "1";
  const PREVIEW_SCENE = new URLSearchParams(location.search).get("preview");
  const REDUCED_MOTION = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const CONFIG = {
    timings: {
      scene: 1400,
      beat: 1000,
      postBeat: 1700,
      introStar: 900,
      observe: 1800,
      paintingObserve: 2200,
      revealFallback: 6000,
      dawnFallback: 7500,
      truthDawn: 5200,
      dawnHold: 2600,
      dawnCoast: 700,
      dawnObserve: 2000,
      flowerGrow: 3000,
      cliffHold: 3000,
      cliffExit: 4200,
      focus: 90
    },
    profiles: {
      normal: { multiplier: 1, wpm: 150, minimum: 2500 },
      intimate: { multiplier: 1.1, wpm: 145, minimum: 2700 },
      emotional: { multiplier: 1.25, wpm: 140, minimum: 3300 },
      confession: { multiplier: 1.35, wpm: 135, minimum: 3600 },
      contemplative: { multiplier: 1.2, wpm: 140, minimum: 3200 },
      letter: { multiplier: 1, wpm: 150, minimum: 0 }
    },
    audio: {
      intro: .1,
      night: .08,
      reveal: .08,
      painting: .09,
      truth: .015,
      dawn: .16,
      field: .22,
      cliff: .05,
      closing: .18
    }
  };

  if (TEST_MODE) {
    Object.keys(CONFIG.timings).forEach((key) => {
      CONFIG.timings[key] = Math.max(18, Math.round(CONFIG.timings[key] * .012));
    });
    Object.values(CONFIG.profiles).forEach((profile) => {
      profile.minimum = Math.max(22, Math.round(profile.minimum * .012));
    });
  }

  const line = (text, className = "") => ({ text, className });
  const page = (lines, options = {}) => ({
    lines: lines.map((entry) => typeof entry === "string" ? line(entry) : entry),
    profile: "normal",
    ...options
  });

  const STORY = {
    intro: [
      page(["Esta noche no viene a pedirte una respuesta."], { profile: "intimate" }),
      page(["Solo quiere mostrarte algo que todavía importa."], { profile: "intimate" })
    ],
    night: [
      page(["Parecían cosas pequeñas…", "…hasta que empezaron a hacer falta."], { profile: "intimate" }),
      page([line("Las extraño.", "accent-line")], { profile: "emotional" }),
      page(["Pero no quiero recuperarlas a la fuerza."], { profile: "intimate" })
    ],
    reveal: [
      page(["No quiero mirar nuestros errores para quedarme viviendo en ellos."], { profile: "intimate" }),
      page([line("Quiero mirarlos para aprender.", "accent-line")], { profile: "emotional" })
    ],
    painting: [
      page(["Sé que me equivoqué."], { profile: "emotional" }),
      page(["No puedo prometerte perfección.", "Sí puedo intentar quererte mejor."], { profile: "intimate" }),
      page(["Que lo que siento también se note en mis actos."], { profile: "intimate" })
    ],
    truth: [
      page(["Andrea…"], { profile: "confession" }),
      page(["Hay algo que no quiero esconder detrás de una página bonita."], { profile: "confession" }),
      page(["La verdad es que me duele cómo se han dado las cosas."], { profile: "confession" }),
      page(["Sé que me equivoqué.", "Y sé que muchas veces te demostré menos de lo que realmente sentía."], { profile: "confession" }),
      page([line("Te quiero.", "truth-emphasis")], { profile: "confession", hold: 4500 }),
      page(["De verdad te quiero."], { profile: "confession" }),
      page(["Extraño nuestras llamadas.", "Extraño un ‘buenas noches, mi amor’.", "Extraño un ‘Dios te bendiga’."], { profile: "confession" }),
      page([line("A M O R", "love-display")], { profile: "confession", hold: 3000, effect: "love" }),
      page(["Qué sencilla parecía esa palabra…", "…hasta que dejamos de decirla."], { profile: "confession" }),
      page(["No quiero obligarla a volver.", "No quiero presionarte.", "No quiero hostigarte."], { profile: "confession" }),
      page(["Si algún día vuelve…", "…quiero que sea porque nos nació."], { profile: "confession" }),
      page(["Y tampoco quiero simplemente volver a lo de antes."], { profile: "confession" }),
      page([line("Quiero algo mejor.", "truth-emphasis")], { profile: "confession", hold: 4500 }),
      page(["Más sincero.", "Más tranquilo.", "Más verdadero."], { profile: "confession" }),
      page(["Sin tanto miedo.", "Sin tanto orgullo."], { profile: "confession" })
    ],
    dawn: [
      page(["Yo puedo intentar hacerlo mejor."], { profile: "intimate" }),
      page(["Puedo escuchar.", "Cuidar.", "Demostrar."], { profile: "intimate" }),
      page(["Pero hay algo que no puedo obligar."], { profile: "emotional" }),
      page(["Que vuelva a nacer en ti."], { profile: "emotional" }),
      page(["Por eso no quiero pedirte que vuelvas a sentir.", "Quiero darte razones para que quizá algún día vuelva a suceder."], { profile: "emotional", effect: "grow" }),
      page(["No como antes."], { profile: "intimate" }),
      page([line("Mejor.", "dawn-emphasis")], { profile: "emotional", hold: 4000 })
    ],
    field: [
      page(["El 21 es el Día de las Flores Amarillas.", "Pero este año las tuyas llegaron antes."], { profile: "intimate" }),
      page(["Porque hay cosas bonitas que no deberían esperar una fecha."], { profile: "emotional" }),
      page(["Y estas flores no vienen a pedirte una respuesta.", "Solo quería volver a hacerte sentir especial."], { profile: "intimate" })
    ],
    letter: [
      page(["Sé que me he equivocado y sé que reconocerlo no cambia lo que pasó. Pero también he entendido algo: querer a alguien no sirve de mucho si uno no sabe demostrárselo."], { profile: "letter", revealTogether: true }),
      page(["Por eso no quiero esconderme detrás de estas flores ni detrás de una página bonita. Quiero aprender."], { profile: "letter", revealTogether: true }),
      page(["Escucharte mejor. Cuidar más. Estar más. Demostrar más."], { profile: "letter", revealTogether: true }),
      page(["Te quiero, y sí, me encantaría volver a escuchar algún día un ‘te quiero’ tuyo, volver a nuestras llamadas y volver a sentir natural esa palabra que un día fue tan nuestra: amor."], { profile: "letter", revealTogether: true }),
      page(["Pero no quiero que nada vuelva por presión. Si algún día me eliges otra vez, quiero que sea porque te nació."], { profile: "letter", revealTogether: true }),
      page(["Y si la vida nos permite encontrarnos otra vez de esa manera, no quiero regresar simplemente a lo que éramos. Quiero algo mejor."], { profile: "letter", revealTogether: true }),
      page(["Más sincero. Más consciente. Más nuestro. Mientras tanto, solo quiero seguir haciendo las cosas bien."], { profile: "letter", revealTogether: true })
    ],
    cliff: [
      page(["Andrea…"], { profile: "contemplative" }),
      page(["Antes de terminar…"], { profile: "contemplative" }),
      page(["De verdad lo siento."], { profile: "contemplative" }),
      page(["Por lo que hice.", "Y por todo lo que terminó desmoronándose después."], { profile: "contemplative" }),
      page(["No espero que unas palabras borren esa herida.", "Quizás solo el tiempo sepa qué puede pasar con ella."], { profile: "contemplative" }),
      page(["Pero quería pedirte perdón otra vez."], { profile: "contemplative" }),
      page([line("Porque te quiero.", "cliff-emphasis")], { profile: "contemplative", hold: 4500 }),
      page(["Y porque sí…", "probablemente me duela durante mil y una noches."], { profile: "contemplative" }),
      page([line("Pero ninguna de esas noches te obliga a volver.", "cliff-emphasis")], { profile: "contemplative", hold: 5000 }),
      page(["No quiero convertir mi dolor en una carga para ti."], { profile: "contemplative" }),
      page(["Solo espero que algún día puedas perdonarme."], { profile: "contemplative" }),
      page(["Yo no puedo cambiar aquella noche."], { profile: "contemplative" }),
      page(["Pero sí puedo decidir quién quiero ser en todas las que vienen después."], { profile: "contemplative", postBeatDelay: 3000 })
    ]
  };

  class NarrativePacer {
    constructor() {
      this.scopes = new Map();
    }

    scale(delay) {
      return TEST_MODE ? Math.max(12, Math.round(delay * .012)) : delay;
    }

    createScope(name) {
      this.cancel(name);
      const controller = new AbortController();
      this.scopes.set(name, controller);
      return controller.signal;
    }

    signal(name) {
      return this.scopes.get(name)?.signal || this.createScope(name);
    }

    cancel(name) {
      const controller = this.scopes.get(name);
      if (controller) controller.abort();
      this.scopes.delete(name);
    }

    cancelAll() {
      [...this.scopes.keys()].forEach((name) => this.cancel(name));
    }

    schedule(callback, delay, signal) {
      if (signal?.aborted) return () => {};
      const timer = window.setTimeout(() => {
        if (!signal?.aborted) callback();
      }, this.scale(delay));
      const stop = () => clearTimeout(timer);
      signal?.addEventListener("abort", stop, { once: true });
      return stop;
    }

    wait(delay, signal) {
      if (signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
      return new Promise((resolve, reject) => {
        const timer = window.setTimeout(resolve, this.scale(delay));
        signal?.addEventListener("abort", () => {
          clearTimeout(timer);
          reject(new DOMException("Aborted", "AbortError"));
        }, { once: true });
      });
    }

    readingDelay(pageData) {
      if (pageData.hold) return pageData.hold;
      const profile = CONFIG.profiles[pageData.profile] || CONFIG.profiles.normal;
      const words = pageData.lines.reduce((sum, item) => sum + item.text.trim().split(/\s+/).length, 0);
      return Math.max(profile.minimum, (words / profile.wpm) * 60000 * profile.multiplier);
    }
  }

  const pacer = new NarrativePacer();

  const setButtonReady = (button, ready = true) => {
    if (!button) return;
    button.disabled = !ready;
    button.setAttribute("aria-hidden", String(!ready));
    button.classList.toggle("is-ready", ready);
  };

  const focusQuietly = (element) => {
    if (!element) return;
    pacer.schedule(() => element.focus({ preventScroll: true }), CONFIG.timings.focus);
  };

  class NarrativeSequence {
    constructor(name, pages, options = {}) {
      this.name = name;
      this.pages = pages;
      this.output = qs(`[data-sequence="${name}"] [data-sequence-output]`);
      this.button = options.button ? qs(options.button) : qs(`#${name}-next`);
      this.manual = Boolean(options.manual);
      this.onEffect = options.onEffect || (() => {});
      this.onComplete = options.onComplete || (() => {});
      this.index = 0;
      this.running = false;
      this.finished = false;
      this.advancing = false;
      this.boundAdvance = (event) => {
        event.preventDefault();
        event.stopImmediatePropagation();
        this.advanceManual();
      };
      if (this.manual) this.button?.addEventListener("click", this.boundAdvance);
    }

    reset() {
      pacer.cancel(`sequence:${this.name}`);
      this.index = 0;
      this.running = false;
      this.finished = false;
      this.advancing = false;
      if (this.output) this.output.replaceChildren();
      setButtonReady(this.button, false);
      if (this.name === "letter" && this.button) {
        this.button.hidden = false;
        this.button.textContent = "Seguir leyendo";
      }
    }

    start() {
      if (this.running || this.finished || !this.output) return;
      this.running = true;
      const signal = pacer.createScope(`sequence:${this.name}`);
      if (this.manual) this.renderManual(signal);
      else this.playAutomatic(signal);
    }

    makePage(pageData) {
      const wrapper = document.createElement("div");
      wrapper.className = `narrative-page narrative-page--${this.name}`;
      pageData.lines.forEach((item) => {
        const paragraph = document.createElement("p");
        paragraph.className = `${this.name === "letter" ? "letter-paragraph" : "narrative-line"}${item.className ? ` ${item.className}` : ""}`;
        paragraph.textContent = item.text;
        wrapper.append(paragraph);
      });
      return wrapper;
    }

    async showPage(pageData, signal) {
      const wrapper = this.makePage(pageData);
      this.output.replaceChildren(wrapper);
      const items = [...wrapper.children];
      await pacer.wait(30, signal);
      if (pageData.revealTogether || this.name === "letter") {
        items.forEach((item) => item.classList.add("is-visible"));
      } else {
        for (const item of items) {
          item.classList.add("is-visible");
          if (item !== items.at(-1)) await pacer.wait(CONFIG.timings.beat, signal);
        }
      }
      this.onEffect(pageData.effect, this.index, pageData);
      return wrapper;
    }

    async hideCurrent(signal) {
      const current = this.output.firstElementChild;
      if (!current) return;
      current.classList.add("is-leaving");
      [...current.children].forEach((item) => item.classList.remove("is-visible"));
      await pacer.wait(CONFIG.timings.beat, signal);
    }

    async playAutomatic(signal) {
      try {
        while (this.index < this.pages.length) {
          const pageData = this.pages[this.index];
          await this.showPage(pageData, signal);
          if (this.index === this.pages.length - 1) {
            this.index += 1;
            break;
          }
          await pacer.wait(this.readingDelay(pageData), signal);
          this.index += 1;
          await this.hideCurrent(signal);
        }
        await pacer.wait(this.pages.at(-1)?.postBeatDelay || CONFIG.timings.postBeat, signal);
        this.finish();
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      }
    }

    readingDelay(pageData) {
      return TEST_MODE ? 30 : pacer.readingDelay(pageData);
    }

    async renderManual(signal) {
      try {
        await this.showPage(this.pages[0], signal);
        setButtonReady(this.button, true);
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      }
    }

    async advanceManual() {
      if (this.advancing || this.finished) return;
      this.advancing = true;
      setButtonReady(this.button, false);
      const signal = pacer.signal(`sequence:${this.name}`);
      try {
        if (this.index >= this.pages.length - 1) {
          this.finish();
          return;
        }
        await this.hideCurrent(signal);
        this.index += 1;
        await this.showPage(this.pages[this.index], signal);
        if (this.button) this.button.textContent = this.index === this.pages.length - 1 ? "Cerrar la carta" : "Seguir leyendo";
        setButtonReady(this.button, true);
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      } finally {
        this.advancing = false;
      }
    }

    finish() {
      if (this.finished) return;
      this.running = false;
      this.finished = true;
      setButtonReady(this.button, false);
      this.onComplete();
    }
  }

  class AudioController {
    constructor() {
      this.score = qs("#background-music");
      this.toggle = qs("#audio-control");
      this.icon = qs(".audio-control__icon", this.toggle);
      this.label = qs(".audio-control__label", this.toggle);
      this.voice = qs("#voice-player");
      this.voicePanel = qs("#voice-note");
      this.voiceButton = qs("#voice-control");
      this.voiceSkip = qs("#voice-skip");
      this.voiceStatus = qs("#voice-status");
      this.enabled = false;
      this.targetVolume = CONFIG.audio.intro;
      this.voiceAvailable = Boolean(this.voice?.querySelector("source"));
      this.onVoiceDone = null;
      this.toggle?.addEventListener("click", () => this.toggleScore());
      this.voiceButton?.addEventListener("click", () => this.toggleVoice());
      this.voiceSkip?.addEventListener("click", () => this.finishVoice());
      this.voice?.addEventListener("ended", () => this.finishVoice());
      this.voice?.addEventListener("error", () => {
        this.voiceAvailable = false;
        this.voicePanel.hidden = true;
        this.onVoiceDone?.();
      });
      this.score?.addEventListener("error", () => this.toggle?.classList.add("is-unavailable"));
      if (this.score) this.score.volume = 0;
    }

    async toggleScore() {
      if (!this.score) return;
      this.enabled = !this.enabled;
      if (this.enabled) {
        try {
          await this.score.play();
          this.fadeTo(this.targetVolume);
        } catch {
          this.enabled = false;
        }
      } else {
        this.fadeTo(0, () => this.score.pause());
      }
      this.paintToggle();
    }

    paintToggle() {
      const text = this.enabled ? "Pausar música" : "Activar música";
      this.toggle?.setAttribute("aria-pressed", String(this.enabled));
      this.toggle?.setAttribute("aria-label", text);
      if (this.icon) this.icon.textContent = this.enabled ? "♫" : "♩";
      if (this.label) this.label.textContent = text;
    }

    cue(name) {
      this.targetVolume = CONFIG.audio[name] ?? .08;
      if (this.enabled && !this.voicePlaying()) this.fadeTo(this.targetVolume);
    }

    fadeTo(target, callback) {
      if (!this.score) return;
      const start = this.score.volume;
      const began = performance.now();
      const duration = TEST_MODE ? 30 : 900;
      const tick = (now) => {
        const progress = clamp((now - began) / duration);
        this.score.volume = start + (target - start) * progress;
        if (progress < 1) requestAnimationFrame(tick);
        else callback?.();
      };
      requestAnimationFrame(tick);
    }

    openVoiceGate(callback) {
      this.onVoiceDone = callback;
      if (!this.voiceAvailable) {
        callback();
        return;
      }
      this.voicePanel.hidden = false;
      this.voicePanel.classList.add("is-visible");
      focusQuietly(this.voiceButton);
    }

    voicePlaying() {
      return this.voice && !this.voice.paused && !this.voice.ended;
    }

    async toggleVoice() {
      if (!this.voice) return;
      if (this.voicePlaying()) {
        this.voice.pause();
        this.voiceButton.setAttribute("aria-pressed", "false");
        qs("[data-voice-label]", this.voiceButton).textContent = "Continuar escuchando";
        return;
      }
      try {
        this.fadeTo(.008);
        await this.voice.play();
        this.voiceButton.setAttribute("aria-pressed", "true");
        qs("[data-voice-label]", this.voiceButton).textContent = "Pausar";
        this.voiceStatus.textContent = "Nota de voz reproduciéndose.";
      } catch {
        this.finishVoice();
      }
    }

    finishVoice() {
      if (this.voice) {
        this.voice.pause();
        this.voice.currentTime = 0;
      }
      this.voicePanel?.classList.remove("is-visible");
      this.voicePanel && (this.voicePanel.hidden = true);
      if (this.enabled) this.fadeTo(this.targetVolume);
      const callback = this.onVoiceDone;
      this.onVoiceDone = null;
      callback?.();
    }

    resetVoice() {
      this.onVoiceDone = null;
      if (this.voice) {
        this.voice.pause();
        this.voice.currentTime = 0;
      }
      if (this.voicePanel) {
        this.voicePanel.hidden = true;
        this.voicePanel.classList.remove("is-visible");
      }
    }
  }

  const audio = new AudioController();

  class SceneManager {
    constructor() {
      this.scenes = qsa(".scene");
      this.index = 0;
      this.locked = false;
      this.veil = qs("#transition-veil");
      this.experience = qs("#experience");
      this.announcer = qs("#scene-announcer");
      this.progress = qs("#story-progress");
      this.enterHandlers = new Map();
      this.exitHandlers = new Map();
    }

    onEnter(name, callback) { this.enterHandlers.set(name, callback); }
    onExit(name, callback) { this.exitHandlers.set(name, callback); }

    currentName() { return this.scenes[this.index]?.dataset.scene; }

    hydrate(index = 0) {
      this.index = clamp(index, 0, this.scenes.length - 1);
      this.scenes.forEach((scene, sceneIndex) => {
        const active = sceneIndex === this.index;
        scene.classList.toggle("is-active", active);
        scene.classList.toggle("is-entered", active);
        scene.classList.remove("is-entering", "is-leaving");
        scene.setAttribute("aria-hidden", String(!active));
        if (active) scene.removeAttribute("inert");
        else scene.setAttribute("inert", "");
      });
      this.applySceneState();
    }

    applySceneState() {
      const scene = this.scenes[this.index];
      if (!scene) return;
      const name = scene.dataset.scene;
      this.experience.dataset.act = scene.dataset.act || "night";
      this.experience.dataset.timeOfDay = ["dawn", "field"].includes(name) ? "day" : "night";
      this.experience.style.setProperty("--story-progress", String((this.index + 1) / this.scenes.length));
      if (this.progress) this.progress.style.width = `${((this.index + 1) / this.scenes.length) * 100}%`;
      this.announcer.textContent = `Momento ${this.index + 1} de ${this.scenes.length}: ${qs(".scene__title", scene)?.textContent || name}`;
      audio.cue(name);
      focusQuietly(qs(".scene__title", scene));
      this.enterHandlers.get(name)?.();
    }

    async next(kind = "standard") {
      if (this.locked || this.index >= this.scenes.length - 1) return;
      await this.goTo(this.index + 1, kind);
    }

    async goTo(target, kind = "standard") {
      if (this.locked || target === this.index || !this.scenes[target]) return;
      this.locked = true;
      const from = this.scenes[this.index];
      const to = this.scenes[target];
      const fromName = from.dataset.scene;
      const transitionScope = pacer.createScope("scene-transition");
      this.exitHandlers.get(fromName)?.();
      pacer.cancel(`scene:${fromName}`);
      this.experience.classList.add("is-transitioning");
      document.documentElement.dataset.transitioning = "true";
      if (kind === "awakening") {
        this.experience.classList.add("is-awakening-transition");
        this.veil.classList.add("is-awakening");
      }
      this.veil.classList.add("is-active");
      const duration = kind === "awakening" ? CONFIG.timings.truthDawn : CONFIG.timings.scene;
      try {
        await pacer.wait(duration * .48, transitionScope);
        from.classList.add("is-leaving");
        from.classList.remove("is-active");
        from.setAttribute("aria-hidden", "true");
        from.setAttribute("inert", "");
        this.index = target;
        to.classList.add("is-active", "is-entering");
        to.setAttribute("aria-hidden", "false");
        to.removeAttribute("inert");
        this.applySceneState();
        await pacer.wait(duration * .52, transitionScope);
        to.classList.remove("is-entering");
        to.classList.add("is-entered");
        from.classList.remove("is-leaving");
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      } finally {
        this.veil.classList.remove("is-active", "is-awakening");
        this.experience.classList.remove("is-transitioning", "is-awakening-transition");
        document.documentElement.dataset.transitioning = "false";
        this.locked = false;
      }
    }
  }

  const sceneManager = new SceneManager();

  const ambient = {
    build() {
      const stars = qs("#ambient-stars");
      if (stars && !stars.children.length) {
        for (let i = 0; i < 44; i += 1) {
          const dot = document.createElement("span");
          dot.style.setProperty("--x", `${(i * 37) % 101}%`);
          dot.style.setProperty("--y", `${(i * 61) % 93}%`);
          dot.style.setProperty("--size", `${1 + (i % 3)}px`);
          dot.style.setProperty("--alpha", `${.22 + (i % 5) * .09}`);
          dot.style.setProperty("--duration", `${4 + (i % 6)}s`);
          dot.style.setProperty("--delay", `${-(i % 7)}s`);
          stars.append(dot);
        }
      }
      const breeze = qs("#cliff-breeze");
      if (breeze && !breeze.children.length) {
        for (let i = 0; i < 18; i += 1) {
          const particle = document.createElement("span");
          particle.className = "cliff-breeze__particle";
          particle.style.setProperty("--x", `${8 + (i * 29) % 86}%`);
          particle.style.setProperty("--y", `${12 + (i * 41) % 68}%`);
          particle.style.setProperty("--size", `${1 + (i % 2)}px`);
          particle.style.setProperty("--alpha", `${.16 + (i % 4) * .07}`);
          particle.style.setProperty("--duration", `${7 + (i % 5)}s`);
          particle.style.setProperty("--delay", `${-(i % 8)}s`);
          breeze.append(particle);
        }
      }
      const release = qs("#cliff-release");
      if (release && !release.children.length) {
        for (let i = 0; i < 28; i += 1) {
          const particle = document.createElement("span");
          particle.className = "cliff-release__particle";
          particle.style.setProperty("--x", `${38 + (i * 17) % 52}%`);
          particle.style.setProperty("--y", `${18 + (i * 23) % 55}%`);
          particle.style.setProperty("--size", `${1 + (i % 3)}px`);
          particle.style.setProperty("--alpha", `${.3 + (i % 5) * .09}`);
          release.append(particle);
        }
      }
      addEventListener("pointermove", (event) => {
        document.documentElement.style.setProperty("--pointer-x", String(event.clientX / innerWidth - .5));
        document.documentElement.style.setProperty("--pointer-y", String(event.clientY / innerHeight - .5));
      }, { passive: true });
    }
  };

  const loadOptionalImages = () => {
    const sources = {
      foto1: "assets/images/foto-1.jpg",
      foto2: "assets/images/foto-2.jpg"
    };
    qsa("[data-optional-image]").forEach((image) => {
      const source = sources[image.dataset.optionalImage];
      if (!source) return;
      image.addEventListener("load", () => image.classList.add("is-loaded"), { once: true });
      image.addEventListener("error", () => {
        image.classList.remove("is-loaded");
        image.removeAttribute("src");
      }, { once: true });
      image.src = source;
    });
  };

  const sequences = {};
  const createSequence = (name, options = {}) => {
    sequences[name] = new NarrativeSequence(name, STORY[name], options);
    return sequences[name];
  };

  const intro = {
    star: qs("#intro-star"),
    instruction: qs("#intro-instruction"),
    enter() {
      const signal = pacer.createScope("scene:intro");
      pacer.schedule(() => {
        this.star.disabled = false;
        this.star.classList.add("is-ready");
      }, CONFIG.timings.introStar, signal);
    },
    start() {
      if (this.star.disabled) return;
      this.star.disabled = true;
      this.star.classList.add("is-lit");
      this.instruction.classList.add("is-hidden");
      qs("#intro-before")?.classList.add("is-leaving");
      sequences.intro.start();
    },
    reset() {
      this.star.disabled = true;
      this.star.classList.remove("is-ready", "is-lit");
      this.instruction.classList.remove("is-hidden");
      qs("#intro-before")?.classList.remove("is-leaving");
    }
  };

  const night = {
    stars: qsa(".constellation-star"),
    count: 0,
    enter() { this.stars.forEach((star) => { star.disabled = false; }); },
    activate(star) {
      if (star.disabled || star.classList.contains("is-lit")) return;
      star.classList.add("is-lit");
      star.disabled = true;
      this.count += 1;
      if (this.count !== this.stars.length) return;
      qs("#constellation")?.classList.add("is-complete");
      qs("#night-instruction")?.classList.add("is-hidden");
      const signal = pacer.createScope("scene:night");
      pacer.schedule(() => {
        qs("#constellation")?.classList.add("is-observed");
        sequences.night.start();
      }, CONFIG.timings.observe, signal);
    },
    reset() {
      this.count = 0;
      this.stars.forEach((star) => { star.disabled = true; star.classList.remove("is-lit"); });
      qs("#constellation")?.classList.remove("is-complete", "is-observed");
      qs("#night-instruction")?.classList.remove("is-hidden");
    }
  };

  const reveal = {
    canvas: qs("#fog-canvas"),
    frame: qs("#reveal-frame"),
    fallback: qs("#reveal-hold"),
    progress: 0,
    cells: new Set(),
    drawing: false,
    completed: false,
    fallbackHolding: false,
    fallbackStarted: 0,
    enter() {
      this.drawFog();
      const signal = pacer.createScope("scene:reveal");
      pacer.schedule(() => {
        if (!this.completed && this.progress < .15) {
          this.fallback.disabled = false;
          this.fallback.setAttribute("aria-hidden", "false");
        }
      }, CONFIG.timings.revealFallback, signal);
    },
    drawFog() {
      if (!this.canvas) return;
      const rect = this.frame.getBoundingClientRect();
      const ratio = Math.min(devicePixelRatio || 1, 2);
      this.canvas.width = Math.max(1, Math.round(rect.width * ratio));
      this.canvas.height = Math.max(1, Math.round(rect.height * ratio));
      const context = this.canvas.getContext("2d");
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const gradient = context.createLinearGradient(0, 0, rect.width, rect.height);
      gradient.addColorStop(0, "rgba(218,228,235,.97)");
      gradient.addColorStop(.55, "rgba(167,188,204,.96)");
      gradient.addColorStop(1, "rgba(105,135,160,.96)");
      context.fillStyle = gradient;
      context.fillRect(0, 0, rect.width, rect.height);
      context.fillStyle = "rgba(255,255,255,.13)";
      for (let i = 0; i < 26; i += 1) context.fillRect((i * 83) % rect.width, (i * 47) % rect.height, 2, 9);
    },
    erase(event) {
      if (!this.drawing || this.completed) return;
      const rect = this.canvas.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      const cell = `${Math.floor(x / 28)}:${Math.floor(y / 28)}`;
      if (this.cells.has(cell)) return;
      this.cells.add(cell);
      const ratio = this.canvas.width / rect.width;
      const context = this.canvas.getContext("2d");
      context.save();
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      context.globalCompositeOperation = "destination-out";
      const brush = context.createRadialGradient(x, y, 4, x, y, 34);
      brush.addColorStop(0, "rgba(0,0,0,.92)");
      brush.addColorStop(1, "rgba(0,0,0,0)");
      context.fillStyle = brush;
      context.beginPath();
      context.arc(x, y, 35, 0, Math.PI * 2);
      context.fill();
      context.restore();
      this.setProgress(Math.min(.6, this.cells.size / 62));
    },
    setProgress(value) {
      this.progress = clamp(value);
      document.documentElement.style.setProperty("--reveal-progress", String(this.progress));
      qs("#reveal-meter-fill").style.width = `${this.progress * 100}%`;
      qs(".reveal-meter", this.frame)?.setAttribute("aria-valuenow", String(Math.round(this.progress * 100)));
      if (this.progress >= .55) this.complete();
    },
    holdStart(event) {
      if (this.fallback.disabled || this.completed) return;
      event.preventDefault();
      this.fallbackHolding = true;
      this.fallbackStarted = performance.now() - this.progress * CONFIG.timings.dawnHold;
      this.fallback.setPointerCapture?.(event.pointerId);
      const step = (time) => {
        if (!this.fallbackHolding || this.completed) return;
        this.setProgress((time - this.fallbackStarted) / CONFIG.timings.dawnHold);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    holdEnd() { this.fallbackHolding = false; },
    complete() {
      if (this.completed) return;
      this.completed = true;
      this.drawing = false;
      this.setProgress(.55);
      this.canvas.classList.add("is-cleared");
      this.fallback.disabled = true;
      this.fallback.setAttribute("aria-hidden", "true");
      qs("#reveal-instructions")?.classList.add("is-hidden");
      const signal = pacer.createScope("scene:reveal");
      pacer.schedule(() => {
        this.frame.classList.add("is-observed");
        sequences.reveal.start();
      }, CONFIG.timings.observe, signal);
    },
    reset() {
      this.progress = 0;
      this.cells.clear();
      this.drawing = false;
      this.completed = false;
      this.holdEnd();
      this.canvas?.classList.remove("is-cleared");
      this.frame?.classList.remove("is-observed");
      this.fallback.disabled = true;
      this.fallback.setAttribute("aria-hidden", "true");
      qs("#reveal-instructions")?.classList.remove("is-hidden");
      this.setProgress(0);
    }
  };

  const painting = {
    points: qsa(".paint-point"),
    count: 0,
    enter() { this.points.forEach((point) => { point.disabled = false; }); },
    paint(point) {
      if (point.disabled || point.classList.contains("is-painted")) return;
      point.disabled = true;
      point.classList.add("is-painted");
      qs(`[data-piece-layer="${point.dataset.paintPiece}"]`)?.classList.add("is-painted");
      const spark = qs("#paint-spark");
      spark.style.setProperty("--spark-x", point.style.getPropertyValue("--x"));
      spark.style.setProperty("--spark-y", point.style.getPropertyValue("--y"));
      spark.classList.remove("is-active");
      void spark.offsetWidth;
      spark.classList.add("is-active");
      this.count += 1;
      if (this.count !== this.points.length) return;
      qs("#unfinished-painting")?.classList.add("is-complete");
      qs("#painting-instruction")?.classList.add("is-hidden");
      const signal = pacer.createScope("scene:painting");
      pacer.schedule(() => {
        qs("#unfinished-painting")?.classList.add("is-observed");
        sequences.painting.start();
      }, CONFIG.timings.paintingObserve, signal);
    },
    reset() {
      this.count = 0;
      this.points.forEach((point) => { point.disabled = true; point.classList.remove("is-painted"); });
      qsa("[data-piece-layer]").forEach((layer) => layer.classList.remove("is-painted"));
      qs("#unfinished-painting")?.classList.remove("is-complete", "is-observed");
      qs("#painting-instruction")?.classList.remove("is-hidden");
      qs("#paint-spark")?.classList.remove("is-active");
    }
  };

  const truth = {
    gateOpened: false,
    enter() { sequences.truth.start(); },
    openGate() {
      if (this.gateOpened) return;
      this.gateOpened = true;
      audio.openVoiceGate(() => this.showStar());
    },
    showStar() {
      const star = qs("#truth-star");
      star.disabled = false;
      star.setAttribute("aria-hidden", "false");
      star.classList.add("is-ready");
      qs("#truth-star-instruction").setAttribute("aria-hidden", "false");
      focusQuietly(star);
    },
    continue() {
      if (qs("#truth-star").disabled) return;
      qs("#truth-star").disabled = true;
      sceneManager.next("awakening");
    },
    reset() {
      this.gateOpened = false;
      audio.resetVoice();
      const star = qs("#truth-star");
      star.disabled = true;
      star.setAttribute("aria-hidden", "true");
      star.classList.remove("is-ready");
      qs("#truth-star-instruction").setAttribute("aria-hidden", "true");
      qs("#truth-love-word")?.classList.remove("is-visible");
    }
  };

  const dawn = {
    progress: 0,
    holding: false,
    coasting: false,
    holdOrigin: 0,
    completed: false,
    enter() {
      qs("#dawn-sun").disabled = false;
      qsa(".returning-star, .returning-brush").forEach((item) => item.classList.add("is-visible"));
      const signal = pacer.createScope("scene:dawn");
      pacer.schedule(() => {
        if (!this.completed && this.progress < .1) {
          const fallback = qs("#dawn-fallback");
          fallback.disabled = false;
          fallback.setAttribute("aria-hidden", "false");
        }
      }, CONFIG.timings.dawnFallback, signal);
    },
    setProgress(value) {
      this.progress = clamp(value);
      document.documentElement.style.setProperty("--dawn-progress", String(this.progress));
      const meter = qs(".dawn-meter");
      meter?.setAttribute("aria-valuenow", String(Math.round(this.progress * 100)));
      qs(".dawn-meter span").style.width = `${this.progress * 100}%`;
      if (this.progress >= .85 && this.holding && !this.coasting && !this.completed) this.coast();
    },
    holdStart(event) {
      if (this.completed || qs("#dawn-sun").disabled) return;
      event.preventDefault();
      this.holding = true;
      this.holdOrigin = performance.now() - (this.progress / .85) * CONFIG.timings.dawnHold;
      qs("#dawn-sun").classList.add("is-holding");
      qs("#dawn-sun").setPointerCapture?.(event.pointerId);
      const step = (time) => {
        if (!this.holding || this.completed) return;
        this.setProgress(((time - this.holdOrigin) / CONFIG.timings.dawnHold) * .85);
        requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    },
    holdEnd() {
      this.holding = false;
      qs("#dawn-sun")?.classList.remove("is-holding");
    },
    coast() {
      if (this.coasting || this.completed) return;
      this.coasting = true;
      this.holdEnd();
      const start = performance.now();
      const initial = this.progress;
      const duration = TEST_MODE ? 30 : CONFIG.timings.dawnCoast;
      const step = (time) => {
        if (this.completed) return;
        const ratio = clamp((time - start) / duration);
        this.setProgress(initial + (1 - initial) * ratio);
        if (ratio < 1) requestAnimationFrame(step);
        else this.complete();
      };
      requestAnimationFrame(step);
    },
    automatic() {
      if (this.completed) return;
      qs("#dawn-fallback").disabled = true;
      const start = performance.now();
      const initial = this.progress;
      const duration = TEST_MODE ? 35 : CONFIG.timings.dawnHold + CONFIG.timings.dawnCoast;
      const step = (time) => {
        if (this.completed) return;
        const ratio = clamp((time - start) / duration);
        this.setProgress(initial + (1 - initial) * ratio);
        if (ratio < 1) requestAnimationFrame(step);
        else this.complete();
      };
      requestAnimationFrame(step);
    },
    complete() {
      if (this.completed) return;
      this.completed = true;
      this.progress = 1;
      document.documentElement.style.setProperty("--dawn-progress", "1");
      qs("#scene-dawn")?.classList.add("is-dawned");
      qs("#dawn-sun").disabled = true;
      qs("#dawn-fallback").disabled = true;
      qs("#dawn-fallback").setAttribute("aria-hidden", "true");
      const signal = pacer.createScope("scene:dawn");
      pacer.schedule(() => sequences.dawn.start(), CONFIG.timings.dawnObserve, signal);
    },
    grow() {
      const flower = qs("#growing-flower");
      flower.classList.add("is-growing");
      const signal = pacer.signal("scene:dawn");
      pacer.schedule(() => {
        flower.classList.remove("is-growing");
        flower.classList.add("is-grown");
      }, CONFIG.timings.flowerGrow, signal);
    },
    reset() {
      this.progress = 0;
      this.holding = false;
      this.coasting = false;
      this.completed = false;
      document.documentElement.style.setProperty("--dawn-progress", "0");
      qs("#scene-dawn")?.classList.remove("is-dawned");
      qs("#dawn-sun").disabled = true;
      qs("#dawn-sun").classList.remove("is-holding");
      qs("#dawn-fallback").disabled = true;
      qs("#dawn-fallback").setAttribute("aria-hidden", "true");
      qs("#growing-flower")?.classList.remove("is-growing", "is-grown");
      qsa(".returning-star, .returning-brush").forEach((item) => item.classList.remove("is-visible"));
    }
  };

  const field = {
    letterOpen: false,
    enter() {
      const signal = pacer.createScope("scene:field");
      pacer.schedule(() => sequences.field.start(), CONFIG.timings.observe, signal);
    },
    openLetter() {
      if (this.letterOpen) return;
      this.letterOpen = true;
      const overlay = qs("#letter-overlay");
      qs("#field-content")?.classList.add("is-letter-open");
      overlay.hidden = false;
      overlay.setAttribute("aria-hidden", "false");
      requestAnimationFrame(() => overlay.classList.add("is-visible"));
      focusQuietly(qs("#letter-title"));
      sequences.letter.start();
    },
    reset() {
      this.letterOpen = false;
      qs("#field-content")?.classList.remove("is-letter-open");
      const overlay = qs("#letter-overlay");
      overlay.hidden = true;
      overlay.setAttribute("aria-hidden", "true");
      overlay.classList.remove("is-visible");
      qs("#letter-signature")?.classList.remove("is-visible");
      qs("#letter-mark")?.classList.remove("is-visible");
    }
  };

  const cliff = {
    closed: false,
    enter() { sequences.cliff.start(); },
    release() {
      if (this.closed) return;
      this.closed = true;
      const scene = qs("#scene-cliff");
      scene.classList.add("is-releasing");
      setButtonReady(qs("#cliff-next"), false);
      const signal = pacer.createScope("scene:cliff");
      pacer.schedule(() => {
        scene.classList.add("is-closed");
        const mark = qs("#closing-mark");
        mark.setAttribute("aria-hidden", "false");
        audio.cue("closing");
        pacer.schedule(() => {
          setButtonReady(qs("#replay-story"), true);
          focusQuietly(qs("#replay-story"));
        }, 1900, signal);
      }, CONFIG.timings.cliffExit, signal);
    },
    reset() {
      this.closed = false;
      qs("#scene-cliff")?.classList.remove("is-releasing", "is-closed");
      qs("#closing-mark")?.setAttribute("aria-hidden", "true");
      setButtonReady(qs("#replay-story"), false);
    }
  };

  const resetExperience = () => {
    pacer.cancelAll();
    Object.values(sequences).forEach((sequence) => sequence.reset());
    intro.reset();
    night.reset();
    reveal.reset();
    painting.reset();
    truth.reset();
    dawn.reset();
    field.reset();
    cliff.reset();
    sceneManager.hydrate(0);
  };

  const wire = () => {
    createSequence("intro", { onComplete: () => setButtonReady(qs("#intro-next"), true) });
    createSequence("night", { onComplete: () => setButtonReady(qs("#night-next"), true) });
    createSequence("reveal", { onComplete: () => setButtonReady(qs("#reveal-next"), true) });
    createSequence("painting", { onComplete: () => setButtonReady(qs("#painting-next"), true) });
    createSequence("truth", {
      onEffect: (effect) => effect === "love" && qs("#truth-love-word")?.classList.add("is-visible"),
      onComplete: () => setButtonReady(qs("#truth-next"), true)
    });
    createSequence("dawn", {
      onEffect: (effect) => effect === "grow" && dawn.grow(),
      onComplete: () => setButtonReady(qs("#dawn-next"), true)
    });
    createSequence("field", { onComplete: () => setButtonReady(qs("#field-next"), true) });
    createSequence("letter", {
      manual: true,
      button: "#letter-next",
      onComplete: () => {
        qs("#letter-signature")?.classList.add("is-visible");
        qs("#letter-mark")?.classList.add("is-visible");
        qs("#letter-next").hidden = true;
        setButtonReady(qs("#letter-finish"), true);
      }
    });
    createSequence("cliff", { onComplete: () => setButtonReady(qs("#cliff-next"), true) });

    sceneManager.onEnter("intro", () => intro.enter());
    sceneManager.onEnter("night", () => night.enter());
    sceneManager.onEnter("reveal", () => reveal.enter());
    sceneManager.onEnter("painting", () => painting.enter());
    sceneManager.onEnter("truth", () => truth.enter());
    sceneManager.onEnter("dawn", () => dawn.enter());
    sceneManager.onEnter("field", () => field.enter());
    sceneManager.onEnter("cliff", () => cliff.enter());

    intro.star.addEventListener("click", () => intro.start());
    night.stars.forEach((star) => star.addEventListener("click", () => night.activate(star)));
    painting.points.forEach((point) => point.addEventListener("click", () => painting.paint(point)));
    qs("#intro-next").addEventListener("click", () => sceneManager.next());
    qs("#night-next").addEventListener("click", () => sceneManager.next());
    qs("#reveal-next").addEventListener("click", () => sceneManager.next());
    qs("#painting-next").addEventListener("click", () => sceneManager.next());
    qs("#truth-next").addEventListener("click", () => truth.openGate());
    qs("#truth-star").addEventListener("click", () => truth.continue());
    qs("#dawn-next").addEventListener("click", () => sceneManager.next());
    qs("#field-next").addEventListener("click", () => field.openLetter());
    qs("#letter-finish").addEventListener("click", () => sceneManager.next());
    qs("#cliff-next").addEventListener("click", () => cliff.release());
    qs("#replay-story").addEventListener("click", resetExperience);

    reveal.canvas.addEventListener("pointerdown", (event) => {
      reveal.drawing = true;
      reveal.canvas.setPointerCapture?.(event.pointerId);
      reveal.erase(event);
    });
    reveal.canvas.addEventListener("pointermove", (event) => reveal.erase(event));
    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => reveal.canvas.addEventListener(type, () => { reveal.drawing = false; }));
    reveal.fallback.addEventListener("pointerdown", (event) => reveal.holdStart(event));
    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => reveal.fallback.addEventListener(type, () => reveal.holdEnd()));
    qs("#dawn-sun").addEventListener("pointerdown", (event) => dawn.holdStart(event));
    ["pointerup", "pointercancel", "pointerleave"].forEach((type) => qs("#dawn-sun").addEventListener(type, () => dawn.holdEnd()));
    qs("#dawn-fallback").addEventListener("click", () => dawn.automatic());

    addEventListener("resize", () => {
      document.documentElement.style.setProperty("--app-height", `${innerHeight}px`);
      if (sceneManager.currentName() === "reveal" && !reveal.completed) reveal.drawFog();
    }, { passive: true });
    document.documentElement.style.setProperty("--app-height", `${innerHeight}px`);
  };

  const preview = () => {
    document.documentElement.classList.add("is-previewing");
    const targetName = PREVIEW_SCENE === "letter" ? "field" : PREVIEW_SCENE === "closing" ? "cliff" : PREVIEW_SCENE;
    const index = sceneManager.scenes.findIndex((scene) => scene.dataset.scene === targetName);
    if (index < 0) return false;
    if (index > 1) {
      night.stars.forEach((star) => star.classList.add("is-lit"));
      qs("#constellation")?.classList.add("is-complete");
    }
    if (index > 3) {
      painting.points.forEach((point) => point.classList.add("is-painted"));
      qsa("[data-piece-layer]").forEach((layer) => layer.classList.add("is-painted"));
    }
    sceneManager.hydrate(index);
    if (PREVIEW_SCENE === "letter") {
      pacer.cancel("scene:field");
      field.openLetter();
    }
    if (PREVIEW_SCENE === "closing") {
      pacer.cancel("sequence:cliff");
      const scene = qs("#scene-cliff");
      scene.classList.add("is-closed");
      qs("#closing-mark").setAttribute("aria-hidden", "false");
      setButtonReady(qs("#replay-story"), true);
    }
    return true;
  };

  const clickReady = async (selector, signal) => {
    const element = qs(selector);
    for (let i = 0; i < 240 && (element.disabled || element.getAttribute("aria-hidden") === "true"); i += 1) {
      await pacer.wait(20, signal);
    }
    if (element.disabled) throw new Error(`Self-test control unavailable: ${selector}`);
    element.click();
    await pacer.wait(40, signal);
  };

  const runSelfTest = async () => {
    const signal = pacer.createScope("self-test");
    const assert = (value, message) => { if (!value) throw new Error(message); };
    try {
      assert(sceneManager.scenes.length === 8, "The experience must contain exactly eight scenes.");
      assert(qsa(".constellation-star").length === 4, "The night must contain exactly four memories.");
      assert(qsa(".paint-point").length === 4, "The painting must contain exactly four principles.");
      const letterWords = STORY.letter.flatMap((item) => item.lines).map((item) => item.text).join(" ").trim().split(/\s+/).length;
      assert(letterWords >= 140 && letterWords <= 180, `Letter length out of range: ${letterWords}`);
      await clickReady("#intro-star", signal);
      await clickReady("#intro-next", signal);
      night.stars.forEach((star) => star.click());
      await clickReady("#night-next", signal);
      reveal.complete();
      await clickReady("#reveal-next", signal);
      painting.points.forEach((point) => point.click());
      await clickReady("#painting-next", signal);
      await clickReady("#truth-next", signal);
      if (!qs("#voice-note").hidden) qs("#voice-skip").click();
      await clickReady("#truth-star", signal);
      dawn.complete();
      await clickReady("#dawn-next", signal);
      await clickReady("#field-next", signal);
      for (let i = 1; i < STORY.letter.length; i += 1) await clickReady("#letter-next", signal);
      await clickReady("#letter-next", signal);
      await clickReady("#letter-finish", signal);
      await clickReady("#cliff-next", signal);
      const replay = qs("#replay-story");
      for (let i = 0; i < 240 && replay.disabled; i += 1) await pacer.wait(20, signal);
      assert(!replay.disabled, "Replay control unavailable.");
      replay.click();
      document.documentElement.dataset.selfTest = "passed";
      document.documentElement.dataset.letterWords = String(letterWords);
    } catch (error) {
      document.documentElement.dataset.selfTest = "failed";
      document.documentElement.dataset.selfTestError = error.message;
      console.error(error);
    }
  };

  loadOptionalImages();
  ambient.build();
  wire();
  sceneManager.hydrate(0);
  if (PREVIEW_SCENE) preview();
  if (TEST_MODE) runSelfTest();

  window.NarrativePacer = NarrativePacer;
  window.narrativePacer = pacer;
  window.STORY_CONFIG = { CONFIG, STORY };
  window.sceneManager = sceneManager;
})();
