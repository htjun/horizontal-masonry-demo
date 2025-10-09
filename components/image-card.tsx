import Image from 'next/image'

interface ImageCardProps {
  src: string
  title: string
  aspectRatio: number
  index: number
  isCountVisible: boolean
  blurDataURL?: string
  height: string
}

export function ImageCard({
  src,
  title,
  aspectRatio,
  index,
  isCountVisible,
  blurDataURL,
  height,
}: ImageCardProps) {
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
        sizes="(max-width: 640px) 50vw, 33vw"
        placeholder={blurDataURL ? 'blur' : 'empty'}
        blurDataURL={blurDataURL}
        className="object-cover"
      />
    </div>
  )
}
