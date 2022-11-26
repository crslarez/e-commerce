import { getSearchProducts } from "../request.js";
import { createCards } from "../createCards.js";

let search = "?isToBuy=true";

getSearchProducts(search).then((data) => {
  const container = document.querySelector("#container-cards");
  data.forEach((e) => {
    const card = createCards(e, true);
    container.innerHTML += card;
  });
});
