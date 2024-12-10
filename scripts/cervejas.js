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
        updateTotalPrice(beerCard, beer.price, quantity.textContent);
    });

    const decrementButton = document.createElement("button");
    decrementButton.textContent = "-";
    decrementButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            quantity.textContent = currentQuantity - 1;
            updateTotalPrice(beerCard, beer.price, quantity.textContent);
        }
    });

    const addToCartButton = document.createElement("button");
    addToCartButton.className = "btn btn-primary";
    addToCartButton.textContent = "Adicionar a conta";
    addToCartButton.addEventListener("click", () => {
        const currentQuantity = parseInt(quantity.textContent, 10) || 0;
        if (currentQuantity > 0) {
            addToCart(beer, currentQuantity);
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

function fetchBeers() {
    fetch("http://localhost:3000/beers")
        .then(response => response.json())
        .then(data => {
            const beerListContainer = document.getElementById("beer-list");
            data.forEach(beer => {
                const beerCard = createBeerCard(beer);
                beerListContainer.appendChild(beerCard);
            });
        })
        .catch(error => console.error("Erro ao carregar as cervejas:", error));
}

function addToCart(beer, quantity) {
    fetch("http://localhost:3000/cart", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            id: beer.id,
            name: beer.name,
            price: beer.price,
            quantity: quantity
        })
    })
    .then(() => {
        cartCount += quantity;
        updateCartCounter();
        alert("Item adicionado ao carrinho!");
    })
    .catch(error => console.error("Erro ao adicionar ao carrinho:", error));
}

function loadCart() {
    fetch("http://localhost:3000/cart")
        .then(response => response.json())
        .then(cartItems => {
            const cartSummary = document.getElementById("cart-summary");
            cartSummary.innerHTML = cartItems.map(item => `
                <p>${item.quantity}x ${item.name} - R$ ${(item.price * item.quantity).toFixed(2)}</p>
            `).join("");
        })
        .catch(error => console.error("Erro ao carregar o carrinho:", error));
}

document.addEventListener("DOMContentLoaded", () => {
    fetchBeers();
    updateCartCounter();
});
