import type { Metadata } from 'next'
import { Providers } from './providers'
import './globals.css'

export const metadata: Metadata = {
  title: 'EmotiArt - Transform Emotions into Digital Art',
  description: 'A Base Mini App that generates unique AI art from user emotions, allowing them to own and share as NFTs.',
  openGraph: {
    title: 'EmotiArt',
    description: 'Transform Your Emotions into Collectible Digital Art',
    images: ['/og-image.png'],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="gradient-bg">
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
