import { PRODUCTS, getCategories } from "../../../data/data";
import { addToCart } from "../cart/cart";

const productsContainer = document.getElementById("products") as HTMLDivElement;
const searchInput = document.getElementById("searchInput") as HTMLInputElement;
const categoriesContainer = document.getElementById("categories") as HTMLDivElement;

function renderProducts(products: any[]) {
  productsContainer.innerHTML = "";

  if (products.length === 0) {
    productsContainer.innerHTML = "<p>No se encontraron productos</p>";
    return;
  }

  products.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product-card");

  div.innerHTML = `
  <h3>${product.name}</h3>
  <p class="price">$${product.price}</p>
  <button>Agregar</button>
`;

    const button = div.querySelector("button") as HTMLButtonElement;

    button.addEventListener("click", () => {
      addToCart(product);
      alert("Producto agregado");
    });

    productsContainer.appendChild(div);
  });
}

searchInput.addEventListener("input", () => {
  const text = searchInput.value.toLowerCase();

  const filtered = PRODUCTS.filter(p =>
    p.name.toLowerCase().includes(text)
  );

  renderProducts(filtered);
});

function renderCategories() {
  const categories = getCategories();

  categoriesContainer.innerHTML = `<button id="all">Todas</button>`;

  categories.forEach(cat => {
    const btn = document.createElement("button");
    btn.textContent = cat.name;

    btn.addEventListener("click", () => {
      const filtered = PRODUCTS.filter(p =>
        String(p.category) === String(cat.id)
      );

      renderProducts(filtered);
    });

    categoriesContainer.appendChild(btn);
  });

  document.getElementById("all")?.addEventListener("click", () => {
    renderProducts(PRODUCTS);
  });
}

renderProducts(PRODUCTS);
renderCategories();