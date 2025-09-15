'use client'

import { useState, useEffect } from 'react'

export const dynamic = 'force-dynamic'
import { AppShell } from './AppShell'
import { EmotionInput } from './EmotionInput'
import { StyleSelector } from './StyleSelector'
import { ArtDisplay } from './ArtDisplay'
import { ActionButtons } from './ActionButtons'
import { useAccount } from 'wagmi'

export interface Artwork {
  id: string
  emotion: string
  style: string
  imageUrl: string
  isNft: boolean
  mintedTxHash?: string
  createdAt: Date
}

export function EmotiArtApp() {
  const [currentEmotion, setCurrentEmotion] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('vibrant-abstract')
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Use wagmi hooks safely
  const { address, isConnected } = useAccount()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleGenerateArt = async () => {
    if (!currentEmotion.trim()) return

    setIsGenerating(true)
    try {
      const response = await fetch('/api/generate-art', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emotion: currentEmotion,
          style: selectedStyle,
          userId: mounted ? (address || 'anonymous') : 'anonymous',
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to generate art')
      }

      const artwork = await response.json()
      setCurrentArtwork(artwork)
    } catch (error) {
      console.error('Error generating art:', error)
    } finally {
      setIsGenerating(false)
    }
  }

  const handleMintNFT = async () => {
    if (!currentArtwork) return

    setIsMinting(true)
    try {
      // NFT minting logic would go here
      // For now, we'll simulate the process
      await new Promise(resolve => setTimeout(resolve, 2000))

      setCurrentArtwork({
        ...currentArtwork,
        isNft: true,
        mintedTxHash: '0x' + Math.random().toString(16).substr(2, 64)
      })
    } catch (error) {
      console.error('Error minting NFT:', error)
    } finally {
      setIsMinting(false)
    }
  }

  const handleShare = async () => {
    if (!currentArtwork) return

    // Farcaster sharing logic would go here
    console.log('Sharing artwork:', currentArtwork)
  }

  const handleTryAgain = () => {
    setCurrentArtwork(null)
  }

  // Don't render during static generation
  if (!mounted) {
    return (
      <AppShell>
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-3xl font-bold text-white">EmotiArt</h1>
            <p className="text-white/80 text-sm">
              Transform Your Emotions into Collectible Digital Art
            </p>
          </div>
          <div className="glass-effect rounded-lg p-8 text-center">
            <p className="text-white/60">Loading...</p>
          </div>
        </div>
      </AppShell>
    )
  }

  return (
    <AppShell>
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-white">EmotiArt</h1>
          <p className="text-white/80 text-sm">
            Transform Your Emotions into Collectible Digital Art
          </p>
        </div>

        <EmotionInput
          value={currentEmotion}
          onChange={setCurrentEmotion}
          onGenerate={handleGenerateArt}
          disabled={isGenerating}
        />

        <StyleSelector
          selectedStyle={selectedStyle}
          onStyleChange={setSelectedStyle}
          disabled={isGenerating}
        />

        <ArtDisplay
          artwork={currentArtwork}
          isGenerating={isGenerating}
          emotion={currentEmotion}
        />

        {currentArtwork && (
          <ActionButtons
            artwork={currentArtwork}
            onMint={handleMintNFT}
            onShare={handleShare}
            onTryAgain={handleTryAgain}
            isMinting={isMinting}
          />
        )}
      </div>
    </AppShell>
  )
}
