import Image from 'next/image'

interface ImageCardProps {
  src: string
  title: string
  aspectRatio: number
  index: number
  isCountVisible: boolean
  blurDataURL?: string
  height: string
  rowCount: number
}

export function ImageCard({
  src,
  title,
  aspectRatio,
  index,
  isCountVisible,
  blurDataURL,
  height,
  rowCount,
}: ImageCardProps) {
  // Calculate height in vh: (100vh - header - margin - gaps) / rowCount
  // Header: 3.5rem ≈ 3.5vh, Bottom margin: 2.5rem ≈ 2.5vh, Gaps: negligible
  const heightVh = (100 - 6) / rowCount // Approximate vh for this row
  const widthVh = Math.round(heightVh * aspectRatio) // Width based on aspect ratio
  const sizes = `${widthVh}vh`

  return (
    <div className="shrink-0 select-none relative" style={{ height, aspectRatio }}>
      {isCountVisible && (
        <div className="absolute top-1.5 left-1.5 font-geist-mono text-xs font-medium text-white/80 bg-black/20 backdrop-blur-sm rounded-xs h-5 min-w-5 px-0.5 tracking-tighter grid place-items-center z-10">
          {index}
        </div>
      )}
      <Image
        src={`/images/${src}`}
        alt={title}
        fill
        sizes={sizes}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  )
}
