import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with clsx and tailwind-merge.
 * @param {...string} inputs - Class names or conditional class objects.
 * @returns {string} - Merged class names.
 */
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
