// Soundeffekte, komplett im Browser erzeugt (keine Audiodateien nötig)
const Sound = (() => {
  const SPEICHER_KEY = "be-a-president-ton";
  let ctx = null;
  let master = null;
  let an = true;
  try { an = localStorage.getItem(SPEICHER_KEY) !== "aus"; } catch (e) { /* Standard: an */ }

  function starte() {
    if (!ctx) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctx = new AC();
      master = ctx.createGain();
      master.gain.value = 0.8;
      master.connect(ctx.destination);
    }
    if (ctx.state === "suspended") ctx.resume();
    return ctx;
  }

  function ton({ freq, typ = "sine", start = 0, dauer = 0.3, laut = 0.3, bisFreq = null, vibrato = 0, attack = 0.01 }) {
    const t = ctx.currentTime + start;
    const osc = ctx.createOscillator();
    osc.type = typ;
    osc.frequency.setValueAtTime(freq, t);
    if (bisFreq) osc.frequency.exponentialRampToValueAtTime(bisFreq, t + dauer);
    if (vibrato) {
      const lfo = ctx.createOscillator();
      const tiefe = ctx.createGain();
      lfo.frequency.value = 6;
      tiefe.gain.value = vibrato;
      lfo.connect(tiefe).connect(osc.frequency);
      lfo.start(t);
      lfo.stop(t + dauer);
    }
    const g = ctx.createGain();
    g.gain.setValueAtTime(0.0001, t);
    g.gain.exponentialRampToValueAtTime(laut, t + attack);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dauer);
    osc.connect(g).connect(master);
    osc.start(t);
    osc.stop(t + dauer + 0.05);
  }

  function rauschen({ start = 0, dauer = 0.3, laut = 0.3, filter = "lowpass", freq = 800, q = 1, huelle = p => Math.pow(1 - p, 3) }) {
    const t = ctx.currentTime + start;
    const laenge = Math.ceil(ctx.sampleRate * dauer);
    const puffer = ctx.createBuffer(1, laenge, ctx.sampleRate);
    const daten = puffer.getChannelData(0);
    for (let i = 0; i < laenge; i++) daten[i] = (Math.random() * 2 - 1) * huelle(i / laenge);
    const quelle = ctx.createBufferSource();
    quelle.buffer = puffer;
    const f = ctx.createBiquadFilter();
    f.type = filter;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.value = laut;
    quelle.connect(f).connect(g).connect(master);
    quelle.start(t);
  }

  const effekte = {
    klick() { ton({ freq: 900, typ: "triangle", dauer: 0.06, laut: 0.15 }); },
    papier() {
      rauschen({ dauer: 0.35, laut: 0.4, filter: "bandpass", freq: 2500, q: 0.7, huelle: p => Math.sin(Math.PI * p) * (0.6 + 0.4 * Math.sin(p * 40)) });
    },
    buch() {
      rauschen({ dauer: 0.25, laut: 0.6, freq: 300 });
      ton({ freq: 110, dauer: 0.2, laut: 0.3 });
    },
    mappe() {
      ton({ freq: 120, bisFreq: 70, dauer: 0.15, laut: 0.35 });
      rauschen({ dauer: 0.1, laut: 0.25, freq: 600 });
    },
    stempel() {
      ton({ freq: 140, bisFreq: 50, dauer: 0.18, laut: 0.7 });
      rauschen({ dauer: 0.12, laut: 0.5, freq: 900 });
    },
    richtig() {
      [784, 988, 1319].forEach((f, i) => ton({ freq: f, start: i * 0.09, dauer: 0.45, laut: 0.22, typ: "triangle" }));
    },
    falsch() {
      ton({ freq: 220, typ: "square", dauer: 0.22, laut: 0.12 });
      ton({ freq: 155, typ: "square", start: 0.22, dauer: 0.45, laut: 0.12 });
    },
    warnung() {
      [0, 0.3].forEach(s => ton({ freq: 880, typ: "square", start: s, dauer: 0.15, laut: 0.08 }));
    },
    // "Wah wah wah waaah" plus Buhrufe aus dem Publikum
    posaune() {
      const noten = [[293.66, 0, 0.45], [277.18, 0.5, 0.45], [261.63, 1.0, 0.45], [246.94, 1.5, 1.7]];
      noten.forEach(([f, s, d], i) => {
        ton({ freq: f, typ: "sawtooth", start: s, dauer: d, laut: 0.2, attack: 0.04, vibrato: i === 3 ? 7 : 0 });
        ton({ freq: f / 2, typ: "triangle", start: s, dauer: d, laut: 0.14, attack: 0.04 });
      });
      rauschen({ start: 1.6, dauer: 2.4, laut: 0.35, filter: "bandpass", freq: 320, q: 0.9, huelle: p => Math.min(1, p * 4) * (1 - p) * (0.55 + 0.45 * Math.sin(p * 22)) });
    },
    // Fanfare mit Applaus
    fanfare() {
      const noten = [[523.25, 0, 0.15], [523.25, 0.16, 0.15], [523.25, 0.32, 0.15], [659.25, 0.48, 0.5], [783.99, 1.0, 0.25], [1046.5, 1.26, 1.3]];
      noten.forEach(([f, s, d]) => {
        ton({ freq: f, typ: "sawtooth", start: s, dauer: d, laut: 0.13, attack: 0.02 });
        ton({ freq: f * 1.5, typ: "triangle", start: s, dauer: d, laut: 0.05, attack: 0.02 });
      });
      for (let i = 0; i < 70; i++) {
        rauschen({ start: 1.3 + Math.random() * 2.6, dauer: 0.04, laut: 0.15 + Math.random() * 0.3, filter: "bandpass", freq: 1200 + Math.random() * 2000, q: 1 });
      }
    },
    gut() {
      [523.25, 659.25, 783.99, 1046.5].forEach((f, i) => ton({ freq: f, start: i * 0.12, dauer: 0.55, laut: 0.18, typ: "triangle" }));
    },
    mittel() {
      ton({ freq: 659.25, typ: "triangle", dauer: 0.4, laut: 0.18 });
      ton({ freq: 523.25, typ: "triangle", start: 0.35, dauer: 0.7, laut: 0.18 });
    },
    // Pfeifen nach unten, erleichtertes "Puh"
    knapp() {
      ton({ freq: 1400, bisFreq: 450, dauer: 0.7, laut: 0.18 });
      rauschen({ start: 0.75, dauer: 0.5, laut: 0.25, filter: "bandpass", freq: 700, q: 0.8, huelle: p => Math.sin(Math.PI * p) });
      ton({ freq: 392, typ: "triangle", start: 1.3, dauer: 0.35, laut: 0.15 });
      ton({ freq: 523.25, typ: "triangle", start: 1.55, dauer: 0.6, laut: 0.15 });
    }
  };

  return {
    spiele(name) {
      try { if (an && starte() && effekte[name]) effekte[name](); } catch (e) { /* ohne Ton weiterspielen */ }
    },
    entsperren() { if (an) starte(); },
    istAn() { return an; },
    umschalten() {
      an = !an;
      try { localStorage.setItem(SPEICHER_KEY, an ? "an" : "aus"); } catch (e) { /* nur für diese Sitzung */ }
      if (an) starte();
      return an;
    }
  };
})();
