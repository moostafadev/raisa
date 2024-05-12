export interface IMenu {
  id: string;
  title: string;
  body?: string | null;
  price: number;
  size?: string | null;
  kcal?: number | null;
  image?: string | null;
  category?: Category | null;
  categoryId?: string | null;
}

export interface Category {
  id: string;
  title: string;
  products?: IMenu[];
}

export interface Cart {
  id?: string;
  productId: string;
  qyt?: number;
  email?: string;
  username?: string | null;
  phone?: number | null;
  condition?: boolean | null;
  address?: Address | null;
}

export interface Address {
  city: City;
  state: string;
  street: string;
  home: string;
  house: number;
}

export enum City {
  Riyad = "Riyad",
  Abha = "Abha",
}
