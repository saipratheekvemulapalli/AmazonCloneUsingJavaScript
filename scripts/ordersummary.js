import { cart, removefromcart, updateDeliveryOption } from './addTocart.js';
import { products, getProduct } from './product.js';
import { deliveryOptions, getDeliveryOption} from './deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import {renderpaymentSummary} from './paymentsummary.js'

export function renderCartSummary() {
  
  let cartsummaryHTML = '';
  
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = getProduct(productId);
    // products.find(product => product.id === productId);

    if (matchingProduct) {
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = getDeliveryOption(deliveryOptionId);
      const deliverydate = dayjs().add(deliveryOption.deliveryDays, 'days');

      cartsummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date js-delivery-date-${matchingProduct.id}">
            Delivery Date: ${deliverydate.format('dddd, MMMM D')}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">${matchingProduct.name}</div>
              <div class="product-price">Rs ${matchingProduct.price}</div>
              <div class="product-quantity">
                <span>Quantity: <span class="quantity-label">${cartItem.quantity}</span></span>
                <span class="update-quantity-link link-primary">Update</span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">Delete</span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">Choose a delivery option:</div>
              ${deliveryOptionsHTML(productId, cartItem)}
            </div>
          </div>
        </div>`;
    }
  });

  function deliveryOptionsHTML(productId, cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days');
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.price === 0 ? 'FREE' : `Rs ${deliveryOption.price}`;

      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option js-delivery-option" data-product-id="${productId}" data-delivery-option-id="${deliveryOption.id}">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${productId}" value="${deliveryOption.id}">
          <div>
            <div class="delivery-option-date">${dateString}</div>
            <div class="delivery-option-price">${priceString} - Shipping</div>
          </div>
        </div>`;
    });
    renderpaymentSummary();
    return html;
  }

  const orderSummaryElement = document.querySelector('.js-order-summary');
  if (orderSummaryElement) {
    orderSummaryElement.innerHTML = cartsummaryHTML;
  } else {
    console.error('Order summary element not found');
  }


  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      console.log('Delete link clicked');
      const productId = link.dataset.productId;
      removefromcart(productId);
      renderpaymentSummary();
      renderCartSummary(); 
    });
  });

  document.querySelectorAll('.delivery-option-input').forEach((radio) => {
    radio.addEventListener('change', (event) => {
      console.log('Delivery option changed');
      const selectedOptionId = event.target.value;
      const productId = event.target.name.split('-').pop();
      updateDeliveryOption(productId, selectedOptionId);
      renderCartSummary(); 
    });
  });

  document.querySelectorAll('.js-delivery-option').forEach((element) => {
    element.addEventListener('click', () => {
      const { productId, deliveryOptionId } = element.dataset;
      updateDeliveryOption(productId, deliveryOptionId);
      renderCartSummary();
    });
  });
}
