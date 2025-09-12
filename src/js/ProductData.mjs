function convertToJson(res) {
  if (res.ok) {
    return res.json();
  } else {
    throw new Error('Bad Response');
  }
}

export default class ProductData {
  constructor(category) {
    this.category = category;
    this.path = `/json/${this.category}.json`;
  }
  getData() {
    return fetch(this.path)
      .then(convertToJson);
  }
  async findProductById(id) {
    const products = await this.getData();
    const target = String(id ?? '').trim().toUpperCase();
    return products.find((item) => string(item.Id).trim().toUpperCase === target);
  }
}
