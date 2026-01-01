// -------- LOGIN CHECK --------
if (
    document.body.dataset.protected === "true" &&
    !localStorage.getItem("loggedIn")
) {
    window.location.href = "login.html";
}

// -------- CART DATA --------
let cart = JSON.parse(localStorage.getItem("cart")) || [];
let currentProduct = null;

// -------- NAV COUNT --------
function updateNavCartCount() {
    const span = document.getElementById("nav-cart-count");
    if (!span) return;

    let count = 0;
    cart.forEach(item => count += item.quantity);
    span.textContent = count;
}
updateNavCartCount();

// -------- MODAL --------
function openModal(name, priceText, img, desc, price) {
    document.getElementById("product-modal").style.display = "block";
    document.getElementById("modal-img").src = img;
    document.getElementById("modal-title").textContent = name;
    document.getElementById("modal-desc").textContent = desc;
    document.getElementById("modal-price").textContent = priceText;

    currentProduct = { name, price };
}

function closeModal() {
    document.getElementById("product-modal").style.display = "none";
}

// -------- ADD TO CART --------
function addToCart() {
    if (!currentProduct) return;

    let found = cart.find(p => p.name === currentProduct.name);

    if (found) {
        found.quantity++;
    } else {
        cart.push({
            name: currentProduct.name,
            price: currentProduct.price,
            quantity: 1
        });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateNavCartCount();
    alert("Product added to cart");
    closeModal();
}
