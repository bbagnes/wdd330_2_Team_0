export default class ProductList {
    constructor(category, dataSource, listElement) {
      // You passed in this information to make the class as reusable as possible.
      // Being able to define these things when you use the class will make it very flexible
      this.category = category;
      this.dataSource = dataSource;
      this.listElement = typeof listElement === 'string'
      ? document.querySelector(listElement)
      : listElement;

    this.products = [];
    }
  
    async init() {
        this.products = await this.dataSource.getData();
        this.renderList(this.products);
      }
    
    renderList(products) {
    if (!this.listElement) return;

    if (!Array.isArray(products) || products.length === 0) {
        this.listElement.innerHTML = '<p>No products found.</p>';
        return;
    }
    this.listElement.innerHTML = products.map(p => this.productCardTemplate(p)).join('');
    }
    
    productCardTemplate(product) {
    const name = product?.NameWithoutBrand ?? product?.Name ?? 'Product';
    const brand = product?.Brand?.Name ?? '';
    const color = product?.Colors?.[0]?.ColorName ?? '';
    const price = typeof product?.FinalPrice === 'number'
        ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(product.FinalPrice)
        : `$${product?.FinalPrice ?? '0.00'}`;

    // Adjust link target to your product detail route
    const href = `/product_pages/index.html?product=${encodeURIComponent(product?.Id)}`;

    return `
<li class="product-card">
    <a class="product-card__link" href="${href}">
    <img class="product-card__image" src="${product?.Image}" alt="${this.escapeHtml(name)}" />
    <h3 class="product-card__name">${this.escapeHtml(name)}</h3>
    <p class="product-card__brand">${this.escapeHtml(brand)}</p>
    <p class="product-card__color">${this.escapeHtml(color)}</p>
    <p class="product-card__price">${price}</p>
    </a>
</li>`.trim();
    }

    escapeHtml(str) {
    return String(str ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }
}
