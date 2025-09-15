'use client'

import { useState } from 'react'
import { Smile, Heart, Zap, Cloud, Sun } from 'lucide-react'

interface EmotionInputProps {
  value: string
  onChange: (value: string) => void
  onGenerate: () => void
  disabled?: boolean
  variant?: 'text' | 'emojiPicker'
}

const emotionPresets = [
  { emoji: '😊', label: 'Happy', value: 'happy', icon: Sun },
  { emoji: '😌', label: 'Calm', value: 'calm', icon: Cloud },
  { emoji: '🔥', label: 'Excited', value: 'excited', icon: Zap },
  { emoji: '💝', label: 'Loved', value: 'loved', icon: Heart },
  { emoji: '😄', label: 'Joyful', value: 'joyful', icon: Smile },
]

export function EmotionInput({ 
  value, 
  onChange, 
  onGenerate, 
  disabled = false,
  variant = 'text' 
}: EmotionInputProps) {
  const [showPresets, setShowPresets] = useState(false)

  const handlePresetClick = (emotion: string) => {
    onChange(emotion)
    setShowPresets(false)
  }

  return (
    <div className="space-y-4">
      <div className="glass-effect rounded-lg p-4 space-y-3">
        <label className="block text-white font-medium text-sm">
          How are you feeling?
        </label>
        
        <div className="relative">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Describe your emotion..."
            disabled={disabled}
            className="w-full px-4 py-3 rounded-md bg-white/10 border border-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-accent focus:border-transparent disabled:opacity-50"
          />
          
          <button
            type="button"
            onClick={() => setShowPresets(!showPresets)}
            disabled={disabled}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 p-2 text-white/60 hover:text-white transition-colors duration-200"
          >
            <Smile size={20} />
          </button>
        </div>

        {showPresets && (
          <div className="grid grid-cols-5 gap-2">
            {emotionPresets.map((preset) => (
              <button
                key={preset.value}
                onClick={() => handlePresetClick(preset.value)}
                disabled={disabled}
                className="flex flex-col items-center p-2 rounded-md bg-white/10 hover:bg-white/20 transition-colors duration-200 disabled:opacity-50"
              >
                <span className="text-lg mb-1">{preset.emoji}</span>
                <span className="text-xs text-white/80">{preset.label}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      <button
        onClick={onGenerate}
        disabled={disabled || !value.trim()}
        className="w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg"
      >
        {disabled ? 'Generating...' : 'Generate Art'}
      </button>
    </div>
  )
}
