import { useInfiniteQuery, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createStore, deleteStore, getAllStores, getMyStore, getStoreById, updateStore } from "./operations";
import { CreateStoreRequest } from "./types";
import { customAxiosInstance } from "@/app/BaseUrl";

export const useCreateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateStoreRequest) => createStore(data),

    // ✅ Invalidate stores list after creating
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStore"] });
    },
  });
};

export const useGetAllStores = (params: any) => {
  return useInfiniteQuery({
    queryKey: ["stores", params],
    queryFn: ({ pageParam = 1 }) => getAllStores({ pageParam, params }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (lastPage?.data?.pagination?.hasNextPage) {
        return lastPage.data.pagination.page + 1;
      }
      return undefined;
    },
  });
};

export const useUpdateStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myStore"] });
    },
  });
};

export const useDeleteStore = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: CreateStoreRequest }) =>
      deleteStore(id, data),

    // ✅ Invalidate products list after deletion
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["stores"] });
    },
  });
};

export const useGetStoreById = (id: number) => {
  return useQuery({
    queryKey: ["store", id],
    queryFn: () => getStoreById(id),
    enabled: !!id, // only run if id exists
  });
};

export const useGetMyStore = () => {
  return useQuery({
    queryKey: ["myStore"],
    queryFn: getMyStore,
  });
};