// Sample data - in a real app this would come from your backend
        let orders = [];

        document.addEventListener("DOMContentLoaded", () => {
            const ordersData = localStorage.getItem('ordersData');
            console.log('Orders from localStorage:', ordersData);
            
            if (ordersData) {
                orders = JSON.parse(ordersData);
                console.log('Parsed orders:', orders);
                updateDisplay();
            } else {
                console.log("No orders found in Local Storage.");
                orders = []; // Ensure orders is empty if no data exists
            }
        });

        

        function getTimeElapsed(requestTime) {
            const now = new Date();
            const diffInMinutes = Math.floor((now - new Date(requestTime)) / 60000);
            return `${diffInMinutes}m ago`;
        }

        function createOrderCard(order) {
            return `
                <div class="order-card" data-order-id="${order.id}">
                    <button class="delete-btn" onclick="removeOrder(${order.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                    <div class="order-header">
                        <div class="table-info">
                            <i class="fas fa-users"></i>
                            <span>Table ${order.table}</span>
                        </div>
                        <div class="time-info">
                            <i class="fas fa-clock"></i>
                            <span>${getTimeElapsed(order.requestTime)}</span>
                        </div>
                    </div>
                    <ul class="items-list">
                        ${order.items.map(item => `
                            <li class="item">
                                <i class="fas fa-utensils"></i>
                                <span class="item-name">${item.name}</span>
                                <span class="item-quantity">×${item.quantity}</span>
                            </li>
                        `).join('')}
                    </ul>
                    ${order.observation ? `
                        <div class="observation">
                            ${order.observation}
                        </div>
                    ` : ''}
                </div>
            `;
        }

        function removeOrder(orderId) {
            // Convert orderId to a string to avoid type mismatches
            const stringOrderId = String(orderId);
        
            // Get the order before removing it to know which table it belongs to
            const orderToRemove = orders.find(order => String(order.id) === stringOrderId);
        
            if (orderToRemove) {
                console.log(`Removing order:`, orderToRemove);
            } else {
                console.log(`Order with ID ${stringOrderId} not found.`);
            }
        
            // Remove the order from the orders array
            orders = orders.filter(order => String(order.id) !== stringOrderId);
            console.log(`Updated orders:`, orders);
        
            // Save the updated orders back to localStorage
            localStorage.setItem('ordersData', JSON.stringify(orders));
        
            // Update the display to reflect the changes
            updateDisplay();
        }
        

        function updateDisplay() {
            const container = document.getElementById('orders-container');
            container.innerHTML = orders.map(order => createOrderCard(order)).join('');
            document.getElementById('order-count').textContent = orders.length;
        }

        // Update times every minute
        setInterval(() => {
            updateDisplay();
        }, 60000);

        // Initial display
        updateDisplay();


        // Add this function to handle sidebar navigation
// Simplified navigation function
function navigateTo(path, event) {
    if (event) {
        event.preventDefault();
    }
    window.location.href = path;
}

