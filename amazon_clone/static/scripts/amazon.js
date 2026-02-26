import {addToCart, calculateCartQuantity } from "../data/cart.js";
import { formatCurrency } from "./utils/money.js";

const product = fetch("api/v1/products/").then((response) => {
  return response.json();
});

product.then((products) => {
  let productsHTML = "";
  products.forEach((product) => {
    productsHTML += `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="static/${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="/static/images/ratings/rating-${product.stars * 10}.png">
            <div class="product-rating-count link-primary">
              ${product.count}
            </div>
          </div>

          <div class="product-price">
            $${formatCurrency(product.priceCents)}
          </div>

          <div class="product-quantity-container">
            <select class = "js-product-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="static/images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id = "${product.id}">
            Add to Cart
          </button>
        </div>`;
  });

  document.querySelector(".js-products-grid").innerHTML = productsHTML;

  //multiple same buttons clicked differentiator
  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    button.addEventListener("click", async () => {

      const productId = button.dataset.productId;
      console.log(productId);

      const quantity = Number(
        document.querySelector(`.js-product-quantity-selector-${productId}`).value
      );

      await addToCart(productId, quantity, 1);

      const cartQuantity2 = calculateCartQuantity();
      document.querySelector(".js-cart-quantity").innerHTML = cartQuantity2;

      const messageElement = document.querySelector(
        `.js-added-to-cart-${productId}`,
      );
      messageElement.classList.add("added-to-cart-visible");

      setTimeout(() => {
        messageElement.classList.remove("added-to-cart-visible");
      }, 2000);
    });
  });
});
