import 'bootstrap/dist/js/bootstrap.min';
import truncateCardText from './scripts/truncateCardText';
import setTheme from './scripts/setTheme';
import loadCards from './scripts/loadCards/loadCards';
import './app.scss';

document.addEventListener('DOMContentLoaded', () => {
  const cardsText = truncateCardText();
  const theme = setTheme();

  theme.init();
  loadCards();

  const onClick = e => {
    cardsText.onClick?.(e);
  };

  const onChange = e => {
    theme.onChange(e);
  };

  document.addEventListener('click', onClick);
  document.addEventListener('change', onChange);
});
