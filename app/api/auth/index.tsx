import { useMutation, useQueryClient } from "@tanstack/react-query";
import { CreateAuthRequest } from "./types";
import { login, register } from "./operations";

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