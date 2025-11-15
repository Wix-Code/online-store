export interface CreateAuthRequest {
  email?: string,
  firstName?: string,
  lastName?: string,
  password?: string
  gender?: string
  phone?: string
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