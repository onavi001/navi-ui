import { toast as sonnerToast } from 'sonner'

export interface UseToastReturn {
  toast: typeof sonnerToast
  success: typeof sonnerToast.success
  error: typeof sonnerToast.error
  warning: typeof sonnerToast.warning
  info: typeof sonnerToast.info
  loading: typeof sonnerToast.loading
  // Keep a stable public signature for d.ts generation.
  promise: (...args: Parameters<typeof sonnerToast.promise>) => void
  dismiss: typeof sonnerToast.dismiss
  message: typeof sonnerToast.message
  custom: typeof sonnerToast.custom
}

/**
 * Hook with Sonner-based toast API (success, error, warning, info, loading, promise).
 */
export function useToast(): UseToastReturn {
  return {
    toast: sonnerToast,
    success: sonnerToast.success,
    error: sonnerToast.error,
    warning: sonnerToast.warning,
    info: sonnerToast.info,
    loading: sonnerToast.loading,
    promise: sonnerToast.promise,
    dismiss: sonnerToast.dismiss,
    message: sonnerToast.message,
    custom: sonnerToast.custom,
  }
}
