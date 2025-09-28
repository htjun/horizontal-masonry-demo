import Image from 'next/image'

interface ImageCardProps {
  src: string
  title: string
  width: number
  height: number
  index: number
  showCount: boolean
}

export function ImageCard({ src, title, width, height, index, showCount }: ImageCardProps) {
  return (
    <div className="shrink-0 select-none relative">
      {showCount && (
        <div className="absolute top-1.5 left-1.5 font-geist-mono text-xs font-medium text-white/80 bg-black/20 backdrop-blur-sm rounded-xs h-5 min-w-5 px-0.5 tracking-tighter grid place-items-center">
          {index}
        </div>
      )}
      <Image
        src={`/images/${src}`}
        alt={title}
        width={width}
        height={height}
        className="w-full object-cover"
        style={{
          height: height,
        }}
      />
    </div>
  )
}
