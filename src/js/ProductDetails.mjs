import { setLocalStorage } from "./utils.mjs";
export default class ProductDetails {

    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }

    async init() {
        this.product = await this.dataSource.findProductById(this.productId);
        this.renderProductDetails(this.product);
        document.querySelector('#addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }

    renderProductDetails(product) {
        const clone = document.querySelector('#product-cart').content.cloneNode(true);
        
        const h3 = clone.querySelector('h3');
        h3.textContent = product.Brand.Name;

        const h2 = clone.querySelector('h2');
        h2.textContent = product.NameWithoutBrand;

        const img = clone.querySelector('img');
        img.setAttribute('src', product.Image);
        img.setAttribute('alt', product.Name);

        const pList = clone.querySelectorAll('p');
        pList[0].textContent = `$${product.FinalPrice}`;
        pList[1].textContent = product.Colors[0].ColorName;
        pList[2].innerHTML = product.DescriptionHtmlSimple;
        
        document.querySelector('#main').appendChild(clone);
    }

    addProductToCart() {
        setLocalStorage("so-cart", this.product);
    }
}