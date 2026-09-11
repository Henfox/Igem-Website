(function () {
  const root = document.querySelector('.MainWrapper');
  if (!root) return;

  const btn = root.querySelector('.mw-burger');
  const drawer = root.querySelector('.mw-drawer');
  const overlay = root.querySelector('.mw-overlay');
  if (!btn) return;
  if (!drawer) return;
  if (!overlay) return;


  function openDrawer() {
    drawer.classList.add('open');
    overlay.hidden = false;
    btn.classList.add('is-open');
    btn.setAttribute('aria-expanded', 'true');
    drawer.setAttribute('aria-hidden', 'false');
  }

  function closeDrawer() {
    drawer.classList.remove('open');
    overlay.hidden = true;
    btn.classList.remove('is-open');
    btn.setAttribute('aria-expanded', 'false');
    drawer.setAttribute('aria-hidden', 'true');
  }

  function toggleDrawer() {
    if (drawer.classList.contains('open')) closeDrawer();
    else openDrawer();
  }

  btn.addEventListener('click', toggleDrawer);
  overlay.addEventListener('click', closeDrawer);

  // ESC zum Schließen
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && drawer.classList.contains('open')) closeDrawer();
  });

  // Optional: schließe Menü beim Navigieren
  drawer.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (a) closeDrawer();
  });
})();