const drinks = [
    {
        id: 1,
        name: "Caipivodka",
        basePrice: 28,
        image: "../fotos/caipivodka.jpg",
        options: { "Kiwi": 28, "Morango": 27, "Limão": 26, "Maracujá": 29 },
        sizes: ["500ml", "1l"]
    },
    {
        id: 2,
        name: "Caipisaquê",
        basePrice: 35,
        image: "../fotos/caipisaquê.jpg",
        options: { "Kiwi": 35, "Morango": 32, "Limão": 31, "Maracujá": 33 },
        sizes: ["500ml", "1l"]
    },
    {
        id: 3,
        name: "Caipirinha",
        basePrice: 20,
        image: "../fotos/caipirinha.jpg",
        options: { "Kiwi": 20, "Morango": 20, "Limão": 19, "Maracujá": 21 },
        sizes: ["500ml", "1l"]
    },
    {
        id: 4,
        name: "Gin",
        basePrice: 28.00,
        image: "../fotos/gin_tonica.jpg",
        options: { "Tônica": 28, "Limão": 25, "Laranja": 22.00 },
        sizes: ["250ml", "500ml"]
    },
    {
        id: 5,
        name: "Vinho",
        basePrice: 25.00,
        image: "../fotos/vinho.jpg",
        options: { "Tinto": 25.00, "Branco": 28.00, "Rosé": 26.00 },
        sizes: ["Taça", "Garrafa"]
    },
    {
        id: 6,
        name: "Whisky",
        basePrice: 35.00,
        image: "../fotos/whisky.jpg",
        options: { "Ballantines": 35.00, "Red Label": 30.00, "Black Label": 40.00 },
        sizes: ["Dose", "Garrafa"]
    }
];

const sizeMultipliers = {
    "250ml": 1,
    "500ml": 1,
    "1l": 1.4,
    "Taça": 1,
    "Dose": 1,
    "Garrafa": 4
};

let cartCount = 0;

function updateCartCounter() {
    document.getElementById("cart-counter").textContent = cartCount;
}

function createDrinkCard(drink) {
    const drinkCard = document.createElement("div");
    drinkCard.className = "drink-card col-md-4";

    const optionsHTML = Object.keys(drink.options)
        .map(option => `<option value="${option}">${option}</option>`)
        .join("");
    const sizesHTML = drink.sizes
        .map(size => `<option value="${size}">${size}</option>`)
        .join("");

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
        const newQuantity = currentQuantity + 1;
        quantity.textContent = newQuantity;
        updateTotal(drinkCard, drink, quantity.textContent);
    });

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            const newQuantity = currentQuantity - 1;
            quantity.textContent = newQuantity;
            updateTotal(drinkCard, drink, quantity.textContent);
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

    // Adicionar event listeners para os selects
    const sizeSelect = drinkCard.querySelector(".select-size");
    const optionSelect = drinkCard.querySelector(".select-option");

    sizeSelect.addEventListener("change", () => {
        updateTotal(drinkCard, drink, quantity.textContent);
    });

    optionSelect.addEventListener("change", () => {
        updateTotal(drinkCard, drink, quantity.textContent);
    });

    controls.appendChild(decrementButton);
    controls.appendChild(quantity);
    controls.appendChild(incrementButton);
    controls.appendChild(addToCartButton);
    drinkCard.appendChild(controls);

    return drinkCard;
}


function updateTotal(drinkCard, drink, quantity) {
    const selectedSize = drinkCard.querySelector(".select-size").value;
    const selectedOption = drinkCard.querySelector(".select-option").value;

    if (selectedSize && selectedOption) {
        const basePrice = drink.options[selectedOption]; // Usar o preço correto da opção selecionada
        const sizeMultiplier = sizeMultipliers[selectedSize];
        const total = basePrice * sizeMultiplier * quantity;
        drinkCard.querySelector(".drink-total").textContent = total.toFixed(2);
    }
}


function renderDrinks() {
    const drinkList = document.getElementById("drink-list");
    drinks.forEach(drink => {
        const drinkCard = createDrinkCard(drink);
        drinkList.appendChild(drinkCard);
    });
}

renderDrinks();
