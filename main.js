async function fetchProducts() {
  const container = document.getElementById("products-container");

  try {
    container.innerHTML =
      '<div class="loading">Mahsulotlar yuklanmoqda...</div>';

    const res = await fetch("https://fakestoreapi.com/products");

    if (!res.ok) {
      throw new Error(`HTTP xatosi! Status: ${res.status}`);
    }

    const products = await res.json();
    displayProducts(products);
  } catch (error) {
    console.error("Mahsulotlarni yuklashda xato:", error);
    container.innerHTML =
      '<div class="error">Mahsulotlarni yuklashda xato yuz berdi. Iltimos, keyinroq urunib ko\'ring.</div>';
  }
}

function displayProducts(products) {
  const container = document.getElementById("products-container");

  if (products.length === 0) {
    container.innerHTML = '<div class="error">Mahsulotlar topilmadi</div>';
    return;
  }

  const productsHTML = products
    .map(
      (product) => `
          <div class="product-card">
            <img 
              src="${product.image}" 
              alt="${product.title}"
              class="product-image"
              onerror="this.src='https://via.placeholder.com/300x300?text=Rasm+Yuklanmadi'"
            >
            <h3 class="product-title">${product.title}</h3>
            <div class="product-price">$${product.price}</div>
            <div class="product-rating">
              <span>⭐ ${product.rating.rate}</span>
              <span>(${product.rating.count} baho)</span>
            </div>
            <p class="text-sm text-gray-600 mt-2">${product.category}</p>
            <button 
              class="w-full bg-[#7000ff] text-white py-2 rounded-lg mt-3 hover:bg-[#5a00cc] transition-colors"
              onclick="addToCart(${product.id})"
            >
              Savatga qo'shish
            </button>
          </div>
        `
    )
    .join("");

  container.innerHTML = productsHTML;
}

document.addEventListener("DOMContentLoaded", fetchProducts);
