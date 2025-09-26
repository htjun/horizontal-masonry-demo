'use client'

import { useMemo } from 'react'
import { type ImageData, images } from '@/data/images'
import { calculateDisplayWidth } from '@/lib/utils'
import { ImageCard } from './image-card'

interface HorizontalMasonryProps {
  rowCount: number
  imageDisplayHeight: number
}

export function HorizontalMasonry({ rowCount, imageDisplayHeight }: HorizontalMasonryProps) {
  const imageRows = useMemo(() => {
    const rows: ImageData[][] = Array.from({ length: rowCount }, () => [])
    const rowWidths = Array(rowCount).fill(0)

    // Distribute images to the row with least total width
    images.forEach((image) => {
      const minWidthIndex = rowWidths.indexOf(Math.min(...rowWidths))
      rows[minWidthIndex].push(image)
      rowWidths[minWidthIndex] += image.width
    })

    return rows
  }, [rowCount])

  return (
    <div className="flex flex-col gap-1">
      {imageRows.map((row, index) => (
        // biome-ignore lint: array index key
        <div key={index} className="flex gap-1">
          {row.map((image) => {
            const imageDisplayWidth = calculateDisplayWidth(
              image.width,
              image.height,
              imageDisplayHeight
            )
            return (
              <ImageCard
                key={image.id}
                src={image.fileName}
                title={image.title}
                width={imageDisplayWidth}
                height={imageDisplayHeight}
              />
            )
          })}
        </div>
      ))}
    </div>
  )
}
