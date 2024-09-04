
// 1 Мінімум

// Створи масив «Список покупок». Кожен елемент масиву є об'єктом, який містить назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума. Написати кілька функцій для роботи з таким масивом:
// Виводити весь список на екран таким чином, щоб спочатку йшли продукти, що ще не придбані, а потім - ті, що вже придбали.
// Покупка продукту. Функція приймає назву продукту і відзначає його як придбаний.



// 2 Норма

// Видалення продукту зі списку (видалення повинно проводитися шляхом створення нового масиву, в якому продукт, що ми шукаємо, буде відсутнім)
// Додавання покупки в список. Враховуй, що при додаванні покупки з уже існуючим в списку продуктом, необхідно збільшувати кількість в існуючій покупці, а не додавати нову. При цьому також повинна змінитися сума, наприклад, якщо ціна за одиницю 12, а кількості товарів стало 2, то сума буде 24.

const form = document.querySelector('form');
let list = document.querySelector('ul');
const counter = document.querySelector('span');

form.onsubmit = (e) => formHandler(e);

class Product {

    constructor(product, price) {
        this.id = Date.now();
        this.product = product;
        this.quantity = 1;
        this.isBought = false;
        this.isEdit = false;
        this.pricePerUnit = +price;
        this.totalPrice = this.quantity * this.pricePerUnit;
        this.deletBtn = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24px" height="24px">
            <path id="XMLID_4_" style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" d="M21,4H3"/>
            <path style="fill:none;stroke:#000000;stroke-width:2;stroke-miterlimit:10;" 
                d="M5,4l1.884,16.132C6.95,20.629,7.374,21,7.875,21h8.249c0.501,0,0.925-0.371,0.991-0.868L19,4"/>
                s<polygon points="15,3 15,4 9,4 9,3 10,2 14,2 "/>
            </svg>
        `;
        this.editBtn = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24" width="24px" height="24px">
            <g>
                <g>
                    <polygon points="14.5,5.5 3,17 3,21 7,21 18.5,9.5 "/>
                    <path d="M21.707,4.879l-2.586-2.586c-0.391-0.391-1.024-0.391-1.414,0L16,4l4,4l1.707-1.707C22.098,5.902,22.098,5.269,21.707,4.879z"/>
                </g>
            </g>
            </svg>
        `;
        this.doneBtn = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="50px" height="50px">
                <polyline fill="none" stroke="#000000" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" points="8,29.312 21.921,41.348 42,10.652 "/>
            </svg>
        `;
        this.notDoneBtn = `
            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 50 50" width="50px" height="50px">
                <line fill="none" stroke="#000000" stroke-width="4" stroke-miterlimit="10" x1="7.741" y1="7.741" x2="42.359" y2="42.359"/>
                <line fill="none" stroke="#000000" stroke-width="4" stroke-miterlimit="10" x1="42.258" y1="7.742" x2="7.618" y2="42.382"/>
            </svg>
        `;
        this.incrementBtn =`
        <svg width="37px" height="37px" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
            <line x1="256" y1="112" x2="256" y2="400" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
            <line x1="400" y1="256" x2="112" y2="256" style="fill:none;stroke:#000000;stroke-linecap:round;stroke-linejoin:round;stroke-width:32px"/>
        </svg> `
    };


    addQuantity() {
        this.quantity++;
        this.totalPrice = this.quantity * this.pricePerUnit;
    };
    markAsDone() {
        this.isBought = !this.isBought;
    };
    markAsEdit() {
        this.isEdit = !this.isEdit;
    };
    editProduct(value) {
        this.product = value;
    };
    returnHtml() {
        return !this.isEdit ?
            `
        <li id="product-${this.id}">
            <p class = "${this.isBought ? 'done' : 'no'}">${this.product}: <span>${this.quantity} - ${this.pricePerUnit}</span></p>
            <button onclick="openEditProduct(${this.id})">${this.editBtn}</button>
            <button onclick="deleteProduct(${this.id})">${this.deletBtn}</button>
            <button onclick="toggleDone(${this.id})">${this.isBought ? `${this.notDoneBtn}` : `${this.doneBtn}`}</button>
        </li>
        `:
            `
        <li id="product-${this.id}">
            <input type="text" name="edit" value="${this.product}" />
            <button onclick="editProduct(${this.id})">${this.doneBtn}</button>
            <button onclick="addQuantity(${this.id})">${this.incrementBtn}</button>
            <button onclick="deleteProduct(${this.id})">${this.deletBtn}</button>
        </li>
        `

    };
}

function createProduct(value) {
    let newProduct;
    let newPrice = 0;
    if (value.trim() !== "") {
        value.split(/[ ,+-/]/).forEach(item => !+item ? newProduct = item : newPrice = item);
    }
    return new Product(newProduct, newPrice)
}

let productList = [];

function formHandler(e) {
    e.preventDefault();
    let value = document.querySelector('input[name = "product"]').value;
    if (value.trim() !== "") {
        productList.push(createProduct(value));
        renderList();
    }
    form.querySelector('input[name = "product"]').value = "";
}

function renderList() {
    list.innerHTML = "";
    counter.innerHTML = ""
    productList.forEach(item => {
        list.innerHTML += item.returnHtml();
        counter.innerHTML = +counter.innerHTML + +item.totalPrice;
    });
}
function openEditProduct(id) {
    productList.forEach(item => {
        if (item.id !== id) {
            item.isEdit = false;
        }
    });

    const product = productList.find(item => item.id === id);
    product.markAsEdit();
    renderList();

    const input = document.querySelector(`input[name="edit"]`);
    if (input) {
        input.focus();  // Focus на полі введення під час редагування
    }
}
function toggleDone(id) {
    const product = productList.find(item => item.id === id);
    product.markAsDone();
    renderList();
}
function deleteProduct(id) {
    productList = productList.filter(item => item.id !== id);
    renderList();
}
function addQuantity(id) {
    const product = productList.find(item => item.id === id);
    product.addQuantity();
    renderList();
}
function editProduct(id) {
    const product = productList.find(item => item.id === id);
    const input = document.querySelector(`input[name = "edit"]`);
    product.editProduct(input.value);
    input.value = "";
    // close
    openEditProduct(id);
    renderList();
}