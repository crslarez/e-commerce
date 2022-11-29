import { getSearchProducts, updateProduct, saveBuy } from "../request.js";
import { createCards } from "../createCards.js";

let btnBuy = document.querySelector("#buy");
let products = [];
let dataUser = {
  name: "",
  direction: "",
  tlf: 0,
};

btnBuy.addEventListener("click", () => {
  if (dataUser.name) {
    saveBuy(products);
    alert("Compra realizada con exito");
  } else {
    alert("Debes llenar el formulario antes de realizar tu compra");
  }
});

let search = "?isToBuy=true";

const buttons = (e) => {
  return /*html*/ `
    <form id="${e.id}" class="buttons-cant d-flex justify-content-around m-3 fs-4">
        <button type="button" id="sumar" class="d-flex justify-content-center rounded-circle border-0 bg-success bg-opacity-10 text-success" style="width: 40px; height: 40px;">+</button>
        <p>${e.itemsToBuy}</p>
         <button type="button" id="restar" class="d-flex justify-content-center rounded-circle border-0 bg-success bg-opacity-10 text-success" style="width: 40px; height: 40px;">-</button>
        <button type="button" id="eliminar" class="d-flex justify-content-center rounded-circle border-0 bg-danger bg-opacity-10 text-danger" style="width: 40px; height: 40px;">x</button>
    </form>
`;
};

const formUser = () => {
  return /*html*/ `<form class="w-75 m-auto bg-danger bg-opacity-10 p-5">
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Ingresa tu nombre" id="name">
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Ingresa tu direccion" id="location">
        </div>
        <div class="mb-3">
            <input type="text" class="form-control" placeholder="Ingresa tu numero de telefono" id="tlf">
        </div>
    </form>`;
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
  products = data;
  const container = document.querySelector("#container-cards");
  data.forEach((e) => {
    const card = createCards(e, buttons(e));
    container.innerHTML += card;
  });
  addEvent();
});

document.getElementById("formUser").addEventListener("click", () => {
  const container = document.getElementById("container-form");
  const form = formUser();
  container.innerHTML = form;
  localStorag();
});

function localStorag() {
  document.getElementById("name").addEventListener("input", (e) => {
    dataUser.name = e.target.value;
    window.localStorage.setItem("dataUser", JSON.stringify(dataUser));
  });
  document.getElementById("location").addEventListener("input", (e) => {
    dataUser.direction = e.target.value;
    window.localStorage.setItem("dataUser", JSON.stringify(dataUser));
  });
  document.getElementById("tlf").addEventListener("input", (e) => {
    dataUser.tlf = e.target.value;
    window.localStorage.setItem("dataUser", JSON.stringify(dataUser));
  });

  console.log(dataUser);
}
