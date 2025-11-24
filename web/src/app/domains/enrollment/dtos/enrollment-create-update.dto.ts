export interface EnrollmentCreateOrUpdateDto {
  studentId: number;        // mappea idStudent
  courseId: number;         // mappea idCourse
  enrollmentDate?: string | Date;
  progress?: number;
  status?: string;
}