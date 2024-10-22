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

    // Lọc theo từ khóa tìm kiếm
    let filteredProducts = allProducts.filter(product => {
            return product.title.toLowerCase().includes(params.q.toLowerCase())
        }
    );

    // Lọc theo danh mục
    if (params.category !== "ALL") {
        filteredProducts = filteredProducts.filter((product) => {
            return product.category === params.category;
        });
    }

    // Sắp xếp
    if (params.sortField !== "default") {
        filteredProducts.sort((a, b) => {
            if (params.sortField === "price") {
                return a.price - b.price;
            }

            if (params.sortField === "-price") {
                return b.price - a.price;
            }

            if (params.sortField === "discountPercentage") {
                return b.discountPercentage - a.discountPercentage;
            }
        });
    }

    // Phân trang nè
    const startIndex = (params.currentPage - 1) * params.itemsPerPage;
    const endIndex = startIndex + params.itemsPerPage;
    const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

    // Hiển thị sản phẩm
    let htmls = paginatedProducts.map((product) => {
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

    product.innerHTML = htmls.join("") || "<p>Không có sản phẩm nào</p>";

    // Hiển thị nút phân trang
    const totalPages = Math.ceil(filteredProducts.length / params.itemsPerPage);
    const paginations = document.getElementById("pagination");
    paginations.innerHTML = `
        <button ${params.currentPage === 1 ? "disabled" : ""} id = "prevPage">Previous</button>
        <span>Page ${params.currentPage} of ${totalPages}</span>
        <button ${params.currentPage === totalPages ? "disabled" : ""} id = "nextPage">Next</button>
    `;

    // Thêm sự kiện cho nút phân trang
    const prevPageButton = document.getElementById("nextPage");
    console.log(prevPageButton);
    prevPageButton.addEventListener("click", () => {
        if (params.currentPage < totalPages) {
            params.currentPage++;
            drawProduct();
        }
    })

    const nextPageButton = document.getElementById("prevPage");
    console.log(nextPageButton);
    nextPageButton.addEventListener("click", () => {
        if(params.currentPage > 1){
            params.currentPage--;
            drawProduct();
        }
    })
}

