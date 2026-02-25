export let cart = [];

export async function getCart(){
  try{
    const response = await fetch('/api/v1/cart')
    if(!response.ok){
      console.log('Failed to fetch cart data')
    }
    const cartData = await response.json();
    return cartData;
  }catch(error){
    console.error('Error:', error)
  }
}
 
// async function cartPromiseFunction(){
//   fetch('/api/v1/cart/').then((response) =>{return response.json()}).then((cartData)=>{
//     cart = cartData;
//     console.log(cart);
//   });
// };
  
// export let cart = JSON.parse(localStorage.getItem('cart')) || [
//   {
//     productId :'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
//     quantity :2,
//     deliveryOptionsId  : '1'
//   },
//   {
//     productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
//     quantity : 1,
//     deliveryOptionsId : '2'
//   }
// ];

export function saveToStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
// export function addToCart(productId , cart)
//     {
//       let matchingItem;
//           cart.forEach((cartItem)=>{
//             if(productId === cartItem.productId)
//             {
//               matchingItem = cartItem;
//             }
//           });
//           if(matchingItem)
//           {
//             matchingItem.quantity += Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value);
//           }
//           else
//           {
//             cart.push({
//               productId :productId,
//               quantity : Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value) ,
//               deliveryOptionsId : '1'
//             })
//           }

//           // const cartItem = {
//           //     productId :productId,
//           //     quantity : Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value) ,
//           //     deliveryOptionsId : '1'
//           //   };
            
//           const promise = fetch('/api/v1/cart/' , {
//             method :"POST",
//             headers :{
//               'Content-Type' :'application/json',
//               "X-CSRFToken": getCookie("csrftoken"),
//             },
//             body : JSON.stringify(cart)
//           }).then((response) =>{return response.json()});

//           promise.then((data)=>{
//             console.log(JSON.stringify(cart));
//           })

//     }

export async function addToCart(productId, quantity, deliveryOptionId){
 try{
  const response = await fetch('/api/v1/cart/',{
    method :'POST',
    headers :{
      "Content-Type":'application/json'
    },
    body : JSON.stringify({
      productId : productId ,
      quantity:quantity,
      deliveryOptionId : deliveryOptionId
    }),
    
 })
 console.log(response)
 if(!response.ok){
  throw new Error('Failed to create new cart Item')
 }

 const data = await response.json()
 console.log('Server response:' , data)
 return data
 }
 catch(error){
  console.error('Error:',error)
 }
}

  // export function removeFromCart(productId)
  //   { 
  //     const newCart = [];
  //     cart.forEach((cartItem)=>{
  //       if(cartItem.productId !== productId)
  //       {
  //         newCart.push(cartItem);
  //       }

  //     });

  //     cart = newCart;

  //     //saveToStorage();
  //   }

  export async function removeFromCart(productId){
    try{
      const response = await fetch(`/api/v1/cart/${productId}/`,{
        method:'delete',
        "Content-Type":'application/json'
      })
      if(!response.ok){
        throw new Error('Failed to delete item from cart')
      }
      const data = await response.json()
      console.log("Server Response:", data)
      return data;
    }catch(error){
      console.log('Error:', error)
    }
  }

  export async function updateCart(){
    try{
    }catch(error){

    }
  }

    export function calculateCartQuantity()
      { 
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
         });
         return cartQuantity;
      }


    export function updateDeliveryOption(productId , deliveryOptionId,cart){
      let matchingItem;
          cart.forEach((cartItem)=>{
            if(productId === cartItem.productId)
            {
              matchingItem = cartItem;
            }
          });

      matchingItem.deliveryOptionsId = deliveryOptionId;
      //saveToStorage();
    }

    function getCookie(name) {
    let cookieValue = null;
    if (document.cookie && document.cookie !== "") {
        const cookies = document.cookie.split(";");
        for (let i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            // Cookie name starts with name=
            if (cookie.substring(0, name.length + 1) === name + "=") {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}


