import { customAxiosInstance } from "@/app/BaseUrl"
import { CreateAuthRequest, LoginResponse } from "./types"

let token: string | null = null;

if (typeof window !== "undefined") {
  token = localStorage.getItem("token");
}

export const register = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/register`, data)
}

export const login = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/login`, data)
}

export const getUsers = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/users`, data)
}

export const getUserProfile = async () => {

  const res = await customAxiosInstance.get(`/auth/user_profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};

export const updateUserProfile = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/update`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}

export const deleteUser = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/delete`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
}