(function(){
const track = document.getElementById('track');
const slides = Array.from(track.children);
const prev = document.querySelector('.btn.prev');
const next = document.querySelector('.btn.next');
const dotsWrap = document.querySelector('.dots');
let index = 0;


// Dots erzeugen
slides.forEach((_, i) => {
const dot = document.createElement('button');
dot.className = 'dot';
dot.type = 'button';
dot.setAttribute('role', 'tab');
dot.setAttribute('aria-label', `Zu Slide ${i+1}`);
dot.addEventListener('click', () => goTo(i));
dotsWrap.appendChild(dot);
});


const dots = Array.from(dotsWrap.children);


function update(){
track.style.transform = `translateX(${-index * 100}%)`;
dots.forEach((d,i)=> d.setAttribute('aria-current', i===index ? 'true':'false'));
}


function goTo(i){
index = (i + slides.length) % slides.length; // wrap-around
update();
}


prev.addEventListener('click', () => goTo(index-1));
next.addEventListener('click', () => goTo(index+1));


// Tastatur (←/→)
document.addEventListener('keydown', (e) => {
if (e.key === 'ArrowLeft') goTo(index-1);
if (e.key === 'ArrowRight') goTo(index+1);
});


// Swipe/Touch
let startX = 0, deltaX = 0, dragging = false;
const threshold = 50; // px


track.addEventListener('pointerdown', (e) => {
dragging = true; startX = e.clientX; deltaX = 0; track.style.transition = 'none';
});
window.addEventListener('pointermove', (e) => {
if (!dragging) return; deltaX = e.clientX - startX;
track.style.transform = `translateX(calc(${-index*100}% + ${deltaX}px))`;
});
window.addEventListener('pointerup', () => {
if (!dragging) return; track.style.transition = '';
if (Math.abs(deltaX) > threshold) {
if (deltaX < 0) goTo(index+1); else goTo(index-1);
} else {
update(); // snap back
}
dragging = false; deltaX = 0;
});


// Initialer Zustand
update();
})();