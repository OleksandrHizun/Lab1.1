let cart = {};

// Делегуємо натискання на .add-to-cart
document.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart")) {
    const item = event.target.closest(".item");
    const id = item.dataset.id;
    const name = item.dataset.name;
    const price = parseFloat(item.dataset.price);

    if (cart[id]) {
      cart[id].quantity += 1;
    } else {
      cart[id] = { name, price, quantity: 1 };
    }

    updateCartDisplay();
  }

  // Видалення з кошика
  if (event.target.classList.contains("remove-item")) {
    const id = event.target.dataset.id;
    delete cart[id];
    updateCartDisplay();
  }
});

// Обробка зміни кількості — також через делегування
document.addEventListener("input", (event) => {
  if (event.target.matches(".cart-item input")) {
    const id = event.target.dataset.id;
    const qty = parseInt(event.target.value);
    if (qty <= 0 || isNaN(qty)) {
      delete cart[id];
    } else {
      cart[id].quantity = qty;
    }
    updateCartDisplay();
  }
});

// Відкриття модального вікна
document.getElementById("open-cart").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "block";
  updateCartDisplay();
});

// Закриття модального вікна
document.querySelector(".close").addEventListener("click", () => {
  document.getElementById("cart-modal").style.display = "none";
});

// Закриття по кліку поза вікном
window.addEventListener("click", (event) => {
  const modal = document.getElementById("cart-modal");
  if (event.target === modal) {
    modal.style.display = "none";
  }
});

// Оновлення вмісту кошика
function updateCartDisplay() {
  const cartItemsDiv = document.getElementById("cart-items");
  cartItemsDiv.innerHTML = "";
  let total = 0;

  for (const id in cart) {
    const item = cart[id];
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const div = document.createElement("div");
    div.className = "cart-item";
    div.innerHTML = `
      <span>${item.name}</span>
      <input type="number" min="1" value="${item.quantity}" data-id="${id}" />
      <span>${itemTotal} ₴</span>
      <button class="remove-item" data-id="${id}">✖</button>
    `;
    cartItemsDiv.appendChild(div);
  }

  document.getElementById("total").textContent = total;
}
