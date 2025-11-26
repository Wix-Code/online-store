import { useMutation, useQueryClient } from "@tanstack/react-query";
import { saveProduct } from "./operations";
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
