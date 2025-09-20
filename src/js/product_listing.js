import ProductData from './ProductData.mjs';
import ProductList from './ProductList.mjs';
import { updateCartBadge } from './product.js';
import { loadHeaderFooter } from './utils.mjs';

document.addEventListener('DOMContentLoaded', async () => {
  updateCartBadge();

  const dataSource = new ProductData('tents');
  const list = new ProductList('tents', dataSource, '.product-list');
  await list.init();
});

loadHeaderFooter();