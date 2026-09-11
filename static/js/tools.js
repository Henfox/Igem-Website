const STATIC_BASE_URL = "https://static.igem.wiki/teams/5758/";

function shuffle(array) {
  let currentIndex = array.length, randomIndex;

  // Solange noch Elemente übrig sind
  while (currentIndex > 0) {
    // Wähle ein Element aus
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // Tausche mit dem aktuellen Element
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]
    ];
  }

  return array;
}

function resolveSrc_Static(item,suffix="") {
  return STATIC_BASE_URL + suffix + item;
}

/**
 * Einzelnes PeerTube-iframe ab Startzeit abspielen und hart zwischen [start, end) loopen.
 * Entspricht funktional deinem Snippet, nur als Funktion gekapselt.
 * @param {HTMLIFrameElement|HTMLElement} iframeEl
 * @param {number} start
 * @param {number} end
 */
async function enablePeerTubeABLoop(iframeEl, start=0, end=null) {
  const PeerTubePlayer = window.PeerTubePlayer;
  const player = new PeerTubePlayer(iframeEl);
  console.log("11111")
  await player.ready;
  await player.seek(start);
  await player.play();
  player.addEventListener('playbackStatusUpdate', async (s) => {
    end = end ? end : s.duration;
    if(s.position >= 1){ iframeEl.style.opacity = 1 }
    if (s.position >= end) {
      await player.seek(start);
      await player.play();
    }
  });
}
async function setupMultiplePeerTubeLoops(items) {
  await Promise.all(items.map(({ iframe, start, end }) =>
    enablePeerTubeABLoop(iframe, start, end)
  
  ));
}

function countUp(el, to, duration = 2500) {
  const start = 0;
  const fmt = new Intl.NumberFormat('de-DE');
  const t0 = performance.now();

function easeInOutPow(p, n = 7) { // nocht größer als das sonst round problem am anfang und ende
  return p < 0.5
    ? 0.5 * Math.pow(2 * p, n)
    : 1 - 0.5 * Math.pow(2 * (1 - p), n);
}

  function frame(t) {
    const p = Math.min((t - t0) / duration, 1);   // 0..1
    const eased = easeInOutPow(p);
    const val = Math.round(start + (to - start) * eased);
    el.textContent = fmt.format(val);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function getPercentage(min,max,value){
    return ((value - min) / (max - min));
}
function clamp(v, min, max) {
  return Math.max(min, Math.min(max, v));
}

 function computeProgress(element,f={}) {
    const rect = element.getBoundingClientRect();
    const vh = window.innerHeight;

    // Fortschritt, während das sticky-Element aktiv ist:
    // rect.top = 0  -> p = 0 (Start des Pinning)
    // rect.bottom = vh -> p = 1 (Ende des Pinning)
    const progress = clamp((0 - rect.top) / (rect.height - vh), 0, 1);
    f(progress)
  }
