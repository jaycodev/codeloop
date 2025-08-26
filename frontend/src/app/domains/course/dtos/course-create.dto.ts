export interface CourseCreateDTO {
  courseId?: number;
  title: string;
  description: string;
  price: number;    
  teacherId: number;
}
