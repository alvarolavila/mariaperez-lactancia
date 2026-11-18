// María Pérez — Asesora de Lactancia | main.js
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

  // --- Floating "Urgencia de lactancia" button + modal (all pages) ---
  var isInServicios = window.location.pathname.indexOf('/servicios/') !== -1;
  var prefix = isInServicios ? '../' : '';

  if (!document.querySelector('.urgency-fab')) {
    var urgencyFab = document.createElement('button');
    urgencyFab.type = 'button';
    urgencyFab.className = 'urgency-fab';
    urgencyFab.setAttribute('aria-haspopup', 'dialog');
    urgencyFab.innerHTML =
      '<strong class="urgency-fab-title">Lactancia de urgencia</strong>' +
      '<span class="urgency-fab-text">¿Tienes una dificultad con la lactancia y necesitas ayuda ahora?</span>' +
      '<span class="urgency-fab-cta">Recibe ayuda ahora →</span>';

    var overlay = document.createElement('div');
    overlay.className = 'urgency-modal-overlay';
    overlay.innerHTML =
      '<div class="urgency-modal" role="dialog" aria-modal="true" aria-labelledby="urgency-modal-title">' +
        '<button type="button" class="urgency-modal-close" aria-label="Cerrar">&times;</button>' +
        '<span class="eyebrow">Videollamada inmediata</span>' +
        '<h3 id="urgency-modal-title">¿Algo no va bien con la lactancia?</h3>' +
        '<p>No importa si estás en el hospital, acabas de llegar a casa o llevas días o semanas dando el pecho. Si necesitas ayuda ahora, te acompaño por videollamada para valorar qué ocurre y darte unas pautas claras.</p>' +
        '<ul class="checklist">' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Problemas de agarre.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Dolor, grietas o heridas.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Dudas sobre si el bebé come suficiente.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Pecho duro, molestias o bultos.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Dudas sobre la producción de leche.</li>' +
        '</ul>' +
        '<a href="#" class="btn whatsapp-btn btn-block" data-whatsapp="34653023683" data-context="Hola, tengo una dificultad con la lactancia y necesito ayuda urgente. El problema es…">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8z"/></svg>' +
          'Necesito ayuda ahora' +
        '</a>' +
        '<p style="font-size:.78rem;color:var(--ink-soft);text-align:center;margin:10px 0 0;">Escríbeme por WhatsApp y organizamos la videollamada cuanto antes.</p>' +
        '<a href="' + prefix + 'servicios/lactancia-urgencia.html" class="urgency-modal-more">Ver cómo funciona la consulta →</a>' +
      '</div>';

    document.body.appendChild(urgencyFab);
    document.body.appendChild(overlay);

    // Build the WhatsApp link inside the modal now that it's in the DOM
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

    // Let any other element on the page (e.g. the urgent band button) open the same modal
    document.querySelectorAll('[data-open-urgency-modal]').forEach(function (el) {
      el.addEventListener('click', openUrgencyModal);
    });
  }

  // --- Floating WhatsApp button (all pages) ---
  var WHATSAPP_NUMBER = '34653023683';
  if (!document.querySelector('.whatsapp-float')) {
    var waFloat = document.createElement('a');
    waFloat.className = 'whatsapp-float';
    waFloat.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hola María, te escribo desde tu web. Me gustaría pedir información/cita.');
    waFloat.target = '_blank';
    waFloat.rel = 'noopener';
    waFloat.setAttribute('aria-label', 'Escribir por WhatsApp al 653 02 36 83');
    waFloat.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8z"/></svg>';
    document.body.appendChild(waFloat);
  }

  // --- Cookie consent banner ---
  // NOTE for María: this is a lightweight, no-cookie-set-until-consent banner.
  // If you add Google Analytics or other tracking, only load it after consent
  // is "accepted" (see the commented example below).
  var COOKIE_KEY = 'mp_cookie_consent';

  function showCookieBanner() {
    if (document.querySelector('.cookie-banner')) return; // already open
    var banner = document.createElement('div');
    banner.className = 'cookie-banner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-label', 'Aviso de cookies');
    var cookiesHref = window.location.pathname.indexOf('/servicios/') !== -1 ? '../politica-cookies.html' : 'politica-cookies.html';
    banner.innerHTML =
      '<p>Usamos cookies propias y, si las aceptas, algunas de análisis para mejorar la web. Puedes leer más en la <a href="' + cookiesHref + '">política de cookies</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-reject">Rechazar</button>' +
      '<button type="button" class="cookie-accept">Aceptar</button>' +
      '</div>';
    document.body.appendChild(banner);
    document.body.classList.add('has-cookie-banner');
    requestAnimationFrame(function () { banner.classList.add('show'); });

    function closeBanner(value) {
      localStorage.setItem(COOKIE_KEY, value);
      banner.classList.remove('show');
      document.body.classList.remove('has-cookie-banner');
      setTimeout(function () { banner.remove(); }, 500);
      // if (value === 'accepted') { /* load Google Analytics / Meta Pixel here */ }
    }
    banner.querySelector('.cookie-accept').addEventListener('click', function () { closeBanner('accepted'); });
    banner.querySelector('.cookie-reject').addEventListener('click', function () { closeBanner('rejected'); });
  }

  if (!localStorage.getItem(COOKIE_KEY)) {
    showCookieBanner();
  }

  // Let people change their mind later from the footer link
  document.querySelectorAll('[data-reopen-cookies]').forEach(function (el) {
    el.addEventListener('click', function (e) {
      e.preventDefault();
      showCookieBanner();
    });
  });


  // NOTE for María: this form currently only prepares a mailto / WhatsApp message.
  // For a real inbox connect it to Formspree, Netlify Forms or similar and
  // point the <form action> there — ask your developer to wire this up.
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
        status.textContent = 'Enviando tu solicitud…';
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
            status.textContent = '¡Gracias! Tu solicitud se ha enviado correctamente. Te responderemos lo antes posible.';
            status.style.color = '#767F68';
          }
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function () {
        if (status) {
          status.textContent = 'No hemos podido enviar el formulario. Escríbenos directamente por WhatsApp o a mariaperezpont@gmail.com.';
          status.style.color = '#BD8377';
        }
      }).finally(function () {
        if (submitBtn) submitBtn.disabled = false;
      });
    });
  }

  // --- WhatsApp quick link builder (adds page context to the message) ---
  document.querySelectorAll('[data-whatsapp]').forEach(function (a) {
    var base = a.getAttribute('data-whatsapp');
    var context = a.getAttribute('data-context') || 'Hola María, te escribo desde tu web. Me gustaría pedir información/cita.';
    a.href = 'https://wa.me/' + base + '?text=' + encodeURIComponent(context);
  });
});
