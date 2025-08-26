import { User } from '@domains/user/models/user.model';

export interface Course {
  courseId?: number;
  title: string;
  description: string;
  teacher: User;
  price: number;
}
