import { getProducts } from "./request.js";
import { createCards } from "./createCards.js";
import { updateProduct } from "./request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const container = document.querySelector("#container-cards");
  const producstInCartContainer = document.querySelector("#producst-in-cart");
  let products = [];
  let cartProducts = [];
  showProducts();
  async function showProducts() {
    products = await getProducts();
    container.innerHTML = "";
    products.forEach((product) => {
      const btn = /*html*/ `
      <button class="add-fav border-0 p-2 rounded w-75 m-auto bg-success bg-opacity-25" data-id="${product.id}">
        <span class="pointer-none fw-bold text-success">Agregar a favoritos</span>
      </button>
      <div class="d-flex justify-content-around m-3 text-success fs-4">
        <button class="remove-one-to-chart d-flex justify-content-center rounded-circle border-0 bg-success bg-opacity-10 text-success" style="width: 40px; height: 40px;" data-id="${product.id}">
          -
        </button>
        <span id="total-items-for-${product.id}" >
          ${product.itemsToBuy}
        </span>
        <button class="add-one-to-chart d-flex justify-content-center rounded-circle border-0 bg-success bg-opacity-10 text-success" style="width: 40px; height: 40px;" data-id="${product.id}">
          +
        </button>
      </div>
      `;

      const card = createCards(product, btn);
      container.innerHTML += card;
      if (product.isToBuy && product.itemsToBuy) {
        producstInCartContainer.innerHTML = product.name;
      }
    });

    addOneToChart();
    saveToFavorites();
    removeOneToChart();
  }

  function saveToFavorites() {
    document.querySelectorAll(".add-fav").forEach((addBtn) => {
      addBtn.addEventListener("click", (ev) => {
        const productId = ev.target.dataset.id;
        console.log(productId);
        updateProduct(productId, { isFavorite: true }).then(() => {
          window.location.href = "/favorites/index.html";
        });
      });
    });
  }

  function removeOneToChart() {
    const btn = document.querySelectorAll(".remove-one-to-chart");
    btn.forEach((addBtn) => {
      addBtn.addEventListener("click", (ev) => {
        const product = products.find(
          (p) => p.id === Number(ev.target.dataset.id)
        );
        if (product.itemsToBuy === 0) {
          return;
        }
        const newQautity = product.itemsToBuy - 1;
        let isToBuy = true;
        if (newQautity === 0) {
          isToBuy = false;
        }
        updateProduct(product.id, {
          isToBuy,
          itemsToBuy: newQautity,
        }).then(() => {
          window.location.reload();
        });
      });
    });
  }

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
          showProducts();
        });
      });
    });
  }
});
