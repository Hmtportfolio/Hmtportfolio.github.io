import { describe, it, expect, beforeEach } from 'vitest';
import { setupModalAndLightbox } from '../src/scripts/modal';

describe('Modal & Lightbox Controller', () => {
  let root: HTMLDivElement;

  beforeEach(() => {
    root = document.createElement('div');
    root.innerHTML = `
      <div id="projects-grid">
        <div class="project-card" data-project-id="p1">Card 1</div>
        <video class="thumb-video"></video>
      </div>

      <!-- Pre-rendered Template for p1 -->
      <template id="modal-template-p1" data-title="Chroma">
        <div class="template-media">
          <img src="https://example.com/poster.png" alt="Chroma Poster" />
          <video class="modal-video" src="https://example.com/trailer.mp4"></video>
        </div>
        <div class="template-desc">
          <p>Chroma description</p>
        </div>
      </template>

      <!-- Modal Overlay -->
      <div class="modal-overlay" id="modal-overlay">
        <div class="modal">
          <div class="modal-header">
            <h3 id="modal-title"></h3>
            <button class="modal-close" id="modal-close">&times;</button>
          </div>
          <div class="modal-body">
            <div id="modal-media"></div>
            <div class="modal-desc" id="modal-desc"></div>
          </div>
        </div>
      </div>

      <!-- Lightbox Overlay -->
      <div class="lightbox-overlay" id="lightbox-overlay">
        <button class="lightbox-close" id="lightbox-close">&times;</button>
        <img class="lightbox-img" id="lightbox-img" src="" alt="" />
      </div>
    `;
    document.body.appendChild(root);
  });

  it('opens modal on card click with pre-rendered template content', () => {
    const controller = setupModalAndLightbox(root);
    const card = root.querySelector('[data-project-id="p1"]') as HTMLElement;
    card.click();

    const overlay = root.querySelector('#modal-overlay') as HTMLElement;
    expect(overlay.classList.contains('active')).toBe(true);
    expect(document.body.style.overflow).toBe('hidden');

    const title = root.querySelector('#modal-title') as HTMLElement;
    expect(title.textContent).toBe('Chroma');

    const media = root.querySelector('#modal-media') as HTMLElement;
    expect(media.querySelector('img')?.getAttribute('src')).toBe('https://example.com/poster.png');

    controller.cleanup();
  });

  it('closes modal on close button click and restores scroll', () => {
    const controller = setupModalAndLightbox(root);
    controller.openModal('p1');

    const overlay = root.querySelector('#modal-overlay') as HTMLElement;
    expect(overlay.classList.contains('active')).toBe(true);

    const closeBtn = root.querySelector('#modal-close') as HTMLButtonElement;
    closeBtn.click();

    expect(overlay.classList.contains('active')).toBe(false);
    expect(document.body.style.overflow).toBe('');

    controller.cleanup();
  });

  it('opens lightbox on media image click and closes on lightbox close button', () => {
    const controller = setupModalAndLightbox(root);
    controller.openModal('p1');

    const img = root.querySelector('#modal-media img') as HTMLImageElement;
    img.click();

    const lightbox = root.querySelector('#lightbox-overlay') as HTMLElement;
    const lightboxImg = root.querySelector('#lightbox-img') as HTMLImageElement;
    expect(lightbox.classList.contains('active')).toBe(true);
    expect(lightboxImg.src).toBe('https://example.com/poster.png');

    const lightboxClose = root.querySelector('#lightbox-close') as HTMLButtonElement;
    lightboxClose.click();

    expect(lightbox.classList.contains('active')).toBe(false);
    // Modal should still remain open
    expect(root.querySelector('#modal-overlay')?.classList.contains('active')).toBe(true);

    controller.cleanup();
  });

  it('closes modal on Escape key', () => {
    const controller = setupModalAndLightbox(root);
    controller.openModal('p1');

    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
    expect(root.querySelector('#modal-overlay')?.classList.contains('active')).toBe(false);

    controller.cleanup();
  });

  it('renders PDF links in modal when template has pdf-links', () => {
    const t = document.createElement('template');
    t.id = 'modal-template-p4';
    t.dataset.title = 'Regretful Colors';
    t.innerHTML = `
      <div class="template-media"></div>
      <div class="template-desc">
        <div class="pdf-links">
          <a class="pdf-link" href="https://pub-58ba3247d6ee441b9218b20100871e4c.r2.dev/Regretful%20Colors%20(Sac%20Mau%20Hoi%20Han)/Behind%20the%20scene/Storyboard.pdf" target="_blank" rel="noopener">
            📄 Storyboard (PDF)
          </a>
        </div>
      </div>
    `;
    root.appendChild(t);

    const controller = setupModalAndLightbox(root);
    controller.openModal('p4');

    const pdfLink = root.querySelector('#modal-desc .pdf-link') as HTMLAnchorElement;
    expect(pdfLink).toBeDefined();
    expect(pdfLink.href).toContain('Storyboard.pdf');
    expect(pdfLink.target).toBe('_blank');
    expect(pdfLink.textContent).toContain('Storyboard (PDF)');

    controller.cleanup();
  });
});
