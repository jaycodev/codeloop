export interface CourseDTO {
  courseId: number;
  title: string;
  description: string;
  teacherName: string;
  price: number;
  createdAt: string; // ISO string desde el backend
}
