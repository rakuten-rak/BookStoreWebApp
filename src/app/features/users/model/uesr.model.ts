export interface Book {
  id: number;
  name: string;
  category: string;
  price: number;
  description: string;
}

 export interface User {
  // id: string;
  username: string;
  email: string;
  password:string
}

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: User;
}

