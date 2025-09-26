import { HorizontalMasonry } from '@/components/horizontal-masonry'
import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <main
      className={cn(
        'flex min-h-screen w-full items-center justify-center',
        'bg-[rgba(0,0,0,0.01)] bg-[radial-gradient(rgba(0,0,0,0.3)_0.6px,transparent_0.6px)] bg-[length:220px_24px]'
      )}
    >
      <div className="overflow-x-auto no-scrollbar ps-20 pe-20">
        <HorizontalMasonry rowCount={3} imageDisplayHeight={300} />
      </div>
    </main>
  )
}
