// 🌐 Navbar Active
let menus = document.querySelectorAll(".menu");

menus.forEach((item) => {
  item.addEventListener("click", function () {
    menus.forEach((i) => i.classList.remove("text-blue-600", "font-semibold"));
    item.classList.add("text-blue-600", "font-semibold");
  });
});

// 🖼️ Banner Slider
let productIndex = 0;
const products = document.getElementById("sliderContainer").children;
const totalProducts = products.length;
const container = document.getElementById("sliderContainer");

function showProduct(index) {
  container.style.transform = `translateX(-${index * 100}%)`;
}

document.getElementById("nextProduct").addEventListener("click", () => {
  productIndex = (productIndex + 1) % totalProducts;
  showProduct(productIndex);
});

document.getElementById("prevProduct").addEventListener("click", () => {
  productIndex = (productIndex - 1 + totalProducts) % totalProducts;
  showProduct(productIndex);
});

// Auto Slide every 4 seconds
setInterval(() => {
  productIndex = (productIndex + 1) % totalProducts;
  showProduct(productIndex);
}, 4000);



// 🛍️ Product Section
let productContainer = document.getElementById("productContainer");
let cart = [];
let subtotal = 0;
let balance = 1000;

// Fetch product data

  fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((products) => {
      products.forEach((product) => {
        const card = document.createElement("div");
        card.className = "rounded overflow-hidden shadow-lg flex flex-col";

        card.innerHTML = `
          <a href="#"></a>
          <div class="relative">
            <a href="#">
              <img class="w-full h-60 object-contain bg-white p-4"
                src="${product.image}"
                alt="${product.title}">
              <div
                class="hover:bg-transparent transition duration-300 absolute bottom-0 top-0 right-0 left-0 bg-gray-900 opacity-25">
              </div>
            </a>
            <a href="#!">
              <div
                class="text-xs absolute top-0 right-0 bg-indigo-600 px-4 py-2 text-white mt-3 mr-3 hover:bg-white hover:text-indigo-600 transition duration-500 ease-in-out">
                ${product.category}
              </div>
            </a>
          </div>

          <div class="px-6 py-4 mb-auto">
            <a href="#" class="font-medium text-lg inline-block hover:text-indigo-600 transition duration-500 ease-in-out inline-block mb-2 line-clamp-2">
              ${product.title}
            </a>
            <p class="text-gray-500 text-sm line-clamp-3">
              ${product.description}
            </p>
          </div>

          <div class="px-6 py-3 flex flex-row items-center justify-between bg-gray-100">
            <span class="py-1 text-xs font-regular text-gray-900 mr-1 flex flex-row items-center">
              <svg height="13px" width="13px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                <path
                  d="M256,0C114.837,0,0,114.837,0,256s114.837,256,256,256s256-114.837,256-256S397.163,0,256,0z M277.333,256 c0,11.797-9.536,21.333-21.333,21.333h-85.333c-11.797,0-21.333-9.536-21.333-21.333s9.536-21.333,21.333-21.333h64v-128 c0-11.797,9.536-21.333,21.333-21.333s21.333,9.536,21.333,21.333V256z">
                </path>
              </svg>
              <span class="ml-1 text-gray-700 font-semibold">${product.rating.rate} ⭐</span>
            </span>

            <span class="py-1 text-xs font-semibold text-blue-700 flex flex-row items-center">
              💰 ${product.price.toFixed(2)} BDT
            </span>
          </div>

          <button class="addBtn bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 text-sm transition">
            🛒 Add to Cart
          </button>
        `;

        productContainer.appendChild(card);

        // Add to cart button action
        card.querySelector(".addBtn").addEventListener("click", () => {
          addToCart(product);
        });
      });
    });

  // Example addToCart function
  function addToCart(product) {
    alert(`✅ Added to cart: ${product.title}`);
  }

// 🧮 Add to Cart
function addToCart(product) {
  if (subtotal + product.price > balance) {
    alert("❌ You don't have enough balance!");
    return;
  }

  cart.push(product);
  subtotal += product.price;
  updateCart();
}

// 🧾 Update Cart
function updateCart() {
  document.getElementById("subtotal").textContent = subtotal.toFixed(2);

  let delivery = 100;
  let discount = parseFloat(document.getElementById("discount").textContent);
  let total = subtotal + delivery - discount;

  document.getElementById("total").textContent = total.toFixed(2);
}

// 🎟️ Coupon Code
document.getElementById("applyCoupon").addEventListener("click", () => {
  let code = document.getElementById("coupon").value;

  if (code === "SMART10") {
    let discount = subtotal * 0.1;
    document.getElementById("discount").textContent = discount.toFixed(2);
    alert("✅ Coupon Applied! 10% Discount");
  } else {
    alert("❌ Wrong Coupon Code");
  }
  updateCart();
});

// 🧹 Clear Cart
document.getElementById("clearCart").addEventListener("click", () => {
  cart = [];
  subtotal = 0;
  document.getElementById("discount").textContent = "0";
  updateCart();
  alert("🧺 Cart Cleared!");
});

// 💰 Balance System
let balanceText = document.getElementById("userBalance");
document.getElementById("addMoneyBtn").addEventListener("click", () => {
  balance += 1000;
  balanceText.textContent = `Balance: ${balance} BDT`;
  alert("💸 1000 BDT Added!");
});

// ⭐ Customer Reviews
fetch("data/reviews.json")
  .then(res => res.json())
  .then(reviews => {
    const box = document.getElementById("reviewContainer");
    box.innerHTML = "";
    reviews.forEach(r => {
      box.innerHTML += `
        <div class="p-4 bg-white rounded shadow text-center min-w-[220px]">
          <p class="italic text-gray-700 mb-2">"${r.comment}"</p>
          <h4 class="font-semibold">${r.name}</h4>
          <p class="text-yellow-500 font-medium">⭐ ${r.rating}</p>
          <p class="text-sm text-gray-400">${r.date}</p>
        </div>
      `;
    });
  })
  .catch(() => {
    document.getElementById("reviewContainer").innerHTML =
      `<p class="text-red-600">Error</p>`;
  });





