import { fetchAPI } from "./fetchAPI.js";
import { API_PRODUCTS } from "./constant.js";
import { params } from "./variable.js";

const product = document.getElementById("products");
let allProducts = []; // khai báo mảng để lưu trữ tất cả sản phẩm

// Fetch sản phẩm từ API
export const drawProduct = async () => {
    const data = await fetchAPI(API_PRODUCTS);

    // Nếu không có dữ liệu trả về
    if (!data) {
        product.innerHTML = `
            <p>Không thể tải sản phẩm. Vui lòng thử lại sau</p>
        `;

        return;
    }

    // Lưu tất cả sản phẩm vào mảng
    allProducts = data;

    let filteredProducts = allProducts.filter(product => {
            return product.title.toLowerCase().includes(params.q.toLowerCase())
        }
    );

    // Hiển thị sản phẩm
    let htmls = filteredProducts.map((product) => {
        return `
            <div class="product__item">
                <div class="product__image">
                    <img src="${product.thumbnail}" alt="">
                    <div class="product__discount">
                        ${product.discountPercentage}%
                    </div>
                </div>
                <div class="product__content">
                    <h3 class="product__title">${product.title}</h3>
                    <div class="product__meta">
                        <div class="product__price">${product.price}</div>
                        <div class="product__quantity">${product.stock}</div>
                    </div>
                </div>
            </div>
        `;
    });

    product.innerHTML = htmls.join("");
}

