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
      const verticalPadding = 80
      const totalGaps = (rowCount - 1) * gapSize
      const availableHeight = viewportHeight - totalGaps - verticalPadding
      const calculatedHeight = Math.floor(availableHeight / rowCount)

      setImageHeight(calculatedHeight)
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
