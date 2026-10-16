import { describe, it, expect, beforeEach } from 'vitest';
import { setupProjectFilter } from '../src/scripts/filter';

describe('Project Filter Utility', () => {
  let container: HTMLDivElement;

  beforeEach(() => {
    container = document.createElement('div');
    container.innerHTML = `
      <div class="filter-bar">
        <button class="chip active" data-filter="all">All</button>
        <button class="chip" data-filter="2d">2D</button>
        <button class="chip" data-filter="3d">3D</button>
      </div>
      <div class="projects-grid">
        <div class="project-card" data-type="2d" id="card-1">Card 1</div>
        <div class="project-card" data-type="3d" id="card-2">Card 2</div>
        <div class="project-card" data-type="2d" id="card-3">Card 3</div>
      </div>
    `;
    document.body.appendChild(container);
  });

  it('shows all cards when "all" is active', () => {
    const cleanup = setupProjectFilter(container);
    const card1 = container.querySelector('#card-1') as HTMLElement;
    const card2 = container.querySelector('#card-2') as HTMLElement;
    const card3 = container.querySelector('#card-3') as HTMLElement;

    expect(card1.style.display).toBe('');
    expect(card2.style.display).toBe('');
    expect(card3.style.display).toBe('');
    cleanup();
  });

  it('shows only 2d cards and hides 3d cards when "2d" chip is clicked', () => {
    const cleanup = setupProjectFilter(container);
    const chip2d = container.querySelector('[data-filter="2d"]') as HTMLButtonElement;
    chip2d.click();

    const card1 = container.querySelector('#card-1') as HTMLElement;
    const card2 = container.querySelector('#card-2') as HTMLElement;
    const card3 = container.querySelector('#card-3') as HTMLElement;

    expect(card1.style.display).toBe('');
    expect(card2.style.display).toBe('none');
    expect(card3.style.display).toBe('');
    expect(chip2d.classList.contains('active')).toBe(true);

    const chipAll = container.querySelector('[data-filter="all"]') as HTMLButtonElement;
    expect(chipAll.classList.contains('active')).toBe(false);
    cleanup();
  });

  it('shows only 3d cards when "3d" chip is clicked', () => {
    const cleanup = setupProjectFilter(container);
    const chip3d = container.querySelector('[data-filter="3d"]') as HTMLButtonElement;
    chip3d.click();

    const card1 = container.querySelector('#card-1') as HTMLElement;
    const card2 = container.querySelector('#card-2') as HTMLElement;
    const card3 = container.querySelector('#card-3') as HTMLElement;

    expect(card1.style.display).toBe('none');
    expect(card2.style.display).toBe('');
    expect(card3.style.display).toBe('none');
    cleanup();
  });
});
