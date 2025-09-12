import ProductData from './ProductData.mjs';
import { updateCartBadge } from './product.js';

export const dataSource = new ProductData('tents');

document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
});
