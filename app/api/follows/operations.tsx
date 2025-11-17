import { customAxiosInstance } from "@/app/BaseUrl"
import { FollowRequest, GetFollowingResponse } from "./types"

export const followUser = async (data: FollowRequest) => {
  const token = typeof window !== "undefined"
    ? localStorage.getItem("token")
    : null;
  
  console.log(token, "token")
  const res = await customAxiosInstance.post(
    "/follow/follow-user",
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
}

export const unFollowUser = async (data: FollowRequest) => {
  return await customAxiosInstance.post(`/follow/unfollow-user`, data)
  //return res.data
}

export const getUserFollowing = async (userId: number) => {
  const res = await customAxiosInstance.get<GetFollowingResponse>(`/follow/following`, {
    params: { userId }
  })
  return res.data
}

export const getUserFollowers = async (userId: number) => {
  const res = await customAxiosInstance.get<GetFollowingResponse>(`/follow/followers`, {
    params: { userId }
  })
  return res.data
}