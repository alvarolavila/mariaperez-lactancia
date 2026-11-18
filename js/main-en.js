// María Pérez — Lactation Consultant | main-en.js
// English version of the interactive widgets (cookie banner, urgency button,
// floating WhatsApp button, contact form) for the /en/ landing page.
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

  // --- Floating "Urgent breastfeeding support" button + modal ---
  // Works out how many folders deep we are under /en/ so relative links
  // (../assets/, ../../assets/, etc.) resolve correctly at any depth,
  // whether the URL is a clean directory ("/en/breastfeeding-support/")
  // or an explicit file ("/en/breastfeeding-support/index.html").
  var pathParts = window.location.pathname.split('/').filter(Boolean);
  if (pathParts.length && pathParts[pathParts.length - 1].indexOf('.') !== -1) {
    pathParts.pop(); // drop the trailing filename (e.g. index.html)
  }
  var enIndex = pathParts.indexOf('en');
  var depth = enIndex >= 0 ? (pathParts.length - enIndex) : 1; // e.g. en/breastfeeding-support/ -> depth 2
  var prefix = new Array(depth + 1).join('../');
  var rootPrefix = prefix;

  if (!document.querySelector('.urgency-fab')) {
    var urgencyFab = document.createElement('button');
    urgencyFab.type = 'button';
    urgencyFab.className = 'urgency-fab';
    urgencyFab.setAttribute('aria-haspopup', 'dialog');
    urgencyFab.innerHTML =
      '<strong class="urgency-fab-title">Urgent breastfeeding support</strong>' +
      '<span class="urgency-fab-text">Is something not going well with breastfeeding?</span>' +
      '<span class="urgency-fab-cta">Get help by video call now →</span>';

    var overlay = document.createElement('div');
    overlay.className = 'urgency-modal-overlay';
    overlay.innerHTML =
      '<div class="urgency-modal" role="dialog" aria-modal="true" aria-labelledby="urgency-modal-title">' +
        '<button type="button" class="urgency-modal-close" aria-label="Close">&times;</button>' +
        '<span class="eyebrow">Immediate video support</span>' +
        '<h3 id="urgency-modal-title">Is something not going well with breastfeeding?</h3>' +
        '<p>Whether you are still at the hospital, have just returned home or have been breastfeeding for several days or weeks, you do not have to wait if you need help now. I can support you by video call to understand what is happening and give you clear guidance on what to do next.</p>' +
        '<ul class="checklist">' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Your baby is struggling to latch.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Breastfeeding is painful or you have cracked nipples.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> You are unsure whether your baby is getting enough milk.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Your breast feels very full, painful or has a hard area.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> You have concerns about your milk coming in or your milk supply.</li>' +
          '<li><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M20 6 9 17l-5-5"/></svg> Feeds are becoming very difficult.</li>' +
        '</ul>' +
        '<a href="#" class="btn whatsapp-btn btn-block" data-whatsapp="34653023683" data-context="Hello Mar\u00eda, I need breastfeeding help now. My baby is ___ days/weeks old and this is what is happening: ___">' +
          '<svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 1.9.5 3.6 1.4 5.1L2 22l5-1.4C8.5 21.5 10.2 22 12 22c5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8 8 0 1 1 20 12a8 8 0 0 1-8 8z"/></svg>' +
          'I need help now' +
        '</a>' +
        '<p style="font-size:.78rem;color:var(--ink-soft);text-align:center;margin:10px 0 0;">Message me on WhatsApp and we will arrange the video call as soon as possible.</p>' +
        '<a href="' + rootPrefix + 'en/urgent-breastfeeding-support/" class="urgency-modal-more">See how the consultation works →</a>' +
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
    waFloat.href = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent('Hello María, I would like information about your consultations in English. My situation is: ___');
    waFloat.target = '_blank';
    waFloat.rel = 'noopener';
    waFloat.setAttribute('aria-label', 'Message on WhatsApp: 653 02 36 83');
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
    banner.setAttribute('aria-label', 'Cookie notice');
    var cookiesHref = rootPrefix + 'politica-cookies.html';
    banner.innerHTML =
      '<p>We use our own cookies and, if you accept them, some analytics cookies to improve the site. Read more in the <a href="' + cookiesHref + '">cookies policy</a>.</p>' +
      '<div class="cookie-actions">' +
      '<button type="button" class="cookie-reject">Decline</button>' +
      '<button type="button" class="cookie-accept">Accept</button>' +
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
        status.textContent = 'Sending your request…';
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
            status.textContent = 'Thank you! Your request has been sent. We will reply as soon as possible.';
            status.style.color = '#767F68';
          }
        } else {
          throw new Error('Form submission failed');
        }
      }).catch(function () {
        if (status) {
          status.textContent = 'We could not send the form. Please message us directly on WhatsApp or at mariaperezpont@gmail.com.';
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
    var context = a.getAttribute('data-context') || 'Hello María, I would like information about your consultations in English. My situation is: ___';
    a.href = 'https://wa.me/' + base + '?text=' + encodeURIComponent(context);
  });
});
