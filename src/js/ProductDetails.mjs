import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import { updateCartBadge } from "./product.js";

export default class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = null;
        this.dataSource = dataSource;
    }
    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        if (!this.product) {
            const main = document.querySelector('main') || document.body;
            main.innerHTML = `
              <section class="products">
                <h2>Product not found</h2>
                <p>Please go back and choose a product.</p>
              </section>`;
        updateCartBadge();
        return;
    }
    // console.log(this.product);
    this.renderProductDetails();
    document
        .getElementById('addToCart')
        .addEventListener('click', this.addProductToCart.bind(this));
    //ensure badge correct on load
    updateCartBadge();
    }
    addProductToCart() {
        const cart = getLocalStorage('so-cart'); // always an array per your utils
        cart.push(this.product);
        setLocalStorage('so-cart', cart);
        // Update badge right after cart changes
        updateCartBadge();
    }
    renderProductDetails() {
        productDetailsTemplate(this.product);
    }
}

function productDetailsTemplate(product) {
    const brandName   = product?.Brand?.Name ?? '';
    const nameNoBrand = product?.NameWithoutBrand ?? product?.Name ?? '';
    const img         = product?.Image ?? '';
    const color       = product?.Colors?.[0]?.ColorName ?? '';
    const price       = product?.FinalPrice;
    const priceText   = typeof price === 'number' 
        ? `$${price.toFixed(2)}`
        : `$${String(price ?? '')}`;
    
    const h2 = document.querySelector('h2');
    if (h2) h2.textContent = brandName;
  
    const h3 = document.querySelector('h3');
    if (h3) h3.textContent = nameNoBrand;
  
    const productImage = document.getElementById('productImage');
    if (productImage) { productImage.src = img; productImage.alt = nameNoBrand; }
  
    const priceEl = document.getElementById('productPrice');
    if (priceEl) priceEl.textContent = priceText;
  
    const colorEl = document.getElementById('productColor');
    if (colorEl) colorEl.textContent = color;
  
    const descEl = document.getElementById('productDesc');
    if (descEl) descEl.innerHTML = product?.DescriptionHtmlSimple ?? '';
  
    const btn = document.getElementById('addToCart');
    if (btn) btn.dataset.id = product?.Id ?? '';
}
  
