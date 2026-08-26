export function connectInquiryForm(form, source) {
  if (!form) return;
  const status = form.querySelector('.form-status');
  const button = form.querySelector('[type="submit"], button');
  const honeypot = document.createElement('input');
  honeypot.type = 'text'; honeypot.name = 'website'; honeypot.tabIndex = -1;
  honeypot.autocomplete = 'off'; honeypot.setAttribute('aria-hidden', 'true');
  honeypot.style.cssText = 'position:absolute;left:-9999px;width:1px;height:1px;opacity:0';
  form.appendChild(honeypot);

  form.addEventListener('submit', async event => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    status.textContent = 'Sending your inquiry…';
    status.classList.remove('error');
    button.disabled = true;

    const payload = Object.fromEntries(new FormData(form).entries());
    payload.source = source;
    payload.pageUrl = location.href;
    payload.submittedAt = new Date().toISOString();

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok || !result.ok) throw new Error(result.message || 'Unable to send your inquiry.');
      location.assign('/thank-you/');
    } catch (error) {
      status.textContent = error.message || 'Unable to send your inquiry. Please try again.';
      status.classList.add('error');
      button.disabled = false;
    }
  });
}
