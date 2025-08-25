export interface CourseCreateDTO {
  courseId?: number;
  title: string;
  description: string;
  price: number;    // decimal como number en TS
  teacherId: number;
}
