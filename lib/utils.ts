import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function calculateDisplayWidth(
  imageWidth: number,
  imageHeight: number,
  imageDisplayHeight: number
) {
  if (!imageHeight || imageHeight <= 0) {
    return Math.round(imageDisplayHeight) // Return display height as width for 1:1 ratio fallback
  }

  return Math.round((imageDisplayHeight / imageHeight) * imageWidth)
}
