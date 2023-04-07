const Card = ({ index, title, img }) => `<div class="card h-100">
<img src="${img}" class="card-img-top" alt="" />
<div class="card-body js-card-body">
  <h4 class="card-title">${title}</h4>
  <p class="card-text mb-0">
    ${
      index % 2 === 0
        ? `Here goes some sample, example text that is relatively short.`
        : `Here goes some sample, example text that is relatively short. Here goes some
    sample, example text that is relatively short. Here goes some sample,
    example text that is relatively short.`
    }
  </p>

  <button type="button" class="show-more-btn mt-2 bg-transparent border-0 p-0 d-none">
    Show more...
  </button>
</div>
<div class="card-footer pt-3 pb-3 bg-transparent">
  <div class="d-flex">
    <button type="button" class="btn btn-primary me-3">
      Save to collection
    </button>
    <button type="button" class="btn btn-outline-dark">Share</button>
  </div>
</div>
</div>`;

export default Card;
