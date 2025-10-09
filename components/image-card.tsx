import Image from 'next/image'

interface ImageCardProps {
  src: string
  title: string
  width: number
  height: number
  index: number
  showCount: boolean
  blurDataURL?: string
}

export function ImageCard({
  src,
  title,
  width,
  height,
  index,
  showCount,
  blurDataURL,
}: ImageCardProps) {
  return (
    <div className="shrink-0 select-none relative" style={{ width, height }}>
      {showCount && (
        <div className="absolute top-1.5 left-1.5 font-geist-mono text-xs font-medium text-white/80 bg-black/20 backdrop-blur-sm rounded-xs h-5 min-w-5 px-0.5 tracking-tighter grid place-items-center z-10">
          {index}
        </div>
      )}
      <Image
        src={`/images/${src}`}
        alt={title}
        width={width}
        height={height}
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className="object-cover"
        style={{
          width: '100%',
          height: '100%',
        }}
      />
    </div>
  )
}
