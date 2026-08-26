const languages = [
  { code: 'en', label: 'English', short: 'EN' },
  { code: 'fr', label: 'Français', short: 'FR' },
  { code: 'de', label: 'Deutsch', short: 'DE' },
  { code: 'ar', label: 'العربية', short: 'AR' },
  { code: 'ko', label: '한국어', short: 'KO' },
  { code: 'es', label: 'Español', short: 'ES' },
  { code: 'ru', label: 'Русский', short: 'RU' },
];

const storageKey = 'trolinktek-language';
const supported = new Set(languages.map(language => language.code));

function readLanguage() {
  const stored = localStorage.getItem(storageKey);
  return supported.has(stored) ? stored : 'en';
}

function setDocumentLanguage(code) {
  document.documentElement.lang = code;
  document.documentElement.dir = code === 'ar' ? 'rtl' : 'ltr';
  document.body?.setAttribute('dir', code === 'ar' ? 'rtl' : 'ltr');
}

function setTranslateCookie(code) {
  const value = code === 'en' ? '' : `/en/${code}`;
  const maxAge = code === 'en' ? 0 : 31536000;
  document.cookie = `googtrans=${value};path=/;max-age=${maxAge};SameSite=Lax`;
}

function activateGoogleLanguage(code, attempt = 0) {
  const combo = document.querySelector('.goog-te-combo');
  if (!combo) {
    if (attempt < 80) window.setTimeout(() => activateGoogleLanguage(code, attempt + 1), 100);
    return;
  }
  if (combo.value !== code) {
    combo.value = code;
    combo.dispatchEvent(new Event('change', { bubbles: true }));
  }
}

function loadTranslator(selectedLanguage) {
  if (!document.querySelector('#google_translate_element')) {
    const mount = document.createElement('div');
    mount.id = 'google_translate_element';
    mount.setAttribute('aria-hidden', 'true');
    document.body.appendChild(mount);
  }

  window.googleTranslateElementInit = () => {
    if (!window.google?.translate?.TranslateElement) return;
    new window.google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'fr,de,ar,ko,es,ru',
      autoDisplay: false,
      multilanguagePage: true,
    }, 'google_translate_element');
    const labelTranslatorAssets = () => {
      document.querySelectorAll('img[src*="productlogos/translate"]').forEach(image => {
        if (!image.alt.trim()) image.alt = 'Google Translate';
      });
    };
    labelTranslatorAssets();
    new MutationObserver(labelTranslatorAssets).observe(document.body, { childList: true, subtree: true });
    if (selectedLanguage !== 'en') activateGoogleLanguage(selectedLanguage);
  };

  if (window.google?.translate?.TranslateElement) {
    window.googleTranslateElementInit();
  } else if (!document.querySelector('#trolinktek-google-translate')) {
    const script = document.createElement('script');
    script.id = 'trolinktek-google-translate';
    script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    script.async = true;
    document.head.appendChild(script);
  }
}

function closeMenu(group) {
  group.classList.remove('open');
  group.querySelector('button')?.setAttribute('aria-expanded', 'false');
}

function createLanguageMenu(selectedLanguage) {
  const current = languages.find(language => language.code === selectedLanguage) || languages[0];
  const group = document.createElement('div');
  group.className = 'language-nav notranslate';
  group.setAttribute('translate', 'no');
  group.innerHTML = `
    <button class="language-trigger" type="button" aria-label="Select website language" aria-haspopup="true" aria-expanded="false">
      <span aria-hidden="true">◎</span><b>${current.short}</b><i aria-hidden="true">⌄</i>
    </button>
    <div class="language-menu" role="menu" aria-label="Website languages">
      ${languages.map(language => `
        <button type="button" role="menuitemradio" aria-checked="${language.code === selectedLanguage}" data-language="${language.code}">
          <span>${language.label}</span><small>${language.short}</small>
        </button>`).join('')}
    </div>`;

  const trigger = group.querySelector('.language-trigger');
  trigger.addEventListener('click', event => {
    event.preventDefault();
    event.stopPropagation();
    const open = group.classList.toggle('open');
    trigger.setAttribute('aria-expanded', String(open));
    if (open) group.querySelector('[aria-checked="true"]')?.focus();
  });

  group.querySelectorAll('[data-language]').forEach(button => {
    button.addEventListener('click', () => {
      const code = button.dataset.language;
      const previous = readLanguage();
      localStorage.setItem(storageKey, code);
      setDocumentLanguage(code);
      setTranslateCookie(code);
      closeMenu(group);
      if (code === 'en' || previous !== code) {
        location.reload();
      } else {
        activateGoogleLanguage(code);
      }
    });
  });

  document.addEventListener('click', event => {
    if (!group.contains(event.target)) closeMenu(group);
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeMenu(group);
      trigger.focus();
    }
  });
  return group;
}

export function initMultilingualSite() {
  if (document.querySelector('.language-nav')) return;
  const header = document.querySelector('.header');
  if (!header) return;

  document.querySelectorAll('.brand,.footer-brand,[href^="mailto:"],[data-model-id]')
    .forEach(element => {
      element.classList.add('notranslate');
      element.setAttribute('translate', 'no');
    });

  const selectedLanguage = readLanguage();
  setDocumentLanguage(selectedLanguage);
  const languageMenu = createLanguageMenu(selectedLanguage);
  const quoteButton = header.querySelector(':scope > .btn');
  header.insertBefore(languageMenu, quoteButton || header.querySelector('.menu'));
  loadTranslator(selectedLanguage);
}
