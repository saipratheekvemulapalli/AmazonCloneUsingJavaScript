import { cart } from './addTocart.js';
import { products, getProduct } from './product.js';


export function renderpaymentSummary() {
    // console.log('Rendering payment summary');
    // console.log('Cart:', cart);
    // console.log('Products:', products);
  
    let productPrice = 0;
  
    cart.forEach((cartItem) => {
      const product = getProduct(cartItem.productId);
    //   console.log('Cart Item:', cartItem); 
    //   console.log('Product:', product); 
      if (product) {
        console.log('Price per product:', product.price);
        console.log('Quantity:', cartItem.quantity);
        productPrice += product.price * cartItem.quantity;
      } else {
        console.error('Product not found for ID:', cartItem.productId);
      }
    });
  
    console.log('Total Price:', productPrice);
    // console.log("Hello from method")
}
