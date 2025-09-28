'use client'

import { HorizontalMasonry } from '@/components/horizontal-masonry'
import { useWheelToHorizontalScroll } from '@/hooks/use-wheel-to-horizontal-scroll'

export default function Home() {
  const scrollRef = useWheelToHorizontalScroll<HTMLDivElement>()

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="max-w-screen absolute translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2">
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar ps-10 pe-10">
          <HorizontalMasonry rowCount={3} imageDisplayHeight={300} />
        </div>
        {/* Left edge fade effect */}
        <div className="absolute left-0 top-0 h-full w-[40px] pointer-events-none bg-white backdrop-blur-[32px] mask-linear-[to_right,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
        {/* Right edge fade effect */}
        <div className="absolute right-0 top-0 h-full w-[40px] pointer-events-none bg-white backdrop-blur-[32px] mask-linear-[to_left,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
      </div>
    </main>
  )
}
