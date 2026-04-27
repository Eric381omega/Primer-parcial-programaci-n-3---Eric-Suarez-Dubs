import { getProducts } from "../../../utils/products";
import { addToCart } from "../../../utils/cart";
import { checkAuhtUser } from "../../../utils/auth";

const container = document.getElementById("products")!;
const searchInput = document.getElementById("search") as HTMLInputElement;
const categoryContainer = document.getElementById("categories")!;

let currentCategory = "Todos";

function renderProducts(products: any[]) {
  container.innerHTML = "";

  if (products.length === 0) {
    container.innerHTML = "<p>No hay productos</p>";
    return;
  }

  products.forEach(p => {
    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${p.image}" alt="${p.name}" />
      <h3>${p.name}</h3>
      <p>${p.description}</p>
      <p class="price">$${p.price}</p>
      <button>Agregar</button>
    `;

    const btn = div.querySelector("button")!;
    btn.addEventListener("click", () => {
      addToCart(p);
      alert("Producto agregado");
    });

    container.appendChild(div);
  });
}

function filterProducts() {
  const text = searchInput.value.toLowerCase();
  const allProducts = getProducts();

  let filtered = allProducts.filter(p =>
    p.name.toLowerCase().includes(text)
  );

  if (currentCategory !== "Todos") {
    filtered = filtered.filter(p => p.category === currentCategory);
  }

  renderProducts(filtered);
}

searchInput.addEventListener("input", filterProducts);

function renderCategories(products: any[]) {
  categoryContainer.innerHTML = "";

  const categories = ["Todos", ...new Set(products.map(p => p.category))];

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat;

    btn.addEventListener("click", () => {
      currentCategory = cat;
      filterProducts();
    });

    categoryContainer.appendChild(btn);
  });
}

const init = () => {
  checkAuhtUser(
    "/src/pages/auth/login/login.html",   
    "/src/pages/admin/home/home.html",    
    "client"
  );

  const products = getProducts();

  renderCategories(products);
  renderProducts(products);
};

init();