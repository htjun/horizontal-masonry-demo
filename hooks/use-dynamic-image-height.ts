'use client'

import { type RefObject, useLayoutEffect, useState } from 'react'

export function useDynamicImageHeight(
  containerRef: RefObject<HTMLElement | null>,
  rowCount: number
) {
  const [imageHeight, setImageHeight] = useState(300) // Default fallback

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    const calculateHeight = () => {
      const viewportHeight = window.innerHeight
      const gapSize = 4
      const headerHeight = 56
      const bottomPadding = 40
      const totalGaps = (rowCount - 1) * gapSize
      const availableHeight = viewportHeight - headerHeight - bottomPadding - totalGaps
      const calculatedHeight = Math.floor(availableHeight / rowCount)

      // Ensure a reasonable minimum height
      setImageHeight(Math.max(100, calculatedHeight))
    }

    calculateHeight()

    const resizeObserver = new ResizeObserver(() => {
      calculateHeight()
    })

    resizeObserver.observe(container)

    window.addEventListener('resize', calculateHeight)

    return () => {
      resizeObserver.disconnect()
      window.removeEventListener('resize', calculateHeight)
    }
  }, [containerRef, rowCount])

  return imageHeight
}
