import ProductData from './ProductData.mjs';
import { updateCartBadge } from './product.js';;


const dataSource = new ProductData('tents');

// (optional test)
dataSource.getData().then(data => console.log('tents:', data));

document.addEventListener('DOMContentLoaded', () => {
    updateCartBadge();
});
