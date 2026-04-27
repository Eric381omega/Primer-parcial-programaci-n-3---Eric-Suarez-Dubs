import type { Product } from "../types/product";
import type { ICategoria } from "../types/categoria";

export const PRODUCTS: Product[] = [
  { id: 1, name: "Hamburguesa", price: 2000, category: "Comida", image: "" },
  { id: 2, name: "Pizza", price: 3000, category: "Comida", image: "" },
  { id: 3, name: "Coca Cola", price: 1500, category: "Bebida", image: "" },
  { id: 4, name: "Agua", price: 1000, category: "Bebida", image: "" }
];

export function getCategories(): ICategoria[] {
  return [
    { id: 1, name: "Todos" },
    { id: 2, name: "Comida" },
    { id: 3, name: "Bebida" }
  ];
}