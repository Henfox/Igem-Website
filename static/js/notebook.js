(function(){
const slider = document.getElementById('weekRange');
const label = document.getElementById('label');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');


const containerId = slider.dataset.target; // ID des Containers mit allen .week-Elementen
const container = document.getElementById(containerId);


function clamp(n){
const min = Number(slider.min), max = Number(slider.max);
return Math.min(max, Math.max(min, Number(n)||min));
}


function setWeek(n, {fromHash=false} = {}){
n = clamp(n);
slider.value = n;
label.textContent = `Week ${n}`;


// Sichtbarkeit toggeln
const weeks = container.querySelectorAll(':scope .week');
weeks.forEach(w => w.classList.remove('active'));
const el = container.querySelector(`#week${n}`);
if(el){ 
  el.classList.add('active');
  //el.scrollIntoView({behavior: fromHash ? 'auto' : 'smooth', block: 'nearest'}); Kein Scroll!
 }


// Hash aktualisieren (nur wenn nicht aus Hash gekommen)
if(!fromHash){
try { history.replaceState(null, '', `#week=${n}`); } catch(_){}
}
}


// Buttons
prevBtn.addEventListener('click', () => setWeek(Number(slider.value) - 1));
nextBtn.addEventListener('click', () => setWeek(Number(slider.value) + 1));


// Slider
slider.addEventListener('input', () => setWeek(slider.value));


// Hash auslesen (z.B. #week=12)
function initFromHash(){
const m = location.hash.match(/week=(\d{1,2})/i);
if(m){ setWeek(Number(m[1]), {fromHash:true}); }
else { setWeek(slider.value); }
}
window.addEventListener('hashchange', initFromHash);


// Tastatur-Shortcuts (←/→)
window.addEventListener('keydown', (e) => {
if (['INPUT','TEXTAREA'].includes(document.activeElement.tagName)) return;
if(e.key === 'ArrowLeft') { e.preventDefault(); setWeek(Number(slider.value) - 1); }
if(e.key === 'ArrowRight'){ e.preventDefault(); setWeek(Number(slider.value) + 1); }
});


// Autostart
initFromHash();
})();

// Ticks bauen: alle 5 Schritte + Anfang + Ende
function buildTicks(sliderEl, containerEl) {
  const min = Number(sliderEl.min), max = Number(sliderEl.max);
  const step = 5; // <- hier stellst du den 5er-Raster ein
  const ticks = [];

  // immer den ersten und letzten Wert zeigen
  ticks.push(min);
  for (let v = min; v <= max; v += step) {
    if (v !== min && v !== max) ticks.push(v);
  }
  if (!ticks.includes(max)) ticks.push(max);

  // rendern (proportional positioniert)
  containerEl.innerHTML = "";
  ticks.sort((a,b)=>a-b).forEach(v => {
    const pos = ((v - min) / (max - min)) * 100;
    const span = document.createElement("span");
    span.className = "tick";
    span.style.left = pos + "%";
    span.textContent = v;
    containerEl.appendChild(span);
  });
}

// einmal beim Start aufrufen
const tickContainer = document.querySelector(".ticks");
buildTicks(weekRange, tickContainer);
