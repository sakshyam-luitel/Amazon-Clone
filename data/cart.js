export let cart = JSON.parse(localStorage.getItem('cart'))|| 
[
  {
    productId :'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
    quantity :2,
    deliveryOptionsId  : '1'
  },
  {
    productId : '15b6fc6f-327a-4ec4-896f-486349e85a3d',
    quantity : 1,
    deliveryOptionsId : '2'
  }
];

export function saveToStorage()
{
  localStorage.setItem('cart',JSON.stringify(cart));
}
export function addToCart(productId)
    {
      let matchingItem;
          cart.forEach((cartItem)=>{
            if(productId === cartItem.productId)
            {
              matchingItem = cartItem;
            }
          });
          if(matchingItem)
          {
            matchingItem.quantity += Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value);
          }
          else
          {
            cart.push({
              productId :productId,
              quantity : Number(document.querySelector(`.js-product-quantity-selector-${productId}`).value) ,
              deliveryOptionsId : '1'
            })
          }
          console.log(cart);
          saveToStorage();

    }

  export function removeFromCart(productId)
    {
      const newCart = [];
      cart.forEach((cartItem)=>{
        if(cartItem.productId !== productId)
        {
          newCart.push(cartItem);
        }

      });

      cart = newCart;

      saveToStorage();
    }

    export function calculateCartQuantity()
      {
        let cartQuantity = 0;
        cart.forEach((cartItem) => {
          cartQuantity += cartItem.quantity;
         });
         return cartQuantity;
      }


    export function updateDeliveryOption(productId , deliveryOptionId){
      
      let matchingItem;
          cart.forEach((cartItem)=>{
            if(productId === cartItem.productId)
            {
              matchingItem = cartItem;
            }
          });

      matchingItem.deliveryOptionsId = deliveryOptionId;
      saveToStorage();
    }


