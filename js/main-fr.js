// María Pérez — Consultante en lactation | main-fr.js
// Version française des widgets interactifs (bannière cookies, bouton urgence,
// bouton WhatsApp flottant, formulaire de contact) pour la landing page /fr/.
document.addEventListener('DOMContentLoaded', function () {

  // --- Mobile nav toggle ---
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.querySelector('.main-nav');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var isOpen = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
    });
    nav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // --- Footer year ---
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  // --- Floating "Urgence en allaitement" button + modal ---
  // Works out how many folders deep we are under /fr/ so relative links
  // (../assets/, ../../assets/, etc.) resolve correctly at any depth,
  // whether the URL is a clean directory ("/fr/allaitement/") or an
  // explicit file ("/fr/allaitement/index.html").
  var pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length && pathParts[pathParts.length - 1].indexOf('.') !== -1) {
    pathParts.pop(); // drop the trailing filename (e.g. index.html)
  }
  var frIndex = pathParts.indexOf('fr');
  var depth = frIndex >= 0 ? (pathParts.length - frIndex) : 1; // e.g. fr/allaitement/ -> depth 2
  var prefix = new Array(depth + 1).join('../'); // '../' repeated `depth` times
  var rootPrefix = prefix; // to site root (for assets/css/js)

  if (!document.querySelector('.urgency-fab')) {
    var urgencyFab = document.createElement('button');
    urgencyFab.type = 'button';
    urgencyFab.className = 'urgency-fab';
    urgencyFab.setAttribute('aria-haspopup', 'dialog');
    urgencyFab.innerHTML =
      '<strong class="urgency-fab-title">Urgence en allaitement — en français</strong>' +
      '<span class="urgency-fab-text">Une difficulté avec l\'allaitement ? Besoin d\'aide maintenant ?</span>';

    var overlay = document.createElement('div');
    overlay.className = 'urgency-modal-overlay';
    overlay.innerHTML =
      '<div class="urgency-modal" role="dialog" aria-modal="true" aria-labelledby="urgency-modal-title">' +
        '<button type="button" class="urgency-modal-close" aria-label="Fermer">&times;</button>' +
        '<span class="eyebrow">Visioconsultation immédiate</span>' +
        '<h3 id="urgency-modal-title">Quelque chose ne va pas avec l\'allaitement ?</h3>' +
        '<p>Peu importe que vous soyez encore à la maternité, que vous veniez de rentrer chez vous ou que vous allaitiez depuis plusieurs jours ou semaines. Si vous avez besoin d\'aide maintenant, je vous accompagne par visioconférence pour comprendre ce qui se passe et vous donner des conseils clairs.</p>' +
        '<ul class="checklist">' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Le bébé n\'arrive pas à prendre le sein correctement.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Vous ressentez des douleurs ou avez des crevasses.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Vous ne savez pas s\'il boit suffisamment.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Votre sein est très tendu, douloureux ou présente une zone dure.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Vous avez des doutes sur la montée de lait ou la production.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Les tétées deviennent très difficiles.</li>' +
        '</ul>' +
        '<a href="#" class="btn whatsapp-btn btn-block" data-whatsapp="34653023683" data-context="Bonjour María, j\'ai besoin d\'aide maintenant avec l\'allaitement. Mon bébé a ___ jours/semaines et voici ce qui se passe : ___">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8z"/></svg>' +
          'J\'ai besoin d\'aide maintenant' +
        '</a>' +
        '<p style="font-size:.78rem;color:var(--ink-soft);text-align:center;margin:10px 0 0;">Écrivez-moi sur WhatsApp et nous organiserons la visioconférence au plus vite.</p>' +
        '<a href="' + rootPrefix + 'fr/urgence-allaitement/" class="urgency-modal-more">Découvrir le fonctionnement de la consultation →</a>' +
      '</div>';

    document.body.appendChild(urgencyFab);
    document.body.appendChild(overlay);

    var modalWaLink = overlay.querySelector('[data-whatsapp]');
    modalWaLink.href = 'https://wa.me/' + modalWaLink.getAttribute('data-whatsapp') + '?text=' + encodeURIComponent(modalWaLink.getAttribute('data-context'));

    function openUrgencyModal() {
      overlay.classList.add('show');
      document.body.classList.add('urgency-modal-open');
      overlay.querySelector('.urgency-modal-close').focus();
    }
    function closeUrgencyModal() {
      overlay.classList.remove('show');
      document.body.classList.remove('urgency-modal-open');
      urgencyFab.focus();
    }
    urgencyFab.addEventListener('click', openUrgencyModal);
    overlay.querySelector('.urgency-modal-close').addEventListener('click', closeUrgencyModal);
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) closeUrgencyModal();
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && overlay.classList.contains('show')) closeUrgencyModal();
    });

    // Close the modal automatically if the person clicks the in-page anchor link
    overlay.querySelector('.urgency-modal-more').addEventListener('click', function () {
      closeUrgencyModal();
    });

    // Let any other element on the page (hero button, urgent band button) open the same modal
    document.querySelectorAll('[data-open-urgency-modal]').forEach(function (el) {
      el.addEventListener('click', openUrgencyModal);
    });
  }

  // --- Floating WhatsApp button ---
  var WHATSAPP_NUMBER = '34653023683';
  if (!document.querySelector('.whatsapp-float')) {
    var waFloat = document.createElement('a');
    waFloat.className = 'whatsapp-float';
    waFloat.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Bonjour María, je souhaite recevoir des informations sur vos consultations en français. Ma situation est la suivante : ___');
    waFloat.target = '_blank';
    waFloat.rel = 'noopener';
    waFloat.setAttribute('aria-label', 'Écrire sur WhatsApp au 653 02 36 83');
    waFloat.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8z"/></svg>';
    document.body.appendChild(waFloat);
  }

  // --- Cookie consent banner ---
  var COOKIE_KEY = 'mp_cookie_consent';

  function showCookieBanner() {
    if (document.querySelector('.cookie-banner')) return;
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Avis relatif aux cookies');
    var cookiesHref = rootPrefix + 'politica-cookies.html';
    banner.innerHTML =
      '<p>Nous utilisons des cookies propres et, si vous les acceptez, certains cookies d\'analyse pour améliorer le site. En savoir plus : <a href="' + cookiesHref + '">politique de cookies</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-reject">Refuser</button>' +
      '<button type="button" class="cookie-accept">Accepter</button>' +
      '</div>';
    document.body.appendChild(banner);
    document.body.classList.add('has-cookie-banner');
    requestAnimationFrame(function () { banner.classList.add('show'); });

    function closeBanner(value) {
      localStorage.setItem(COOKIE_KEY, value);
      banner.classList.remove('show');
      document.body.classList.remove('has-cookie-banner');
      setTimeout(function () { banner.remove(); }, 500);
    }
    banner.querySelector('.cookie-accept').addEventListener('click', function () { closeBanner('accepted'); });
    banner.querySelector('.cookie-reject').addEventListener('click', function () { closeBanner('rejected'); });
  }

  if (!localStorage.getItem(COOKIE_KEY)) {
    showCookieBanner();
  }

  document.querySelectorAll('[data-reopen-cookies]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showCookieBanner();
    });
  });

  // --- Contact form ---
  var form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var status = document.getElementById('form-status');
      var submitBtn = form.querySelector('button[type="submit"]');
      var data = new FormData(form);

      if (submitBtn) submitBtn.disabled = true;
      if (status) {
        status.textContent = 'Envoi de votre demande…';
        status.style.color = '#767F68';
      }

      fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(function (response) {
        if (response.ok) {
          form.reset();
          if (status) {
            status.textContent = 'Merci ! Votre demande a bien été envoyée. Nous vous répondrons dès que possible.';
            status.style.color = '#767F68';
          }
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function () {
        if (status) {
          status.textContent = 'Nous n\'avons pas pu envoyer le formulaire. Écrivez-nous directement sur WhatsApp ou à mariaperezpont@gmail.com.';
          status.style.color = '#BD8377';
        }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  // --- WhatsApp quick link builder ---
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    var base = a.getAttribute('data-whatsapp');
    var context = a.getAttribute('data-context') || 'Bonjour María, je souhaite recevoir des informations sur vos consultations en français. Ma situation est la suivante : ___';
    a.href = 'https://wa.me/' + base + '?text=' + encodeURIComponent(context);
  });
});
