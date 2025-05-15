class ProductDetails {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.product = {};
        this.dataSource = dataSource;
    }
    init() {
        
    }
    addProductToCart(product) {
        setLocalStorage("so-cart", product);
    }
}