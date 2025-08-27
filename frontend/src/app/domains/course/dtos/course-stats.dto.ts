// Un curso reciente (lastCourses) => [id, título, profesor, image, fecha]
export type LastCourseTuple = [id:number, titulo:string, profesor:string, url:string,fecha:string];

// Un curso destacado (topCourses) => [id, título, profesor, image, cantidad]
export type TopCourseTuple = [id:number, titulo:string, profesor:string, url:string,cantidad:number];

// Interfaz principal que agrupa todo
export interface CourseStats {
  lastCourses: LastCourseTuple[];
  coursesLastMonth: number;
  totalCourses: number;
  topCourses: TopCourseTuple[];
}
