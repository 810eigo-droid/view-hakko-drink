(() => {
  const track = document.querySelector('.voices-track');
  if (!track) return;
  const cards = [...track.querySelectorAll('.voice-card')];
  const prev = document.querySelector('.voice-prev');
  const next = document.querySelector('.voice-next');
  const position = document.querySelector('.voice-position');
  let current = 0;
  const update = () => {
    const left = track.getBoundingClientRect().left + parseFloat(getComputedStyle(track).paddingLeft);
    let distance = Infinity;
    cards.forEach((card, i) => {
      const value = Math.abs(card.getBoundingClientRect().left - left);
      if (value < distance) { distance = value; current = i; }
    });
    position.textContent = `${current + 1} / ${cards.length}`;
    prev.disabled = current === 0;
    next.disabled = current === cards.length - 1;
  };
  const move = delta => {
    const i = Math.max(0, Math.min(cards.length - 1, current + delta));
    const offset = cards[i].offsetLeft - cards[0].offsetLeft;
    track.scrollTo({ left: offset, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  };
  prev.addEventListener('click', () => move(-1));
  next.addEventListener('click', () => move(1));
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
      event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1);
    }
  });
  track.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
})();
