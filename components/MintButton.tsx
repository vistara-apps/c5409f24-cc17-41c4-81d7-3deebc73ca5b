'use client'

import { useState } from 'react'
import { Coins, Check, Loader2 } from 'lucide-react'

interface MintButtonProps {
  onMint: () => void
  disabled?: boolean
  variant?: 'enabled' | 'disabled' | 'minting'
  isMinted?: boolean
}

export function MintButton({ 
  onMint, 
  disabled = false, 
  variant = 'enabled',
  isMinted = false 
}: MintButtonProps) {
  const [isHovered, setIsHovered] = useState(false)

  if (isMinted) {
    return (
      <button
        disabled
        className="w-full py-3 px-6 bg-green-500 text-white font-semibold rounded-lg cursor-not-allowed opacity-75 flex items-center justify-center space-x-2"
      >
        <Check size={20} />
        <span>Minted as NFT</span>
      </button>
    )
  }

  const isLoading = variant === 'minting'
  const isDisabled = disabled || variant === 'disabled'

  return (
    <button
      onClick={onMint}
      disabled={isDisabled}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`
        w-full py-3 px-6 font-semibold rounded-lg transition-all duration-200 flex items-center justify-center space-x-2
        ${isDisabled 
          ? 'bg-gray-400 text-gray-200 cursor-not-allowed' 
          : 'bg-gradient-to-r from-yellow-500 to-orange-500 text-white hover:from-yellow-600 hover:to-orange-600 shadow-lg'
        }
      `}
    >
      {isLoading ? (
        <>
          <Loader2 size={20} className="animate-spin" />
          <span>Minting...</span>
        </>
      ) : (
        <>
          <Coins size={20} />
          <span>Mint as NFT</span>
        </>
      )}
    </button>
  )
}
