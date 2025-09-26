import { cn } from '@/lib/utils'

export default function Home() {
  return (
    <main
      className={cn(
        'flex min-h-screen w-full items-center justify-center',
        'bg-[rgba(0,0,0,0.01)] bg-[radial-gradient(rgba(0,0,0,0.3)_0.6px,transparent_0.6px)] bg-[length:24px_24px]'
      )}
    >
      <h1>Home</h1>
    </main>
  )
}
