import { describe, it, expect, beforeEach } from 'vitest';
import { setupThemeToggle, resolveTheme, toggleTheme } from '../src/scripts/theme';

describe('Theme Utility', () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.removeAttribute('data-theme');
    document.body.innerHTML = `
      <button class="theme-toggle" id="theme-toggle">🌙</button>
    `;
  });

  it('resolves default theme to light when no storage or preference is set', () => {
    expect(resolveTheme()).toBe('light');
  });

  it('resolves theme from localStorage if set', () => {
    localStorage.setItem('theme', 'dark');
    expect(resolveTheme()).toBe('dark');
  });

  it('toggles theme from light to dark and updates localStorage', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const next = toggleTheme();
    expect(next).toBe('dark');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    expect(localStorage.getItem('theme')).toBe('dark');
  });

  it('setupThemeToggle updates button text and handles click', () => {
    document.documentElement.setAttribute('data-theme', 'light');
    const btn = document.getElementById('theme-toggle') as HTMLButtonElement;
    const cleanup = setupThemeToggle(btn);

    expect(btn.textContent).toBe('🌙');
    btn.click();
    expect(btn.textContent).toBe('☀️');
    expect(document.documentElement.getAttribute('data-theme')).toBe('dark');
    cleanup();
  });
});
