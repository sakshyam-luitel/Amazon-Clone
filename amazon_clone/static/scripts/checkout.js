import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";


// fetch('/api/v1/cart').then((response) => {return response.json()}).then((cartData)=>{
//     const cart = cartData;
//     renderOrderSummary(cart);
//     renderPaymentSummary(cart);
// })

async function getCartData(){
    try{
    const response = await fetch('/api/v1/cart/')
    if(!response.ok){
        throw new Error('Failed to fetch the cart data')
    }
    const cartData = await response.json()
    renderOrderSummary(cartData)
    renderPaymentSummary(cartData)
    }
    catch(error){
        console.error('Error:', error)
    }
}

await getCartData()
