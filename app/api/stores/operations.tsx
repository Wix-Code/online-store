import { customAxiosInstance } from "@/app/BaseUrl"
import { CreateStoreRequest } from "./types";

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}


export const createStore = async (data: CreateStoreRequest) => {

  return await customAxiosInstance.post(`/stores`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};


export const getAllStores = async ({ pageParam = 1, params }: { pageParam?: number; params: any }) => {
  const res = await customAxiosInstance.get("/stores", {
    params: {
      page: pageParam,
      ...params, // search, sort, location filters, etc.
    },
  });
  return res.data;
};

export const updateStore = async (data: CreateStoreRequest) => {

  const res = await customAxiosInstance.post("/stores/update-store", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};


export const deleteStore = async (id: number, data: CreateStoreRequest) => {
  return await customAxiosInstance.delete(`/stores/delete-store/${id}`, { data })
}

export const getMyStore = async () => {

  const res = await customAxiosInstance.get(`/stores/my-store`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const getStoreById = async (id: number) => {
  const res = await customAxiosInstance.get(`/stores/${id}`);
  return res.data;
};