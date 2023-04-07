const truncateCardText = () => {
  const cards = [...document.querySelectorAll('.js-card-body')];

  if (!cards) return {};

  const showText = btn => {
    const text = btn.previousElementSibling;
    btn.classList.add('d-none');
    text.classList.add('full-text');
  };

  const init = () => {
    cards.forEach(card => {
      const text = card.querySelector('.card-text');
      const btn = card.querySelector('.show-more-btn');
      if (!text || !btn) return;

      const isOverflowing = text.offsetHeight < text.scrollHeight;

      isOverflowing && btn.classList.remove('d-none');
    });
  };

  const onClick = ({ target }) => {
    const btn = target.closest('.show-more-btn');

    if (btn) showText(btn);
  };

  return {
    init,
    onClick,
  };
};

export default truncateCardText;
