import { getLocalStorage, setLocalStorage } from "./utils.mjs";
const baseURL = import.meta.env.VITE_SERVER_URL;
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
        const cartItems = getLocalStorage("so-cart") || [];
        cartItems.push(this.product);
        setLocalStorage("so-cart", cartItems);
    }

    renderProductDetails() {
        productDetailsTemplate(this.product);
        

    }
}

function productDetailsTemplate(product) {
    
    document.querySelector('h3').textContent = product.Brand.Name;
    document.querySelector('h2').textContent = product.NameWithoutBrand;

    const productImage = document.querySelector('#product-img');
    productImage.src = product.Images.PrimaryLarge;
    productImage.alt = product.NameWithoutBrand;

    document.querySelector('.product-card__price').textContent = product.FinalPrice;
    document.querySelector('.product__color').textContent = product.Colors[0].ColorName;
    document.querySelector('.product__description').innerHTML = product.DescriptionHtmlSimple;

    document.getElementById('addToCart').dataset.id = product.Id;

}