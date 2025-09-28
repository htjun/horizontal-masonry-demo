'use client'

import { useEffect, useRef } from 'react'

export function useWheelToHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const handleWheel = (e: WheelEvent) => {
      if (e.deltaY === 0) return

      const scrollAmount = e.deltaY * 1.5

      element.scrollBy({
        left: scrollAmount,
        behavior: 'instant',
      })
    }

    element.addEventListener('wheel', handleWheel, { passive: true })

    return () => {
      element.removeEventListener('wheel', handleWheel)
    }
  }, [])

  return ref
}
