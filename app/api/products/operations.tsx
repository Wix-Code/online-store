import { customAxiosInstance } from "@/app/BaseUrl"
import { CreateProductRequest } from "./types"

export const createProduct = async (data: CreateProductRequest) => {
  return await customAxiosInstance.post(`/products`, data)
}

export const getAllProducts = async ({ pageParam = 1, params }: { pageParam?: number; params: any }) => {
  const res = await customAxiosInstance.get("/products", {
    params: {
      page: pageParam,
      ...params, // search, sort, location filters, etc.
    },
  });
  return res.data;
};

export const updateProduct = async (id: number, data: CreateProductRequest) => {
  return await customAxiosInstance.put(`/products/${id}`, data)
}

export const deleteProduct = async (id: number, data: CreateProductRequest) => {
  return await customAxiosInstance.delete(`/products/${id}`, { data })
}