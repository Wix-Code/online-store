export interface Product {
  id?: number;
  name?: string;
  description: string;
  location?: string;
  price?: number;
  imageUrl?: string[];
  phone?: string;
  category: string;
  createdAt?: string; 
  updatedAt?: string; 
}

export interface Pagination {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPrevPage: boolean;
}

export interface ProductData {
  products: Product[];
  pagination: Pagination;
}

export interface GetAllProductsResponse {
  status: boolean;
  message: string;
  data: ProductData;
}

export interface CreateProductRequest {
  name: string;
  description: string;
  imageUrl: string[];
  price: number;
  location: string;
  storeId: number;
  categoryId?: number;
  userId?: number;
  phone?: string;
}