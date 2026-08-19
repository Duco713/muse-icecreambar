/* ============================================================================
   Muse Ice Cream Bar — kleurschakelaar (TIJDELIJK)
   ----------------------------------------------------------------------------
   Bouwt het knopje rechtsonder waarmee je tussen de paletten "warm" en "bold"
   wisselt. Bedoeld als keuzehulp voor de eigenaren, niet als permanente functie.

   WEGHALEN ALS DE KEUZE GEMAAKT IS:
     1. verwijder <script src="assets/theme-switch.js" defer> uit alle pagina's
     2. is het bold palet gekozen? zet data-theme="bold" vast op de <html>-tag
        (het mini-scriptje in de <head> mag dan ook weg)
     3. assets/theme.css blijft staan — daar leven beide paletten
   ========================================================================= */
(function () {
  var KEY = 'muse-theme';
  var THEMES = {
    warm: { label: 'Warm', dots: ['#84532c', '#f4b384', '#fff8f5'] },
    bold: { label: 'Bold', dots: ['#0e4d2e', '#f0538f', '#deefdc'] }
  };

  function current() {
    return document.documentElement.getAttribute('data-theme') === 'bold' ? 'bold' : 'warm';
  }

  function syncMeta() {
    var meta = document.querySelector('meta[name="theme-color"]');
    if (!meta) return;
    var primary = getComputedStyle(document.documentElement)
      .getPropertyValue('--c-primary').trim();
    if (primary) meta.setAttribute('content', 'rgb(' + primary + ')');
  }

  function apply(theme) {
    if (theme === 'bold') document.documentElement.setAttribute('data-theme', 'bold');
    else document.documentElement.removeAttribute('data-theme');
    try { localStorage.setItem(KEY, theme); } catch (e) {}
    syncMeta();
    render();
  }

  var btn;

  function render() {
    if (!btn) return;
    var next = current() === 'warm' ? 'bold' : 'warm';
    var t = THEMES[next];
    btn.setAttribute('aria-label', 'Wissel naar kleurpalet ' + t.label);
    btn.innerHTML =
      '<span style="display:flex;gap:3px">' +
        t.dots.map(function (c) {
          return '<span style="width:11px;height:11px;border-radius:50%;background:' + c +
                 ';box-shadow:0 0 0 1px rgba(0,0,0,.12) inset"></span>';
        }).join('') +
      '</span><span>Bekijk in ' + t.label + '</span>';
  }

  function build() {
    btn = document.createElement('button');
    btn.type = 'button';
    btn.setAttribute('data-theme-switch', '');
    btn.style.cssText = [
      'position:fixed', 'right:16px', 'bottom:16px', 'z-index:60',
      'display:flex', 'align-items:center', 'gap:8px',
      'padding:10px 14px', 'border-radius:9999px',
      'border:1px solid rgba(0,0,0,.10)', 'background:#fff', 'color:#333',
      'font:600 13px/1 system-ui,-apple-system,sans-serif', 'cursor:pointer',
      'box-shadow:0 4px 16px rgba(0,0,0,.14)'
    ].join(';');
    btn.addEventListener('click', function () {
      apply(current() === 'warm' ? 'bold' : 'warm');
    });
    document.body.appendChild(btn);
    render();
    syncMeta();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', build);
  } else {
    build();
  }
})();
