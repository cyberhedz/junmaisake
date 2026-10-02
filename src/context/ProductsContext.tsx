import { createContext, useContext, useMemo, useState, type ReactNode } from 'react';
import { products as seedProducts } from '../data/products';
import { breweries } from '../data/breweries';
import type { Product, SellFormInput } from '../types';

const STORAGE_KEY = 'junmaisake.sellerProducts.v1';

function loadSellerProducts(): Product[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function slugify(name: string) {
  return name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

interface ProductsContextValue {
  products: Product[];
  findProduct: (id: string) => Product | undefined;
  findProductBySlug: (slug: string) => Product | undefined;
  productsByBrewery: (breweryId: string) => Product[];
  addProduct: (input: SellFormInput) => Product;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const [sellerProducts, setSellerProducts] = useState<Product[]>(() => loadSellerProducts());

  const products = useMemo(() => [...seedProducts, ...sellerProducts], [sellerProducts]);

  function findProduct(id: string) {
    return products.find((p) => p.id === id);
  }

  function findProductBySlug(slug: string) {
    return products.find((p) => p.slug === slug);
  }

  function productsByBrewery(breweryId: string) {
    return products.filter((p) => p.breweryId === breweryId);
  }

  function addProduct(input: SellFormInput): Product {
    const brewery = breweries.find((b) => b.id === input.breweryId);
    const baseSlug = slugify(input.name) || `product-${Date.now()}`;
    const id = `pr-seller-${Date.now()}`;
    const product: Product = {
      id,
      slug: baseSlug,
      name: input.name,
      nameJa: input.nameJa,
      breweryId: input.breweryId,
      style: input.style,
      price: input.price,
      size: input.size,
      region: input.region || brewery?.region || '',
      abv: input.abv,
      smv: input.smv,
      rice: input.rice,
      description: input.description,
      color: input.color,
    };
    const next = [...sellerProducts, product];
    setSellerProducts(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    return product;
  }

  return (
    <ProductsContext.Provider
      value={{ products, findProduct, findProductBySlug, productsByBrewery, addProduct }}
    >
      {children}
    </ProductsContext.Provider>
  );
}

export function useProducts() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProducts must be used within ProductsProvider');
  return ctx;
}
