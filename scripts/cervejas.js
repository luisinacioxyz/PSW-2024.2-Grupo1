const beers = [
    { id: 1, name: "Heineken Long Neck", price: 15.00, image: "../fotos/heineken.jpg" },
    { id: 2, name: "Budweiser Long Neck", price: 12.00, image: "../fotos/budweiser.jpg" },
    { id: 3, name: "Brahma Latão 473ml", price: 10.00, image: "../fotos/Brahma.jpg" },
];

let cartCount = 0;

function updateCartCounter() {
    document.getElementById("cart-counter").textContent = cartCount;
}

function calculateTotalPrice(price, quantity) {
    return price * quantity;
}

function createBeerCard(beer) {
    const beerCard = document.createElement("div");
    beerCard.className = "beer-card col-md-4";

    beerCard.innerHTML = `
        <img src="${beer.image}" alt="${beer.name}" class="img-fluid">
        <h2>${beer.name}</h2>
        <p>Preço: R$ ${beer.price.toFixed(2)}</p>
        <p>Total: R$ <span class="beer-total">0.00</span></p>
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
        updateTotalPrice(beerCard, beer.price, quantity.textContent); // Atualiza o total quando a quantidade mudar
    });

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            quantity.textContent = currentQuantity - 1;
            updateTotalPrice(beerCard, beer.price, quantity.textContent); // Atualiza o total quando a quantidade mudar
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
    beerCard.appendChild(controls);
    beerCard.appendChild(addToCartButton);

    return beerCard;
}

function updateTotalPrice(beerCard, price, quantity) {
    const total = calculateTotalPrice(price, quantity);
    beerCard.querySelector(".beer-total").textContent = total.toFixed(2);
}

function displayBeers() {
    const beerListContainer = document.getElementById("beer-list");
    beers.forEach(beer => {
        const beerCard = createBeerCard(beer);
        beerListContainer.appendChild(beerCard);
    });
}

displayBeers();
