/* ============================================================
   MAISON LE BLEU — script.js
   Nav scroll state | Mobile nav | Fade-in observer
   Testimonial carousel | Reservation form validation
============================================================ */

(function () {
  'use strict';

  /* ────────────────────────────────────────
     Nav: scroll state (transparent → dark)
  ──────────────────────────────────────── */
  const nav = document.querySelector('.nav');

  function updateNav() {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 80);
  }

  window.addEventListener('scroll', updateNav, { passive: true });
  updateNav(); // run once on load

  /* ────────────────────────────────────────
     Hero background Ken-Burns entrance
  ──────────────────────────────────────── */
  const heroBg = document.querySelector('.hero__bg');
  if (heroBg) {
    // Trigger after first paint so the CSS transition fires
    requestAnimationFrame(() => {
      setTimeout(() => heroBg.classList.add('loaded'), 50);
    });
  }

  /* ────────────────────────────────────────
     Mobile nav: hamburger toggle
  ──────────────────────────────────────── */
  const hamburger = document.querySelector('.nav__hamburger');
  const overlay   = document.querySelector('.nav__overlay');
  const overlayLinks = document.querySelectorAll('.nav__overlay-link');

  function openNav() {
    document.body.classList.add('nav-open');
    hamburger && hamburger.setAttribute('aria-expanded', 'true');
    overlay   && overlay.setAttribute('aria-hidden', 'false');
    // Trap focus in overlay (simple: focus first link)
    const firstLink = overlay && overlay.querySelector('a');
    if (firstLink) firstLink.focus();
  }

  function closeNav() {
    document.body.classList.remove('nav-open');
    hamburger && hamburger.setAttribute('aria-expanded', 'false');
    overlay   && overlay.setAttribute('aria-hidden', 'true');
  }

  if (hamburger) {
    hamburger.addEventListener('click', () => {
      document.body.classList.contains('nav-open') ? closeNav() : openNav();
    });
  }

  // Close when an overlay link is clicked
  overlayLinks.forEach(link => link.addEventListener('click', closeNav));

  // Close on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && document.body.classList.contains('nav-open')) {
      closeNav();
      hamburger && hamburger.focus();
    }
  });

  /* ────────────────────────────────────────
     Theme toggle: light / dark
  ──────────────────────────────────────── */
  const themeToggle = document.getElementById('themeToggle');
  const htmlEl = document.documentElement;

  function applyTheme(theme) {
    htmlEl.setAttribute('data-theme', theme);
    const isLight = theme === 'light';
    if (themeToggle) {
      themeToggle.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
      themeToggle.setAttribute('aria-pressed', String(isLight));
    }
  }

  const savedTheme = localStorage.getItem('theme');
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  applyTheme(savedTheme !== null ? savedTheme : (prefersDark ? 'dark' : 'light'));

  if (themeToggle) {
    themeToggle.addEventListener('click', function () {
      var next = htmlEl.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
      applyTheme(next);
      localStorage.setItem('theme', next);
    });
  }

  /* ────────────────────────────────────────
     Smooth scroll (fallback for older Safari)
  ──────────────────────────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const id = this.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeNav();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  /* ────────────────────────────────────────
     Fade-in on scroll — IntersectionObserver
  ──────────────────────────────────────── */
  const fadeEls = document.querySelectorAll('.fade-in');

  if ('IntersectionObserver' in window && fadeEls.length) {
    const io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target); // fire once
        }
      });
    }, { threshold: 0.12 });

    fadeEls.forEach(function (el) { io.observe(el); });
  } else {
    // Browsers without IntersectionObserver: show everything immediately
    fadeEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* ────────────────────────────────────────
     Testimonial Carousel
  ──────────────────────────────────────── */
  var carousel = document.querySelector('.carousel');

  if (carousel) {
    var slides   = carousel.querySelectorAll('.carousel__slide');
    var dots     = carousel.querySelectorAll('.carousel__dot');
    var prevBtn  = carousel.querySelector('.carousel__btn--prev');
    var nextBtn  = carousel.querySelector('.carousel__btn--next');
    var track    = carousel.querySelector('.carousel__track');
    var current  = 0;
    var autoTimer;

    function showSlide(n) {
      var total = slides.length;
      // Wrap around
      n = ((n % total) + total) % total;

      // Deactivate old
      slides[current].classList.remove('active');
      dots[current].classList.remove('active');
      dots[current].setAttribute('aria-selected', 'false');

      current = n;

      // Activate new
      slides[current].classList.add('active');
      dots[current].classList.add('active');
      dots[current].setAttribute('aria-selected', 'true');
    }

    function startTimer() {
      autoTimer = setInterval(function () {
        showSlide(current + 1);
      }, 4000);
    }

    function stopTimer() {
      clearInterval(autoTimer);
    }

    // Arrow buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', function () {
        stopTimer();
        showSlide(current - 1);
        startTimer();
      });
    }
    if (nextBtn) {
      nextBtn.addEventListener('click', function () {
        stopTimer();
        showSlide(current + 1);
        startTimer();
      });
    }

    // Dot navigation
    dots.forEach(function (dot, i) {
      dot.addEventListener('click', function () {
        stopTimer();
        showSlide(i);
        startTimer();
      });
    });

    // Pause on hover
    if (track) {
      track.addEventListener('mouseenter', stopTimer);
      track.addEventListener('mouseleave', startTimer);
    }

    // Keyboard navigation when carousel is focused
    carousel.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') {
        stopTimer();
        showSlide(current - 1);
        startTimer();
      } else if (e.key === 'ArrowRight') {
        stopTimer();
        showSlide(current + 1);
        startTimer();
      }
    });

    startTimer();
  }

  /* ────────────────────────────────────────
     Reservation Form
  ──────────────────────────────────────── */
  var form             = document.getElementById('reservationForm');
  var confirmationEl   = document.getElementById('confirmation');
  var confirmationMsg  = document.getElementById('confirmationMessage');
  var resetBtn         = document.getElementById('resetForm');

  if (!form) return; // nothing to do if no form on page

  // Set min date to tomorrow so past dates are rejected by the browser picker too
  var dateInput = document.getElementById('date');
  if (dateInput) {
    var tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    dateInput.min = tomorrow.toISOString().split('T')[0];
  }

  /* ── Validation helpers ── */

  function setError(fieldId, message) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.add('invalid');
    if (errEl) errEl.textContent = message;
  }

  function clearError(fieldId) {
    var input = document.getElementById(fieldId);
    var errEl = document.getElementById(fieldId + '-error');
    if (input) input.classList.remove('invalid');
    if (errEl) errEl.textContent = '';
  }

  function clearAllErrors() {
    ['fullName', 'email', 'phone', 'date', 'time', 'guests'].forEach(clearError);
  }

  // RFC-5322-lite email regex
  var EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /* ── Live field validation (clear error on input) ── */
  ['fullName', 'email', 'phone', 'date', 'time', 'guests'].forEach(function (id) {
    var el = document.getElementById(id);
    if (el) {
      el.addEventListener('input', function () { clearError(id); });
      el.addEventListener('change', function () { clearError(id); });
    }
  });

  /* ── Submit handler ── */
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearAllErrors();

    var valid = true;

    var nameVal   = document.getElementById('fullName').value.trim();
    var emailVal  = document.getElementById('email').value.trim();
    var phoneVal  = document.getElementById('phone').value.trim();
    var dateVal   = document.getElementById('date').value;
    var timeVal   = document.getElementById('time').value;
    var guestsVal = document.getElementById('guests').value;

    // Full Name: at least 2 non-space characters
    if (nameVal.length < 2) {
      setError('fullName', 'Please enter your full name (at least 2 characters).');
      valid = false;
    }

    // Email: regex check
    if (!EMAIL_RE.test(emailVal)) {
      setError('email', 'Please enter a valid email address (e.g. name@example.com).');
      valid = false;
    }

    // Phone: strip non-digits, require at least 8
    var digits = phoneVal.replace(/\D/g, '');
    if (digits.length < 8) {
      setError('phone', 'Please enter a valid phone number with at least 8 digits.');
      valid = false;
    }

    // Date: required and must be at least tomorrow
    if (!dateVal) {
      setError('date', 'Please select a date for your reservation.');
      valid = false;
    } else {
      // Use noon to avoid timezone-shift issues
      var selected = new Date(dateVal + 'T12:00:00');
      var todayMidnight = new Date();
      todayMidnight.setHours(0, 0, 0, 0);
      if (selected <= todayMidnight) {
        setError('date', 'Please select a date from tomorrow onwards.');
        valid = false;
      }
    }

    // Time: must be selected
    if (!timeVal) {
      setError('time', 'Please select your preferred dining time.');
      valid = false;
    }

    // Guests: integer 1–12
    var guestsNum = parseInt(guestsVal, 10);
    if (!guestsVal || isNaN(guestsNum) || guestsNum < 1 || guestsNum > 12) {
      setError('guests', 'Please enter between 1 and 12 guests. For larger parties, please call us.');
      valid = false;
    }

    if (!valid) {
      // Scroll to the first invalid field
      var firstInvalid = form.querySelector('.invalid');
      if (firstInvalid) {
        firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
        firstInvalid.focus({ preventScroll: true });
      }
      return;
    }

    /* ── Success ── */

    // Format date for display: "Saturday, 14 June 2026"
    var dateDisplay = new Date(dateVal + 'T12:00:00').toLocaleDateString('en-SG', {
      weekday: 'long',
      day:     'numeric',
      month:   'long',
      year:    'numeric'
    });

    var guestWord = guestsNum === 1 ? 'guest' : 'guests';

    confirmationMsg.textContent =
      'Thank you, ' + nameVal + '! Your reservation request for ' +
      guestsNum + ' ' + guestWord + ' on ' + dateDisplay + ' at ' + timeVal +
      ' has been received. We look forward to welcoming you to Golden Dragon Pavilion · 金龍閣.';

    // Swap form for confirmation
    form.hidden = true;
    confirmationEl.hidden = false;
    confirmationEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    // Move focus into the confirmation for screen readers
    confirmationEl.setAttribute('tabindex', '-1');
    confirmationEl.focus({ preventScroll: true });

    // Voice announcement
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      var utterance = new SpeechSynthesisUtterance(
        'Hurray! Thank you for your submission. We will get back to you in one business day.'
      );
      utterance.rate = 0.95;
      utterance.pitch = 1.1;
      utterance.volume = 1;
      window.speechSynthesis.speak(utterance);
    }

    // Balloon drop
    launchBalloons();
  });

  var BALLOON_COLOURS = [
    '#e63946', '#f4a261', '#2a9d8f', '#e9c46a',
    '#a8dadc', '#c77dff', '#ff6b9d', '#06d6a0'
  ];

  function launchBalloons() {
    var container = document.getElementById('balloon-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'balloon-container';
      document.body.appendChild(container);
    }
    container.innerHTML = '';

    for (var i = 0; i < 28; i++) {
      (function (idx) {
        setTimeout(function () {
          var b = document.createElement('div');
          b.className = 'balloon';
          var colour = BALLOON_COLOURS[idx % BALLOON_COLOURS.length];
          b.style.background = colour;
          b.style.left = (Math.random() * 96 + 2) + '%';
          var dur = (3.5 + Math.random() * 2.5).toFixed(2) + 's';
          b.style.setProperty('--duration', dur);
          container.appendChild(b);
          // Remove after animation ends to keep DOM clean
          b.addEventListener('animationend', function () { b.remove(); });
        }, idx * 120);
      })(i);
    }

    // Remove container once all balloons are gone
    setTimeout(function () { container.innerHTML = ''; }, 28 * 120 + 6500);
  }

  /* ────────────────────────────────────────
     Chatbot
  ──────────────────────────────────────── */
  var CHAT_KB = [
    {
      keys: ['reserv', 'book', 'table', 'how do i'],
      a: 'You can book a table using the <a href="#reservations" style="color:var(--clr-gold)">Reservations form</a> on this page. Fill in your name, email, phone, date, time, and party size, then submit.'
    },
    {
      keys: ['advance', 'far ahead', 'when', 'early'],
      a: 'We recommend booking 3–5 days ahead for weekdays and 1–2 weeks for weekend evenings. Groups of 10+ should book at least 3 weeks in advance.'
    },
    {
      keys: ['same day', 'last.?minute', 'today', 'tonight'],
      a: 'Same-day reservations are subject to availability. Please call us directly at <strong>+33 1 4455 8800</strong> to check for last-minute openings.'
    },
    {
      keys: ['cancel', 'modif', 'change.*reserv', 'reschedul'],
      a: 'Email <strong>reservations@maisonlebleu.fr</strong> or call <strong>+33 1 4455 8800</strong> at least 24 hours before your dining time.'
    },
    {
      keys: ['cuisine', 'food', 'serve', 'menu.*type', 'what.*cook'],
      a: 'Maison Le Bleu serves contemporary French fine dining — classical techniques with modern sensibility, celebrating seasonal produce and regional terroir.'
    },
    {
      keys: ['tasting menu', 'degustation', 'course'],
      a: 'Yes. Our seven-course Tasting Menu is available at dinner service. A vegetarian variant is available with advance notice — please indicate when booking.'
    },
    {
      keys: ['diet', 'allerg', 'vegan', 'vegetarian', 'gluten', 'halal', 'nut.?free'],
      a: 'We accommodate vegetarian, vegan, gluten-free, nut-free, and shellfish-free requirements. Please note any dietary needs in the Special Requests field when booking.'
    },
    {
      keys: ['dress', 'attire', 'wear', 'smart casual', 'formal'],
      a: 'Smart casual or above is required. Shorts, flip-flops, and athletic wear are not permitted. Formal attire is encouraged for private dining.'
    },
    {
      keys: ['hour', 'open', 'close', 'time.*open', 'when.*open'],
      a: 'We are open Monday–Thursday 12:00–22:00, Friday–Saturday 12:00–23:00, Sunday 11:00–21:00. Hours may vary on public holidays — please call ahead.'
    },
    {
      keys: ['locat', 'address', 'where', 'find you', 'direction'],
      a: 'We are located at <strong>12 Rue des Étoiles, 75008 Paris, France</strong>. Nearest Métro: Saint-Philippe-du-Roule (Line 9).'
    },
    {
      keys: ['park'],
      a: 'Valet parking is available from 18:00 on weekdays and from 12:00 on weekends. Public car parks are also available nearby.'
    },
    {
      keys: ['private', 'private dining', 'private room', 'room'],
      a: 'We have three private dining rooms: the Salon Bleu (8–12 guests), the Salle d\'Or (12–20 guests), and the Grand Salon (20–60 guests), each with dedicated service staff.'
    },
    {
      keys: ['event', 'corporate', 'celebrat', 'wedding', 'party'],
      a: 'Our events team tailors full-service packages including bespoke menus, floral arrangements, AV support, and personalised keepsakes. Email <strong>events@maisonlebleu.fr</strong>.'
    },
    {
      keys: ['pay', 'payment', 'card', 'credit', 'cash', 'accept'],
      a: 'We accept Visa, Mastercard, American Express, and cash. A 15% service charge is added to all bills.'
    },
    {
      keys: ['voucher', 'gift', 'gift card'],
      a: 'Gift vouchers in €50, €100, €200, and €500 denominations are available at the restaurant or by emailing <strong>reservations@maisonlebleu.fr</strong>.'
    },
    {
      keys: ['contact', 'phone', 'call', 'email', 'reach', 'whatsapp'],
      a: 'Phone: <strong>+33 1 4455 8800</strong> (daily 10 am–10 pm) · Email: <strong>reservations@maisonlebleu.fr</strong> · Address: 12 Rue des Étoiles, 75008 Paris.'
    }
  ];

  var SUGGESTIONS = [
    'Make a reservation',
    'Opening hours',
    'Our menu',
    'Contact us',
    'Private dining'
  ];

  var chatFab        = document.getElementById('chatFab');
  var chatPanel      = document.getElementById('chatPanel');
  var chatClose      = document.getElementById('chatClose');
  var chatMessages   = document.getElementById('chatMessages');
  var chatSuggestions = document.getElementById('chatSuggestions');
  var chatForm       = document.getElementById('chatForm');
  var chatInput      = document.getElementById('chatInput');
  var chatOpen       = false;

  function chatEscape(str) {
    return str.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
  }

  function addMsg(text, role) {
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--' + role;
    if (role === 'bot') {
      el.innerHTML = text;
    } else {
      el.textContent = text;
    }
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  }

  function showTyping() {
    var el = document.createElement('div');
    el.className = 'chat-msg chat-msg--bot chat-msg--typing';
    el.innerHTML = '<span></span><span></span><span></span>';
    chatMessages.appendChild(el);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return el;
  }

  function findAnswer(query) {
    var q = query.toLowerCase();
    for (var i = 0; i < CHAT_KB.length; i++) {
      var entry = CHAT_KB[i];
      for (var j = 0; j < entry.keys.length; j++) {
        if (new RegExp(entry.keys[j]).test(q)) return entry.a;
      }
    }
    return null;
  }

  function botReply(query) {
    var typing = showTyping();
    setTimeout(function () {
      typing.remove();
      var ans = findAnswer(query);
      if (ans) {
        addMsg(ans, 'bot');
      } else {
        addMsg('I\'m not sure about that — for the quickest help, please call us at <strong>+33 1 4455 8800</strong> or email <strong>reservations@maisonlebleu.fr</strong>.', 'bot');
      }
    }, 750);
  }

  function renderSuggestions() {
    chatSuggestions.innerHTML = '';
    SUGGESTIONS.forEach(function (s) {
      var btn = document.createElement('button');
      btn.className = 'chat-suggestion';
      btn.type = 'button';
      btn.textContent = s;
      btn.addEventListener('click', function () {
        handleUserMessage(s);
      });
      chatSuggestions.appendChild(btn);
    });
  }

  function handleUserMessage(text) {
    text = text.trim();
    if (!text) return;
    chatSuggestions.innerHTML = '';
    addMsg(text, 'user');
    chatInput.value = '';
    botReply(text);
  }

  function openChat() {
    chatPanel.hidden = false;
    chatOpen = true;
    chatFab.setAttribute('aria-expanded', 'true');
    if (!chatMessages.firstChild) {
      addMsg('Bonjour! I\'m the Maison Le Bleu assistant. How can I help you today?', 'bot');
      renderSuggestions();
    }
    setTimeout(function () { chatInput.focus(); }, 50);
  }

  function closeChat() {
    chatPanel.hidden = true;
    chatOpen = false;
    chatFab.setAttribute('aria-expanded', 'false');
    chatFab.focus();
  }

  if (chatFab && chatPanel) {
    chatFab.addEventListener('click', function () {
      chatOpen ? closeChat() : openChat();
    });
    chatClose.addEventListener('click', closeChat);

    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      handleUserMessage(chatInput.value);
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && chatOpen) closeChat();
    });
  }

  /* ── "Make another reservation" resets everything ── */
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      form.reset();
      clearAllErrors();
      confirmationEl.hidden = true;
      form.hidden = false;
      // Restore tomorrow as min date after reset
      if (dateInput) {
        var t = new Date();
        t.setDate(t.getDate() + 1);
        dateInput.min = t.toISOString().split('T')[0];
      }
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Focus the first field
      var first = form.querySelector('input, select, textarea');
      if (first) first.focus({ preventScroll: true });
    });
  }

})();
