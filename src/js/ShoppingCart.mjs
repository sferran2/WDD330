import {renderListWithTemplate, setLocalStorage} from "./utils.mjs"


function productCardTemplate(product) {
    
    return `
    <li  class="product-card">
        <div data-id="${product.Id}" class="dataId closeButton">X</div>
        <img
         src="${product.Images.PrimarySmall}"
         alt="${product.Name}"
        >
        <h2 class="card__brand">${product.Brand.Name}</h2>
        <h3 class="card__name">${product.Name}</h3>
        <p class="product-card__price">$${product.FinalPrice}</p>
        <p class="product-card__quantity">X <input type="number" class="qtyInp" value="${product.quantity}" disabled> = ${(product.FinalPrice * product.quantity).toFixed(2)}</p>
        <button class="qtyBtn" >Edit Qty</button>
    
    </li>
    `;
}
export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category,
        this.dataSource = dataSource,
        this.listElement = listElement
    }

    async init() {
        const list = await this.dataSource;
        this.renderList(list);
    }

    renderList(list) {


        renderListWithTemplate(productCardTemplate, this.listElement, list)
        closeButton(".closeButton", list)

        document.querySelectorAll('.qtyBtn').forEach(button => {
            button.addEventListener('click', function () {
                const parent = this.closest('.product-card'); 
                const input = parent.querySelector('.qtyInp');
                const itemId = parent.querySelector(".dataId").dataset.id

                
                
                
                if (input.disabled) {
                    input.disabled = false;
                    input.focus();
                    this.textContent = 'Save';
                    
                    
                    
                } else {
                    input.disabled = true;
                    this.textContent = 'Edit Qty';
                    setUpdateQuantity(itemId, input, list)
                    
                    window.location.reload()
                }
            });
         });

    }

}

function closeButton(elem, list) {
    const closeButton = document.querySelectorAll(elem)
    // const productCard = document.querySelectorAll(".product-card")
        
    closeButton.forEach( el => {
        el.addEventListener("click", e => {
            const id = e.target.dataset.id
            

            list.forEach(item => {
                if (item.Id === id) {
                    const updated = list.filter(i => i.Id !== id);
                    setLocalStorage("so-cart", updated)
                    window.location.reload()

                    
                    
                }
            })

            
        })
    })
}

function setUpdateQuantity(id, input, list) {

    list.forEach( item => {
        if (item.Id === id) {
            item.quantity = parseInt(input.value)
        }
    })
    
    setLocalStorage("so-cart", list)
    

    

}
