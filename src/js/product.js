<<<<<<< HEAD
import { getParam} from "./utils.mjs";
=======
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
>>>>>>> 6e18b97e3c1085158c780b3f185a9a52ca810b77
import ProductData from "./ProductData.mjs";
import ProductDetails from "./productDetails.mjs";

const dataSource = new ProductData("tents");
const productId = getParam("product");

<<<<<<< HEAD
=======
function addProductToCart(product) {
  const cartItems = getLocalStorage("so-cart") || [];
  cartItems.push(product);
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}
>>>>>>> 6e18b97e3c1085158c780b3f185a9a52ca810b77

const product = new ProductDetails(productId, dataSource);
product.init();

