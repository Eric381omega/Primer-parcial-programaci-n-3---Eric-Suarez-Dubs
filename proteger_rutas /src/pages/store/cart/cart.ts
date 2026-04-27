const STORAGE_KEY = "cart";

type CartItem = {
  id: number;
  name: string;
  price: number;
  quantity: number;
};

export function getCart(): CartItem[] {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

function saveCart(cart: CartItem[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
}

export function addToCart(product: Omit<CartItem, "quantity">): void {
  const cart = getCart();

  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

function getTotal(cart: CartItem[]): number {
  return cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}

function renderCart(): void {
  const container = document.getElementById("cart") as HTMLDivElement;
  const totalEl = document.getElementById("total") as HTMLHeadingElement;

  const cart = getCart();

  container.innerHTML = "";

  if (cart.length === 0) {
    container.innerHTML = "<p>Carrito vacío</p>";
    totalEl.textContent = "";
    return;
  }

  cart.forEach((item) => {
    const div = document.createElement("div");
    div.classList.add("cart-item");

    div.innerHTML = `
      <div class="cart-item-info">
        <h3>${item.name}</h3>
        <span class="price">$${item.price}</span>
        <span>Cantidad: ${item.quantity}</span>
      </div>

      <button data-id="${item.id}">Eliminar</button>
    `;

    const btn = div.querySelector("button") as HTMLButtonElement;

    btn.addEventListener("click", () => {
      const updatedCart = cart.filter((c) => c.id !== item.id);
      saveCart(updatedCart);
      renderCart(); 
    });

    container.appendChild(div); 
  });

  totalEl.textContent = "Total: $" + getTotal(cart);
}

document.addEventListener("DOMContentLoaded", renderCart);