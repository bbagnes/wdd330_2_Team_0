import ProductData from './ProductData.mjs';
import { updateCartBadge } from './product.js';

const dataSource = new ProductData('tents');

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
