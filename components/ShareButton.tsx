'use client'

import { Share2, ExternalLink } from 'lucide-react'

interface ShareButtonProps {
  onShare: () => void
  disabled?: boolean
  variant?: 'farcaster'
}

export function ShareButton({ 
  onShare, 
  disabled = false, 
  variant = 'farcaster' 
}: ShareButtonProps) {
  return (
    <button
      onClick={onShare}
      disabled={disabled}
      className="flex items-center justify-center space-x-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      {variant === 'farcaster' ? (
        <>
          <ExternalLink size={16} />
          <span className="text-sm">Share on Farcaster</span>
        </>
      ) : (
        <>
          <Share2 size={16} />
          <span className="text-sm">Share</span>
        </>
      )}
    </button>
  )
}
