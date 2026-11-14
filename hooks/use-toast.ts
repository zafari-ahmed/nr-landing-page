"use client";

// Minimal toast hook wrapper around sonner, matching the call shape
// used by ContactForm: toast({ title, description, variant }).
import { toast as sonnerToast } from "sonner";

type ToastOptions = {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
};

function toast({ title, description, variant }: ToastOptions) {
  const message = title ?? "";
  if (variant === "destructive") {
    return sonnerToast.error(message, { description });
  }
  return sonnerToast.success(message, { description });
}

export function useToast() {
  return { toast };
}

export { toast };
