import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CreateAuthRequest } from "./types";
import { deleteUser, getUserProfile, login, register, updateUserProfile } from "./operations";

export const useRegisterUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAuthRequest) => register(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["register"] });
    },
  });
};

export const useLoginUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateAuthRequest) => login(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login"] });
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateUserProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

// export const useGetStoreById = (id: number) => {
//   return useQuery({
//     queryKey: ["store", id],
//     queryFn: () => getStoreById(id),
//     enabled: !!id, // only run if id exists
//   });
// };

export const useGetUserProfile = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getUserProfile,
  });
};