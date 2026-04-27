const STORAGE_KEY = "products";

export type Product = {
  id: number;
  name: string;
  price: number;
  category: string;
  description: string;
  image: string;
};

function normalizeProducts(products: any[]): Product[] {
  return products.map(p => ({
    id: p.id,
    name: p.name,
    price: p.price,
    category: p.category || "Sin categoría",
    description: p.description || "",
    image: p.image || "https://via.placeholder.com/150",
  }));
}

export function getProducts(): Product[] {
  const data = localStorage.getItem(STORAGE_KEY);
  const parsed = data ? JSON.parse(data) : [];

  return normalizeProducts(parsed);
}

function saveProducts(products: Product[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
}

export function addProduct(product: Omit<Product, "id">) {
  const products = getProducts();

  const newProduct: Product = {
    ...product,
    id: Date.now(),
  };

  products.push(newProduct);
  saveProducts(products);
}

export function updateProduct(updated: Product) {
  const products = getProducts().map(p =>
    p.id === updated.id ? updated : p
  );

  saveProducts(products);
}

export function deleteProduct(id: number) {
  const products = getProducts().filter(p => p.id !== id);
  saveProducts(products);
}