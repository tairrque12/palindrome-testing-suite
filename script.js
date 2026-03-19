// ============================================
// STEAM & SILICON — script.js
// ============================================

// ============================================
// MENU ITEMS ARRAY
// ============================================
const MENU_ITEMS = [
    // BREAKFAST
    {
        id: 1,
        name: `Voltage Breakfast`,
        description: `Two Eggs Any Style, Applewood Bacon, Sourdough Toast, Orange Juice`,
        price: 11.99,
        category: `Breakfast`,
        image: `images/breakfast1.png`
    },
    {
        id: 2,
        name: `Gear Egg & Scramble`,
        description: `Three egg scramble, roasted peppers, onions, cheddar cheese, home fries.`,
        price: 8.99,
        category: `Breakfast`,
        image: `images/EggScramble.png`
    },
    {
        id: 3,
        name: `Copper Coil French Toast`,
        description: `Thick cut brioche french toast, powdered sugar, fresh berries, whipped cream`,
        price: 8.99,
        category: `Breakfast`,
        image: `images/FrenchToast.png`
    },
    {
        id: 4,
        name: `Silicon Stack Pancakes`,
        description: `Fluffy buttermilk pancakes, maple syrup, whipped butter, fresh strawberries.`,
        price: 9.99,
        category: `Breakfast`,
        image: `images/Pancakes.png`
    },
    // LUNCH
    {
        id: 5,
        name: `The IronClad Burger`,
        description: `Double smash patty, bacon jam, cheddar cheese, caramelized onions, brioche bun.`,
        price: 13.99,
        category: `Lunch`,
        image: `images/IronClad.png`
    },
    {
        id: 6,
        name: `The OverCharge`,
        description: `Double smash patty, bacon jam, cheddar cheese, caramelized onions, brioche bun.`,
        price: 13.99,
        category: `Lunch`,
        image: `images/BaconJam.png`
    },
    {
        id: 7,
        name: `Circuit Salad`,
        description: `Grilled chicken, romaine, parmesan, croutons, caesar dressing.`,
        price: 11.99,
        category: `Lunch`,
        image: `images/ChickenSalad.png`
    },
    {
        id: 8,
        name: `Drone Drop Wrap`,
        description: `Grilled steak, roasted peppers, pepper jack cheese, chipotle aioli, flour tortilla.`,
        price: 11.99,
        category: `Lunch`,
        image: `images/DroneWrap.png`
    },
    // DINNER
    {
        id: 9,
        name: `SkyPad Rib-eye`,
        description: `12oz ribeye, garlic butter, roasted asparagus, mashed potatoes.`,
        price: 34.99,
        category: `Dinner`,
        image: `images/SkyPadRibEye.png`
    },
    {
        id: 10,
        name: `Neon Salmon`,
        description: `Pan seared salmon, lemon butter sauce, wild rice, steamed broccoli.`,
        price: 28.99,
        category: `Dinner`,
        image: `images/Salmon.png`
    },
    {
        id: 11,
        name: `Reactor Pasta`,
        description: `Penne pasta, spicy arrabbiata sauce, Italian sausage, fresh parmesan, garlic bread.`,
        price: 18.99,
        category: `Dinner`,
        image: `images/Pasta.png`
    },
    {
        id: 12,
        name: `The Veginator Plate`,
        description: `Plant based patty, avocado, lettuce, tomato, vegan aioli, sweet potato fries.`,
        price: 16.99,
        category: `Dinner`,
        image: `images/VeginatorPlate.png`
    }
];

// ============================================
// CART BADGE — updates on every page
// ============================================
function updateCartBadge() {
    const badge = document.getElementById("cart-count");
    if (!badge) { return; }

    const stored = localStorage.getItem("cart");
    if (!stored) {
        badge.textContent = "0";
        return;
    }

    const cart = JSON.parse(stored);

    // Add up total quantity across all items
    const totalItems = cart.reduce(function(total, item) {
        return total + item.quantity;
    }, 0);

    badge.textContent = totalItems;
}

// Run on page load
updateCartBadge();
// ============================================
// MENU PAGE — DOM RENDERING
// ============================================

const menuContainer = document.getElementById("menu-container");

if (menuContainer) {

    // Formats numbers as US currency
    const money = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    // renderCards builds and displays menu cards
    function renderCards(filter) {
        if (!filter) { filter = "All"; }

        // Clear the container before adding new cards
        menuContainer.innerHTML = "";

        // Filter items by category then loop through each one
        MENU_ITEMS.filter(function(item) {
            return filter === "All" || item.category === filter;
        }).forEach(function(item) {
            menuContainer.innerHTML += `
                <div class="menu-card" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}</p>
                    <p>${money.format(item.price)}</p>
                    <div class="card-actions">
                        <select class="quantity-select">
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                        </select>
                        <button class="add-to-cart-btn" data-id="${item.id}">Add to Cart</button>
                    </div>
                </div>
            `;
        });
    }

    // Show all cards when page first loads
    renderCards("All");

    // Filter button click logic
    document.querySelectorAll(".btn-filter").forEach(function(button) {
        button.addEventListener("click", function() {
            document.querySelectorAll(".btn-filter").forEach(function(btn) {
                btn.classList.remove("active");
            });
            button.classList.add("active");
            const category = button.getAttribute("data-category");
            renderCards(category);
        });
    });

    // Add to Cart logic
    menuContainer.addEventListener("click", function(event) {

        // Check if the Add to Cart button was clicked
        if (event.target.classList.contains("add-to-cart-btn")) {

            // Get the item id from the button
            const itemId = parseInt(event.target.getAttribute("data-id"));

            // Get the quantity from the select inside the same card
            const card = event.target.closest(".menu-card");
            const quantity = parseInt(card.querySelector(".quantity-select").value);

            // Find the matching item in MENU_ITEMS
            const item = MENU_ITEMS.find(function(menuItem) {
                return menuItem.id === itemId;
            });

            // Load existing cart from localStorage or start empty
            let cart = [];
            const stored = localStorage.getItem("cart");
            if (stored) {
                cart = JSON.parse(stored);
            }

            // Check if item already exists in cart
            const existing = cart.find(function(cartItem) {
                return cartItem.id === itemId;
            });

            if (existing) {
                // If already in cart just update the quantity
                existing.quantity += quantity;
            } else {
                // Otherwise add it as a new cart item
                cart.push({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    image: item.image,
                    quantity: quantity
                });
            }

            // Save updated cart back to localStorage
            localStorage.setItem("cart", JSON.stringify(cart));

            localStorage.setItem("cart", JSON.stringify(cart));
            updateCartBadge();

            // Give user feedback
            event.target.textContent = "Added!";
            setTimeout(function() {
                event.target.textContent = "Add to Cart";
            }, 1500);

            return;
        }

        // Modal click logic — only runs if Add to Cart was NOT clicked
        const card = event.target.closest(".menu-card");
        if (!card) { return; }

        // Don't open modal if clicking the select or button
        if (event.target.classList.contains("add-to-cart-btn") ||
            event.target.classList.contains("quantity-select")) { return; }

        const itemId = parseInt(card.getAttribute("data-id"));
        const item = MENU_ITEMS.find(function(menuItem) {
            return menuItem.id === itemId;
        });

        document.getElementById("modalItemName").textContent = item.name;
        document.getElementById("modalItemImage").src = item.image;
        document.getElementById("modalItemImage").alt = item.name;
        document.getElementById("modalItemPrice").textContent = money.format(item.price);
        document.getElementById("modalItemDescription").textContent = item.description;

        const modal = new bootstrap.Modal(document.getElementById("menuModal"));
        modal.show();
    });
}

// ============================================
// RESERVATIONS PAGE
// ============================================

const reservationForm = document.getElementById("reservation-form");

if (reservationForm) {

    const inpersonSection = document.getElementById("inperson-section");
    const droneSection = document.getElementById("drone-section");
    const evSection = document.getElementById("ev-section");
    const alertBox = document.getElementById("form-alert");

    // Fix Chrome dark theme date picker
    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    // Helper — shows inline error below a specific field
    function showFieldError(id, message) {
        const el = document.getElementById(id);
        if (el) { el.textContent = message; }
    }

    // Helper — clears all inline error messages
    function clearAllErrors() {
        const errorFields = document.querySelectorAll(".field-error");
        errorFields.forEach(function(el) { el.textContent = ""; });
        alertBox.innerHTML = "";
    }

    // Conditional show/hide based on service selection
    const serviceRadios = document.querySelectorAll('input[name="order-type"]');

    serviceRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {
            inpersonSection.style.display = "none";
            droneSection.style.display = "none";
            evSection.style.display = "none";

            if (this.value === "In-Person") {
                inpersonSection.style.display = "block";
            } else if (this.value === "Drone") {
                droneSection.style.display = "block";
            } else if (this.value === "EV") {
                evSection.style.display = "block";
            }
        });
    });

    // Form validation
    reservationForm.addEventListener("submit", function(event) {

        event.preventDefault();
        clearAllErrors();

        const name = document.getElementById("full_name").value.trim();
        const phone = document.getElementById("phone_number").value.trim();
        const email = document.getElementById("email").value.trim();
        const date = document.getElementById("date").value;
        const time = document.getElementById("time").value;
        const serviceRadio = document.querySelector('input[name="order-type"]:checked');
        const seatingRadio = document.querySelector('input[name="seating-preference"]:checked');
        const partySize = document.getElementById("party_size").value;
        const dietaryNotes = document.getElementById("dietary_notes").value.trim();
        const newsletter = document.getElementById("newsletter").checked;

        let hasErrors = false;

        if (!serviceRadio) {
            showFieldError("error-service", "Please select a service type.");
            hasErrors = true;
        }

        if (name === "") {
            showFieldError("error-name", "Full name is required.");
            hasErrors = true;
        } else if (name.length > 20) {
            showFieldError("error-name", "Full name cannot exceed 20 characters.");
            hasErrors = true;
        }

        if (email === "") {
            showFieldError("error-email", "Email is required.");
            hasErrors = true;
        } else if (!email.includes("@") || !email.includes(".")) {
            showFieldError("error-email", "Enter a valid email — format: name@example.com");
            hasErrors = true;
        }

        if (phone !== "" && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
            showFieldError("error-phone", "Phone must be in format: 555-867-5309");
            hasErrors = true;
        }

        if (date === "") {
            showFieldError("error-date", "Please select a reservation date.");
            hasErrors = true;
        }

        if (time === "") {
            showFieldError("error-time", "Please select a reservation time.");
            hasErrors = true;
        }

        if (dietaryNotes.length > 30) {
            showFieldError("error-dietary", "Dietary notes cannot exceed 30 characters.");
            hasErrors = true;
        }

        if (serviceRadio && serviceRadio.value === "In-Person") {
            if (partySize === "") {
                showFieldError("error-party", "Please select a party size.");
                hasErrors = true;
            }
            if (!seatingRadio) {
                showFieldError("error-seating", "Please select a seating preference.");
                hasErrors = true;
            }
        }

        if (hasErrors) {
            alertBox.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <strong>Please fix the errors highlighted below before submitting.</strong>
                </div>
            `;
            alertBox.scrollIntoView({ behavior: "smooth" });
            return;
        }

        const reservation = {
            name: name,
            email: email,
            phone: phone,
            date: date,
            time: time,
            service: serviceRadio ? serviceRadio.value : "",
            partySize: partySize,
            seating: seatingRadio ? seatingRadio.value : "",
            dietaryNotes: dietaryNotes,
            newsletter: newsletter
        };

        console.log(reservation);

        alertBox.innerHTML = `
            <div class="alert alert-success" role="alert">
                <strong>Reservation submitted!</strong> We will confirm your request within 24 hours.
            </div>
        `;
        alertBox.scrollIntoView({ behavior: "smooth" });

        reservationForm.reset();
        inpersonSection.style.display = "none";
        droneSection.style.display = "none";
        evSection.style.display = "none";
    });
}

// ============================================
// CART PAGE
// ============================================

const cartContainer = document.getElementById("cart-items");

if (cartContainer) {

    // Price formatter
    const money = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD"
    });

    const TAX_RATE = 0.0825;

    // Load cart from localStorage
    let cart = [];
    const stored = localStorage.getItem("cart");
    if (stored) {
        cart = JSON.parse(stored);
    }

    // If cart is empty show message
    if (cart.length === 0) {
        cartContainer.innerHTML = `
            <div style="text-align:center; padding: 4rem 0; color: var(--muted);">
                <i class="fa-solid fa-cart-shopping" style="font-size:3rem; margin-bottom:1rem; color:var(--border);"></i>
                <p style="font-family:'Rajdhani',sans-serif; font-size:1.5rem; color:var(--muted);">Your cart is empty.</p>
                <a href="menu.html" class="btn" style="margin-top:1rem;">Browse Menu</a>
            </div>
        `;

    } else {

        // Build cart items table
        let tableHTML = `
            <table class="menu-table" style="margin-bottom:2rem;">
                <caption>Order Summary</caption>
                <thead>
                    <tr>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Qty</th>
                        <th>Line Total</th>
                    </tr>
                </thead>
                <tbody>
        `;

        // Loop through cart items and build each row
        cart.forEach(function(item) {
            const lineTotal = item.price * item.quantity;
            tableHTML += `
                <tr>
                    <td>${item.name}</td>
                    <td>${money.format(item.price)}</td>
                    <td>${item.quantity}</td>
                    <td>${money.format(lineTotal)}</td>
                </tr>
            `;
        });

        tableHTML += `</tbody></table>`;
        cartContainer.innerHTML = tableHTML;

        // Calculate totals
        const subtotal = cart.reduce(function(total, item) {
            return total + (item.price * item.quantity);
        }, 0);

        const tax = subtotal * TAX_RATE;
        const finalTotal = subtotal + tax;

        // Build totals section
        document.getElementById("cart-totals").innerHTML = `
            <table class="menu-table">
                <tbody>
                    <tr>
                        <td style="color:var(--white); font-family:'Rajdhani',sans-serif;">Subtotal</td>
                        <td></td>
                        <td></td>
                        <td>${money.format(subtotal)}</td>
                    </tr>
                    <tr>
                        <td style="color:var(--white); font-family:'Rajdhani',sans-serif;">Tax (8.25%)</td>
                        <td></td>
                        <td></td>
                        <td>${money.format(tax)}</td>
                    </tr>
                    <tr>
                        <td style="color:var(--blue); font-family:'Rajdhani',sans-serif; font-size:1.1rem; font-weight:700;">Total</td>
                        <td></td>
                        <td></td>
                        <td style="color:var(--blue); font-weight:700;">${money.format(finalTotal)}</td>
                    </tr>
                </tbody>
            </table>
        `;

        // Show buttons
        document.getElementById("cart-buttons").style.display = "block";

        // ---- CANCEL ORDER LOGIC ----
        const cancelModal = new bootstrap.Modal(document.getElementById("cancelModal"));
        const thankYouModal = new bootstrap.Modal(document.getElementById("thankYouModal"));

        // Cancel button opens confirmation modal
        document.getElementById("cancel-btn").addEventListener("click", function() {
            cancelModal.show();
        });

        // Confirm cancel — clear cart, show thank you, redirect
        document.getElementById("confirm-cancel-btn").addEventListener("click", function() {

            // Clear the cart from localStorage
            localStorage.removeItem("cart");

            // Hide cancel modal
            cancelModal.hide();

            // Show thank you modal
            thankYouModal.show();

            // After thank you modal closes redirect to menu
            document.getElementById("thankYouModal").addEventListener("hidden.bs.modal", function() {
                window.location.href = "menu.html";
            });
        });

        // ---- SUBMIT ORDER LOGIC ----
        document.getElementById("submit-btn").addEventListener("click", function() {

            // Log the final order to console
            console.log("Order submitted:", cart);

            // Clear the cart
            localStorage.removeItem("cart");

            // Show success message
            cartContainer.innerHTML = `
                <div style="text-align:center; padding: 4rem 0;">
                    <i class="fa-solid fa-circle-check" style="font-size:3rem; color:var(--blue); margin-bottom:1rem;"></i>
                    <p style="font-family:'Rajdhani',sans-serif; font-size:1.5rem; color:var(--white);">Order Submitted!</p>
                    <p style="color:var(--muted);">Thank you for your order. Our robot crew is on it.</p>
                    <a href="menu.html" class="btn" style="margin-top:1rem;">Back to Menu</a>
                </div>
            `;

            // Hide totals and buttons
            document.getElementById("cart-totals").innerHTML = "";
            document.getElementById("cart-buttons").style.display = "none";
        });
    }
}