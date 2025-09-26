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
  return Math.round((imageDisplayHeight / imageHeight) * imageWidth)
}
