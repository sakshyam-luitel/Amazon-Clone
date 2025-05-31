import {cart,removeFromCart, calculateCartQuantity,saveToStorage,updateDeliveryOption} from '../../data/cart.js'; //named exports
import {products,getProduct} from '../../data/products.js';
import { formatCurrency } from '../utils/money.js';
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
//default export
import {deliveryOptions,getDeliveryOption} from '../../data/deliveryOptions.js';
import { renderPaymentSummary } from './paymentSummary.js';


export function renderOrderSummary(){
  let cartSummaryHTML = '';
cart.forEach((cartItem)=>{
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);

    cartSummaryHTML +=
    `<div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
            <div class="delivery-date">
              Delivery date: ${getDateString(cartItem , deliveryOptions)}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingProduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                  ${matchingProduct.name}
                </div>
                <div class="product-price">
                  ${matchingProduct.getPrice()}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label js-quantity-label-${matchingProduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-quantity-link js-update-quantity-link-${matchingProduct.id}" data-product-id = "${matchingProduct.id}">
                    Update
                  </span>
                  <input class = "quantity-input js-quantity-input-${matchingProduct.id}">
                  <span class="save-quantity-link link-primary js-save-link"
              data-product-id="${matchingProduct.id}">
              Save
            </span>

                  <span class="delete-quantity-link link-primary js-delete-link" data-product-id = "${matchingProduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options">
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                
             ${deliveryOptionsHTML(matchingProduct , cartItem)}
              </div>
            </div>
          </div>`;
});

function getDateString(cartItem , deliveryOptions)
{

      const deliveryOptionId = cartItem.deliveryOptionsId;
      const option = getDeliveryOption(deliveryOptionId);

      const today = dayjs();
      const deliveryDate = today.add(option.deliveryDays,'days');
      const dateString = deliveryDate.format('dddd, MMMM D');

      return dateString;
}



function deliveryOptionsHTML(matchingProduct,cartItem)
{
  let html = '';
  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays,'days');
    const dateString = deliveryDate.format('dddd, MMMM D');

    //ternary operator
    const priceString = deliveryOption.priceCents === 0 ?'FREE Shipping' :`$${formatCurrency(deliveryOption.priceCents)} - Shipping`;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionsId;

    html+= `
    <div class="delivery-option js-delivery-option" data-product-id = "${matchingProduct.id}" data-delivery-option-id = "${deliveryOption.id}">
      <input type="radio" ${isChecked ? 'checked' : ''}
        class="delivery-option-input"
        name="delivery-option-${matchingProduct.id}">
      <div>
        <div class="delivery-option-date">
          ${dateString}
        </div>
        <div class="delivery-option-price">
          ${priceString}
        </div>
      </div>
    </div>`
  });
return html;
}

document.querySelector('.js-order-summary').innerHTML = cartSummaryHTML;



document.querySelectorAll('.js-delete-link').forEach((link)=>
  {
    link.addEventListener('click',() =>{
      const productId = link.dataset.productId;
      removeFromCart(productId);
      
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.remove();

      const cartQuantity1 = calculateCartQuantity();
      document.querySelector('.js-return-to-home').innerHTML = `${cartQuantity1} items`;

      renderPaymentSummary();
    });
  });


  document.querySelectorAll('.js-update-quantity-link').forEach((updateLink) => {
    updateLink.addEventListener('click' , () => {

      const productId = updateLink.dataset.productId; 

      const container  = document.querySelector( `.js-cart-item-container-${productId}`);
      container.classList.add('is-editing-input');
    
      // document.querySelector(`.js-update-quantity-link-${productId}`).innerHTML =
      // `Update ${textBoxHTML}`;

    });
 }); 

 document.querySelectorAll('.js-save-link')
  .forEach((saveLink) => {

    saveLink.addEventListener('click', () => {
      const productId = saveLink.dataset.productId;

      const container = document.querySelector(
        `.js-cart-item-container-${productId}`
      );
      container.classList.remove('is-editing-input');

      const quantityInput = document.querySelector(
        `.js-quantity-input-${productId}`
      );
      const newQuantity = Number(quantityInput.value);
      cart.forEach((cartItem)=>{
        if(cartItem.productId === productId)
        {
          cartItem.quantity = newQuantity;
          const cartItemQuantity = cartItem.quantity;
        saveToStorage();
        document.querySelector(`.js-quantity-label-${productId}`).innerHTML = cartItemQuantity; 
        }
        
      });
      renderPaymentSummary();
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element)=>{
    element.addEventListener('click', () => {

      const productId = element.dataset.productId;
      const deliveryOptionId = element.dataset.deliveryOptionId;
      console.log(productId);
      console.log(deliveryOptionId);

      updateDeliveryOption(productId , deliveryOptionId);
      renderOrderSummary();
      renderPaymentSummary();
    });
  });
}

renderOrderSummary();
  