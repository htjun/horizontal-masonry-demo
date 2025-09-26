import type { Metadata } from 'next'
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
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
