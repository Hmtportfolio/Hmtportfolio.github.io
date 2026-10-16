export function setupTabs(container: HTMLElement = document.body) {
  const tabBtns = container.querySelectorAll<HTMLButtonElement>('.nav-btn');
  const panels = container.querySelectorAll<HTMLElement>('.tab-panel');

  function setTab(tabId: string, updateHash: boolean = true) {
    tabBtns.forEach((btn) => {
      btn.classList.toggle('active', btn.dataset.tab === tabId);
    });

    panels.forEach((panel) => {
      panel.classList.toggle('active', panel.id === `tab-${tabId}`);
    });

    if (updateHash && typeof window !== 'undefined' && window.location) {
      try {
        if (window.history && window.history.replaceState) {
          window.history.replaceState(null, '', `#${tabId}`);
        } else {
          window.location.hash = tabId;
        }
      } catch (e) {
        // Ignore in restricted environments
      }
    }
  }

  const handlers: Array<() => void> = [];

  tabBtns.forEach((btn) => {
    const handler = () => {
      const tab = btn.dataset.tab;
      if (tab) setTab(tab);
    };
    btn.addEventListener('click', handler);
    handlers.push(() => btn.removeEventListener('click', handler));
  });

  // Check initial hash
  if (typeof window !== 'undefined' && window.location && window.location.hash) {
    const hash = window.location.hash.replace('#', '');
    const matchingBtn = Array.from(tabBtns).find((b) => b.dataset.tab === hash);
    if (matchingBtn) {
      setTab(hash, false);
    }
  }

  return () => {
    handlers.forEach((h) => h());
  };
}
