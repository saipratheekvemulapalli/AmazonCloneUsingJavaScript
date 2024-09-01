import { cart, removefromcart } from './addTocart.js';
import { products } from './product.js';
import { deliveryOptions } from './deliveryOptions.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js'; // Correct ES module import

function renderCartSummary() {
  const today = dayjs(); // Now you can use dayjs directly
  const deliverydate = today.add(7, 'days');
  console.log(deliverydate.format('dddd, MMMM D'));

  let cartsummaryHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const matchingProduct = products.find(product => product.id === productId);

    if (matchingProduct) {
      cartsummaryHTML += `
        <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
          <div class="delivery-date">
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
              ${deliveryOptionsHTML(productId,cartItem)}
            </div>

          </div>
        </div>`;
    }
  });

  function deliveryOptionsHTML(productId,cartItem) {
    let html = '';
    deliveryOptions.forEach((deliveryOption) => {
      const deliveryDate = dayjs().add(deliveryOption.deliveryDays, 'days'); // Use dayjs directly
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.price === 0 ? 'FREE' : `Rs ${deliveryOption.price}`;

      const ischecked =deliveryOption.id === cartItem.deliveryOptionId;

      html += `
        <div class="delivery-option">
          <input type="radio" ${ischecked?'checked':''} class="delivery-option-input" name="delivery-option-${productId}">
          <div>
            <div class="delivery-option-date">
              ${dateString} 
            </div>
            <div class="delivery-option-price">
              ${priceString}  - Shipping
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
      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      renderCartSummary();
      container.remove();
    });
  });
}

renderCartSummary();
