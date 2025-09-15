export const ART_STYLES = {
  'vibrant-abstract': {
    name: 'Vibrant Abstract',
    description: 'Bold colors and flowing shapes',
    prompt: 'vibrant abstract art with flowing colors and dynamic shapes'
  },
  'minimalist-sketch': {
    name: 'Minimalist Sketch', 
    description: 'Clean lines and simple forms',
    prompt: 'minimalist line art sketch with clean simple forms'
  },
  'surreal-dreamscape': {
    name: 'Surreal Dreamscape',
    description: 'Ethereal and cosmic themes', 
    prompt: 'surreal dreamscape with ethereal floating elements and cosmic themes'
  }
} as const

export const EMOTION_PRESETS = [
  { emoji: '😊', label: 'Happy', value: 'happy' },
  { emoji: '😌', label: 'Calm', value: 'calm' },
  { emoji: '🔥', label: 'Excited', value: 'excited' },
  { emoji: '💝', label: 'Loved', value: 'loved' },
  { emoji: '😄', label: 'Joyful', value: 'joyful' },
  { emoji: '😢', label: 'Sad', value: 'sad' },
  { emoji: '😠', label: 'Angry', value: 'angry' },
  { emoji: '😰', label: 'Anxious', value: 'anxious' },
  { emoji: '🤔', label: 'Thoughtful', value: 'thoughtful' },
  { emoji: '😴', label: 'Peaceful', value: 'peaceful' }
] as const

export const GENERATION_CONFIG = {
  maxRetries: 3,
  timeout: 30000,
  imageSize: '1024x1024' as const,
  quality: 'standard' as const
} as const

export const NFT_CONFIG = {
  contractAddress: process.env.NEXT_PUBLIC_NFT_CONTRACT_ADDRESS,
  chainId: 8453, // Base mainnet
  gasLimit: 300000
} as const
