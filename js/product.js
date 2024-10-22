import { params } from './variable.js';
import { drawProduct } from "./drawProduct.js";

drawProduct();

// Search product
const searchButton = document.querySelector("#search button");
const inputSearch = document.querySelector("#search input");

const handleSearch = () => {
    params.q = inputSearch.value.trim();
    params.currentPage = 1;
    drawProduct();
}

searchButton.addEventListener("click", handleSearch);
inputSearch.addEventListener("input", handleSearch);

// Filtering
const filter = document.getElementById("filter");

filter.addEventListener("change", (e) => {
    console.log(e.target.value);
    switch (e.target.value) {
        case "default":
            break;
        case "price-a-z": // Giá thấp đến cao
            params.sortField = "price";
            break;
        case "price-z-a": // Giá cao đến thấp
            params.sortField = "-price";
            break;
        case "big-discount":
            params.sortField = "discountPercentage";
            break;
        default:
            break;
    }
    params.currentPage = 1;
    drawProduct();
})
