import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from './ProductDetails.mjs';

const dataSource = new ProductData("tents");
const productId = getParam('product');

console.log(dataSource.findProductById(productId));

function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || []; 
  setLocalStorage("so-cart", cartItems);
}

async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}


document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
