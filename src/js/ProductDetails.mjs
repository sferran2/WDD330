import { setLocalStorage } from './utils.mjs';

export default class ProductDetails {
  constructor(productId, dataSource) {
    this.productId = productId;
    this.product = {};
    this.dataSource = dataSource;
  }

  async init() {
    this.product = await this.dataSource.findProductById(this.productId);
    this.renderProductDetails();
    document
      .getElementById("addToCart")
      .addEventListener("click", this.addProductToCart.bind(this));
  }

  addProductToCart() {
    setLocalStorage("so-cart", this.product);
  }

  renderProductDetails() {
    const brand = this.product.Brand?.Name ?? '';
    const name = this.product.NameWithoutBrand ?? '';
    const image = this.product.Image;
    const price = `$${this.product.FinalPrice}`;
    const color = this.product.Colors?.[0]?.ColorName ?? '';
    const description = this.product.DescriptionHtmlSimple;

    document.querySelector('.product-detail__brand').textContent = brand;
    document.querySelector('.product-detail__name').textContent = name;
    document.querySelector('.product-detail__image img').src = image;
    document.querySelector('.product-detail__image img').alt = `${brand} ${name}`;
    document.querySelector('.product-detail__price').textContent = price;
    document.querySelector('.product-detail__color').textContent = color;
    document.querySelector('.product-detail__description').innerHTML = description;

    // Make sure the button has the correct product ID
    document.getElementById("addToCart").dataset.id = this.product.Id;
  }
}