import { HttpErrorResponse } from '@angular/common/http';

export function extractApiError(err: HttpErrorResponse): string {
  return (
    (err.error as { message?: string })?.message ??
    err.message ??
    'Unknown error'
  );
}

export function isConflictError(err: HttpErrorResponse): boolean {
  return err.status === 409;
}

export function mapHttpErrorToMessage(err: HttpErrorResponse): string {
  switch (err.status) {
    case 400:
      return 'Bad request. Please check your input.';
    case 401:
      return 'Unauthorized. Please log in again.';
    case 403:
      return 'Forbidden. You do not have permission.';
    case 404:
      return 'Resource not found.';
    case 409:
      return 'Conflict. The resource was modified by another user.';
    default:
      return extractApiError(err);
  }
}
