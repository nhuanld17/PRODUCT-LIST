import { fetchAPI } from "./fetchAPI.js";   
import { API_CATEGORY } from "./constant.js";

const category = document.getElementById("category");

// Fetch danh mục từ API
fetchAPI(API_CATEGORY)
.then((data) => {
    console.log(data);
    let htmls = data.map((element) => {
        return `
            <button class="category__item">
                ${element.name}
            </button>
        `;
    });

    category.innerHTML = htmls.join("");
})
.catch((error) => {
    console.error("Error fetching category: ", error);
})