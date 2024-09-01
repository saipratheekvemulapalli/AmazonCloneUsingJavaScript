import { renderCartSummary } from './ordersummary.js';
import {renderpaymentSummary} from './paymentsummary.js'

document.addEventListener('DOMContentLoaded', () => {
  renderCartSummary();
  renderpaymentSummary();
  
});


export let cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
        quantity: 2,
        deliveryOptionId:'1'
    }, {
        productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
        quantity: 1,
        deliveryOptionId:'2'
        
    }];
}

export function savetostorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
}

export function addtocart(productid) {
    let matchingitem = cart.find(cartItem => cartItem.productId === productid);

    if (matchingitem) {
        matchingitem.quantity += 1;
    } else {
        cart.push({
            productId: productid,
            quantity: 1,
            deliveryOptionId:'1'
        });
    }
    savetostorage();
}

export function removefromcart(productId) {
    const newcart = cart.filter(cartItem => cartItem.productId !== productId);
    cart = newcart;
    savetostorage();
}


export function updateDeliveryOption(productId, deliveryOptionId) {
    const cartItem = cart.find(item => item.productId === productId);
    if (cartItem) {
      cartItem.deliveryOptionId = deliveryOptionId;
      savetostorage(); // Save to local storage
    } else {
      console.error(`No cart item found for product ID ${productId}`);
    }
  }
  