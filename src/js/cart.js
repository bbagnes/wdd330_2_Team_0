import { getLocalStorage } from './utils.mjs';
import { updateCartBadge } from './product.js'

function renderCartContents() {
  const cartItems = getLocalStorage('so-cart');
  if (!Array.isArray(cartItems) || cartItems.length === 0) {
    document.querySelector('.product-list').innerHTML =
      '<p>Your cart is empty.</p>';
    updateCartBadge(); // keeps badge hidden/0 when empty
    return;
  }

  const htmlItems = cartItems.map((item) => cartItemTemplate(item));
  document.querySelector('.product-list').innerHTML = htmlItems.join('');
  updateCartBadge();
}

function cartItemTemplate(item) {
  const newItem = `<li class='cart-card divider'>
  <a href='#' class='cart-card__image'>
    <img
      src='${item.Image}'
      alt='${item.Name}'
    />
  </a>
  <a href='#'>
    <h2 class='card__name'>${item.Name}</h2>
  </a>
  <p class='cart-card__color'>${item.Colors?.[0]?.ColorName ?? ''}</p>
  <p class='cart-card__quantity'>qty: 1</p>
  <p class='cart-card__price'>$${Number(item.FinalPrice).toFixed(2)}</p>
</li>`;

return newItem;
}

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();   // ensure correct on initial load
  renderCartContents();
});
