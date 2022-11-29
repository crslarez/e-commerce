import { getSearchProducts, updateProduct } from "../request.js";
import { createCards } from "../createCards.js";

document.addEventListener("DOMContentLoaded", async () => {
  const search = "?isFavorite=true";
  let products = [];
  getSearchProducts(search).then((data) => {
    products = data;

    data.forEach((product) => {
      const btn = /*html*/ `
        <button class="remove-btn border-0 p-2 rounded text-danger fw-bold w-75 m-auto bg-danger bg-opacity-10 mb-2" id="${product.id}">
          Eliminar de favoritos
        </button>
        <button class="add-one-to-chart border-0 p-2 fs-5 fw-bold text-success rounded w-75 m-auto bg-success bg-opacity-25 mb-2" data-id="${product.id}">
          Add to cart
        </button>
      `;

      const card = createCards(product, btn);
      const container = document.querySelector("#container-cards");
      container.innerHTML += card;
    });

    addOneToChart();

    function addOneToChart() {
      document.querySelectorAll(".add-one-to-chart").forEach((addBtn) => {
        addBtn.addEventListener("click", (ev) => {
          const product = products.find(
            (p) => p.id === Number(ev.target.dataset.id)
          );
          const newQautity = product.itemsToBuy + 1;
          updateProduct(product.id, {
            isToBuy: true,
            itemsToBuy: newQautity,
          }).then(() => {
            alert("Usted ha agregado este producto a su carrito");
            window.location.reload();
          });
        });
      });
    }

    document.querySelectorAll(".remove-btn").forEach((removeBtn) => {
      removeBtn.addEventListener("click", async () => {
        await updateProduct(removeBtn.id, { isFavorite: false });
        window.location.reload();
      });
    });
  });
});
