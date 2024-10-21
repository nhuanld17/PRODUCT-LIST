import { params } from './variable.js';
import { drawProduct } from "./drawProduct.js";

drawProduct();

// Search product
const searchButton = document.querySelector("#search button");
const inputSearch = document.querySelector("#search input");

searchButton.addEventListener("click",() => {
    params.q = inputSearch.value;
    drawProduct();
})