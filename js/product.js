import { API_PRODUCTS } from "./constant.js";
import { fetchAPI } from "./fetchAPI.js";

const product = document.getElementById("products");

// Fetch sản phẩm từ API
fetchAPI(API_PRODUCTS)
.then((data) => {
    console.log(data);   
    let htmls = data.map((element) => {
        return `
            <div class="product__item">
                <div class="product__image">
                    <img src="${element.thumbnail}" alt="">
                    <div class="product__discount">
                        ${element.discountPercentage}%
                    </div>
                </div>
                <div class="product__content">
                    <h3 class="product__title">${element.title}</h3>
                    <div class="product__meta">
                        <div class="product__price">${element.price}$</div>
                        <div class="product__quantity">${element.stock}</div>
                    </div>
                </div>
            </div>           
        `;
    })

    console.log(htmls.join(""));
    product.innerHTML = htmls.join("");
}).catch((err) => {
    console.log("Error", err);
});