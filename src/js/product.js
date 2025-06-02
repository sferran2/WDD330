import { getParam, loadHeaderFooter} from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductDetails from "./productDetails.mjs";


loadHeaderFooter();
const dataSource = new ExternalServices();
const productId = getParam("product");


const product = new ProductDetails(productId, dataSource);
product.init();

const quantityEl = document.querySelector(".quantity")
const addToCart = document.querySelector("#addToCart")

let count = 0;

addToCart.addEventListener("click", () => {
    count++
    quantityEl.innerText = `+${count} ${ count > 1 ? "items" : "item"}`
})

