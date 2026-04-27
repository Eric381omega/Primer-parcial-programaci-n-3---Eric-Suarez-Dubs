import type { CartItem, Product } from "../types/product";

const KEY = "cart";

export function getCart(): CartItem[] {
  return JSON.parse(localStorage.getItem(KEY) || "[]") as CartItem[];
}

export function saveCart(cart: CartItem[]): void {
  localStorage.setItem(KEY, JSON.stringify(cart));
}

export function addToCart(product: Product): void {
  const cart = getCart();

  const existing = cart.find((p) => p.id === product.id);

  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
}

export function getTotal(): number {
  const cart = getCart();

  return cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);
}