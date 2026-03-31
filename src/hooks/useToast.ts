import { toast as sonnerToast } from 'sonner'

/**
 * Hook with Sonner-based toast API (success, error, warning, info, loading, promise).
 */
export function useToast() {
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
  } as const
}
