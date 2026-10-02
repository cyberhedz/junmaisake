// Shaped so this can move to a real database later: every entity has a
// stable `id` (and a human `slug` for URLs), and nothing here depends on
// being in-memory — it's just plain, serializable data.

export type SakeStyle = 'Junmai' | 'Junmai Ginjo' | 'Junmai Daiginjo';

export interface Brewery {
  id: string;
  slug: string;
  name: string;
  nameJa: string;
  region: string;
  founded: number;
  story: string;
  /** Hex color used for the hero block and bottle placeholders — no photos. */
  color: string;
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  nameJa: string;
  breweryId: string;
  style: SakeStyle;
  /** Price in whole US dollars. */
  price: number;
  size: string;
  region: string;
  abv: number;
  /** Sake Meter Value — negative is sweeter, positive is drier. */
  smv: number;
  rice: string;
  description: string;
  /** Hex color used as the bottle placeholder when there's no product photo. */
  color: string;
  featured?: boolean;
}

export interface CartLine {
  productId: string;
  quantity: number;
}

export interface ShippingInfo {
  fullName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  email: string;
}

export interface MockUser {
  email: string;
  name: string;
}

export interface SellFormInput {
  name: string;
  nameJa: string;
  breweryId: string;
  style: SakeStyle;
  price: number;
  size: string;
  region: string;
  abv: number;
  smv: number;
  rice: string;
  description: string;
  color: string;
}
