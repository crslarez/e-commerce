import { getSearchProducts } from "../request.js";
import { createCards } from "../createCards.js";
const search = window.location.search;

getSearchProducts(search).then((data) => {
  const containerCards = document.querySelector("#container-card");
  data.forEach((e) => {
    containerCards.innerHTML += createCards(e);
  });
});
