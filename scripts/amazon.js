import {cart,addtocart} from './addTocart.js';
import {products} from './product.js';

document.addEventListener('DOMContentLoaded', () => {
 

  let productshtml = '';
  products.forEach((product) => {
    productshtml =
      productshtml +
      `
                <div class="container">
                <div class="image-container">
                    <img class="product-image" src="${
                      product.image
                    }" alt="product image">
                </div>
                <div class="productname-container">
                    ${product.name}
                </div>
                <div class="rating-container">
                    <img class="rating-image" src="images/ratings/rating-${
                      product.rating.stars * 10
                    }.png"> 
                
                <span class="members-rated">${product.rating.count}</span>
            </div>
                <div class="price-container">Rs ${product.price}</div>
                <div class="product-quantity">
                    <select>

                
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </div>
                <div class="space-container"></div>
                <div class="added-to-cart js-added-to-cart">
                    <img src="images/icons/checkmark.png">
                    Added
                  </div>
                  <div class="addbtn">

                 
                <button class="addtocart button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
            </div>
            </div>`;
  });

  document.querySelector('.js-grid-container').innerHTML = productshtml;
  
 

  function updatecart(){
    let cartquantity=0;
                cart.forEach((cartItem)=>{
                  cartquantity = cartquantity+cartItem.quantity;
                })

                document.querySelector('.js-cart-quantity').innerHTML = cartquantity;
                console.log(cartquantity)
             console.log(cart)
  }
  document.querySelectorAll('.js-add-to-cart').forEach((itemq)=>{
    itemq.addEventListener('click', ()=>{
             const productid = itemq.dataset.productId;
              addtocart(productid)
              updatecart()
                 
    });
  })


});