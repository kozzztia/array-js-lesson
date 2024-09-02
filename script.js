console.log('go');

// 1 Мінімум

// Створи масив «Список покупок». Кожен елемент масиву є об'єктом, який містить назву продукту, кількість і куплений він чи ні, ціну за одиницю товару, сума. Написати кілька функцій для роботи з таким масивом:
// Виводити весь список на екран таким чином, щоб спочатку йшли продукти, що ще не придбані, а потім - ті, що вже придбали.
// Покупка продукту. Функція приймає назву продукту і відзначає його як придбаний.



// 2 Норма

// Видалення продукту зі списку (видалення повинно проводитися шляхом створення нового масиву, в якому продукт, що ми шукаємо, буде відсутнім)
// Додавання покупки в список. Враховуй, що при додаванні покупки з уже існуючим в списку продуктом, необхідно збільшувати кількість в існуючій покупці, а не додавати нову. При цьому також повинна змінитися сума, наприклад, якщо ціна за одиницю 12, а кількості товарів стало 2, то сума буде 24.

const shoppingList = [
    {
        name: "Milk",       // Назва продукту
        quantity: 2,        // Кількість
        isBought: false,    // Куплений чи ні
        pricePerUnit: 20,   // Ціна за одиницю товару
        totalPrice: 2 * 20  // Сума (кількість * ціна за одиницю)
    },
    {
        name: "Bread",
        quantity: 1,
        isBought: true,
        pricePerUnit: 15,
        totalPrice: 1 * 15
    },
    {
        name: "Eggs",
        quantity: 12,
        isBought: false,
        pricePerUnit: 3,
        totalPrice: 12 * 3
    },
    {
        name: "Butter",
        quantity: 1,
        isBought: true,
        pricePerUnit: 30,
        totalPrice: 1 * 30
    }
];


const form = document.querySelector('form');
const list = document.querySelector('ul');

form.addEventListener('submit', (e)=>formHandler(e))

function formHandler(e){
    e.preventDefault()
    const name = document.querySelector('input').value;
    console.log(name)
}