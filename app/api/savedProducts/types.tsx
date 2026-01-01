export interface savedProductsRequest {
  productId?: number;
  page?: number;
  limit?: number;

}

export interface SavedProductsResponse {
  success: boolean;
  data: SavedProduct[];
  pagination: Pagination;
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
  imageUrl: string;
  location: string;
}

export interface Category {
  id: number;
  name: string;
  img: string | null;
}

export interface Pagination {
  currentPage: number;
  totalPages: number;
  totalCount: number;
  limit: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}