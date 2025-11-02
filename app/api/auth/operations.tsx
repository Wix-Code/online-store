import { customAxiosInstance } from "@/app/BaseUrl"
import { CreateAuthRequest, LoginResponse } from "./types"

export const register = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/register`, data)
}

export const login = async (data: CreateAuthRequest) => {
  return await customAxiosInstance.post<LoginResponse>(`/auth/login`, data)
}