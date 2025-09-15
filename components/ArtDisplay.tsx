'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Loader2, Sparkles } from 'lucide-react'
import type { Artwork } from './EmotiArtApp'

interface ArtDisplayProps {
  artwork: Artwork | null
  isGenerating: boolean
  emotion: string
  variant?: 'loading' | 'generated' | 'nft-badge'
}

export function ArtDisplay({ 
  artwork, 
  isGenerating, 
  emotion,
  variant = 'generated' 
}: ArtDisplayProps) {
  const [imageLoading, setImageLoading] = useState(true)

  if (isGenerating) {
    return (
      <div className="glass-effect rounded-lg p-8 text-center space-y-4">
        <div className="relative w-32 h-32 mx-auto">
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin-slow opacity-20"></div>
          <div className="absolute inset-2 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 animate-spin-slow"></div>
          <div className="absolute inset-4 rounded-full bg-white/10 flex items-center justify-center">
            <Sparkles className="text-white animate-pulse-glow" size={32} />
          </div>
        </div>
        <div className="space-y-2">
          <h3 className="text-white font-semibold">Creating your art...</h3>
          <p className="text-white/70 text-sm">
            Transforming "{emotion}" into visual art
          </p>
        </div>
      </div>
    )
  }

  if (!artwork) {
    return (
      <div className="glass-effect rounded-lg p-8 text-center space-y-4">
        <div className="w-32 h-32 mx-auto rounded-lg bg-white/10 flex items-center justify-center">
          <Sparkles className="text-white/40" size={32} />
        </div>
        <div className="space-y-2">
          <h3 className="text-white/60 font-medium">Your art will appear here</h3>
          <p className="text-white/40 text-sm">
            Enter an emotion and generate your unique artwork
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="glass-effect rounded-lg p-4 space-y-4">
      <div className="relative aspect-square rounded-lg overflow-hidden art-glow">
        {imageLoading && (
          <div className="absolute inset-0 bg-white/10 flex items-center justify-center">
            <Loader2 className="text-white animate-spin" size={32} />
          </div>
        )}
        <Image
          src={artwork.imageUrl}
          alt={`Art representing ${artwork.emotion}`}
          fill
          className="object-cover"
          onLoad={() => setImageLoading(false)}
          onError={() => setImageLoading(false)}
        />
        {artwork.isNft && (
          <div className="absolute top-2 right-2 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            NFT
          </div>
        )}
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="text-white font-semibold capitalize">
            {artwork.emotion}
          </h3>
          <span className="text-white/60 text-xs">
            {artwork.style.replace('-', ' ')}
          </span>
        </div>
        
        {artwork.isNft && artwork.mintedTxHash && (
          <p className="text-accent text-xs font-mono">
            Minted: {artwork.mintedTxHash.slice(0, 10)}...
          </p>
        )}
      </div>
    </div>
  )
}
