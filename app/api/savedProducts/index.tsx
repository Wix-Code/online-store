import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSavedProducts, saveProduct, unSaveProduct } from "./operations";
import { savedProductsRequest } from "./types";

export const useSavedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: savedProductsRequest) => saveProduct(data),

    // ✅ Invalidate products list after creating
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved"] });
    },
  });
};

export const useGetSavedProducts = (params: savedProductsRequest) => {
  return useQuery({
    queryKey: ["saved", params],
    queryFn: () => getSavedProducts(params),
    //enabled: !!params.page, // run only when params are ready
  });
};

export const useUnSavedProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: savedProductsRequest) => unSaveProduct(data),

    // ✅ Invalidate products list after creating
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["saved"] });
    },
  });
};