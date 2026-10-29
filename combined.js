
function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.style.display = 'none');
    const page = document.getElementById('page-' + pageId);
    if (page) {
        page.style.display = 'block';
        window.scrollTo(0, 0);
    }
    updateCartCount();
    if (pageId === 'cart') renderCart();
    if (pageId === 'checkout') renderCheckout();
}

function initRouter() {
    const pageMap = {
        'index.html': 'home',
        'cart.html': 'cart',
        'categories.html': 'categories',
        'contact.html': 'contact',
        'cricket.html': 'cricket',
        'football.html': 'football',
        'gym.html': 'gym',
        'batmention.html': 'batmention',
        'bestoffers.html': 'bestoffers',
        'checkout.html': 'checkout'
    };

    document.querySelectorAll('a[href]').forEach(link => {
        const href = link.getAttribute('href');
        if (pageMap[href]) {
            link.href = '#';
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showPage(pageMap[href]);
            });
        }
    });
}

// =============================================
// CART FUNCTIONS
// =============================================
function addToCart(name, price, image) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push({ name, price, image });
    localStorage.setItem("cart", JSON.stringify(cart));

    let toast = document.getElementById("cartToast");
    if (toast) {
        toast.classList.add("show");
        setTimeout(() => { toast.classList.remove("show"); }, 2000);
    }
    updateCartCount();
}

// Safe wrappers used by Popular Products, Best Sellers, Featured Products
function safeAddToCart(name, price, image) {
    try { addToCart(name, price, image); }
    catch(e) { alert('Add to cart error: ' + e.message); }
}
function safeBuyNow(name, price, image) {
    try { buyNow(name, price, image); }
    catch(e) { alert('Buy now error: ' + e.message); }
}

function updateCartCount() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    document.querySelectorAll("#cartCount").forEach(el => {
        el.innerText = cart.length;
    });
}

function removeItem(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));
    renderCart();
    updateCartCount();
}

function clearCart() {
    localStorage.removeItem("cart");
    renderCart();
    updateCartCount();
}

function renderCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let container = document.getElementById("cartItems");
    let totalEl = document.getElementById("total");
    if (!container) return;

    container.innerHTML = '';
    let total = 0;

    if (cart.length === 0) {
        container.innerHTML = '<p style="text-align:center; padding:30px; font-size:18px;">Your cart is empty 🛒</p>';
        if (totalEl) totalEl.innerText = "Total: ₹0";
        return;
    }

    cart.forEach((item, index) => {
        let div = document.createElement("div");
        div.classList.add("cart-item");
        div.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-info">
                <h3>${item.name}</h3>
                <p>₹${item.price}</p>
            </div>
            <button class="remove-btn" onclick="removeItem(${index})">Remove</button>
        `;
        container.appendChild(div);
        total += item.price;
    });

    if (totalEl) totalEl.innerText = "Total: ₹" + total;
}

// =============================================
// BUY NOW — Opens Checkout Page
// =============================================
function buyNow(name, price, image) {
    if (name) {
        localStorage.setItem("buyNowItem", JSON.stringify({ name, price, image }));
    } else {
        localStorage.removeItem("buyNowItem");
    }
    showPage('checkout');
}

function renderCheckout() {
    const item = JSON.parse(localStorage.getItem("buyNowItem"));
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const summaryEl = document.getElementById("checkoutSummary");
    if (!summaryEl) return;

    let items = item ? [item] : cart;
    let total = 0;
    let html = '';

    if (items.length === 0) {
        summaryEl.innerHTML = '<p style="color:#aaa;">No items selected.</p>';
        return;
    }

    items.forEach(i => {
        html += `
        <div style="display:flex;align-items:center;gap:15px;margin-bottom:15px;background:#0d1b2a;padding:10px;border-radius:8px;">
            <img src="${i.image}" style="width:65px;height:65px;border-radius:8px;object-fit:cover;">
            <div>
                <strong>${i.name}</strong><br>
                <span style="color:#22c55e;font-size:16px;">₹${i.price}</span>
            </div>
        </div>`;
        total += Number(i.price);
    });

    html += `
    <hr style="border-color:#334;margin:12px 0;">
    <p style="font-size:17px;font-weight:bold;">
        Total: <span style="color:#22c55e;">₹${total}</span>
    </p>`;

    summaryEl.innerHTML = html;
}

function placeCheckoutOrder() {
    const popup = document.getElementById("demoPopup");
    if (popup) popup.style.display = "flex";
}

function closeAll() {
    const el = document.getElementById("demoPopup");
    if (el) el.style.display = "none";
    showPage('home');
}

// =============================================
// CONTACT FORM
// =============================================
// SEARCH (Home Page)
// =============================================
const products = [
    { name: "Cricket Bat", price: 1500, image: "images/cricketbat.jpeg" },
    { name: "Football", price: 800, image: "images/football.jpeg" },
    { name: "Dumbbells", price: 1200, image: "images/dumbells.jpeg" },
    { name: "Badminton Racket", price: 900, image: "images/batmentionracket.jpeg" },
    { name: "Running Shoes", price: 2000, image: "images/runningshoes.png" },
    { name: "Shuttlecocks", price: 300, image: "images/shuttlecocks.png" },
    { name: "Badminton Net", price: 700, image: "images/shuttlenet.png" },
    { name: "Badminton Shoes", price: 1500, image: "images/badmentionshoes.png" },
    { name: "Racket Grip", price: 250, image: "images/racketgrip.png" },
    { name: "Kit Bag", price: 900, image: "images/badmentionkitbag.png" },
    { name: "Wrist Band", price: 99, image: "images/wristband.png" },
    { name: "Training Kit", price: 1200, image: "images/trainingkit.png" },
    { name: "Head Band", price: 99, image: "images/headband.png" },
    { name: "Cricket Ball", price: 500, image: "images/cricketball.jpeg" },
    { name: "Batting Gloves", price: 819, image: "images/batinggloves.png" },
    { name: "Pads", price: 738, image: "images/pads.png" },
    { name: "Helmet", price: 699, image: "images/helmet.png" },
    { name: "Thigh Guard", price: 490, image: "images/thighgaurd.png" },
    { name: "Arm Guard", price: 490, image: "images/armgaurd.png" },
    { name: "Abdominal Guard", price: 300, image: "images/abdominalgaurd.png" },
    { name: "Cricket Kit Bag", price: 800, image: "images/cricketkitbag.png" },
    { name: "Wicket Keeping Gloves", price: 500, image: "images/wicketkeepinggloves.png" },
    { name: "Wicket Keeping Pads", price: 490, image: "images/wicketkeepingpads.png" },
    { name: "Cricket Jersey", price: 600, image: "images/cricketjersy.png" },
    { name: "Football Shoes", price: 1440, image: "images/footballshoes.png" },
    { name: "Shin Guards", price: 650, image: "images/shinguards.png" },
    { name: "Goalkeeper Gloves", price: 720, image: "images/goalkeepergloves.png" },
    { name: "Football Jersey", price: 990, image: "images/footballjersy.png" },
    { name: "Goal Net", price: 795, image: "images/goalnet.png" },
    { name: "Ball Pump", price: 270, image: "images/ballpump.png" },
    { name: "Training Cones", price: 200, image: "images/trainingcones.png" },
    { name: "Captain Armband", price: 120, image: "images/captainarmband.png" },
    { name: "Football Socks", price: 54, image: "images/footballsocks.png" },
    { name: "Barbell", price: 1250, image: "images/barbell.png" },
    { name: "Treadmill", price: 6200, image: "images/treadmill.png" },
    { name: "Exercise Bike", price: 2590, image: "images/exercisebike.png" },
    { name: "Kettlebell", price: 600, image: "images/kettlebell.png" },
    { name: "Skipping Rope", price: 300, image: "images/skippingrope.png" },
    { name: "Yoga Mat", price: 700, image: "images/yogamat.png" },
    { name: "Resistance Bands", price: 300, image: "images/resistancebands.png" },
    { name: "Workout Bench", price: 600, image: "images/workoutbench.png" },
    { name: "Pull-Up Bar", price: 800, image: "images/pullupbar.png" },
    { name: "Basketball", price: 900, image: "images/basketball.png" },
];

function initSearch() {
    const searchInput = document.getElementById("searchInput");
    if (!searchInput) return;

    searchInput.addEventListener("input", function() {
        let input = this.value.toLowerCase();
        let home = document.getElementById("homeProducts");
        let results = document.getElementById("results");

        if (input === "") {
            if (home) home.style.display = "block";
            if (results) results.innerHTML = "";
            return;
        }

        if (home) home.style.display = "none";

        let output = "";
        for (let i = 0; i < products.length; i++) {
            if (products[i].name.toLowerCase().includes(input)) {
                output += `
                    <div class="card">
                        <img src="${products[i].image}" alt="${products[i].name}">
                        <h3>${products[i].name}</h3>
                        <p>₹${products[i].price}</p>
                        <button class="cart" onclick="addToCart('${products[i].name}', ${products[i].price}, '${products[i].image}')">Add to Cart</button>
                        <button class="buy" onclick="buyNow('${products[i].name}', ${products[i].price}, '${products[i].image}')">Buy Now</button>
                    </div>
                `;
            }
        }

        if (output === "") {
            output = "<h2 style='color:white; padding:20px;'>No products found</h2>";
        }

        if (results) results.innerHTML = output;
    });
}

// =============================================
// INIT ON LOAD
// =============================================
window.addEventListener('load', function() {
    updateCartCount();
    initRouter();
    initSearch();
    showPage('home');
});
