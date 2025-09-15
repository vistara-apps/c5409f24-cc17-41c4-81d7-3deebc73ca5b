export interface User {
  fid?: string
  displayName?: string
  username?: string
  pfpUrl?: string
  address?: string
}

export interface Artwork {
  id: string
  userId: string
  emotion: string
  style: string
  imageUrl: string
  isNft: boolean
  mintedTxHash?: string
  createdAt: Date
}

export interface ArtStyle {
  id: string
  name: string
  description: string
  prompt: string
}

export interface EmotionPreset {
  emoji: string
  label: string
  value: string
}

export interface MintingStatus {
  isLoading: boolean
  txHash?: string
  error?: string
}

export interface GenerationRequest {
  emotion: string
  style: string
  userId: string
}

export interface GenerationResponse {
  artwork: Artwork
  success: boolean
  error?: string
}
