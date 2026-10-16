import { describe, it, expect, beforeEach, vi } from 'vitest';
import { setupTabs } from '../src/scripts/tabs';

describe('Tabs Navigation Utility', () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement('div');
    root.innerHTML = `
      <nav class="nav-tabs">
        <button class="nav-btn active" data-tab="about">About</button>
        <button class="nav-btn" data-tab="projects">Projects</button>
        <button class="nav-btn" data-tab="services">Services</button>
        <button class="nav-btn" data-tab="contact">Contact</button>
      </nav>
      <section class="tab-panel active" id="tab-about">About Panel</section>
      <section class="tab-panel" id="tab-projects">Projects Panel</section>
      <section class="tab-panel" id="tab-services">Services Panel</section>
      <section class="tab-panel" id="tab-contact">Contact Panel</section>
    `;
    document.body.appendChild(root);
    window.location.hash = '';
  });

  it('switches active tab and panel on click', () => {
    const cleanup = setupTabs(root);
    const projectsBtn = root.querySelector('[data-tab="projects"]') as HTMLButtonElement;
    projectsBtn.click();

    expect(projectsBtn.classList.contains('active')).toBe(true);
    const aboutBtn = root.querySelector('[data-tab="about"]') as HTMLButtonElement;
    expect(aboutBtn.classList.contains('active')).toBe(false);

    const projectsPanel = root.querySelector('#tab-projects') as HTMLElement;
    const aboutPanel = root.querySelector('#tab-about') as HTMLElement;
    expect(projectsPanel.classList.contains('active')).toBe(true);
    expect(aboutPanel.classList.contains('active')).toBe(false);

    cleanup();
  });

  it('syncs initial tab from window.location.hash if present', () => {
    window.location.hash = '#services';
    const cleanup = setupTabs(root);

    const servicesBtn = root.querySelector('[data-tab="services"]') as HTMLButtonElement;
    const servicesPanel = root.querySelector('#tab-services') as HTMLElement;
    expect(servicesBtn.classList.contains('active')).toBe(true);
    expect(servicesPanel.classList.contains('active')).toBe(true);

    cleanup();
  });
});
