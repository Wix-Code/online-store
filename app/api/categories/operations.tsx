import { customAxiosInstance } from "@/app/BaseUrl"
import { GetAllCategoriesResponse } from "./types"

export const getCategories = async () => {
  return await customAxiosInstance.get<GetAllCategoriesResponse>(`/categories`)
}