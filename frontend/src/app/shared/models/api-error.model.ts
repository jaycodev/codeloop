export interface ApiError {
  success: boolean;
  message: string;
  errorType: string;
  statusCode: number;
}
