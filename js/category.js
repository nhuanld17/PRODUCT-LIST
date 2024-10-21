import { fetchAPI } from "./fetchAPI.js";   
import { API_CATEGORY } from "./constant.js";
import { drawProduct } from "./drawProduct.js";
import { params } from "./variable.js";

const category = document.getElementById("category");

// Fetch danh mục từ API
fetchAPI(API_CATEGORY)
.then((data) => {

    // Xử lí dữ liệu trả về
    let htmls = data.map((element) => {
        return `
            <button class="category__item">
                ${element.name}
            </button>
        `;
    });

    // hiển thị danh sách danh mục ở giao diện
    category.innerHTML = `
        <button class="category__item">
            ALL
        </button>
        ${htmls.join("")}
    `;

    // Thêm sự kiện cho các nút để lọc sản phẩm theo danh mục
    const categoryButtons = document.querySelectorAll("#category .category__item");
    console.log(categoryButtons);
    categoryButtons.forEach(categoryButton => {
        categoryButton.addEventListener("click", () => {
            params.category = categoryButton.textContent.trim();
            console.log(params.category);
            drawProduct();
        })
    });
})
.catch((error) => {
    console.error("Error fetching category: ", error);
})