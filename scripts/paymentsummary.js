import { cart } from './addTocart.js';
import { products, getProduct } from './product.js';
import { getDeliveryOption } from './deliveryOptions.js';

export function renderpaymentSummary() {
  let productPrice = 0;
  let shippingPrice = 0;

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
    const deliveryOption = getDeliveryOption(cartItem.deliveryOptionId);
    shippingPrice += deliveryOption.price;
  });

  console.log('Total Price:', productPrice);
  console.log('shipping price:', shippingPrice);

  const totalBeforeTax = productPrice + shippingPrice;
  const taxpartial = totalBeforeTax * 0.1;
  const tax = parseFloat( taxpartial.toFixed(1));
  const total = totalBeforeTax + tax;

  const paymentSummaryHTML = `<div class="payment-summary">
          <div class="payment-summary-title">Order Summary</div>

          <div class="payment-summary-row">
            <div>Items (3):</div>
            <div class="payment-summary-money">Rs ${productPrice}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">Rs ${shippingPrice}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">Rs ${totalBeforeTax}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">Rs ${tax}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">Rs ${total}</div>
          </div>

          <button class="place-order-button button-primary">
            Place your order
          </button>
        </div>`;
        document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}
