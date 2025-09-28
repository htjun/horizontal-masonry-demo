import type { Metadata } from 'next'
import { cn } from '@/lib/utils'
import { geistSans, geistMono } from '@/lib/fonts'
import './globals.css'

export const metadata: Metadata = {
  title: 'Horizontal masonry',
  description: 'Demo of a horizontal masonry layout',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn(geistSans.variable, geistMono.variable, 'overscroll-y-none')}>
      <body className="font-geist-sans">{children}</body>
    </html>
  )
}
