import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateProductRequest } from "./types";
import { createProduct, deleteProduct, getAllProducts, getMyProducts, getProductById, getRelatedProducts, updateProduct } from "./operations";

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateProductRequest) => createProduct(data),

    // ✅ Invalidate products list after creating
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetAllProducts = (params: any) => {
  return useInfiniteQuery({
    queryKey: ["products", params],
    queryFn: ({ pageParam = 1 }) => getAllProducts({ pageParam, params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.pagination?.hasNextPage) {
        return lastPage.data.pagination.page + 1;
      }
      return undefined;
    },
  });
};

export const useGetProductById = (id: number) => {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => getProductById(id),
    enabled: !!id, // only run if id exists
  });
};

export const useGetRelatedProducts = (id: number) => {
  return useQuery({
    queryKey: ["relatedProducts", id],
    queryFn: () => getRelatedProducts(id),
    enabled: !!id,
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateProductRequest }) =>
      updateProduct(id, data),

    // ✅ Invalidate products list after updating
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => deleteProduct(id),

    // ✅ Refetch product list after successful deletion
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });
};

export const useGetMyProducts = () => {
  return useQuery({
    queryKey: ["my-products"],
    queryFn: getMyProducts,
  });
};