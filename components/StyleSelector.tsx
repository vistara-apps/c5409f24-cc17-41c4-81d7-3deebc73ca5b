'use client'

import { Palette, Pen, Sparkles } from 'lucide-react'

interface StyleSelectorProps {
  selectedStyle: string
  onStyleChange: (style: string) => void
  disabled?: boolean
  variant?: 'carousel' | 'grid'
}

const artStyles = [
  {
    id: 'vibrant-abstract',
    name: 'Vibrant Abstract',
    description: 'Bold colors and flowing shapes',
    icon: Palette,
    gradient: 'from-pink-500 to-orange-500'
  },
  {
    id: 'minimalist-sketch',
    name: 'Minimalist Sketch',
    description: 'Clean lines and simple forms',
    icon: Pen,
    gradient: 'from-gray-400 to-gray-600'
  },
  {
    id: 'surreal-dreamscape',
    name: 'Surreal Dreamscape',
    description: 'Ethereal and cosmic themes',
    icon: Sparkles,
    gradient: 'from-purple-500 to-blue-500'
  }
]

export function StyleSelector({ 
  selectedStyle, 
  onStyleChange, 
  disabled = false,
  variant = 'grid' 
}: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <label className="block text-white font-medium text-sm">
        Choose Art Style
      </label>
      
      <div className="grid grid-cols-1 gap-3">
        {artStyles.map((style) => {
          const Icon = style.icon
          const isSelected = selectedStyle === style.id
          
          return (
            <button
              key={style.id}
              onClick={() => onStyleChange(style.id)}
              disabled={disabled}
              className={`
                p-4 rounded-lg border-2 transition-all duration-200 text-left
                ${isSelected 
                  ? 'border-accent bg-white/20 shadow-focus' 
                  : 'border-white/20 bg-white/10 hover:bg-white/15'
                }
                disabled:opacity-50 disabled:cursor-not-allowed
              `}
            >
              <div className="flex items-center space-x-3">
                <div className={`p-2 rounded-md bg-gradient-to-r ${style.gradient}`}>
                  <Icon size={20} className="text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-white font-medium text-sm">{style.name}</h3>
                  <p className="text-white/70 text-xs">{style.description}</p>
                </div>
                {isSelected && (
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                )}
              </div>
            </button>
          )
        })}
      </div>
    </div>
  )
}
