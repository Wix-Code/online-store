import { customAxiosInstance } from "@/app/BaseUrl"
import { CreateStoreRequest } from "./types";

export const createStore = async (data: CreateStoreRequest) => {
  return await customAxiosInstance.post<CreateStoreRequest>(`/stores`, data)
}

export const getAllStores = async ({ pageParam = 1, params }: { pageParam?: number; params: any }) => {
  const res = await customAxiosInstance.get("/stores", {
    params: {
      page: pageParam,
      ...params, // search, sort, location filters, etc.
    },
  });
  return res.data;
};

export const updateStore = async (id: number, data: CreateStoreRequest) => {
  return await customAxiosInstance.put(`/stores/${id}`, data)
}

export const deleteStore = async (id: number, data: CreateStoreRequest) => {
  return await customAxiosInstance.delete(`/stores/${id}`, { data })
}

export const getStoreById = async (id: number) => {
  const res = await customAxiosInstance.get(`/stores/${id}`);
  return res.data;
};