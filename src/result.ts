import type { ErrorCode } from "./errors.ts";

/** Discriminated union result type for all service functions. */
export type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string; code: ErrorCode };

/** Wrap a successful result. */
export function ok<T>(data: T): ServiceResult<T> {
  return { success: true, data };
}

/** Wrap a failure result. */
export function err<T = never>(message: string, code: ErrorCode): ServiceResult<T> {
  return { success: false, error: message, code };
}
