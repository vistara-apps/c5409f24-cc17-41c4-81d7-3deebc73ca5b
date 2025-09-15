import { AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="min-h-screen w-full max-w-xl mx-auto px-4 py-6 flex items-center justify-center">
      <div className="glass-effect rounded-lg p-8 text-center space-y-4 max-w-md">
        <div className="w-16 h-16 mx-auto rounded-full bg-yellow-500/20 flex items-center justify-center">
          <AlertCircle className="text-yellow-400" size={32} />
        </div>

        <div className="space-y-2">
          <h2 className="text-white font-semibold text-lg">Page Not Found</h2>
          <p className="text-white/70 text-sm">
            The page you're looking for doesn't exist.
          </p>
        </div>

        <a
          href="/"
          className="flex items-center justify-center w-full py-3 px-6 bg-gradient-to-r from-purple-500 to-pink-500 text-white font-semibold rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-200"
        >
          Go Home
        </a>
      </div>
    </div>
  )
}
