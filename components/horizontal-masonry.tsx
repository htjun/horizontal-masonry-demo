'use client'

import { useMemo } from 'react'
import { type ImageData, images } from '@/data/images'
import { calculateDisplayWidth } from '@/lib/utils'
import { ImageCard } from './image-card'

interface HorizontalMasonryProps {
  rowCount: number
  imageDisplayHeight: number
  showCount: boolean
}

type ImageWithDisplayDimensions = ImageData & { displayWidth: number; sequentialIndex: number }

export function HorizontalMasonry({
  rowCount,
  imageDisplayHeight,
  showCount,
}: HorizontalMasonryProps) {
  const imageRows = useMemo(() => {
    const rows: ImageWithDisplayDimensions[][] = Array.from({ length: rowCount }, () => [])
    const rowWidths = Array(rowCount).fill(0)

    // Distribute images to the row with least total width
    images.forEach((image, index) => {
      const imageDisplayWidth = calculateDisplayWidth(image.width, image.height, imageDisplayHeight)
      const imageWithDimensions: ImageWithDisplayDimensions = {
        ...image,
        displayWidth: imageDisplayWidth,
        sequentialIndex: index + 1,
      }

      const minWidthIndex = rowWidths.indexOf(Math.min(...rowWidths))
      rows[minWidthIndex].push(imageWithDimensions)
      rowWidths[minWidthIndex] += imageDisplayWidth
    })

    return rows
  }, [rowCount, imageDisplayHeight])

  return (
    <div className="flex flex-col gap-1 w-max">
      {imageRows.map((row, index) => (
        // biome-ignore lint: array index key
        <div key={index} className="flex gap-1 [&>*:last-child]:grow">
          {row.map((image) => (
            <ImageCard
              key={image.id}
              src={image.fileName}
              title={image.title}
              width={image.displayWidth}
              height={imageDisplayHeight}
              index={image.sequentialIndex}
              showCount={showCount}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
