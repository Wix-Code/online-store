export interface CreateAuthRequest {
  email?: string,
  firstName?: string,
  lastName?: string,
  password?: string
}

export interface LoginResponse {
  message: string;
  user: {
    id: number;
    email: string;
    firstName: string;
    lastName: string;
    role: "CUSTOMER" | "ADMIN" | string;
  }
  token: string;
}