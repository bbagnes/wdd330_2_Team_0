import { getParam } from './utils.mjs';
import ProductData from './ProductData.mjs';
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData('tents');

const productId = getParam('product');
const dataDetails = new ProductDetails(productId, dataSource);

console.log(dataSource);
const product = new ProductDetails(productId, dataSource);
product.init();

console.log(dataSource.findProductById(productId));

// add to cart button event handler
async function addToCartHandler(e) {
  const id = e.target.dataset.id;
  if (!id) return; // defensive guard

  const product = await dataSource.findProductById(id);
  if (!product) return;

  product.addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);
