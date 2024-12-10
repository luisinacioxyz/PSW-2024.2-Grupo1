const drinks = [
    { id: 1, name: "Coca Cola", basePrice: 7, image: "../fotos/coca.jpg", options: { "Zero": 7 , "Normal": 7 }, sizes: ["350ml", "1l"] },
    { id: 2, name: "Guarana", basePrice: 7, image: "../fotos/guarana.jpg", options: { "Zero": 7, "Normal": 7 }, sizes: ["350ml", "1l"] },
    { id: 3, name: "Mate", basePrice: 9, image: "../fotos/mate.jpg", options: { "Zero": 9, "Normal": 9 }, sizes: ["350ml", "1l"] },
    { id: 4, name: "Pepsi", basePrice: 7, image: "../fotos/pepsi.jpg", options: { "Zero": 7, "Normal": 7 }, sizes: ["350ml", "1l"] }
];

const sizeMultipliers = { "350ml": 0.5, "1l": 1 };
let cartCount = 0;

function updateCartCounter() {
    document.getElementById("cart-counter").textContent = cartCount;
}

function calculateTotal(drink, selectedSize, selectedOption, quantity) {
    const sizeMultiplier = sizeMultipliers[selectedSize];
    const optionPrice = drink.options[selectedOption] || drink.basePrice;  // Se a opção não tiver preço específico, usa o preço base
    return (drink.basePrice + optionPrice) * sizeMultiplier * quantity;
}

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
        updateTotal(drinkCard, drink, quantity.textContent); // Atualiza o total quando a quantidade mudar
    });

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            quantity.textContent = currentQuantity - 1;
            updateTotal(drinkCard, drink, quantity.textContent); // Atualiza o total quando a quantidade mudar
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
            alert(`${currentQuantity}x ${drink.name} adicionados a conta!`);
        } else {
            alert("Por favor, selecione a quantidade!");
        }
    });

    controls.appendChild(decrementButton);
    controls.appendChild(quantity);
    controls.appendChild(incrementButton);
    drinkCard.appendChild(controls);
    drinkCard.appendChild(addToCartButton);

    const selectSize = drinkCard.querySelector(".select-size");
    const selectOption = drinkCard.querySelector(".select-option");

    // Atualiza o total quando o tamanho ou a opção mudar
    selectSize.addEventListener("change", () => updateTotal(drinkCard, drink, quantity.textContent));
    selectOption.addEventListener("change", () => updateTotal(drinkCard, drink, quantity.textContent));

    return drinkCard;
}

function updateTotal(drinkCard, drink, quantity) {
    const selectSize = drinkCard.querySelector(".select-size");
    const selectOption = drinkCard.querySelector(".select-option");

    const selectedSize = selectSize.value;
    const selectedOption = selectOption.value;

    const total = calculateTotal(drink, selectedSize, selectedOption, quantity);
    drinkCard.querySelector(".drink-total").textContent = total.toFixed(2);
}

function displayDrinks() {
    const drinkListContainer = document.getElementById("drink-list");
    drinks.forEach(drink => {
        const drinkCard = createDrinkCard(drink);
        drinkListContainer.appendChild(drinkCard);
    });
}

displayDrinks();
