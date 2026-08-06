/* WonderToys - RTL / LTR Toggle Manager */
(function() {
  const savedRTL = localStorage.getItem('wonder_rtl');
  if (savedRTL === 'true') {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
  }
})();

function toggleRTL() {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  if (isRTL) {
    document.documentElement.removeAttribute('dir');
    document.documentElement.setAttribute('lang', 'en');
    localStorage.setItem('wonder_rtl', 'false');
    updateRTLButtons('RTL');
    if (typeof showToast === 'function') showToast('Layout switched to LTR (Left to Right)', 'info');
  } else {
    document.documentElement.setAttribute('dir', 'rtl');
    document.documentElement.setAttribute('lang', 'ar');
    localStorage.setItem('wonder_rtl', 'true');
    updateRTLButtons('LTR');
    if (typeof showToast === 'function') showToast('Layout switched to RTL (Right-to-Left Arabic Layout)', 'info');
  }
}

function updateRTLButtons(text) {
  const buttons = document.querySelectorAll('.rtl-toggle-btn');
  buttons.forEach(btn => {
    btn.textContent = text;
  });
}

document.addEventListener('DOMContentLoaded', () => {
  const isRTL = document.documentElement.getAttribute('dir') === 'rtl';
  updateRTLButtons(isRTL ? 'LTR' : 'RTL');
});
