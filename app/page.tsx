import { HorizontalMasonry } from '@/components/horizontal-masonry'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <main className={cn('flex min-h-screen w-full items-center justify-center')}>
      <div className="relative max-w-screen">
        <div className="overflow-x-auto no-scrollbar px-4">
          <HorizontalMasonry rowCount={3} imageDisplayHeight={300} />
        </div>
        {/* Right edge fade effect */}
        <div className="absolute right-0 top-0 h-full w-[80px] pointer-events-none bg-white backdrop-blur-[32px] mask-linear-[to_left,black,rgba(0,0,0,0.5)_40%,rgba(0,0,0,0.1)_80%,transparent]" />
      </div>
    </main>
  )
}
