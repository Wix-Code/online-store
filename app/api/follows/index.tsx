import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { followUser, getUserFollowers, getUserFollowing, unFollowUser } from "./operations";
import { FollowRequest, GetFollowingResponse } from "./types";

export const useGetUserFollowers = (userId?: number) => {
  return useQuery<GetFollowingResponse>({
    queryKey: ["following", userId],
    queryFn: () => getUserFollowers(userId as number),
    enabled: !!userId, 
  });
};

export const useGetUserFollowing = (userId?: number) => {
  return useQuery<GetFollowingResponse>({
    queryKey: ["follow", userId],
    queryFn: () => getUserFollowing(userId as number),
    enabled: !!userId, 
  });
};

export const useFollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FollowRequest) => followUser(data),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["follow"] });
    },
  });
};

export const useUnfollowUser = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: FollowRequest) => unFollowUser(data),

    onSuccess: () => {
      // ✅ Invalidate notifications so UI refreshes
      queryClient.invalidateQueries({ queryKey: ["follow"] });
    },
  });
};