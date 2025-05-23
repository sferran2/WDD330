import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ShoppingCart.mjs";


loadHeaderFooter();



const cartItems = getLocalStorage("so-cart");

const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", cartItems, element );
productList.init();
