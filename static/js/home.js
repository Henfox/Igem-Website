// INTRO CODE
var typedDiv = document.getElementById('typed');
var typedDiv2 = document.getElementById('typed2');
var typedDiv3 = document.getElementById('typed3');

var cursor2 = document.getElementById('cursor2');
var cursor3 = document.getElementById('cursor3');

var trenner = document.getElementById('trenner');
var logoLeft = document.getElementById('logo-left');
var logoRight = document.getElementById('logo-right');
var logo = document.getElementById('logo');
var circle = document.getElementById('circle');


//VIDEOS
setupMultiplePeerTubeLoops([
  { iframe: document.getElementById('introbg')},
  { iframe: document.getElementById('introbg2')},
  { iframe: document.getElementById('mrt')}
]);


var typewriter = new Typewriter(typedDiv, {
    loop: false,
    delay: 100,
    skipAddStyles: true,
    wrapperClassName: "typed-wrapper",
    cursorClassName: "typed-cursor",
    deleteSpeed: "natural",
});

var typewriter2 = new Typewriter(typedDiv2, {
    loop: false,
    delay: 100,
    skipAddStyles: true,
    wrapperClassName: "none",
    cursorClassName: "typed-cursor-sub",
    deleteSpeed: "natural",
});

var typewriter3 = new Typewriter(typedDiv3, {
    loop: false,
    delay: 100,
    skipAddStyles: true,
    wrapperClassName: "none",
    cursorClassName: "typed-cursor-sub",
    deleteSpeed: "natural",
});


typewriter2.callFunction(({ elements }) => {
    elements.cursor.style.visibility = 'visible';
})
    .typeString('<strong style="color:#1ca57b">S</strong>ustainable ')
    .typeString('<strong style="color:#1ca57b">U</strong>se of ')
    .typeString('<strong style="color:#1ca57b">S</strong>ynthetically ')
    .typeString('<strong style="color:#017d9d">P</strong>roduced')
    .callFunction(({ elements }) => {
        elements.cursor.style.display = 'none';
        typewriter3.start()
    })


typewriter3.callFunction(({ elements }) => {
    elements.cursor.style.visibility = 'visible';
})
    .typeString('<strong style="color:#017d9d">A</strong>ntibodies for ')
    .typeString('<strong style="color:#017d9d">C</strong>ancer ')
    .typeString('<strong style="color:#017d9d">T</strong>reatment')
    .callFunction(({ elements }) => {
        elements.cursor.style.display = 'none';
    })




typewriter.typeString('Treating colorectal cancer more ')
    .typeString("<strong>sustainably?</strong>")
    .pauseFor(2500)
    .deleteChars(12)
    .deleteAll(40)
    .pauseFor(10)
    .callFunction(({ elements }) => {
        elements.cursor.style.display = 'none';
    })
    .callFunction(() => {
        trenner.classList.add("animated");
    })
    .pauseFor(1000)
    .callFunction(() => {
        // Linke und Rechte hälfte ziehen
        logoRight.classList.add("animated");
        logoLeft.classList.add("animated");
    })
    .pauseFor(2000)
    .callFunction(() => {
        //Trenner Weg
        trenner.classList.remove("animated");
        logoLeft.style.clipPath = "none" //Entfernt Bugged clip path
    })
    .pauseFor(1000)
    .callFunction(() => {
        //Logo hoch rechts verschieben
        circle.classList.add("animated");
    })
    .pauseFor(2000)
    .callFunction(() => {
        logo.classList.add("animated");
    })
    .pauseFor(1000)
    .callFunction(() => {
        typewriter2.start()
    })
    .start()



// Count up for second section

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

function onIntersect(entries, obs) {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      if (el.dataset.counted === '1') return; // einmalig
      el.dataset.counted = '1';

      const numEl = el.querySelector('.num');
      const to = Number(el.dataset.to || '0');
      const duration = Number(el.dataset.duration*1000 || '2000');
      countUp(numEl, to, duration);

      obs.unobserve(el); // optional
    });
  }

const count_io = window.io ?? new IntersectionObserver(onIntersect, { threshold: 0.2 });
window.io = count_io;

document.querySelectorAll('.countup').forEach(el => io.observe(el));



//third Section Code

const third_Section = document.getElementById('third-Section');
const antikoerper = document.getElementById('antikoerper');
const part1 = document.getElementById('part1');
const part2 = document.getElementById('part2');
const animation_delay_ptc = .1 //value between 0 and .5 
const wrapper = document.getElementById('thirdS-wrapper');
let ticking = false;


function antikoerper_animation(progress){
    const animated_translateX_value = 50;
    const animated_translateX_unit = "%";
    const inital_r= 49;
    const inital_g= 6;
    const inital_b= 55;

    const final_r= 48;
    const final_g= 166;
    const final_b= 128;

    const diff_r = final_r - inital_r
    const diff_g = final_g - inital_g
    const diff_b = final_b - inital_b

    const inital_r2 = 205;
    const inital_g2 = 152;
    const inital_b2 = 212;

    const final_r2 = 152;
    const final_g2 = 212;
    const final_b2 = 193;

    const diff_r2 = final_r - inital_r
    const diff_g2 = final_g - inital_g
    const diff_b2 = final_b - inital_b

    if(progress < animation_delay_ptc){
        antikoerper.style.setProperty("--translateX","0"+animated_translateX_unit)
        part2.style.setProperty("opacity",0)
        part1.style.setProperty("opacity",1)
        antikoerper.style.setProperty("--r",inital_r)
        antikoerper.style.setProperty("--g",inital_g)
        antikoerper.style.setProperty("--b",inital_b)
        antikoerper.style.setProperty("--r2",inital_r2)
        antikoerper.style.setProperty("--g2",inital_g2)
        antikoerper.style.setProperty("--b2",inital_b2)
        antikoerper.style.rotate = "0deg"
        part2.style.setProperty("display","none");
    }
    else if(animation_delay_ptc <= progress && progress <= 1-animation_delay_ptc){
        antikoerper.style.setProperty("--translateX",clamp(getPercentage(animation_delay_ptc,1-animation_delay_ptc,progress),0,1)*animated_translateX_value+animated_translateX_unit)
        part2.style.setProperty("opacity",clamp(getPercentage(.5,1-animation_delay_ptc,progress),0,1))
        part1.style.setProperty("opacity",Math.abs(clamp(getPercentage(animation_delay_ptc,.5,progress),0,1)-1))
        antikoerper.style.rotate = clamp(getPercentage(animation_delay_ptc,1-animation_delay_ptc,progress),0,1)*180+"deg";
        antikoerper.style.setProperty("--r",inital_r+diff_r*progress)
        antikoerper.style.setProperty("--g",inital_g+diff_g*progress)
        antikoerper.style.setProperty("--b",inital_b+diff_b*progress)
        antikoerper.style.setProperty("--r2",inital_r2+diff_r2*progress)
        antikoerper.style.setProperty("--g2",inital_g2+diff_g2*progress)
        antikoerper.style.setProperty("--b2",inital_b2+diff_b2*progress)
        part1.style.setProperty("display","block");
        part2.style.setProperty("display","block");
    }
    else{
        antikoerper.style.setProperty("--translateX",animated_translateX_value+animated_translateX_unit)
        part2.style.setProperty("opacity",1)
        part1.style.setProperty("opacity",0)
        part1.style.setProperty("display","none");
        antikoerper.style.rotate = "180deg"
        antikoerper.style.setProperty("--r",final_r)
        antikoerper.style.setProperty("--g",final_g)
        antikoerper.style.setProperty("--b",final_b)
        antikoerper.style.setProperty("--r2",final_r2)
        antikoerper.style.setProperty("--g2",final_g2)
        antikoerper.style.setProperty("--b2",final_b2)
    }
}


  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(() => {
        computeProgress(third_Section, antikoerper_animation);
        ticking = false;
      });
    }
  }

window.addEventListener('scroll', onScroll, { passive: true });
document.addEventListener('DOMContentLoaded', onScroll);


