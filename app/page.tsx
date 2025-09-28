'use client'

import { useState } from 'react'
import { HorizontalMasonry } from '@/components/horizontal-masonry'
import { Select } from '@/components/select'
import { useWheelToHorizontalScroll } from '@/hooks/use-wheel-to-horizontal-scroll'

export default function Home() {
  const scrollRef = useWheelToHorizontalScroll<HTMLDivElement>()
  const [rowCount, setRowCount] = useState('3')
  const [imageHeight, setImageHeight] = useState('300')

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="max-w-screen absolute translate-y-[-50%] translate-x-[-50%] top-1/2 left-1/2">
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar ps-10 pe-10">
          <HorizontalMasonry rowCount={Number(rowCount)} imageDisplayHeight={Number(imageHeight)} />
        </div>
        {/* Left edge fade effect */}
        <div className="edge-fade left-0 mask-linear-[to_right,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
        {/* Right edge fade effect */}
        <div className="edge-fade right-0 mask-linear-[to_left,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
      </div>
      <div className="absolute top-0 w-full bg-white/80 border-b border-white/40 py-2.5 px-4 text-xs font-medium backdrop-blur-sm text-black/70 flex justify-between items-center">
        <h1>Horizontal Masonry Feed</h1>
        <div className="flex gap-4 items-center">
          <Select
            value={rowCount}
            onValueChange={setRowCount}
            options={[
              { value: '2', label: '2' },
              { value: '3', label: '3' },
              { value: '4', label: '4' },
              { value: '5', label: '5' },
            ]}
            triggerPrefix="Row:"
            ariaLabel="Row count"
          />
          <Select
            value={imageHeight}
            onValueChange={setImageHeight}
            options={[
              { value: '200', label: '200' },
              { value: '300', label: '300' },
              { value: '400', label: '400' },
              { value: '500', label: '500' },
            ]}
            triggerPrefix="Height:"
            ariaLabel="Image height"
          />
        </div>
      </div>
    </main>
  )
}
