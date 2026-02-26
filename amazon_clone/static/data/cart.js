const csrftoken = getCookie("csrftoken")

export async function getCart() {
  try {
    const response = await fetch("/api/v1/cart");
    if (!response.ok) {
      console.log("Failed to fetch cart data");
    }
    const cartData = await response.json();
    return cartData;
  } catch (error) {
    console.error("Error:", error);
  }
}

export function saveToStorage() {
  localStorage.setItem("cart", JSON.stringify(cart));
}


export async function addToCart(productId, quantity, deliveryOptionId) {
  try {
    const response = await fetch("/api/v1/cart/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken": csrftoken,
      },
      body: JSON.stringify({
        productId: productId,
        quantity: quantity,
        deliveryOptionId: deliveryOptionId,
      }),
    });
    console.log(response);
    if (!response.ok) {
      throw new Error("Failed to create new cart Item");
    }

    const data = await response.json();
    console.log("Server response:", data);
    return data;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function removeFromCart(productId) {
  try {
    const response = await fetch(`/api/v1/cart/${productId}/`, {
      method: "delete",
      "Content-Type": "application/json",
    });
    if (!response.ok) {
      throw new Error("Failed to delete item from cart");
    }
    const data = await response.json();
    console.log("Server Response:", data);
    return data;
  } catch (error) {
    console.log("Error:", error);
  }
}

export async function updateCart(productId, quantity) {
  try {
    const response = await fetch(`/api/v1/cart/${productId}/`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "X-CSRFToken":csrftoken,
      },
      body: JSON.stringify({
        quantity: quantity,
      }),
    });
    if (!response.ok) {
      console.log("Failed to Update the Cart quantity");
    }
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function calculateCartQuantity() {
  let cartQuantity = 0;
  try{
    const response = await fetch('/api/v1/cart/')
    if(!response.ok){
      console.log('Failed to get cart Data')
    }
    const cartData = await response.json()
    cartData.forEach((cartItem) => {
    cartQuantity += cartItem.quantity;
  });
  return cartQuantity;
  }catch(error){
    console.log("Error:", error)
  }
}

export function updateDeliveryOption(productId, deliveryOptionId, cart) {
  let matchingItem;
  cart.forEach((cartItem) => {
    if (productId === cartItem.productId) {
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
