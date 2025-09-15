'use client'

import { useState } from 'react'
import { AppShell } from '../components/AppShell'
import { EmotionInput } from '../components/EmotionInput'
import { StyleSelector } from '../components/StyleSelector'
import { ArtDisplay } from '../components/ArtDisplay'
import { ActionButtons } from '../components/ActionButtons'
import { useMiniKit } from '@coinbase/minikit'

export interface Artwork {
  id: string
  emotion: string
  style: string
  imageUrl: string
  isNft: boolean
  mintedTxHash?: string
  createdAt: Date
}

export default function Home() {
  const { user } = useMiniKit()
  const [currentEmotion, setCurrentEmotion] = useState('')
  const [selectedStyle, setSelectedStyle] = useState('vibrant-abstract')
  const [currentArtwork, setCurrentArtwork] = useState<Artwork | null>(null)
  const [isGenerating, setIsGenerating] = useState(false)
  const [isMinting, setIsMinting] = useState(false)

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
          userId: user?.fid || 'anonymous',
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
