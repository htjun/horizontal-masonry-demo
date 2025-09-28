import Image from 'next/image'

interface ImageCardProps {
  src: string
  title: string
  width: number
  height: number
}

export function ImageCard({ src, title, width, height }: ImageCardProps) {
  return (
    <div className="shrink-0 select-none">
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
