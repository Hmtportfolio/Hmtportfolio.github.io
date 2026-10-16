export function setupLazyThumbVideos(container: HTMLElement = document.body) {
  const videos = container.querySelectorAll<HTMLVideoElement>('#projects-grid video.thumb-video');
  if (videos.length === 0) return () => {};

  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    videos.forEach((v) => {
      const src = v.dataset.src;
      if (src && !v.src) v.src = src;
      try { v.play().catch(() => {}); } catch (e) {}
    });
    return () => {};
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const v = entry.target as HTMLVideoElement;
        if (entry.isIntersecting) {
          const src = v.dataset.src;
          if (src && !v.src) v.src = src;
          try { v.play().catch(() => {}); } catch (e) {}
        } else {
          try { v.pause(); } catch (e) {}
        }
      });
    },
    { rootMargin: '100px', threshold: 0.15 }
  );

  videos.forEach((v) => observer.observe(v));

  return () => {
    observer.disconnect();
  };
}
