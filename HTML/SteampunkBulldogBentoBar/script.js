
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


        menuContainer.innerHTML = "";

        // FILTER
        MENU_ITEMS.filter(function(item) {
            return filter === "All" || item.category === filter;
        }).forEach(function(item) {
            menuContainer.innerHTML += `
                <div class="menu-card" data-id="${item.id}">
                    <img src="${item.image}" alt="${item.name}">
                    <p>${item.name}</p>
                    <p>${money.format(item.price)}</p>
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

    // Modal click logic
    menuContainer.addEventListener("click", function(event) {
        const card = event.target.closest(".menu-card");
        if (!card) { return; }

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

//RESERVATION PAGE

const reservationForm = document.getElementById("reservation-form");

if (reservationForm) {

    const inpersonSection = document.getElementById("inperson-section");
    const droneSection = document.getElementById("drone-section");
    const evSection = document.getElementById("ev-section");
    const alertBox = document.getElementById("form-alert");


    const dateInput = document.getElementById("date");
    const today = new Date().toISOString().split("T")[0];
    dateInput.setAttribute("min", today);

    function showFieldError(id, message) {
        const el = document.getElementById(id);
        if (el) { el.textContent = message; }
    }

    function clearAllErrors() {
        const errorFields = document.querySelectorAll(".field-error");
        errorFields.forEach(function(el) { el.textContent = ""; });
        alertBox.innerHTML = "";
    }

    // Conditionals
    const serviceRadios = document.querySelectorAll('input[name="order-type"]');

    serviceRadios.forEach(function(radio) {
        radio.addEventListener("change", function() {

            // Hide all sections first
            inpersonSection.style.display = "none";
            droneSection.style.display = "none";
            evSection.style.display = "none";

            // Show only the matching section
            if (this.value === "In-Person") {
                inpersonSection.style.display = "block";
            } else if (this.value === "Drone") {
                droneSection.style.display = "block";
            } else if (this.value === "EV") {
                evSection.style.display = "block";
            }
        });
    });

    //FORM VALIDATION


    reservationForm.addEventListener("submit", function(event) {

        // Prevent default form submission
        event.preventDefault();

        // Clear all previous errors
        clearAllErrors();

        // Collect form values
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

        // Validate service selection — required
        if (!serviceRadio) {
            showFieldError("error-service", "Please select a service type.");
            hasErrors = true;
        }

        // Validate name — required, max 20 characters
        if (name === "") {
            showFieldError("error-name", "Full name is required.");
            hasErrors = true;
        } else if (name.length > 20) {
            showFieldError("error-name", "Full name cannot exceed 20 characters.");
            hasErrors = true;
        }

        // Validate email — required, must contain @ and .
        if (email === "") {
            showFieldError("error-email", "Email is required.");
            hasErrors = true;
        } else if (!email.includes("@") || !email.includes(".")) {
            showFieldError("error-email", "Enter a valid email — format: name@example.com");
            hasErrors = true;
        }

        // Validate phone — optional but if entered must match 000-000-0000
        if (phone !== "" && !/^\d{3}-\d{3}-\d{4}$/.test(phone)) {
            showFieldError("error-phone", "Phone must be in format: 555-867-5309");
            hasErrors = true;
        }

        // Validate date — required
        if (date === "") {
            showFieldError("error-date", "Please select a reservation date.");
            hasErrors = true;
        }

        // Validate time — required
        if (time === "") {
            showFieldError("error-time", "Please select a reservation time.");
            hasErrors = true;
        }

        // Validate dietary notes — max 30 characters
        if (dietaryNotes.length > 30) {
            showFieldError("error-dietary", "Dietary notes cannot exceed 30 characters.");
            hasErrors = true;
        }

        // If In-Person selected validates party size and seating
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

        // If errors — show red alert at top and stop
        if (hasErrors) {
            alertBox.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    <strong>Please fix the errors highlighted below before submitting.</strong>
                </div>
            `;
            alertBox.scrollIntoView({ behavior: "smooth" });
            return;
        }

        // All valid — build the reservation object
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

        // green success alert
        alertBox.innerHTML = `
            <div class="alert alert-success" role="alert">
                <strong>Reservation submitted!</strong> We will confirm your request within 24 hours.
            </div>
        `;
        alertBox.scrollIntoView({ behavior: "smooth" });

        // Reset form
        reservationForm.reset();
        inpersonSection.style.display = "none";
        droneSection.style.display = "none";
        evSection.style.display = "none";
    });
}