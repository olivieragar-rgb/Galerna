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
    var navLinks = nav.querySelector('.nav-links');
    var hamburger = nav.querySelector('.nav-hamburger');

    nav.querySelectorAll('a[href^="#"]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var id = link.getAttribute('href').slice(1);
        var target = document.getElementById(id);
        if (!target) return;
        var y = target.getBoundingClientRect().top + window.scrollY - 70;
        window.scrollTo({ top: y, behavior: 'smooth' });
        // Close mobile menu on link click
        if (navLinks) navLinks.classList.remove('nav-open');
        if (hamburger) {
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    });

    // Hamburger toggle
    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        var isOpen = navLinks.classList.toggle('nav-open');
        hamburger.classList.toggle('open');
        hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      });
    }
  });

})();
