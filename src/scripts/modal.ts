export function setupModalAndLightbox(container: HTMLElement = document.body) {
  const modalOverlay = container.querySelector<HTMLElement>('#modal-overlay');
  const modalTitle = container.querySelector<HTMLElement>('#modal-title');
  const modalMedia = container.querySelector<HTMLElement>('#modal-media');
  const modalDesc = container.querySelector<HTMLElement>('#modal-desc');
  const modalClose = container.querySelector<HTMLElement>('#modal-close');

  const lightboxOverlay = container.querySelector<HTMLElement>('#lightbox-overlay');
  const lightboxImg = container.querySelector<HTMLImageElement>('#lightbox-img');
  const lightboxClose = container.querySelector<HTMLElement>('#lightbox-close');

  const cards = container.querySelectorAll<HTMLElement>('.project-card[data-project-id]');

  function pauseThumbVideos() {
    container.querySelectorAll<HTMLVideoElement>('#projects-grid video.thumb-video').forEach((v) => {
      try { v.pause(); } catch (e) {}
    });
  }

  function resumeThumbVideos() {
    container.querySelectorAll<HTMLVideoElement>('#projects-grid video.thumb-video').forEach((v) => {
      if (v.src) {
        try { v.play().catch(() => {}); } catch (e) {}
      }
    });
  }

  function openModal(projectId: string) {
    if (!modalOverlay) return;
    const template = container.querySelector<HTMLTemplateElement>(`#modal-template-${projectId}`);
    if (!template) return;

    if (modalTitle) {
      modalTitle.textContent = template.dataset.title || '';
    }

    const clone = template.content.cloneNode(true) as DocumentFragment;
    const tMedia = clone.querySelector('.template-media');
    const tDesc = clone.querySelector('.template-desc');

    if (modalMedia && tMedia) {
      modalMedia.innerHTML = tMedia.innerHTML;
    }
    if (modalDesc && tDesc) {
      modalDesc.innerHTML = tDesc.innerHTML;
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    pauseThumbVideos();
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';

    if (modalMedia) {
      const modalVideo = modalMedia.querySelector('video');
      if (modalVideo) {
        try { modalVideo.pause(); } catch (e) {}
      }
    }

    resumeThumbVideos();
  }

  function openLightbox(src: string, alt: string = '') {
    if (!lightboxOverlay || !lightboxImg) return;
    lightboxImg.src = src;
    lightboxImg.alt = alt;
    lightboxOverlay.classList.add('active');
  }

  function closeLightbox() {
    if (!lightboxOverlay || !lightboxImg) return;
    lightboxOverlay.classList.remove('active');
    lightboxImg.src = '';
  }

  const handlers: Array<() => void> = [];

  // Card clicks
  cards.forEach((card) => {
    const cardHandler = () => {
      const id = card.dataset.projectId;
      if (id) openModal(id);
    };
    card.addEventListener('click', cardHandler);
    handlers.push(() => card.removeEventListener('click', cardHandler));
  });

  // Modal close button & backdrop
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
    handlers.push(() => modalClose.removeEventListener('click', closeModal));
  }

  if (modalOverlay) {
    const overlayHandler = (e: MouseEvent) => {
      if (e.target === modalOverlay) closeModal();
    };
    modalOverlay.addEventListener('click', overlayHandler);
    handlers.push(() => modalOverlay.removeEventListener('click', overlayHandler));
  }

  // Modal media image click -> Lightbox
  if (modalMedia) {
    const mediaHandler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target && target.tagName === 'IMG') {
        const img = target as HTMLImageElement;
        openLightbox(img.src, img.alt);
      }
    };
    modalMedia.addEventListener('click', mediaHandler);
    handlers.push(() => modalMedia.removeEventListener('click', mediaHandler));
  }

  // Lightbox close button & backdrop
  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
    handlers.push(() => lightboxClose.removeEventListener('click', closeLightbox));
  }

  if (lightboxOverlay) {
    const lbOverlayHandler = (e: MouseEvent) => {
      if (e.target === lightboxOverlay) closeLightbox();
    };
    lightboxOverlay.addEventListener('click', lbOverlayHandler);
    handlers.push(() => lightboxOverlay.removeEventListener('click', lbOverlayHandler));
  }

  // Keydown Escape
  const keyHandler = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      if (lightboxOverlay && lightboxOverlay.classList.contains('active')) {
        closeLightbox();
      } else if (modalOverlay && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    }
  };
  window.addEventListener('keydown', keyHandler);
  handlers.push(() => window.removeEventListener('keydown', keyHandler));

  return {
    openModal,
    closeModal,
    openLightbox,
    closeLightbox,
    cleanup: () => handlers.forEach((h) => h()),
  };
}
