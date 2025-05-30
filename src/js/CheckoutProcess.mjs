import { getLocalStorage } from "./utils.mjs";
export default class CheckoutProcess {
  constructor(key, outputSelector) {
    this.key = key;
    this.outputSelector = outputSelector;
    this.list = [];
    this.itemTotal = 0;
    this.shipping = 0;
    this.tax = 0;
    this.orderTotal = 0;
  }

  init() {
    this.list = getLocalStorage(this.key);
    this.calculateItemSummary();
  }

  calculateItemSubTotal() {
    // calculate and display the total dollar amount of the items in the cart, and the number of items.
    const itemSubtotalEl  = document.querySelector(`${this.outputSelector}`)

    const cartItems = getLocalStorage(this.key)

    const subTotal = cartItems.reduce((acc, curr) => acc += curr.FinalPrice * curr.quantity, 0)
    


    itemSubtotalEl.innerText = subTotal.toFixed(2)

    this.itemTotal = subTotal

    return subTotal


    
  }

  calculateOrderTotal() {
    // calculate the tax and shipping amounts. Add those to the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06)
    this.shipping = 10 + ((this.itemTotal - 1) * 2)
    this.orderTotal = this.shipping + this.tax 

    // display the totals.
    this.displayOrderTotals();
  }

  displayOrderTotals() {
    // once the totals are all calculated display them in the order summary page
    const tax = document.querySelector(`${this.outputSelector} #tax`);


    tax.innerText = `$${this.tax.toFixed(2)}`;
  }
}