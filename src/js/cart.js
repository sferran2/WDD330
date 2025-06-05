import { getLocalStorage, loadHeaderFooter } from "./utils.mjs";
import ProductList from "./ShoppingCart.mjs";

loadHeaderFooter();

function totalPriceSumDisplay(cartList, element) {
  
    const totalPrice = cartList.reduce((acc, curr) => acc += curr.FinalPrice * curr.quantity, 0);
    element.innerText = `$${totalPrice.toFixed(2)}`;

}




const cartItems = getLocalStorage("so-cart");

const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", cartItems, element);

const totalElement = document.querySelector(".summary p");
totalPriceSumDisplay(cartItems, totalElement);

productList.init();





















