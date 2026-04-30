import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";
import { getCookie } from "../../data/cart.js";
import dayjs from "https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js";

function getDateString(){
    const today = dayjs();
    const dateString = today.format("dddd, MMMM D");
    console.log(dateString)
    return dateString;
}

export async function renderPaymentSummary(cartData) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  for (const cartItem of cartData) {
    const product = await getProduct(cartItem.productId || cartItem.product_id);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(
      cartItem.deliveryOptionId || cartItem.delivery_option_id,
    );
    shippingPriceCents += deliveryOption.priceCents;
  }

  const totalBeforeTax = productPriceCents + shippingPriceCents;
  const taxCents = 0.1 * totalBeforeTax;

  const totalCents = totalBeforeTax + taxCents;

  const paymentSummaryHTML = `
        <div class="payment-summary-title">
            Order Summary
        </div>

        <div class="payment-summary-row">
            <div>Items (${cartData.length}):</div>
            <div class="payment-summary-money">$${formatCurrency(productPriceCents)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatCurrency(shippingPriceCents)}</div>
        </div>

        <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatCurrency(totalBeforeTax)}</div>
        </div>

        <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatCurrency(taxCents)}</div>
        </div>

        <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
        </div>

        <button class="place-order-button button-primary js-place-order-button">
            Place your order
        </button>`;

  document.querySelector(".js-payment-summary").innerHTML = paymentSummaryHTML;
  document
    .querySelector(".js-place-order-button")
    .addEventListener("click", async () => {
      try {
        const dateString = getDateString();
        const totalPrice = formatCurrency(totalCents);
        const csrftoken = getCookie("csrftoken");
        const response = await fetch("/api/v1/order/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRFToken": csrftoken,
          },
          body: JSON.stringify({
            order_placed_date: dateString,
            total_price: totalPrice,
          }),
        });

        
        const data = response.json();

        if (!response.ok) {
          alert("Failed to place order " + JSON.stringify(data));
        }
        //window.location.href = "/orders/";
      } catch (error) {
        console.log("Error:", error);
      }
    });
}
