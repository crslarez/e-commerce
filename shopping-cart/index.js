import { getSearchProducts, updateProduct, saveBuy } from "../request.js";
import { createCards } from "../createCards.js";

let btnBuy = document.querySelector("#buy")
let products = []
btnBuy.addEventListener("click", ()=>{
  saveBuy(products)
})

let search = "?isToBuy=true";

const buttons = (e) => {
  return `<form id="${e.id}" class="buttons-cant">
        <button type="button" id="sumar">+</button>
        <p>${e.itemsToBuy}</p>
         <button type="button" id="restar">-</button>
        <button type="button" id="eliminar">x</button>

    </form>
    
`;
};

const addEvent = () => {
  const formList = Array.prototype.slice.call(
    document.querySelectorAll(".buttons-cant")
  );
  formList.forEach((form) => {
    form.addEventListener("click", async (e) => {
      const id = form.getAttribute("id");
      const product = await getSearchProducts("/" + id);
      console.log(product.isToBuy);

      if (e.target.innerHTML === "+") {
        await updateProduct(id, {
          itemsToBuy: parseInt(product.itemsToBuy) + 1,
        });
      } else if (e.target.innerHTML === "-") {
        await updateProduct(id, {
          itemsToBuy: parseInt(product.itemsToBuy) - 1,
        });
      } else if (e.target.innerHTML === "x") {
        await updateProduct(id, { isToBuy: !product.isToBuy, itemsToBuy: 0 });
      }
      window.location.reload();
    });
  });
};

getSearchProducts(search).then((data) => {
  products = data
  const container = document.querySelector("#container-cards");
  data.forEach((e) => {
    const card = createCards(e, buttons(e));
    container.innerHTML += card;
  });
  addEvent();
});
