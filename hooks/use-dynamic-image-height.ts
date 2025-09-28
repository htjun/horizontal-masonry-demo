'use client'

import { type RefObject, useLayoutEffect, useState } from 'react'

export function useDynamicImageHeight(
  containerRef: RefObject<HTMLElement | null>,
  rowCount: number
) {
  const [imageHeight, setImageHeight] = useState(300)

  useLayoutEffect(() => {
    const container = containerRef.current
    if (!container) return

    let rafId: number | null = null

    const calculateHeight = () => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }

      rafId = requestAnimationFrame(() => {
        const containerHeight = container.clientHeight
        const gapSize = 4
        const totalGaps = (rowCount - 1) * gapSize
        const availableHeight = containerHeight - totalGaps
        const calculatedHeight = Math.floor(availableHeight / rowCount)

        setImageHeight(Math.max(100, calculatedHeight))
        rafId = null
      })
    }

    calculateHeight()

    const resizeObserver = new ResizeObserver(() => {
      calculateHeight()
    })

    resizeObserver.observe(container)

    return () => {
      resizeObserver.disconnect()
      if (rafId !== null) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [containerRef, rowCount])

  return imageHeight
}
