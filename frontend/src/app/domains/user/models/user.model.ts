export interface User {
  userId: number;
  name: string;
  email: string;
  role: 'ESTUDIANTE' | 'PROFESOR' | 'ADMIN';
  status: string;
  createdAt: string;
}
