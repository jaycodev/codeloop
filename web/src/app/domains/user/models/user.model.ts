export interface User {
  userId?: number;
  name: string;
  email: string;
  password_hash: string;
  role: string;
  status?: string;
  createdAt?: string;
}
