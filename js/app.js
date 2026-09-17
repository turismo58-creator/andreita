(() => {
  "use strict";

  const qs = (selector, root = document) => root.querySelector(selector);
  const qsa = (selector, root = document) => [...root.querySelectorAll(selector)];
  const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
  const params = new URLSearchParams(location.search);
  const TEST_MODE = params.get("test") === "1";
  const PREVIEW = params.get("preview");

  const CONFIG = {
    timings: {
      scene: 1400,
      release: 5200,
      beat: 800,
      postBeat: 1500,
      introStar: 900,
      observe: 1400,
      memoryObserve: 3400,
      flowersRest: 1500,
      dawnArrival: 2200,
      entrySettle: 1150,
      focus: 80
    },
    profiles: {
      normal: { min: 2500, max: 3500, wpm: 150 },
      intimate: { min: 2800, max: 3800, wpm: 145 },
      emotional: { min: 3500, max: 4500, wpm: 140 },
      key: { min: 4200, max: 5000, wpm: 135 },
      contemplative: { min: 3300, max: 4400, wpm: 140 }
    },
    audio: { intro: .18, memories: .2, sorry: .06, decision: .12, flowers: .23, cliff: .1, dawn: .26 }
  };

  if (TEST_MODE) {
    Object.keys(CONFIG.timings).forEach((key) => {
      CONFIG.timings[key] = Math.max(14, Math.round(CONFIG.timings[key] * .01));
    });
    Object.values(CONFIG.profiles).forEach((profile) => {
      profile.min = 18;
      profile.max = 28;
    });
  }

  const line = (text, className = "") => ({ text, className });
  const page = (lines, options = {}) => ({
    lines: lines.map((item) => typeof item === "string" ? line(item) : item),
    profile: "normal",
    ...options
  });

  const STORY = {
    intro: [
      page(["Esta vez no hice esto para pedirte que volvamos a intentarlo."], { profile: "intimate" }),
      page(["Ni para pedirte una respuesta."], { profile: "intimate" }),
      page(["Solo hay cosas que quisiera decirte una última vez…", "…de la forma más bonita que pude encontrar."], { profile: "intimate" })
    ],
    memories: [
      page(["Gracias por permitirme conocerte."], { profile: "intimate", duration: 4200 }),
      page(["Por las conversaciones.", "Por las risas."], { profile: "normal" }),
      page(["Por los momentos bonitos."], { profile: "normal" }),
      page(["Quizá algunas cosas parecían pequeñas…", "…pero para mí nunca lo fueron."], { profile: "intimate" }),
      page([line("Te quise.", "memory-emphasis")], { profile: "emotional", duration: 4200 }),
      page([line("Te quiero.", "memory-emphasis")], { profile: "key", duration: 5200 }),
      page(["Y probablemente una parte de mí te quiera durante mucho tiempo."], { profile: "intimate", postBeatDelay: 3000 })
    ],
    sorry: [
      page(["Andrea…"], { profile: "emotional" }),
      page(["También necesito decirte algo sin esconderlo detrás de esta página."], { profile: "emotional" }),
      page([line("Lo siento.", "sorry-emphasis")], { profile: "key", duration: 5200 }),
      page(["Nunca fue mi intención lastimarte.", "Pero sé que eso no cambia lo que pasó."], { profile: "emotional", duration: 4300 }),
      page(["No supe manejar la situación.", "Y terminé causando una herida que no merecías."], { profile: "emotional", duration: 4500 }),
      page(["No quiero justificarme.", "No quiero hacer como si no hubiera ocurrido."], { profile: "emotional" }),
      page(["Solo quiero pedirte perdón."], { profile: "emotional" }),
      page([line("Perdón.", "sorry-emphasis")], { profile: "key", duration: 5200 }),
      page(["Sé que hay heridas que por momentos pueden dejar de doler…", "…pero perdonar es diferente."], { profile: "emotional" }),
      page(["Y entiendo si no puedes hacerlo."], { profile: "emotional", postBeatDelay: 2800 })
    ],
    decision: [
      page(["Y precisamente porque entiendo eso…"], { profile: "intimate" }),
      page([line("decidí alejarme.", "decision-emphasis")], { profile: "key", duration: 5200 }),
      page(["No porque haya dejado de sentir."], { profile: "emotional", duration: 4200 }),
      page(["Sino porque también creo que querer a alguien significa saber cuándo dejar de insistir."], { profile: "emotional" }),
      page(["No quiero presionarte.", "No quiero incomodarte."], { profile: "emotional" }),
      page(["No quiero convertir mi dolor en una carga para ti."], { profile: "emotional" }),
      page(["Quiero respetar tu tranquilidad."], { profile: "emotional", duration: 4500 }),
      page(["Así que después de hoy…", "…voy a dejarte tranquila."], { profile: "key", duration: 5200 }),
      page(["Si algún día necesitas algo…", "…y está en mis manos ayudarte…"], { profile: "intimate" }),
      page(["…lo haré con todo el cariño.", "Sin esperar nada a cambio."], { profile: "intimate" })
    ],
    flowers: [
      page(["El 21 es el Día de las Flores Amarillas."], { profile: "intimate" }),
      page(["Pero las tuyas llegaron antes."], { profile: "intimate" }),
      page(["Y esta vez no son una promesa.", "No son una manera de pedirte que te quedes."], { profile: "emotional" }),
      page([line("Son mi regalo de despedida.", "farewell-emphasis")], { profile: "key", duration: 5200 }),
      page(["En ellas queda un poquito…", "…de todo el cariño que te tuve…"], { profile: "intimate" }),
      page(["…que te tengo…", "…y que probablemente llevaré conmigo durante mucho tiempo."], { profile: "intimate" }),
      page(["Esta será nuestra última cita especial."], { profile: "emotional", duration: 5200 }),
      page(["Y solo quería que fuera bonita."], { profile: "intimate" })
    ],
    cliff: [
      page(["Andrea…"], { profile: "contemplative" }),
      page(["Antes de terminar…"], { profile: "contemplative" }),
      page(["de verdad lo siento."], { profile: "emotional", duration: 4500 }),
      page(["Por lo que hice.", "Y por todo lo que terminó desmoronándose después."], { profile: "contemplative" }),
      page(["No espero que unas palabras borren esa herida."], { profile: "contemplative" }),
      page(["Quizá solo el tiempo sepa qué puede pasar con ella."], { profile: "contemplative" }),
      page(["Pero quería pedirte perdón una última vez."], { profile: "contemplative" }),
      page([line("Porque te quiero.", "cliff-emphasis")], { profile: "key", duration: 5000 }),
      page(["Y sí…"], { profile: "contemplative" }),
      page(["probablemente me duela durante mil y una noches."], { profile: "emotional", duration: 5000 }),
      page([line("Pero ninguna de esas noches te obliga a volver.", "cliff-important")], { profile: "key", duration: 5500 }),
      page(["No quiero convertir mi dolor en una carga para ti."], { profile: "contemplative" }),
      page(["Solo espero que algún día puedas perdonarme."], { profile: "contemplative", duration: 5000 }),
      page(["No puedo cambiar aquella noche."], { profile: "contemplative", duration: 4000 }),
      page(["Pero sí puedo decidir quién quiero ser en todas las que vienen después."], { profile: "contemplative", duration: 5500, clearAfter: true, postClearDelay: 2800 })
    ],
    dawn: [
      page(["Si Dios, el tiempo y la vida deciden cruzarnos otra vez…"], { profile: "intimate" }),
      page(["ojalá nos encuentren siendo mejores."], { profile: "emotional" }),
      page(["Y quién sabe…"], { profile: "intimate" }),
      page(["tal vez en otra etapa podamos conocernos de nuevo."], { profile: "intimate" }),
      page(["Cuidarnos mejor.", "Y vivir aquello que esta vez no supe cuidar."], { profile: "intimate" }),
      page(["Pero eso será decisión del tiempo."], { profile: "emotional" }),
      page(["Hoy solo quiero despedirme bonito."], { profile: "emotional" }),
      page(["Porque aunque las cosas no terminaron como imaginé…", "…haberte conocido es algo que sí agradezco."], { profile: "emotional" }),
      page(["Cuídate mucho, Andrea."], { profile: "emotional", duration: 4000 }),
      page(["De verdad deseo que seas muy feliz."], { profile: "key", duration: 4800 }),
      page(["No todos los amores terminan quedándose."], { profile: "contemplative", duration: 4000 }),
      page(["Algunos también aman sabiendo cuándo dejar ir."], { profile: "contemplative", duration: 4500 }),
      page(["Gracias por haber sido parte de mi noche."], { profile: "emotional", duration: 4500 }),
      page([line("Que la vida te regale amaneceres bonitos, Andrea. 🌻", "final-wish")], { profile: "key", duration: 5200 })
    ]
  };

  class NarrativePacer {
    constructor() { this.scopes = new Map(); }
    scale(delay) { return TEST_MODE ? Math.max(10, Math.round(delay * .01)) : delay; }
    createScope(name) {
      this.cancel(name);
      const controller = new AbortController();
      this.scopes.set(name, controller);
      return controller.signal;
    }
    signal(name) { return this.scopes.get(name)?.signal || this.createScope(name); }
    cancel(name) { this.scopes.get(name)?.abort(); this.scopes.delete(name); }
    cancelAll() { [...this.scopes.keys()].forEach((name) => this.cancel(name)); }
    schedule(callback, delay, signal) {
      if (signal?.aborted) return () => {};
      const timer = window.setTimeout(() => { if (!signal?.aborted) callback(); }, this.scale(delay));
      const stop = () => clearTimeout(timer);
      signal?.addEventListener("abort", stop, { once: true });
      return stop;
    }
    wait(delay, signal) {
      if (signal?.aborted) return Promise.reject(new DOMException("Aborted", "AbortError"));
      return new Promise((resolve, reject) => {
        const timer = window.setTimeout(resolve, this.scale(delay));
        signal?.addEventListener("abort", () => { clearTimeout(timer); reject(new DOMException("Aborted", "AbortError")); }, { once: true });
      });
    }
    readingDelay(pageData) {
      if (pageData.duration) return Math.max(0, pageData.duration - CONFIG.timings.entrySettle);
      const profile = CONFIG.profiles[pageData.profile] || CONFIG.profiles.normal;
      const words = pageData.lines.reduce((total, item) => total + item.text.trim().split(/\s+/).length, 0);
      return clamp((words / profile.wpm) * 60000, profile.min, profile.max);
    }
  }

  const pacer = new NarrativePacer();

  const setButtonReady = (button, ready) => {
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
    constructor(name, options = {}) {
      this.name = name;
      this.pages = STORY[name];
      this.output = qs(`[data-sequence="${name}"] [data-sequence-output]`);
      this.button = options.button === false ? null : qs(options.button || `#${name}-next`);
      this.onComplete = options.onComplete || (() => {});
      this.onPage = options.onPage || (() => {});
      this.index = 0;
      this.running = false;
      this.finished = false;
    }
    reset() {
      pacer.cancel(`sequence:${this.name}`);
      this.index = 0;
      this.running = false;
      this.finished = false;
      this.output?.replaceChildren();
      setButtonReady(this.button, false);
    }
    createPage(pageData) {
      const wrapper = document.createElement("div");
      wrapper.className = `narrative-page narrative-page--${this.name}`;
      pageData.lines.forEach((item) => {
        const paragraph = document.createElement("p");
        paragraph.className = `narrative-line${item.className ? ` ${item.className}` : ""}`;
        paragraph.textContent = item.text;
        wrapper.append(paragraph);
      });
      return wrapper;
    }
    async showPage(pageData, signal) {
      const wrapper = this.createPage(pageData);
      this.output.replaceChildren(wrapper);
      await pacer.wait(28, signal);
      for (const item of [...wrapper.children]) {
        item.classList.add("is-visible");
        if (item !== wrapper.lastElementChild) await pacer.wait(CONFIG.timings.beat, signal);
      }
      this.onPage(this.index, pageData);
    }
    async hidePage(signal) {
      const current = this.output.firstElementChild;
      if (!current) return;
      current.classList.add("is-leaving");
      [...current.children].forEach((item) => item.classList.remove("is-visible"));
      await pacer.wait(CONFIG.timings.beat, signal);
    }
    start() {
      if (this.running || this.finished || !this.output) return;
      this.running = true;
      this.play(pacer.createScope(`sequence:${this.name}`));
    }
    async play(signal) {
      try {
        while (this.index < this.pages.length) {
          const pageData = this.pages[this.index];
          await this.showPage(pageData, signal);
          if (this.index === this.pages.length - 1) {
            this.index += 1;
            if (pageData.duration) {
              await pacer.wait(CONFIG.timings.entrySettle, signal);
              await pacer.wait(pacer.readingDelay(pageData), signal);
            } else {
              await pacer.wait(pageData.postBeatDelay || CONFIG.timings.postBeat, signal);
            }
            if (pageData.clearAfter) {
              await this.hidePage(signal);
              await pacer.wait(pageData.postClearDelay || CONFIG.timings.postBeat, signal);
            }
            break;
          }
          if (pageData.duration) await pacer.wait(CONFIG.timings.entrySettle, signal);
          await pacer.wait(pacer.readingDelay(pageData), signal);
          this.index += 1;
          await this.hidePage(signal);
        }
        this.running = false;
        this.finished = true;
        this.onComplete();
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      }
    }
  }

  class AudioController {
    constructor() {
      this.score = qs("#background-music");
      this.control = qs("#audio-control");
      this.icon = qs(".audio-control__icon", this.control);
      this.label = qs(".audio-control__label", this.control);
      this.enabled = false;
      this.target = CONFIG.audio.intro;
      if (this.score) this.score.volume = 0;
      this.control?.addEventListener("click", () => this.toggle());
      this.score?.addEventListener("error", () => this.control?.classList.add("is-unavailable"));
    }
    async toggle() {
      if (!this.score) return;
      this.enabled = !this.enabled;
      if (this.enabled) {
        try { await this.score.play(); this.fade(this.target); }
        catch { this.enabled = false; }
      } else {
        this.fade(0, () => this.score.pause());
      }
      this.paint();
    }
    paint() {
      const text = this.enabled ? "Pausar música" : "Activar música";
      this.control?.setAttribute("aria-pressed", String(this.enabled));
      this.control?.setAttribute("aria-label", text);
      if (this.icon) this.icon.textContent = this.enabled ? "♫" : "♩";
      if (this.label) this.label.textContent = text;
    }
    cue(name) {
      this.target = CONFIG.audio[name] ?? .12;
      if (this.enabled) this.fade(this.target);
    }
    fade(target, callback) {
      if (!this.score) return;
      const initial = this.score.volume;
      const started = performance.now();
      const duration = TEST_MODE ? 25 : 1000;
      const step = (time) => {
        const progress = clamp((time - started) / duration);
        this.score.volume = initial + (target - initial) * progress;
        if (progress < 1) requestAnimationFrame(step);
        else callback?.();
      };
      requestAnimationFrame(step);
    }
  }

  const audio = new AudioController();

  class SceneManager {
    constructor() {
      this.scenes = qsa(".scene");
      this.index = 0;
      this.locked = false;
      this.experience = qs("#experience");
      this.veil = qs("#transition-veil");
      this.announcer = qs("#scene-announcer");
      this.handlers = new Map();
    }
    onEnter(name, callback) { this.handlers.set(name, callback); }
    currentName() { return this.scenes[this.index]?.dataset.scene; }
    hydrate(index = 0) {
      this.index = clamp(index, 0, this.scenes.length - 1);
      this.scenes.forEach((scene, position) => {
        const active = position === this.index;
        scene.classList.toggle("is-active", active);
        scene.classList.toggle("is-entered", active);
        scene.classList.remove("is-entering", "is-leaving");
        scene.setAttribute("aria-hidden", String(!active));
        if (active) scene.removeAttribute("inert"); else scene.setAttribute("inert", "");
      });
      this.apply();
    }
    apply() {
      const scene = this.scenes[this.index];
      const name = scene.dataset.scene;
      this.experience.dataset.act = scene.dataset.act || "night";
      this.experience.dataset.timeOfDay = name === "dawn" ? "day" : "night";
      const progress = (this.index + 1) / this.scenes.length;
      this.experience.style.setProperty("--story-progress", String(progress));
      qs("#story-progress").style.width = `${progress * 100}%`;
      this.announcer.textContent = `Momento ${this.index + 1} de ${this.scenes.length}: ${qs(".scene__title", scene)?.textContent || name}`;
      audio.cue(name);
      focusQuietly(qs(".scene__title", scene));
      this.handlers.get(name)?.();
    }
    async next(kind = "standard") {
      if (this.locked || this.index >= this.scenes.length - 1) return;
      this.locked = true;
      const from = this.scenes[this.index];
      const to = this.scenes[this.index + 1];
      const signal = pacer.createScope("scene-transition");
      pacer.cancel(`scene:${from.dataset.scene}`);
      pacer.cancel(`sequence:${from.dataset.scene}`);
      const duration = kind === "release" ? CONFIG.timings.release : CONFIG.timings.scene;
      this.experience.classList.add("is-transitioning");
      document.documentElement.dataset.transitioning = "true";
      this.veil.classList.add("is-active");
      if (kind === "release") {
        this.experience.classList.add("is-release-transition");
        this.veil.classList.add("is-awakening");
      }
      try {
        await pacer.wait(duration * .48, signal);
        from.classList.remove("is-active", "is-entered");
        from.classList.add("is-leaving");
        from.setAttribute("aria-hidden", "true");
        from.setAttribute("inert", "");
        this.index += 1;
        to.classList.add("is-active", "is-entering");
        to.setAttribute("aria-hidden", "false");
        to.removeAttribute("inert");
        this.apply();
        await pacer.wait(duration * .52, signal);
        from.classList.remove("is-leaving");
        to.classList.remove("is-entering");
        to.classList.add("is-entered");
      } catch (error) {
        if (error.name !== "AbortError") throw error;
      } finally {
        this.veil.classList.remove("is-active", "is-awakening");
        this.experience.classList.remove("is-transitioning", "is-release-transition");
        document.documentElement.dataset.transitioning = "false";
        this.locked = false;
      }
    }
  }

  const sceneManager = new SceneManager();
  const sequences = {};
  const makeSequence = (name, options) => sequences[name] = new NarrativeSequence(name, options);

  const intro = {
    enter() {
      const signal = pacer.createScope("scene:intro");
      pacer.schedule(() => { qs("#intro-star").disabled = false; qs("#intro-star").classList.add("is-ready"); }, CONFIG.timings.introStar, signal);
    },
    start() {
      const star = qs("#intro-star");
      if (star.disabled) return;
      star.disabled = true;
      star.classList.add("is-lit");
      qs("#intro-instruction").classList.add("is-hidden");
      qs("#intro-before").classList.add("is-leaving");
      sequences.intro.start();
    }
  };

  const memories = {
    stars: qsa(".constellation-star"),
    count: 0,
    enter() { this.stars.forEach((star) => { star.disabled = false; }); },
    light(star) {
      if (star.disabled || star.classList.contains("is-lit")) return;
      star.disabled = true;
      star.classList.add("is-lit");
      this.count += 1;
      if (this.count !== this.stars.length) return;
      qs("#constellation").classList.add("is-complete");
      qs("#memories-instruction").classList.add("is-hidden");
      const signal = pacer.createScope("scene:memories");
      pacer.schedule(() => { qs("#constellation").classList.add("is-observed"); sequences.memories.start(); }, CONFIG.timings.memoryObserve, signal);
    }
  };

  const flowers = {
    enter() { sequences.flowers.start(); },
    finish() {
      qs("#flowers-stage [data-sequence-output]").classList.add("is-muted");
      const card = qs("#farewell-card");
      card.setAttribute("aria-hidden", "false");
      card.classList.add("is-visible");
      const signal = pacer.signal("scene:flowers");
      pacer.schedule(() => setButtonReady(qs("#flowers-next"), true), CONFIG.timings.flowersRest, signal);
    }
  };

  const cliff = {
    enter() { sequences.cliff.start(); },
    release() {
      const button = qs("#cliff-next");
      if (button.disabled) return;
      setButtonReady(button, false);
      qs("#scene-cliff").classList.add("is-releasing", "is-looking-up");
      sceneManager.next("release");
    }
  };

  const dawn = {
    enter() {
      const scene = qs("#scene-dawn");
      scene.classList.add("is-awakening");
      const signal = pacer.createScope("scene:dawn");
      pacer.schedule(() => qs("#final-sunflower").classList.add("is-growing"), 900, signal);
      pacer.schedule(() => sequences.dawn.start(), CONFIG.timings.dawnArrival, signal);
    },
    finish() {
      const signal = pacer.signal("scene:dawn");
      qs("#scene-dawn").classList.add("is-settled");
      pacer.schedule(() => {
        const signature = qs("#final-signature");
        signature.setAttribute("aria-hidden", "false");
        signature.classList.add("is-visible");
        audio.cue("dawn");
      }, 400, signal);
    }
  };

  const buildAtmosphere = () => {
    const stars = qs("#ambient-stars");
    for (let i = 0; i < 44; i += 1) {
      const dot = document.createElement("span");
      dot.style.setProperty("--x", `${(i * 37) % 101}%`);
      dot.style.setProperty("--y", `${(i * 61) % 93}%`);
      dot.style.setProperty("--size", `${1 + (i % 3)}px`);
      dot.style.setProperty("--alpha", `${.2 + (i % 5) * .08}`);
      dot.style.setProperty("--duration", `${4 + (i % 6)}s`);
      dot.style.setProperty("--delay", `${-(i % 7)}s`);
      stars.append(dot);
    }
    const breeze = qs("#cliff-breeze");
    const release = qs("#cliff-release");
    for (let i = 0; i < 22; i += 1) {
      const particle = document.createElement("span");
      particle.className = "cliff-breeze__particle";
      particle.style.setProperty("--x", `${7 + (i * 29) % 88}%`);
      particle.style.setProperty("--y", `${10 + (i * 41) % 70}%`);
      particle.style.setProperty("--size", `${1 + (i % 2)}px`);
      particle.style.setProperty("--alpha", `${.14 + (i % 4) * .07}`);
      particle.style.setProperty("--duration", `${7 + (i % 5)}s`);
      particle.style.setProperty("--delay", `${-(i % 8)}s`);
      breeze.append(particle);
    }
    for (let i = 0; i < 34; i += 1) {
      const particle = document.createElement("span");
      particle.className = "cliff-release__particle";
      particle.style.setProperty("--x", `${35 + (i * 17) % 58}%`);
      particle.style.setProperty("--y", `${15 + (i * 23) % 60}%`);
      particle.style.setProperty("--size", `${1 + (i % 3)}px`);
      particle.style.setProperty("--alpha", `${.28 + (i % 5) * .09}`);
      release.append(particle);
    }
    addEventListener("pointermove", (event) => {
      document.documentElement.style.setProperty("--pointer-x", String(event.clientX / innerWidth - .5));
      document.documentElement.style.setProperty("--pointer-y", String(event.clientY / innerHeight - .5));
    }, { passive: true });
  };

  const wire = () => {
    makeSequence("intro", { onComplete: () => setButtonReady(qs("#intro-next"), true) });
    makeSequence("memories", { onComplete: () => setButtonReady(qs("#memories-next"), true) });
    makeSequence("sorry", { onComplete: () => setButtonReady(qs("#sorry-next"), true) });
    makeSequence("decision", { onComplete: () => setButtonReady(qs("#decision-next"), true) });
    makeSequence("flowers", { onComplete: () => flowers.finish() });
    makeSequence("cliff", { onComplete: () => setButtonReady(qs("#cliff-next"), true) });
    makeSequence("dawn", { button: false, onComplete: () => dawn.finish() });

    sceneManager.onEnter("intro", () => intro.enter());
    sceneManager.onEnter("memories", () => memories.enter());
    sceneManager.onEnter("sorry", () => sequences.sorry.start());
    sceneManager.onEnter("decision", () => sequences.decision.start());
    sceneManager.onEnter("flowers", () => flowers.enter());
    sceneManager.onEnter("cliff", () => cliff.enter());
    sceneManager.onEnter("dawn", () => dawn.enter());

    qs("#intro-star").addEventListener("click", () => intro.start());
    memories.stars.forEach((star) => star.addEventListener("click", () => memories.light(star)));
    qs("#intro-next").addEventListener("click", () => sceneManager.next());
    qs("#memories-next").addEventListener("click", () => sceneManager.next());
    qs("#sorry-next").addEventListener("click", () => sceneManager.next());
    qs("#decision-next").addEventListener("click", () => sceneManager.next());
    qs("#flowers-next").addEventListener("click", () => sceneManager.next());
    qs("#cliff-next").addEventListener("click", () => cliff.release());
    addEventListener("resize", () => document.documentElement.style.setProperty("--app-height", `${innerHeight}px`), { passive: true });
    document.documentElement.style.setProperty("--app-height", `${innerHeight}px`);
  };

  const showPreview = () => {
    if (!PREVIEW) return;
    document.documentElement.classList.add("is-previewing");
    const target = PREVIEW === "final" ? "dawn" : PREVIEW === "memories-complete" ? "memories" : PREVIEW;
    const index = sceneManager.scenes.findIndex((scene) => scene.dataset.scene === target);
    if (index < 0) return;
    if (index > 1) {
      memories.stars.forEach((star) => star.classList.add("is-lit"));
      qs("#constellation").classList.add("is-complete");
    }
    sceneManager.hydrate(index);
    if (PREVIEW === "memories-complete") memories.stars.forEach((star) => star.click());
    if (PREVIEW === "final") {
      pacer.cancel("scene:dawn");
      pacer.cancel("sequence:dawn");
      qs("#scene-dawn").classList.add("is-awakening", "is-settled");
      qs("#final-signature").setAttribute("aria-hidden", "false");
      qs("#final-signature").classList.add("is-visible");
    }
  };

  const clickWhenReady = async (selector, signal) => {
    const element = qs(selector);
    for (let i = 0; i < 500 && element.disabled; i += 1) await pacer.wait(12, signal);
    if (element.disabled) throw new Error(`Control unavailable: ${selector}`);
    element.click();
    await pacer.wait(25, signal);
  };

  const runSelfTest = async () => {
    const signal = pacer.createScope("self-test");
    const assert = (condition, message) => { if (!condition) throw new Error(message); };
    try {
      assert(sceneManager.scenes.length === 7, "The experience must contain seven moments.");
      assert(memories.stars.length === 5, "The memories moment must contain five stars.");
      await clickWhenReady("#intro-star", signal);
      await clickWhenReady("#intro-next", signal);
      memories.stars.forEach((star) => star.click());
      await clickWhenReady("#memories-next", signal);
      await clickWhenReady("#sorry-next", signal);
      await clickWhenReady("#decision-next", signal);
      await clickWhenReady("#flowers-next", signal);
      await clickWhenReady("#cliff-next", signal);
      for (let i = 0; i < 700 && !qs("#final-signature").classList.contains("is-visible"); i += 1) await pacer.wait(12, signal);
      assert(qs("#final-signature").classList.contains("is-visible"), "Final signature did not appear.");
      assert(sceneManager.currentName() === "dawn", "The story did not finish at dawn.");
      document.documentElement.dataset.selfTest = "passed";
    } catch (error) {
      document.documentElement.dataset.selfTest = "failed";
      document.documentElement.dataset.selfTestError = error.message;
      console.error(error);
    }
  };

  buildAtmosphere();
  wire();
  sceneManager.hydrate(0);
  showPreview();
  if (TEST_MODE) runSelfTest();

  window.NarrativePacer = NarrativePacer;
  window.narrativePacer = pacer;
  window.STORY_CONFIG = { CONFIG, STORY };
  window.sceneManager = sceneManager;
})();
