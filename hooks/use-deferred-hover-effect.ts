import { useRef, useState, useEffect, type RefObject } from 'react'

interface UseDeferredHoverEffectOptions {
  delay?: number
  scrollDebounce?: number
  scrollContainerRef?: RefObject<HTMLElement>
}

export function useDeferredHoverEffect(options: UseDeferredHoverEffectOptions = {}) {
  const { delay = 500, scrollDebounce = 150, scrollContainerRef } = options

  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const [isInstantHover, setIsInstantHover] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    const scrollElement = scrollContainerRef?.current

    const handleScroll = () => {
      if (!isScrolling) {
        if (hoverTimeoutRef.current) {
          clearTimeout(hoverTimeoutRef.current)
          hoverTimeoutRef.current = null
        }
        setHoveredId(null)
      }

      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, scrollDebounce)
    }

    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true })
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll)
      }
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [isScrolling, scrollDebounce, scrollContainerRef])

  const handleItemEnter = (itemId: string) => {
    if (isScrolling) return

    if (isInstantHover) {
      setHoveredId(itemId)
    } else {
      hoverTimeoutRef.current = setTimeout(() => {
        setHoveredId(itemId)
        setIsInstantHover(true)
      }, delay)
    }
  }

  const handleItemLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
  }

  const handleContainerLeave = () => {
    if (hoverTimeoutRef.current) {
      clearTimeout(hoverTimeoutRef.current)
      hoverTimeoutRef.current = null
    }
    setHoveredId(null)
    setIsInstantHover(false)
  }

  return {
    hoveredId,
    isInstantHover,
    isScrolling,
    handleItemEnter,
    handleItemLeave,
    handleContainerLeave,
  }
}
