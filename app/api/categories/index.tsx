import { useQuery } from "@tanstack/react-query";
import { getCategories } from "./operations";

export const useGetCategories = () => {
  return useQuery({
    queryKey: ["categories"],
    queryFn: getCategories,
  });
};
