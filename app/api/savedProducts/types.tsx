export interface savedProductsRequest {
  productId: number
}

export interface SavedProductsResponse {
  count: number;
  savedProducts: SavedProduct[];
}

export interface SavedProduct {
  id: number;
  userId: number;
  productId: number;
  createdAt: string;
  product: Product;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  phone: string;
  location: string;
  price: number;
  storeId: number;
  imageUrl: string[];
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  store: Store;
  category: Category;
}

export interface Store {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  location: string;
  ownerId: number;
  createdAt: string;
  updatedAt: string;
}

export interface Category {
  id: number;
  name: string;
  img: string | null;
  createdAt: string;
  updatedAt: string;
}