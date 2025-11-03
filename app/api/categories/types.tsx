export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  storeId: number;
  imageUrl: string;
  categoryId: number;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
}

export interface Category {
  id: number;
  name: string;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}

export interface GetAllCategoriesResponse {
  status: boolean;
  categories: Category[];
}
