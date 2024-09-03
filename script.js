
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
    };

    addQuantity() {
        this.quantity++;
    };
    markAsDone() {
        this.isBought = !this.isBought;
    };
    markAsEdit() {
        this.isEdit = !this.isEdit;
    };
    returnHtml() {
        return !this.isEdit?
        `
        <li id="product-${this.id}">
            <p>${this.product}</p>
            <button onclick="editProduct(${this.id})">edit</button>
            <button onclick="deleteProduct(${this.id})">del</button>
            <button onclick="toggleDone(${this.id})">${this.isBought ? "Bought" : "Not Bought"}</button>
        </li>
        `:
        `
        <li id="product-${this.id}">
            <input type="text" name="edit"/>
            <button onclick="editProduct(${this.id})">ok</button>
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

function editProduct(id){
    const product = productList.find(item => item.id === id);
    product.markAsEdit();
    renderList();

    const editValue  = document.querySelector(`#product-${id}`);
    console.log(editValue)

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