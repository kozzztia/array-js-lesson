const mokProducts = ["bred+20", "melon-100", "candy/30"]


// 1 Мінімум

// Створи масив «Список покупок». Кожен елемент масиву є об'єктом, який містить назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума. Написати кілька функцій для роботи з таким масивом:
// Виводити весь список на екран таким чином, щоб спочатку йшли продукти, що ще не придбані, а потім - ті, що вже придбали.
// Покупка продукту. Функція приймає назву продукту і відзначає його як придбаний.



// 2 Норма

// Видалення продукту зі списку (видалення повинно проводитися шляхом створення нового масиву, в якому продукт, що ми шукаємо, буде відсутнім)
// Додавання покупки в список. Враховуй, що при додаванні покупки з уже існуючим в списку продуктом, необхідно збільшувати кількість в існуючій покупці, а не додавати нову. При цьому також повинна змінитися сума, наприклад, якщо ціна за одиницю 12, а кількості товарів стало 2, то сума буде 24.

const form = document.querySelector('form');
const list = document.querySelector('ul');
const counter = document.querySelector('span');

let shoppingList = [];
let sum = 0;

form.onsubmit = (e) => formHandler(e);

class Product {
    constructor(product, price) {
        this.id = Date.now();
        this.product = product;
        this.quantity = 1;
        this.isBought = true;
        this.pricePerUnit = +price;
        this.totalPrice = this.quantity * this.pricePerUnit;
    }

    addQuantity() {
        this.quantity++;
        this.totalPrice = this.quantity * this.pricePerUnit;
    }
}

function createProduct(value) {
    let newProduct = '';
    let newPrice = 0;
    if (value.trim() !== "") {
        value.split(/[ ,+-/]/).forEach(item => !+item ? newProduct = item : newPrice = item);
    }
    return new Product(newProduct, newPrice)
}



// mokProducts.map(item => shoppingList.push(createProduct(item)));

function createProductList() {
    list.innerHTML = "";
    sum = 0;
    shoppingList.forEach(item => {
        sum += item.totalPrice;
        list.innerHTML += `
        <li>
            <p>${item.product}</p>
            <button attr="edit">edit</button>
            <button attr="del">del</button>
            <button attr="done" attr-id="${item.id}">done</button>
        </li>
        `;
    });
    counter.innerHTML = sum;
}

// createProductList()


function formHandler(e) {
    e.preventDefault()
    let value = document.querySelector('input').value;
    if (value.trim() !== "") {
        let product;
        let price;
        value.split(/[ ,+-/]/).filter(item => !+item ? product = item : price = item);
        shoppingList.push(new Product(product, price),
        )
    }
    console.log(shoppingList);
    form.querySelector('input').value = "";
    createProductList()
}

function checkDoneProduct(id) {
    shoppingList.map(item => item.id === +id ? item.isBought = !item.isBought: item);
    console.log(shoppingList)
    createProductList()
}