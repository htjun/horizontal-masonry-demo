'use client'

import { useState } from 'react'
import { HorizontalMasonry } from '@/components/horizontal-masonry'
import { ToggleGroup } from '@/components/toggle-group'
import { useWheelToHorizontalScroll } from '@/hooks/use-wheel-to-horizontal-scroll'

export default function Home() {
  const scrollRef = useWheelToHorizontalScroll<HTMLDivElement>()
  const [rowCount, setRowCount] = useState('3')
  const [showCount, setShowCount] = useState(false)

  return (
    <main className="min-h-screen w-full relative overflow-hidden">
      <div className="w-full bg-white/80 border-b border-white/40 py-2 min-h-14 sm:px-10 px-4 text-xs font-medium backdrop-blur-sm text-black/70 flex flex-col sm:flex-row justify-between items-start sm:items-center select-none gap-2">
        <h1 className="cursor-default">Horizontal Masonry Feed</h1>
        <div className="flex gap-6 items-center">
          <div className="flex gap-1.5 items-center">
            <span>Rows:</span>
            <ToggleGroup
              value={rowCount}
              onValueChange={setRowCount}
              options={[
                { value: '3', label: '3' },
                { value: '4', label: '4' },
                { value: '5', label: '5' },
              ]}
              ariaLabel="Row count"
            />
          </div>
          <div className="flex gap-1.5 items-center">
            <span>Count:</span>
            <ToggleGroup
              value={showCount ? 'on' : 'off'}
              onValueChange={(value) => setShowCount(value === 'on')}
              options={[
                { value: 'off', label: 'Off' },
                { value: 'on', label: 'On' },
              ]}
              ariaLabel="Show count"
            />
          </div>
        </div>
      </div>
      <div className="max-w-screen absolute translate-x-[-50%] left-1/2 sm:top-14 bottom-0 mb-10 top-18">
        <div ref={scrollRef} className="overflow-x-auto no-scrollbar sm:px-10 px-4 h-full">
          <HorizontalMasonry rowCount={Number(rowCount)} showCount={showCount} />
        </div>
        <div className="edge-fade left-0 mask-linear-[to_right,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
        <div className="edge-fade right-0 mask-linear-[to_left,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
      </div>
    </main>
  )
}
