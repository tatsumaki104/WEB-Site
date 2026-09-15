(() => {
  'use strict';

  let language = 'ja';
  try { language = window.localStorage.getItem('tatsumaki-language') || 'ja'; } catch (_) {}
  if (language !== 'en') language = 'ja';
  window.TATSU_PAGE_LANGUAGE = language;
  document.documentElement.lang = language;

  document.querySelectorAll('[data-page-lang]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.pageLang === language));
    button.onclick = () => {
      try { window.localStorage.setItem('tatsumaki-language', button.dataset.pageLang); } catch (_) {}
      window.location.reload();
    };
  });

  const legal = document.querySelector('.works-legal-note');
  if (legal) legal.innerHTML = legal.dataset[language] || legal.dataset.ja;

  if (!document.body.classList.contains('contact-page') || language !== 'en') return;
  document.title = 'Contact — tatsumaki';
  const setHTML = (selector, value) => {
    const node = document.querySelector(selector);
    if (node) node.innerHTML = value;
  };

  setHTML('.contact-intro h1', 'Contact');
  setHTML('.contact-intro h1 + p', 'Tell us what you would like to discuss.');
  setHTML('#step-input', '01 Input');
  setHTML('#step-review', '02 Review');
  setHTML('.contact-steps li:last-child', '03 Compose email');
  setHTML('.contact-steps + .form-note', 'Your entries will be passed to your email application.<br>This page does not send the message automatically.');
  setHTML('.required-note', 'Please complete all required fields.');
  setHTML('label[for="inquiry-company"]', 'Company / Organization <small>Optional</small>');
  setHTML('label[for="inquiry-name"]', 'Name <small>Required</small>');
  setHTML('label[for="inquiry-email"]', 'Email <small>Required</small>');
  setHTML('label[for="inquiry-message"]', 'Inquiry <small>Required</small>');
  const formNotes = document.querySelectorAll('#inquiry-form .form-note');
  if (formNotes[0]) formNotes[0].textContent = 'You can review your entries in this browser. Nothing is sent externally until you proceed to compose the email. Your entries will be lost when you close the page.';
  setHTML('#inquiry-form .form-primary', 'Review your entries <span aria-hidden="true">→</span>');
  setHTML('#review-heading', 'Review your entries');
  setHTML('#inquiry-review > .form-note', 'Review the details, then compose the email.<br>Your inquiry is sent only when you send it from your email application.');
  setHTML('#compose-email', 'Compose in email app <span aria-hidden="true">↗</span>');
  setHTML('#compose-notice', 'The inquiry has not been sent yet. Please complete sending it in your email application. If the application does not open, copy the text below and email it to info@tatsumaki.uk.');
  setHTML('.email-fallback summary', 'If your email application does not open');
  setHTML('.email-fallback label', 'Email text');
  setHTML('.email-fallback p', 'To: info@tatsumaki.uk');
  setHTML('#edit-inquiry', '← Edit entries');
})();
