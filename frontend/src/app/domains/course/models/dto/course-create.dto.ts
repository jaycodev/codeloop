export interface CourseCreateDTO {
  title: string;
  description: string;
  price: number;    // decimal como number en TS
  teacherId: number;
}
