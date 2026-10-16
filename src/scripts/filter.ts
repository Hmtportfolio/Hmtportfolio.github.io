export function setupProjectFilter(container: HTMLElement = document.body) {
  const chips = container.querySelectorAll<HTMLButtonElement>('.chip');
  const cards = container.querySelectorAll<HTMLElement>('.project-card');

  function applyFilter(filter: string) {
    chips.forEach((c) => {
      c.classList.toggle('active', c.dataset.filter === filter);
    });

    cards.forEach((card) => {
      const type = card.dataset.type;
      const isVisible = filter === 'all' || type === filter;
      card.style.display = isVisible ? '' : 'none';
    });
  }

  const handlers: Array<() => void> = [];

  chips.forEach((chip) => {
    const handler = () => {
      const filter = chip.dataset.filter || 'all';
      applyFilter(filter);
    };
    chip.addEventListener('click', handler);
    handlers.push(() => chip.removeEventListener('click', handler));
  });

  return () => {
    handlers.forEach((h) => h());
  };
}
