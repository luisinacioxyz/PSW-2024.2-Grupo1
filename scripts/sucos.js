const drinks = [
    { id: 1, name: "Suco de Laranja", basePrice: 12, image: "../fotos/laranja.jpg", options: { "Muito Açúcar": 0, "Pouco Açúcar": 0, "Sem Açúcar": 0 }, sizes: ["500ml", "2l"] },
    { id: 2, name: "Limonada", basePrice: 12, image: "../fotos/limao.jpg", options: { "Muito Açúcar": 0, "Pouco Açúcar": 0, "Sem Açúcar": 0 }, sizes: ["500ml", "2l"] },
    { id: 3, name: "Suco de Maracujá", basePrice: 12, image: "../fotos/maracuja.jpg", options: { "Muito Açúcar": 0, "Pouco Açúcar": 0, "Sem Açúcar": 0 }, sizes: ["500ml", "2l"] },
    { id: 4, name: "Suco de Morango", basePrice: 12, image: "../fotos/morango.jpg", options: { "Muito Açúcar": 0, "Pouco Açúcar": 0, "Sem Açúcar": 0 }, sizes: ["500ml", "2l"] }
];

const sizeMultipliers = { "500ml": 1, "2l": 2 };

function createDrinkCard(drink) {
    const drinkCard = document.createElement("div");
    drinkCard.className = "drink-card col-md-4";

    const optionsHTML = Object.keys(drink.options).map(option => `<option value="${option}">${option}</option>`).join("");
    const sizesHTML = drink.sizes.map(size => `<option value="${size}">${size}</option>`).join("");

    drinkCard.innerHTML = `
        <img src="${drink.image}" alt="${drink.name}" class="img-fluid">
        <h2>${drink.name}</h2>
        <p>Preço Base: R$ <span class="drink-base-price">${drink.basePrice.toFixed(2)}</span></p>
        <p>Total: R$ <span class="drink-total">0.00</span></p>
        <select class="select-size form-select">${sizesHTML}</select>
        <select class="select-option form-select">${optionsHTML}</select>
    `;

    const controls = document.createElement("div");
    controls.className = "controls";

    const quantity = document.createElement("span");
    quantity.textContent = "0";

    const incrementButton = document.createElement("button");
    incrementButton.textContent = "+";
    incrementButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        quantity.textContent = currentQuantity + 1;
        updateTotal(drink, quantity, drinkCard);
    });

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            quantity.textContent = currentQuantity - 1;
            updateTotal(drink, quantity, drinkCard);
        }
    });

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn btn-primary";
    addToCartButton.textContent = "Adicionar a conta";
    addToCartButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            cartCount += currentQuantity;
            updateCartCounter();
        } else {
            alert("Por favor, selecione a quantidade!");
        }
    });

    controls.appendChild(decrementButton);
    controls.appendChild(quantity);
    controls.appendChild(incrementButton);
    drinkCard.appendChild(controls);
    drinkCard.appendChild(addToCartButton);

    // Add event listeners to update price when size or option changes
    const sizeSelect = drinkCard.querySelector('.select-size');
    const optionSelect = drinkCard.querySelector('.select-option');

    sizeSelect.addEventListener('change', () => updateTotal(drink, quantity, drinkCard));
    optionSelect.addEventListener('change', () => updateTotal(drink, quantity, drinkCard));

    return drinkCard;
}
function updateTotal(drink, quantityElement, drinkCard) {
    const selectedSize = drinkCard.querySelector('.select-size').value;
    const selectedOption = drinkCard.querySelector('.select-option').value;
    const quantity = parseInt(quantityElement.textContent, 10) || 0;

    const basePrice = drink.basePrice;
    const sizeMultiplier = sizeMultipliers[selectedSize];
    const optionPrice = drink.options[selectedOption];

    const total = (basePrice + optionPrice) * sizeMultiplier * quantity;

    const totalElement = drinkCard.querySelector('.drink-total');
    totalElement.textContent = total.toFixed(2);
}

function displayDrinks() {
    const drinkListContainer = document.getElementById("drink-list");
    drinks.forEach(drink => {
        const drinkCard = createDrinkCard(drink);
        drinkListContainer.appendChild(drinkCard);
    });
}

displayDrinks();