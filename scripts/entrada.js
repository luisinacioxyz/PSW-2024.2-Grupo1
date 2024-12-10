function changeQuantity(dessert, change, price) {
    let quantityInput = document.getElementById(dessert + '-quantity');
    let quantity = parseInt(quantityInput.value, 10);
    let newQuantity = quantity + change;

    if (newQuantity >= 1) {
        quantityInput.value = newQuantity;
        document.getElementById(dessert + '-price').textContent = (newQuantity * price).toFixed(2);
    }
}

let cartItemCount = 0;

function updateCartIcon() {
    const cartIcon = document.querySelector('.fa-shopping-cart');
    cartIcon.textContent = `(${cartItemCount})`;
}

function addToCart(dessert) {
    const quantityInput = document.getElementById(dessert + '-quantity');
    const quantity = parseInt(quantityInput.value, 10);

    cartItemCount += quantity;
    updateCartIcon();

    // Reset the quantity to 1 after adding to the cart
    quantityInput.value = 1;
}
document.addEventListener('DOMContentLoaded', updateCartIcon);
