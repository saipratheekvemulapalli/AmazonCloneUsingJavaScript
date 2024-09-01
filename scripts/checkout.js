import { cart, removefromcart } from './addTocart.js';
import { products } from './product.js';
import { deliveryOptions } from './deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';

document.addEventListener('DOMContentLoaded', () => {





function renderCartSummary() {
  let cartsummaryHTML = '';
  
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find(product => product.id === productId);

    if (matchingProduct) {
      const deliveryOptionId = cartItem.deliveryOptionId;
      const deliveryOption = deliveryOptions.find(option => option.id === deliveryOptionId);
      const deliverydate = dayjs().add(deliveryOption.deliveryDays, 'days');

      cartsummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date js-delivery-date-${matchingProduct.id}">
            Delivery date: ${deliverydate.format('dddd, MMMM D')}
          </div>

          <div class="cart-item-details-grid">
            <img class="product-image" src="${matchingProduct.image}">

            <div class="cart-item-details">
              <div class="product-name">
                ${matchingProduct.name}
              </div>
              <div class="product-price">
                Rs ${matchingProduct.price}
              </div>
              <div class="product-quantity">
                <span>
                  Quantity: <span class="quantity-label">${cartItem.quantity}</span>
                </span>
                <span class="update-quantity-link link-primary">
                  Update
                </span>
                <span class="delete-quantity-link link-primary js-delete-link" data-product-id="${matchingProduct.id}">
                  Delete
                </span>
              </div>
            </div>

            <div class="delivery-options">
              <div class="delivery-options-title">
                Choose a delivery option:
              </div>
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
        <div class="delivery-option">
          <input type="radio" ${isChecked ? 'checked' : ''} class="delivery-option-input" name="delivery-option-${productId}" value="${deliveryOption.id}">
          <div>
            <div class="delivery-option-date">
              ${dateString}
            </div>
            <div class="delivery-option-price">
              ${priceString} - Shipping
            </div>
          </div>
        </div>`;
    });
    return html;
  }

  document.querySelector('.js-order-summary').innerHTML = cartsummaryHTML;

  document.querySelectorAll('.js-delete-link').forEach((link) => {
    link.addEventListener('click', () => {
      const productId = link.dataset.productId;
      removefromcart(productId);
      renderCartSummary(); // Re-render cart summary to reflect changes
    });
  });

  // Handle delivery option changes
  document.querySelectorAll('.delivery-option-input').forEach((radio) => {
    radio.addEventListener('change', (event) => {
      console.log('Delivery option changed');
      const selectedOptionId = event.target.value;
      const productId = event.target.name.split('-').pop();
      const cartItem = cart.find(item => item.productId === productId);
  
      if (cartItem) {
        cartItem.deliveryOptionId = selectedOptionId;
        
        // Update the delivery date display
        const selectedOption = deliveryOptions.find(option => option.id === selectedOptionId);
        if (selectedOption) {
          const newDeliveryDate = dayjs().add(selectedOption.deliveryDays, 'days');
          const deliveryDateElement = document.querySelector(`.js-delivery-date-${productId}`);
  
          console.log(`Product ID: ${productId}`);
          console.log(`Selected Option ID: ${selectedOptionId}`);
          console.log(`New delivery date: ${newDeliveryDate.format('dddd, MMMM D')}`);
          console.log(`Delivery date element: ${deliveryDateElement}`);
  
          if (deliveryDateElement) {
            deliveryDateElement.innerHTML = `Delivery date: ${newDeliveryDate.format('dddd, MMMM D')}`;
          } else {
            console.error(`No delivery date element found for product ID ${productId}`);
          }
        } else {
          console.error(`No delivery option found with ID ${selectedOptionId}`);
        }
      }
    });
  });
  
}

renderCartSummary();

});