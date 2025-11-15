import { customAxiosInstance } from "@/app/BaseUrl"
import { CreateProductRequest } from "./types"

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

console.log(token, "token")


export const createProduct = async (data: CreateProductRequest) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const res = await customAxiosInstance.post(
    "/products",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getAllProducts = async ({ pageParam = 1, params }: { pageParam?: number; params: any }) => {
  const res = await customAxiosInstance.get("/products", {
    params: {
      page: pageParam,
      ...params, // search, sort, location filters, etc.
    },
  });
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await customAxiosInstance.get(`/products/${id}`);
  return res.data;
};

export const getRelatedProducts = async (id: number) => {
  const res = await customAxiosInstance.get(`/products/${id}/related`);
  return res.data;
};

export const updateProduct = async (id: number, data: CreateProductRequest) => {
  return await customAxiosInstance.put(`/products/${id}`, data)
}

export const deleteProduct = async (id: number) => {
 
  const res = await customAxiosInstance.delete(`/products/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getMyProducts = async () => {

  const res = await customAxiosInstance.get(`/products/my-products`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};