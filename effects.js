/* =========================================================
   Emive · Landing Page Smart Alarm — Efeitos sutis (JS)
   ---------------------------------------------------------
   Brilho "cintilando" (shimmer) + glow suave nos botões.
   100% aditivo e reversível: injeta seu próprio <style>,
   NÃO toca em styles.css. Para remover o efeito, basta
   apagar a linha <script src="effects.js"> do index.html.

   Respeita prefers-reduced-motion (desliga sozinho).
   ========================================================= */
(function () {
  'use strict';

  // ---- Guard de acessibilidade: sem animação p/ quem prefere ----
  if (window.matchMedia &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  // ---- Intensidades (ajuste rápido caso precise ainda mais sutil) ----
  var CONFIG = {
    sweepDur:   5.5,  // s — ciclo do shimmer (passa rápido, fica parado o resto)
    glowDur:    4.5,  // s — respiração do glow (só nos botões laranja)
    maxStagger: 4.2,  // s — defasagem máx. entre botões (dá o "cintilar" alternado)
    shineAlpha: 0.42, // 0..1 — brilho do reflexo em repouso
    hotAlpha:   0.60  // 0..1 — brilho do reflexo no hover
  };

  // ---- CSS injetado (todo o visual do efeito vive aqui) ----
  var CSS =
  '.fx-shine{position:relative;overflow:hidden;--fx-shine-alpha:' + CONFIG.shineAlpha + ';}' +
  '.fx-shine::after{content:"";position:absolute;top:-10%;left:0;width:45%;height:120%;' +
    'pointer-events:none;z-index:3;will-change:transform;' +
    'transform:translateX(-180%) skewX(-18deg);' +
    'background:linear-gradient(100deg,' +
      'rgba(255,255,255,0) 0%,' +
      'rgba(255,255,255,var(--fx-shine-alpha)) 50%,' +
      'rgba(255,255,255,0) 100%);}' +
  /* shimmer periódico (só quando visível: .fx-active) */
  '.fx-shine.fx-active::after{animation:fx-sweep var(--fx-dur,' + CONFIG.sweepDur + 's) ' +
    'ease-in-out var(--fx-delay,0s) infinite;}' +
  /* shimmer único e mais forte no hover — vem depois p/ vencer o de cima */
  '.fx-shine.fx-hot{--fx-shine-alpha:' + CONFIG.hotAlpha + ';}' +
  '.fx-shine.fx-hot::after{animation:fx-sweep-hot .9s ease-out;}' +
  /* glow respirando — só nos laranja; repouso = box-shadow original do styles.css */
  '.fx-glow-target.fx-active{animation:fx-glow var(--fx-glow-dur,' + CONFIG.glowDur + 's) ' +
    'ease-in-out var(--fx-delay,0s) infinite;}' +
  /* no hover, deixa o :hover do styles.css assumir o box-shadow */
  '.fx-glow-target.fx-active:hover{animation:none;}' +
  '@keyframes fx-sweep{' +
    '0%{transform:translateX(-180%) skewX(-18deg);}' +
    '18%{transform:translateX(320%) skewX(-18deg);}' +
    '100%{transform:translateX(320%) skewX(-18deg);}}' +
  '@keyframes fx-sweep-hot{' +
    '0%{transform:translateX(-180%) skewX(-18deg);}' +
    '100%{transform:translateX(320%) skewX(-18deg);}}' +
  '@keyframes fx-glow{' +
    '0%,100%{box-shadow:0 10px 25px rgba(246,139,36,.28);}' +
    '50%{box-shadow:0 12px 30px rgba(246,139,36,.42);}}';

  function injectStyle() {
    if (document.getElementById('emive-fx')) return;
    var style = document.createElement('style');
    style.id = 'emive-fx';
    style.textContent = CSS;
    document.head.appendChild(style);
  }

  function init() {
    injectStyle();

    var btns = document.querySelectorAll('.btn-orange, .btn-contratar');
    if (!btns.length) return;

    // Só anima o que está na tela (perf + os botões "acordam" ao rolar).
    var io = ('IntersectionObserver' in window)
      ? new IntersectionObserver(function (entries) {
          entries.forEach(function (e) {
            e.target.classList.toggle('fx-active', e.isIntersecting);
          });
        }, { threshold: 0.15 })
      : null;

    btns.forEach(function (btn, i) {
      btn.classList.add('fx-shine');
      if (btn.classList.contains('btn-orange')) {
        btn.classList.add('fx-glow-target');
      }

      // Defasagem: cada botão começa em um ponto diferente do ciclo,
      // então eles cintilam alternados em vez de todos juntos.
      var delay = (i * 0.9) % CONFIG.maxStagger + Math.random() * 0.4;
      btn.style.setProperty('--fx-delay', (-delay).toFixed(2) + 's'); // negativo = não espera
      btn.style.setProperty('--fx-dur', CONFIG.sweepDur + 's');
      btn.style.setProperty('--fx-glow-dur', CONFIG.glowDur + 's');

      // Hover: dispara um brilho único mais forte (reinicia a animação).
      btn.addEventListener('mouseenter', function () {
        btn.classList.remove('fx-hot');
        void btn.offsetWidth; // força reflow p/ reiniciar a animação
        btn.classList.add('fx-hot');
      });
      btn.addEventListener('animationend', function (ev) {
        if (ev.animationName === 'fx-sweep-hot') btn.classList.remove('fx-hot');
      });

      if (io) io.observe(btn); else btn.classList.add('fx-active');
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();