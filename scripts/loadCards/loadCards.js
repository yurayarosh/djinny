import truncateCardText from '../truncateCardText';
import Card from './Card';

const API_URL = 'https://picsum.photos/v2/list';
const LIMIT = 9;
let canFetch = true;
const cardsListData = {
  list: [],
  nextPage: `${API_URL}?limit=${LIMIT}&page=1`,
};

const fetchList = () => {
  return new Promise((resolve, reject) => {
    let paging = {};

    fetch(`${cardsListData.nextPage}`)
      .then(res => {
        const link = res.headers.get('link');

        if (link) {
          const pagingStrs = link.split(',');

          pagingStrs.forEach(str => {
            const [src, rel] = str.split(';');
            rel.includes('next') && (paging.next = src.trim().slice(1, -1));
            rel.includes('prev') && (paging.prev = src.trim().slice(1, -1));
          });
        }

        return res.json();
      })
      .then(data => {
        cardsListData.list.push(...data);

        resolve({
          list: cardsListData.list,
          nextPage: paging.next,
        });
      })
      .catch(err => reject(err));
  });
};

const renderListHTML = ({ wrap }) => {
  wrap.innerHTML = cardsListData.list
    .map(
      (item, index) => `
        <li class="col-lg-6 mb-4">${Card({
          index,
          title: item.author,
          img: `https://picsum.photos/id/${item.id}/400/200`,
        })}</li>`
    )
    .join('');
};

const onIntersection =
  ({ wrap }) =>
  ([entry], observer) => {
    if (!canFetch) return;
    if (!entry.isIntersecting) return;

    if (!cardsListData.nextPage) {
      observer.unobserve(entry.target);
      entryTarget.parentNode.removeChild(entry.target);
    }

    canFetch = false;

    fetchList().then(data => {
      cardsListData.list = data.list;
      cardsListData.nextPage = data.nextPage;

      renderListHTML({ wrap });

      truncateCardText().init?.();

      setTimeout(() => {
        canFetch = true;
      });
    });
  };

const loadCards = () => {
  const wrap = document.querySelector('.js-cards-list');
  const spinner = document.querySelector('.js-cards-spinner');

  if (!wrap || !spinner) return;

  const observer = new IntersectionObserver(
    onIntersection({
      wrap,
    }),
    {
      threshold: [1],
    }
  );

  observer.observe(spinner);
};

export default loadCards;
