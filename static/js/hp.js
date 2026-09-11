// ============================
// Interleaved z pro Zeile (gleiche Zeile: Grid2 über Grid1)
// ============================
function applyRowZ(grid, isGrid2 = false) {
  const styles = getComputedStyle(grid);
  const cols = parseInt(styles.getPropertyValue('--spalten')) || 1;
  grid.querySelectorAll('.Mensch').forEach((el, i) => {
    const row = Math.floor(i / cols);
    const z = isGrid2 ? (2 * row + 1) : (2 * row);
    el.style.position = 'relative';
    el.style.zIndex = String(z);
    el.dataset.baseZ = String(z);
  });
}

function applyAllZ() {
  const g1 = document.getElementById('Mgrid1');
  const g2 = document.getElementById('Mgrid2');
  if (g1) applyRowZ(g1, false);
  if (g2) applyRowZ(g2, true);
}

// ============================
// Dimmen aller anderen, wenn genau ein Item „offen“ ist
// ============================
function allMenschen() {
  return Array.from(document.querySelectorAll('#Mgrid1 .Mensch, #Mgrid2 .Mensch'));
}

function setDim(current) {
  const items = allMenschen();
  if (current) {
    items.forEach(m => { if (m !== current) m.classList.add('dimmed'); });
  } else {
    items.forEach(m => m.classList.remove('dimmed'));
  }
}

// ============================

const grid = document.getElementById('Mgrid1');
const grid2 = document.getElementById('Mgrid2');
function getHostFromEvent(e, selector) {
  const host = e.target.closest(selector);
  if (!host) return null;
  if (host.contains(e.relatedTarget)) return null; // echtes Enter/Leave
  return host;
}

function getBubble(mensch) {
  return mensch.querySelector('.speech-bubble');
}
function f_mouseover(e) {
  // Nur Events, die von einer gemalten SVG-Form kommen
  const isShape = e.target.matches('svg path, svg circle, svg rect, svg polygon, svg polyline, svg ellipse, svg line');
  if (!isShape) return;

  const mensch = getHostFromEvent(e, '.Mensch');
  if (!mensch) return;
  const bubble = getBubble(mensch);
  if (!bubble) return;

  bubble.textContent = '…';
  bubble.classList.remove('hidden');
  bubble.classList.add('preview');
  bubble.classList.remove('open');
  bubble.setAttribute('aria-hidden', 'false');
}
function f_mouseout(e) {
  const isShape = e.target.matches('svg path, svg circle, svg rect, svg polygon, svg polyline, svg ellipse, svg line');
  if (!isShape) return;

  const mensch = getHostFromEvent(e, '.Mensch');
  if (!mensch) return;
  const bubble = getBubble(mensch);
  if (!bubble) return;

  bubble.classList.add('hidden');
  bubble.classList.remove('preview', 'open');
  bubble.setAttribute('aria-hidden', 'true');
  bubble.textContent = '…';

  // Wenn dieser Mensch „offen“ war, alles wieder undimmen
  setDim(null);
}
function f_click(e) {
  // Nur klicken, wenn auf SVG-Form geklickt wurde
  const painted = e.target.closest('svg path, svg circle, svg rect, svg polygon, svg polyline, svg ellipse, svg line');
  if (!painted) return;

  const mensch = e.target.closest('.Mensch');
  if (!mensch || (!grid.contains(mensch) && !grid2.contains(mensch))) return;
  const bubble = getBubble(mensch);
  if (!bubble) return;

  bubble.textContent = mensch.dataset.content || 'Kein Inhalt vorhanden.';
  bubble.classList.add('open');
  bubble.classList.remove('hidden');
  bubble.setAttribute('aria-hidden', 'false');

  // jetzt alle anderen dimmen
  setDim(mensch);
}
function f_controls(m) {
  m.tabIndex = 0;
  m.addEventListener('focus', () => {
    const b = getBubble(m);
    if (!b) return;
    b.textContent = '…';
    b.classList.remove('hidden');
    b.classList.add('preview');
    b.setAttribute('aria-hidden', 'false');
  });
  m.addEventListener('blur', () => {
    const b = getBubble(m);
    if (!b) return;
    b.classList.add('hidden');
    b.classList.remove('preview', 'open');
    b.setAttribute('aria-hidden', 'true');
    b.textContent = '…';
    setDim(null); // Fokus weg -> alles wieder normal
  });
  m.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const b = getBubble(m);
      if (!b) return;
      b.textContent = m.dataset.content || 'Kein Inhalt vorhanden.';
      b.classList.add('open');
      b.classList.remove('hidden');
      b.setAttribute('aria-hidden', 'false');
      setDim(m); // Keyboard-Open -> dimmen
    }
  });
}



// ============================
(function () {
  // Vorschau „…“ beim Hineinbewegen (nur wenn SVG-Form getroffen wird)
  grid.addEventListener('mouseover', f_mouseover);
  grid2.addEventListener('mouseover', f_mouseover);
  // Immer schließen beim Verlassen (auch wenn per Klick geöffnet) + Dimmen zurück
  grid.addEventListener('mouseout', f_mouseout);
  grid2.addEventListener('mouseout', f_mouseout);
  // Klick zeigt echten Content -> Dimme alle anderen
  grid.addEventListener('click', f_click);
  grid2.addEventListener('click', f_click);
  // Tastatur: Focus = wie Hover, Enter/Space = wie Klick (inkl. Dimmen)
  grid.querySelectorAll('.Mensch').forEach(f_controls);
  grid2.querySelectorAll('.Mensch').forEach(f_controls);
})();

// ============================
// Optional: Hover-Elevation (über allen liegen)
// -> Kann weglassen, wenn unnötig. Harmoniert mit setDim().
// ============================
const HOVER_BOOST = 100000;

function elevateMensch(mensch) {
  const base = parseInt(mensch.dataset.baseZ || mensch.style.zIndex || '0', 10);
  mensch.dataset.prevZ = mensch.style.zIndex || String(base);
  mensch.style.zIndex = String(base + HOVER_BOOST);
  mensch.classList.add('is-elevated');
}
function restoreMensch(mensch) {
  if (!mensch || !mensch.dataset.prevZ) return;
  mensch.style.zIndex = mensch.dataset.prevZ;
  delete mensch.dataset.prevZ;
  mensch.classList.remove('is-elevated');
}

// Falls  zusätzlich beim Hover (ohne „open“) ganz nach oben willst, diese zwei Zeilen aktivieren:
/*
document.getElementById('Mgrid1')?.addEventListener('mouseover', e => { const m = e.target.closest('.Mensch'); if (m) elevateMensch(m); });
document.getElementById('Mgrid1')?.addEventListener('mouseout', e => { const m = e.target.closest('.Mensch'); if (m) restoreMensch(m); });
document.getElementById('Mgrid2')?.addEventListener('mouseover', e => { const m = e.target.closest('.Mensch'); if (m) elevateMensch(m); });
document.getElementById('Mgrid2')?.addEventListener('mouseout', e => { const m = e.target.closest('.Mensch'); if (m) restoreMensch(m); });
*/
// ============================
// Init
// ============================
window.addEventListener('DOMContentLoaded', applyAllZ);
window.addEventListener('resize', applyAllZ);



















// GRAPH AND IMG TEIL
const bgcolor = ["green", "purple"]

const connectionToResearch = document.getElementById("Bezug-Forschung-Wissenschaft")
const levelOfEducation = document.getElementById("Bildungsstand")
const allgemeineFragen = document.getElementById("Alter")

const geneticEngineering1 = document.getElementById("Vertrauen-Gentechnik")
const geneticEngineering2 = document.getElementById("Anwendung-Gentechnik")
const geneticEngineering3 = document.getElementById("Bereiche-Gentechnik")

const suspact1 = document.getElementById("Bewerte-Idee")
const suspact2 = document.getElementById("Markiere-Gentechnik")

const medicine1 = document.getElementById("Aufklärung-Gentechnik")
const medicine2 = document.getElementById("Med-erhalten")
const medicine3 = document.getElementById("Med-Gentechnik")
const medicine4 = document.getElementById("Bedenken")

const schoolSurvey1 = document.getElementById("acceptable-modify")
const schoolSurvey2 = document.getElementById("Comm-vs-Alt")
const schoolSurvey3 = document.getElementById("would-you")

new Chart(suspact1, {
  type: "bar",
  data: {
    labels: ["very positive", "", "", "", "very negative"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [70, 22, 9, 1, 1]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "What is your attitude toward medications derived from genetically modified organisms?",
        font: { size: 16 }
      }
    }
  }
})
new Chart(suspact2, {
  type: "bar",
  data: {
    labels: ["yes", "no", "i don't care"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [77, 8, 18]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Is it important to label such products as genetically engineered?",
        font: { size: 16 }
      }
    }
  }
})
new Chart(medicine1, {
  type: "bar",
  data: {
    labels: ["very good", "", "", "", "very bad",],
    datasets: [{
      backgroundColor: bgcolor,
      data: [7, 16, 25, 35, 20]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Education about genetic engineering in medicine",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
      }
    }
  }
})
new Chart(medicine2, {
  type: "bar",
  data: {
    labels: ["yes", "no", "i don't care"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [31, 12, 60]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Have you ever received a genetically engineered medication?",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
      }
    }
  }
})
new Chart(medicine3, {
  type: "bar",
  data: {
    labels: ["very positive", "", "", "", "very negative"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [27, 42, 29, 2, 3]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "What is your attitude toward medications derived from genetically modified organisms?",
        font: { size: 16 }
      }
    }
  }
})
new Chart(medicine4, {
  type: "bar",
  data: {
    labels: ["no concerns", "unknown side effects", "product safety",
      "environmental impact", "ethical considerations", "cost & accessibility"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [15, 61, 41, 31, 31, 25]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "What is your attitude toward medications derived from genetically modified organisms?",
        font: { size: 16 }
      }
    }
  }
})
new Chart(geneticEngineering1, {
  type: "bar",
  data: {
    labels: ["very much", "", "", "", "not at all"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [5, 24, 32, 35, 7]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Familiarity with the topic of genetic engineering",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
      }
    }
  }
})
new Chart(geneticEngineering2, {
  type: "bar",
  data: {
    labels: ["very much", "", "", "", "very negative"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [18, 39, 34, 12, 0]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "What is your attitude toward the use of genetic engineering",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
      }
    }
  }
})
new Chart(geneticEngineering3, {
  type: "bar",
  data: {
    labels: ["agriculture", "medicine & pharmacy", "environmental & climate protection", "food production", "none"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [47, 96, 59, 29, 2]
    }]
  },
  options: {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "In which areas is genetic engineering particularly useful? (multiple answers possible)",
        font: { size: 16 }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "number of votes"
      }
    }
  }
})
new Chart(connectionToResearch, {
  type: "bar",
  data: {
    labels: ["profassionally active in healthcare", "professionally active in research/science",
      "studies/training related to science", "contact through family/friends",
      "private interest", "no connection to science"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [6, 5, 45, 15, 15, 17]
    }]
  },
  options: {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Connection to research and science",
        font: { size: 16 }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Number of participants"
      }
    },
  }
})
new Chart(levelOfEducation, {
  type: "bar",
  data: {
    labels: ["university degree", "vocationla training", "high school diploma/ advanced technical diploma", "secondary school", "lower secondary school", "no school degree"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [47, 11, 35, 6, 4, 0]
    }]
  },
  options: {
    indexAxis: "y",
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Level of education",
        font: { size: 16 }
      }
    }
  },
  scales: {
    x: {
      title: {
        display: true,
        text: "Number of participants"
      }
    }
  }
})
new Chart(allgemeineFragen, {
  type: "bar",
  data: {
    labels: ["16", "19", "21", "23", "25", "27", "30", "32", "34", "37", "40", "43", "48", "53", "56", "59", "61", "67", "70", "80",],
    datasets: [{
      backgroundColor: bgcolor,
      data: [1, 1, 3, 4, 10, 11, 18, 8, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Age",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Number of participants"
      }
    },
    x: {
      title: {
        display: true,
        text: "Age"
      }
    }
  }
})
new Chart(schoolSurvey1, {
  type: "bar",
  data: {
    labels: ["Unconditional yes", "Conditional yes (with safeguards/ethics)", "Positive/lean yes", "No"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [31.7, 61, 2.4, 4.9]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Is it acceptable to modify organisms to treat human diseases?",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Percentage [%]"
      }
    }
  }
})
new Chart(schoolSurvey2, {
  type: "bar",
  data: {
    labels: ["Alternatives/open research", "Both/mix", "Commercial production ", "Depends (efficiency/case-by-case)"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [43.8, 25, 15.6, 15.6]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Commercial production vs. alternatives",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Percentage [%]"
      }
    }
  }
})
new Chart(schoolSurvey3, {
  type: "bar",
  data: {
    labels: ["Yes, unconditional", "Yes, conditional", "No/undecided"],
    datasets: [{
      backgroundColor: bgcolor,
      data: [31.4, 62.9, 5.7]
    }]
  },
  options: {
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "Would you take algae-produced medicine?",
        font: { size: 16 }
      }
    }
  },
  scales: {
    y: {
      title: {
        display: true,
        text: "Percentage [%]"
      }
    }
  }
})

//init Slider
$(document).ready(function () {
  $('.image-slider1').slick({
    centerMode: true,
    slidesToShow: 1,                  // nur 1 Haupt-Slide sichtbar
    centerPadding: '0',
    dots: true,
    arrows: true,
    infinite: true,
    speed: 2000,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    focusOnSelect: true,              // Klick auf Rand-Slide fokussiert ihn
    responsive: [
      { breakpoint: 1200, settings: { centerPadding: '18vw' } },
      { breakpoint: 992, settings: { centerPadding: '14vw' } },
      { breakpoint: 768, settings: { centerPadding: '20vw', arrows: false } },
      { breakpoint: 560, settings: { centerPadding: '12vw', arrows: false } }
    ],
    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-next" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>',
    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-prev" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>',

  });
  $('.graph-slider').slick({
    centerMode: true,
    slidesToShow: 1,                  // nur 1 Haupt-Slide sichtbar
    centerPadding: '0',
    dots: true,
    arrows: true,
    infinite: false,
    speed: 2000,
    autoplay: false,
    autoplaySpeed: 2000,
    pauseOnHover: true,
    focusOnSelect: true,              // Klick auf Rand-Slide fokussiert ihn
    responsive: [
      { breakpoint: 1200, settings: { centerPadding: '18vw' } },
      { breakpoint: 992, settings: { centerPadding: '14vw' } },
      { breakpoint: 768, settings: { centerPadding: '20vw', arrows: false } },
      { breakpoint: 560, settings: { centerPadding: '12vw', arrows: false } }
    ],
    nextArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-next" viewBox="0 0 24 24"><path fill="currentColor" d="M8.59 16.58L13.17 12L8.59 7.41L10 6l6 6l-6 6z"/></svg>',
    prevArrow: '<svg xmlns="http://www.w3.org/2000/svg" class="slick-prev" viewBox="0 0 24 24"><path fill="currentColor" d="M15.41 16.58L10.83 12l4.58-4.59L14 6l-6 6l6 6z"/></svg>',

  });
});



// CHAT -------------------------------------------------------------
(function() {
  const SPEED_MS = 1200;   // Abstand zwischen Nachrichten
  const TYPE_MS  = 1650;    // Dauer „Tippen“-Indikator

  const MESSAGES = [
    // Block 1
    { role: "contact",    label: "Contact (Public Survey)", text: "“Hey, did you know that 58.25 % of people don’t even know if they ever had a genetically engineered medicine?”" },
    { role: "reflection", label: "Reflection",               text: "Wow, awareness is way lower than we thought—even though so many vaccines are genetically engineered." },
    { role: "reply",      label: "Our Reply",                text: "“Got it, we’ll make it more accessible: Instagram explainers, a Lego demo on SWR, and even supermarket booths.”" },
    { role: "evaluation", label: "Evaluation",               text: "→ Reach per post nearly doubled (~620 → >1,100). People said our explanations finally made sense to them." },

    // Block 2
    { role: "contact",    label: "Contact (Survey + School Visits)", text: "“Honestly, are algae even efficient enough compared to CHO cells?”" },
    { role: "reflection", label: "Reflection",                       text: "Efficiency clearly is a central acceptance question." },
    { role: "reply",      label: "Our Reply",                        text: "“We’ll invest in bioreactors and the CellDeg system to scale up production.”" },
    { role: "evaluation", label: "Evaluation",                       text: "→ Showed that algae yields can be optimized, doubts about being “too weak” went down." },

    // Block 3
    { role: "contact",    label: "Contact (Survey)", text: "“74.76 % of us want GMO medicines to be labeled!”" },
    { role: "reflection", label: "Reflection",       text: "Transparency is key—if we ignore it, people will mistrust us." },
    { role: "reply",      label: "Our Reply",        text: "“Okay, let’s be open: we’ll address labeling & transparency in booths and social media.”" },
    { role: "evaluation", label: "Evaluation",       text: "→ People reacted positively. Confusion decreased once we showed we weren’t hiding the genetic engineering." },

    // Block 4
    { role: "contact",    label: "Contact (Health Insurer – BARMER)", text: "“Just so you know: SUSPACT would be classified as a biosimilar.”" },
    { role: "reflection", label: "Reflection",                         text: "That’s crucial—regulatory reality is different than we expected." },
    { role: "reply",      label: "Our Reply",                          text: "“Alright, we’ll present SUSPACT as a biosimilar candidate instead of a totally new drug.”" },
    { role: "evaluation", label: "Evaluation",                         text: "→ Made our project more realistic and aligned with actual regulatory steps." },

    // Block 5
    { role: "contact",    label: "Contact (Students in Schools)", text: "“We wish we learned about this earlier and clearer in school.”" },
    { role: "reflection", label: "Reflection",                     text: "Younger audiences want synthetic biology integrated into their education." },
    { role: "reply",      label: "Our Reply",                      text: "“Let’s collaborate with teachers to bring biotech topics into curricula.”" },
    { role: "evaluation", label: "Evaluation",                     text: "→ Opened a path for long-term improvements in science education beyond iGEM." },
  ];

  const frame = document.getElementById('igem-chat');
  const body  = document.getElementById('chat-body');
  let started = false;

  function createTyping(role) {
    const wrap = document.createElement('div');
    wrap.className = `row ${role}`;
    const t = document.createElement('div');
    t.className = 'typing';
    t.innerHTML = '<span class="t"></span><span class="t"></span><span class="t"></span>';
    wrap.appendChild(t);
    return wrap;
  }

  function createBubble(role, label, text) {
    const row = document.createElement('div');
    row.className = `row ${role}`;
    const bubble = document.createElement('div');
    bubble.className = 'bubble';
    const l = document.createElement('span');
    l.className = 'label';
    l.textContent = label;
    const p = document.createElement('div');
    p.textContent = text;
    bubble.appendChild(l);
    bubble.appendChild(p);
    row.appendChild(bubble);
    return { row, bubble };
  }

  function scrollToBottom() {
    body.scrollTop = body.scrollHeight;
  }

  async function runSequence() {
    for (const msg of MESSAGES) {
      // Tippen einblenden
      const typing = createTyping(msg.role);
      body.appendChild(typing);
      scrollToBottom();
      await wait(TYPE_MS);

      // Tippen raus, Blase rein
      typing.remove();
      const { row, bubble } = createBubble(msg.role, msg.label, msg.text);
      body.appendChild(row);
      requestAnimationFrame(() => bubble.classList.add('show'));
      scrollToBottom();

      await wait(SPEED_MS);
    }
  }

  const wait = (ms) => new Promise(res => setTimeout(res, ms));

  // Nur starten, wenn das Element 100% sichtbar ist
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting && e.intersectionRatio >= 1 && !started) {
        started = true;
        runSequence();
      }
    }
  }, { threshold: [1] });

  io.observe(frame);

  // Falls der Container schon vollständig sichtbar ist (z.B. ohne Scroll)
  // probieren wir es beim Laden einmal zu prüfen.
  window.addEventListener('load', () => {
    const rect = frame.getBoundingClientRect();
    const fullyVisible =
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth);
    if (fullyVisible && !started) {
      started = true;
      runSequence();
    }
  });
})();