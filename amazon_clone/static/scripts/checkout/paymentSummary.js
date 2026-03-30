import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOptions.js";
import { formatCurrency } from "../utils/money.js";

export async function renderPaymentSummary(cartData) {
  let productPriceCents = 0;
  let shippingPriceCents = 0;

  for (const cartItem of cartData) {
    const product = await getProduct(cartItem.productId);
    console.log(product);

    productPriceCents += product.priceCents * cartItem.quantity;

    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
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
  document.querySelector('.js-place-order-button').addEventListener('click',()=>{
    

    window.location.href = "/orders/"
  })
}
