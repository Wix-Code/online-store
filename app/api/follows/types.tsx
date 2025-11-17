export interface FollowRequest {
  followerId?: number,
  followingId?: number,
  userId?: number
}

export interface FollowingUser {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  image: string | null;
}

export interface GetFollowingResponse {
  status: boolean;
  message: string;
  data: FollowingUser[];
}