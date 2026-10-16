export type Theme = 'light' | 'dark';

export function resolveTheme(): Theme {
  if (typeof window === 'undefined') return 'light';
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'dark' || stored === 'light') return stored;
  } catch (e) {
    // localStorage may be unavailable
  }

  if (typeof window.matchMedia === 'function' && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
}

export function applyTheme(theme: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', theme);
  try {
    localStorage.setItem('theme', theme);
  } catch (e) {
    // ignore
  }
}

export function toggleTheme(): Theme {
  const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
  const next: Theme = current === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  return next;
}

export function updateThemeToggleUi(btn: HTMLElement | null) {
  if (!btn || typeof document === 'undefined') return;
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  btn.textContent = isDark ? '☀️' : '🌙';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
  btn.setAttribute('title', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}

export function setupThemeToggle(btn: HTMLElement | null) {
  if (!btn) return () => {};

  updateThemeToggleUi(btn);

  const handler = () => {
    toggleTheme();
    updateThemeToggleUi(btn);
  };

  btn.addEventListener('click', handler);
  return () => {
    btn.removeEventListener('click', handler);
  };
}
