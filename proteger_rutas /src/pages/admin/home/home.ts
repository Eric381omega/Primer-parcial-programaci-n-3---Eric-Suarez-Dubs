import { checkAuhtUser, logout } from "../../../utils/auth";
import { getProducts, addProduct, deleteProduct, updateProduct } from "../../../utils/products";

const buttonLogout = document.getElementById("logoutButton") as HTMLButtonElement;
buttonLogout?.addEventListener("click", () => {
  logout();
});

const nameInput = document.getElementById("name") as HTMLInputElement;
const priceInput = document.getElementById("price") as HTMLInputElement;
const categoryInput = document.getElementById("category") as HTMLInputElement;
const descriptionInput = document.getElementById("description") as HTMLTextAreaElement;
const imageInput = document.getElementById("image") as HTMLInputElement;

const addBtn = document.getElementById("addProductBtn") as HTMLButtonElement;
const container = document.getElementById("adminProducts")!;

let editingId: number | null = null;

function renderProducts() {
  const products = getProducts();
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
      <p class="category">${p.category}</p>

      <button class="edit">Editar</button>
      <button class="delete">Eliminar</button>
    `;

    div.querySelector(".delete")?.addEventListener("click", () => {
      deleteProduct(p.id);
      renderProducts();
    });

    div.querySelector(".edit")?.addEventListener("click", () => {
      nameInput.value = p.name;
      priceInput.value = String(p.price);
      categoryInput.value = p.category;
      descriptionInput.value = p.description;
      imageInput.value = p.image;

      editingId = p.id;
      addBtn.textContent = "Guardar cambios";
    });

    container.appendChild(div);
  });
}

addBtn?.addEventListener("click", () => {
  const name = nameInput.value.trim();
  const price = Number(priceInput.value);
  const category = categoryInput.value.trim();
  const description = descriptionInput.value.trim();
  const image = imageInput.value.trim();

  if (!name || !price || !category) return;

  if (editingId) {
    updateProduct({
      id: editingId,
      name,
      price,
      category,
      description,
      image,
    });
  } else {
    addProduct({
      name,
      price,
      category,
      description,
      image,
    });
  }

  resetForm();
  renderProducts();
});

function resetForm() {
  nameInput.value = "";
  priceInput.value = "";
  categoryInput.value = "";
  descriptionInput.value = "";
  imageInput.value = "";

  editingId = null;
  addBtn.textContent = "Agregar";
}

const initPage = () => {
  console.log("inicio de pagina");

  checkAuhtUser(
    "/src/pages/auth/login/login.html",
    "/src/pages/client/home/home.html",
    "admin"
  );

  renderProducts();
};

initPage();