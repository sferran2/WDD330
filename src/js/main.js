import { loadHeaderFooter } from "./utils.mjs";


loadHeaderFooter()

document.querySelector(".newsletter button").addEventListener( "click", (e) => {
    e.preventDefault()

    const myForm = document.forms[0]

    const chk_status = myForm.checkValidity()
    myForm.reportValidity()

    

    if (chk_status) {
        window.location.assign("/newsletter/")
    } 

    
})