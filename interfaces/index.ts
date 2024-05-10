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
