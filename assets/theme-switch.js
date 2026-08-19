/* ============================================================================
   Muse Ice Cream Bar — keuzeknoppen (TIJDELIJK)
   ----------------------------------------------------------------------------
   Twee knopjes rechtsonder, bedoeld als keuzehulp voor de eigenaren:

     1. KLEUR   palet "warm" (huidig) of "bold" (hun voorbeeld)
     2. SMAKEN  alleen op de homepage: de drie smaken mét naam en foto, of
                drie naamloze wisselsmaken. Verschijnt alleen als de pagina
                [data-flavor-option] bevat.

   WEGHALEN ALS DE KEUZES GEMAAKT ZIJN:
     1. verwijder <script src="assets/theme-switch.js" defer> uit alle pagina's
     2. bold gekozen? zet data-theme="bold" vast op de <html>-tag
        (het mini-scriptje in de <head> mag dan ook weg)
     3. smaakvariant gekozen? verwijder het niet-gekozen [data-flavor-option]
        blok uit index.html; bij "mystery" ook de Product-JSON-LD daar aanpassen
     4. assets/theme.css blijft staan — daar leven beide paletten
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

  function buttonStyle(bottom) {
    return [
      'position:fixed', 'right:16px', 'bottom:' + bottom, 'z-index:60',
      'display:flex', 'align-items:center', 'gap:8px',
      'padding:10px 14px', 'border-radius:9999px',
      'border:1px solid rgba(0,0,0,.10)', 'background:#fff', 'color:#333',
      'font:600 13px/1 system-ui,-apple-system,sans-serif', 'cursor:pointer',
      'box-shadow:0 4px 16px rgba(0,0,0,.14)'
    ].join(';');
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
    btn.style.cssText = buttonStyle('16px');
    btn.addEventListener('click', function () {
      apply(current() === 'warm' ? 'bold' : 'warm');
    });
    document.body.appendChild(btn);
    render();
    syncMeta();
  }

  /* ---------- knop 2: welke smaken staan er op de homepage? ---------- */
  var FKEY = 'muse-flavors';

  function flavorBlocks() {
    return document.querySelectorAll('[data-flavor-option]');
  }

  function currentFlavors() {
    try { return localStorage.getItem(FKEY) === 'mystery' ? 'mystery' : 'vast'; }
    catch (e) { return 'vast'; }
  }

  function applyFlavors(which) {
    flavorBlocks().forEach(function (el) {
      el.hidden = el.getAttribute('data-flavor-option') !== which;
    });
    try { localStorage.setItem(FKEY, which); } catch (e) {}
  }

  function buildFlavorButton() {
    if (!flavorBlocks().length) return;
    var b = document.createElement('button');
    b.type = 'button';
    b.setAttribute('data-flavor-switch', '');
    b.style.cssText = buttonStyle('66px');
    function paint() {
      var next = currentFlavors() === 'vast' ? 'mystery' : 'vast';
      b.setAttribute('aria-label', 'Toon de smaken als ' + next);
      b.textContent = next === 'mystery'
        ? 'Toon naamloze wisselsmaken'
        : 'Toon de smaken met naam';
    }
    b.addEventListener('click', function () {
      applyFlavors(currentFlavors() === 'vast' ? 'mystery' : 'vast');
      paint();
    });
    document.body.appendChild(b);
    applyFlavors(currentFlavors());
    paint();
  }

  function boot() { build(); buildFlavorButton(); }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot);
  } else {
    boot();
  }
})();
