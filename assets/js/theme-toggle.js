/**
 * Kids Toy Store & Educational Games Shop - Theme Toggle Handler
 * Persists Light/Dark preference in localStorage across all pages.
 */
document.addEventListener('DOMContentLoaded', () => {
  const themeToggleBtns = document.querySelectorAll('.theme-toggle-btn');
  const storedTheme = localStorage.getItem('toy_store_theme') || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

  // Apply initial theme
  setTheme(storedTheme);

  themeToggleBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      const newTheme = currentTheme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
    });
  });

  function setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    document.body.setAttribute('data-theme', theme);
    localStorage.setItem('toy_store_theme', theme);

    // Update icons on toggle buttons
    themeToggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      if (icon) {
        if (theme === 'dark') {
          icon.className = 'fas fa-sun text-warning';
          btn.setAttribute('title', 'Switch to Light Mode');
        } else {
          icon.className = 'fas fa-moon text-primary';
          btn.setAttribute('title', 'Switch to Dark Mode');
        }
      }
    });
  }
});
