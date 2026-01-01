import { customAxiosInstance } from "@/app/BaseUrl";
import { savedProductsRequest, SavedProductsResponse } from "./types";

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

console.log(token, "token")


export const saveProduct = async (data: savedProductsRequest) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const res = await customAxiosInstance.post(
    "/saved/add",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const unSaveProduct = async (data: savedProductsRequest) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;

  const res = await customAxiosInstance.post(
    "/saved/remove",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const getSavedProducts = async (
  params: savedProductsRequest
): Promise<SavedProductsResponse> => {
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  const res = await customAxiosInstance.get("/saved", {
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data; // ✅ FIX — must return a value
};
