import { params } from './variable.js';
import { drawProduct } from "./drawProduct.js";

drawProduct();

// Search product
const searchButton = document.querySelector("#search button");
const inputSearch = document.querySelector("#search input");

const handleSearch = () => {
    params.q = inputSearch.value.trim();
    drawProduct();
}

searchButton.addEventListener("click", handleSearch);
inputSearch.addEventListener("input", handleSearch);