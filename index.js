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
      <button class="add-fav" data-id="${product.id}">
        <span class="pointer-none">Agregar a favoritos</span>
        <svg class="pointer-none" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewBox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
        </svg>
      </button>
      <div class="d-flex justify-content-around m-3">
        <button class="remove-one-to-chart rounded-circle h-100" style="width: 30px;" data-id="${product.id}">
          -
        </button>
        <span id="total-items-for-${product.id}" >
          ${product.itemsToBuy}
        </span>
        <button class="add-one-to-chart rounded-circle h-100" style="width: 30px;" data-id="${product.id}">
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
    saveToFavorites();
    addOneToChart();
    removeOneToChart();
  }

  function saveToFavorites() {
    document.querySelectorAll(".add-fav").forEach((addBtn) => {
      addBtn.addEventListener("click", (ev) => {
        const productId = ev.target.dataset.id;
        updateProduct(productId, { isFavorite: true }).then(() => {
        window.location.href = "/favorites/index.html";
        });
        
      });
    });
  }

  function addOneToChart() {
    document.querySelectorAll(".add-one-to-chart").forEach((addBtn) => {
      console.log(addBtn);
      addBtn.addEventListener("click", (ev) => {
        const product = products.find(
          (p) => p.id === Number(ev.target.dataset.id)
        );
        updateProduct(product.id, {
          isToBuy: true,
          itemsToBuy: product.itemsToBuy + 1,
        }).then(() => {
          showProducts();
        });
      });
    });
  }

  function removeOneToChart() {
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
  function addOneToChart() {
    document.querySelectorAll(".remove-one-to-chart").forEach((addBtn) => {
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
          showProducts();
        });
      });
    });
  }
});
