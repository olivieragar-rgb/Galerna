/* ============================================
   CÍA LA GALERNA — navegacion.js
   Nav transparente → opaca al hacer scroll
   ============================================ */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    var nav = document.getElementById('nav');
    if (!nav) return;

    // Transparente al inicio, opaca tras bajar 80px
    function actualizarNav() {
      if (window.scrollY > 80) {
        nav.classList.add('nav-solida');
      } else {
        nav.classList.remove('nav-solida');
      }
    }

    window.addEventListener('scroll', actualizarNav, { passive: true });
    actualizarNav();

    // Scroll suave a secciones
    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        var y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
      });
    });
  });

})();
