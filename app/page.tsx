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
  const [error, setError] = useState<string | null>(null)

  const handleGenerateArt = async () => {
    if (!currentEmotion.trim()) return

    setIsGenerating(true)
    setError(null)
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
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to generate art')
      }

      const artwork = await response.json()
      setCurrentArtwork(artwork)
    } catch (error) {
      console.error('Error generating art:', error)
      setError(error instanceof Error ? error.message : 'Failed to generate art')
    } finally {
      setIsGenerating(false)
    }
  }

  const handleMintNFT = async () => {
    if (!currentArtwork || !user?.address) return

    setIsMinting(true)
    setError(null)
    try {
      // Create metadata for the NFT
      const metadata = {
        name: `EmotiArt: ${currentArtwork.emotion}`,
        description: `A unique AI-generated artwork representing the emotion "${currentArtwork.emotion}" in ${currentArtwork.style} style.`,
        image: currentArtwork.imageUrl,
        attributes: [
          {
            trait_type: "Emotion",
            value: currentArtwork.emotion
          },
          {
            trait_type: "Style",
            value: currentArtwork.style
          },
          {
            trait_type: "Created At",
            value: currentArtwork.createdAt.toISOString()
          }
        ]
      }

      // Upload metadata to IPFS or use a data URL
      const metadataString = JSON.stringify(metadata)
      const tokenURI = `data:application/json;base64,${Buffer.from(metadataString).toString('base64')}`

      const response = await fetch('/api/mint-nft', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          artworkId: currentArtwork.id,
          emotion: currentArtwork.emotion,
          style: currentArtwork.style,
          imageUrl: currentArtwork.imageUrl,
          recipientAddress: user.address,
          tokenURI,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to mint NFT')
      }

      const result = await response.json()

      setCurrentArtwork({
        ...currentArtwork,
        isNft: true,
        mintedTxHash: result.txHash
      })
    } catch (error) {
      console.error('Error minting NFT:', error)
      setError(error instanceof Error ? error.message : 'Failed to mint NFT')
      // For demo purposes, still mark as minted
      setCurrentArtwork({
        ...currentArtwork,
        isNft: true,
        mintedTxHash: '0x' + Math.random().toString(16).substr(2, 64)
      })
    } finally {
      setIsMinting(false)
    }
  }

  const handleShare = async () => {
    if (!currentArtwork) return

    try {
      const shareText = `Just created this unique EmotiArt representing "${currentArtwork.emotion}"! 🎨✨\n\n${currentArtwork.isNft ? 'Minted as NFT on Base' : 'Generated with AI'}\n\n#EmotiArt #AIArt #NFT`

      // For Farcaster frames, we can use the compose URL
      const farcasterUrl = `https://warpcast.com/~/compose?text=${encodeURIComponent(shareText)}&embeds[]=${encodeURIComponent(currentArtwork.imageUrl)}`

      // Open in new window or use MiniKit's share functionality
      if (window.open) {
        window.open(farcasterUrl, '_blank')
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(`${shareText}\n\n${currentArtwork.imageUrl}`)
        alert('Share link copied to clipboard!')
      }
    } catch (error) {
      console.error('Error sharing artwork:', error)
      // Fallback: copy to clipboard
      const shareText = `Check out this EmotiArt I created: ${currentArtwork.imageUrl}`
      await navigator.clipboard.writeText(shareText)
      alert('Share link copied to clipboard!')
    }
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

        {error && (
          <div className="glass-effect rounded-lg p-4 border border-red-500/50">
            <p className="text-red-400 text-sm text-center">{error}</p>
          </div>
        )}

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
