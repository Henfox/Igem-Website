/**
 * revealOnScroll
 * - fügt .reveal--visible hinzu, sobald ein Element sichtbar wird
 * - optional: 'once' = true → nur einmal animieren, danach nicht mehr beobachten
 * - rootMargin/threshold steuern, wann genau getriggert wird
 */
function revealOnScroll(selector = '.fade', {
  //DEFAULT VALUES
  root = null,
  rootMargin = '0px 0px -10% 0px', // triggert leicht VOR dem Vollsichtbarsein unten  top right bottom left
  threshold = 0.1,                  // ab 10% Sichtbarkeit
  once = true,
  stagger = 0                        // versetztes Einblenden (ms) pro Element
} = {}) {

  const els = Array.from(document.querySelectorAll(selector)); //Get elements

    //Falls kein Oberserversupport ohne animation!
  if (!('IntersectionObserver' in window) || els.length === 0) {
    // Fallback: sofort sichtbar machen
    els.forEach(el => el.classList.add('fade-visible'));
    return () => {};
  }

  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        // optionales Staggering
        const index = els.indexOf(el);
        if (stagger > 0) {
          el.style.transitionDelay = (index * stagger) + 'ms';
        }
        el.classList.add('fade-visible');

        if (once) {
          io.unobserve(el);
        }
      } else if (!once) {
        // wieder ausblenden, wenn gewünscht
        entry.target.classList.remove('fade-visible');
        entry.target.style.transitionDelay = '';
      }
    });
  }, { root, rootMargin, threshold });

  els.forEach(el => io.observe(el));
  // return „unsubscribe“
  return () => {
    els.forEach(el => io.unobserve(el));
    io.disconnect();
  };
}

const stopFade = revealOnScroll('.fade', {
  threshold: 0.15,
  rootMargin: '0px 0px -15% 0px',
  once: false,
  stagger: 0, 
});