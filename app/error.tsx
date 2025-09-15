'use client'

import { useEffect } from 'react'
import { AlertCircle, RefreshCw } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('App error:', error)
  }, [error])

  return (
    <div className="min-h-screen w-full max-w-xl mx-auto px-4 py-6 flex items-center justify-center">
      <div className="glass-effect rounded-lg p-8 text-center space-y-4 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/20 flex items-center justify-center">
          <AlertCircle className="text-red-400" size={32} />
        </div>
        
        <div className="space-y-2">
          <h2 className="text-white font-semibold text-lg">Something went wrong!</h2>
          <p className="text-white/70 text-sm">
            We encountered an error while loading EmotiArt. Please try again.
          </p>
        </div>
        
        <button
          onClick={reset}
          className="flex items-center justify-center space-x-2 w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          <RefreshCw size={20} />
          <span>Try Again</span>
        </button>
      </div>
    </div>
  )
}
