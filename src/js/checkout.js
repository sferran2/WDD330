import { loadHeaderFooter, alertMessage, removeAllAlerts } from "./utils.mjs";
import CheckoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

const order = new CheckoutProcess("so-cart", ".summary-details");
order.init();

document
  .querySelector("#zip")
  .addEventListener("blur", order.calculateOrderTotal.bind(order));

const cardNum = document.querySelector("#cardNumber")
const code = document.querySelector("#code")

cardNum.addEventListener("blur", () => {
    if (cardNum.value !== "1234123412341234") {
      alertMessage("Pls valid card")
    } 

    
  })
  
code.addEventListener("blur", () => {

    if (code !== "123") {
      alertMessage("Pin is incorrect!")
    }

    
  })

document.querySelector("#checkoutSubmit").addEventListener("click", (e) => {
  e.preventDefault();

  const myForm = document.forms[0]

  const chk_status = myForm.checkValidity()
  myForm.reportValidity()

  

  if (chk_status) {
    order.checkout()
  } 

  
  
  
});

