import { getLocalStorage, setLocalStorage } from "./utils.mjs";

const cartItems = getLocalStorage("so-cart")
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

        
        if (cartItems.some( item => item.Id === this.productId)) {
            cartItems.forEach( i => {
                if (i.Id === this.productId) {
                    i.quantity++
                }
            })

        } else {
            cartItems.push({...this.product, quantity: 1 })
        }

        
        
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

    
    
    document.querySelector('.discount').textContent = `-${computeDiscount(product.SuggestedRetailPrice, product.FinalPrice)}% off`;

    document.querySelector('.product-card__srp_price').textContent = `SRP: $${product.SuggestedRetailPrice}`;
    document.querySelector('.product-card__price').textContent = `$${product.FinalPrice}`;
    document.querySelector('.product__color').textContent = `Color: ${product.Colors[0].ColorName}`;
    document.querySelector('.product__description').innerHTML = `Description: ${product.DescriptionHtmlSimple}`;

    document.getElementById('addToCart').dataset.id = product.Id;

}

function computeDiscount(srp, finalPrice) {
    const discount = ((srp - finalPrice) / srp ) * 100
    console.log(finalPrice)
    return discount.toFixed(2)
}


