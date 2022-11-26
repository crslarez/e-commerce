export const createCards = (product, btn) => {
  return /*html*/ `
     <div class="card" style="width: 22rem;">
        <img src=${product.img} class="card-img-top" alt=${product.name}>
        <div class="card-body" style="font-size: 14px;">
            <p class="card-text text-secondary m-0">${product.type}</p>
            <p class="card-text fs-2 fw-semibold m-0 fw-bold">${product.name}</p>
            <p class="card-text text-secondary m-0">${product.weight}</p>
            <span class="card-text text-success fw-semibold m-0 fw-bold fs-5 pe-2">$${product.priceNow}</span>
            <span class="card-text text-decoration-line-through text-secondary m-0">$${product.priceOld}</span>
        </div>
        ${btn}
    </div>
`;
};
