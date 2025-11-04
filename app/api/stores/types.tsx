export interface Stores {
  id?: number;
  name?: string;
  description?: string;
  location?: string;
  owner?: number;   // userId of the owner
  imageUrl?: string | null;
  categoryId?: number;
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

export interface StoreData {
  stores: Stores[];
  pagination: Pagination;
}

export interface GetAllStoresResponse {
  status: boolean;
  message: string;
  data: StoreData;
}

export interface CreateStoreRequest {
  id?: number;
  name?: string;
  description?: string;
  imageUrl?: string;
  location?: string;
  owner?: number;   // userId of the owner
  category?: string; // category name (could also be categoryId depending on schema)
}

export interface CreateStoreResponse {
  status: boolean;
  message: string;
  store: Stores;
}