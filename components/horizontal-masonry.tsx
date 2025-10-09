'use client'

import { useMemo } from 'react'
import { type ImageData, images } from '@/data/images'
import { ImageCard } from './image-card'

interface HorizontalMasonryProps {
  rowCount: number
  isCountVisible: boolean
}

type ImageWithRow = ImageData & { sequentialIndex: number }

export function HorizontalMasonry({ rowCount, isCountVisible }: HorizontalMasonryProps) {
  const imageRows = useMemo(() => {
    const rows: ImageWithRow[][] = Array.from({ length: rowCount }, () => [])
    const rowAspectRatios = Array(rowCount).fill(0)

    // Distribute images to the row with least total aspect ratio
    images.forEach((image, index) => {
      const aspectRatio = image.width / image.height
      const imageWithRow: ImageWithRow = {
        ...image,
        sequentialIndex: index + 1,
      }

      const minAspectIndex = rowAspectRatios.indexOf(Math.min(...rowAspectRatios))
      rows[minAspectIndex].push(imageWithRow)
      rowAspectRatios[minAspectIndex] += aspectRatio
    })

    return rows
  }, [rowCount])

  // Calculate row height: (viewport - header - bottom margin - gaps) / rowCount
  // Header: 3.5rem, Bottom margin: 2.5rem, Gap: 0.25rem (1px * 4)
  const gapSize = 0.25 * (rowCount - 1) // gap-1 = 0.25rem
  const rowHeight = `calc((100vh - 3.5rem - 2.5rem - ${gapSize}rem) / ${rowCount})`

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
              aspectRatio={image.width / image.height}
              index={image.sequentialIndex}
              isCountVisible={isCountVisible}
              blurDataURL={image.blurDataURL}
              height={rowHeight}
              rowCount={rowCount}
            />
          ))}
        </div>
      ))}
    </div>
  )
}
