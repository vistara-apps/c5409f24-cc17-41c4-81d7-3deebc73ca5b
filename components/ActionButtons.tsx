'use client'

import { Share2, Coins, RotateCcw } from 'lucide-react'
import type { Artwork } from '../app/page'

interface ActionButtonsProps {
  artwork: Artwork
  onMint: () => void
  onShare: () => void
  onTryAgain: () => void
  isMinting: boolean
}

export function ActionButtons({ 
  artwork, 
  onMint, 
  onShare, 
  onTryAgain, 
  isMinting 
}: ActionButtonsProps) {
  return (
    <div className="space-y-3">
      <div className="grid grid-cols-3 gap-3">
        <button
          onClick={onTryAgain}
          className="flex flex-col items-center p-3 glass-effect rounded-lg hover:bg-white/15 transition-colors duration-200"
        >
          <RotateCcw size={20} className="text-white mb-1" />
          <span className="text-white text-xs">Try Again</span>
        </button>
        
        <button
          onClick={onShare}
          className="flex flex-col items-center p-3 glass-effect rounded-lg hover:bg-white/15 transition-colors duration-200"
        >
          <Share2 size={20} className="text-white mb-1" />
          <span className="text-white text-xs">Share</span>
        </button>
        
        <button
          onClick={onMint}
          disabled={isMinting || artwork.isNft}
          className="flex flex-col items-center p-3 glass-effect rounded-lg hover:bg-white/15 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Coins size={20} className="text-white mb-1" />
          <span className="text-white text-xs">
            {artwork.isNft ? 'Minted' : isMinting ? 'Minting...' : 'Mint'}
          </span>
        </button>
      </div>
      
      {!artwork.isNft && (
        <button
          onClick={onMint}
          disabled={isMinting}
          className="w-full py-3 px-6 bg-gradient-to-r from-yellow-500 to-orange-500 text-white font-semibold rounded-lg hover:from-yellow-600 hover:to-orange-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
        >
          {isMinting ? 'Minting NFT...' : 'Mint as NFT'}
        </button>
      )}
    </div>
  )
}
