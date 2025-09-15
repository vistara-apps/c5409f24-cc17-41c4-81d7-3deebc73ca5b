export default function Loading() {
  return (
    <div className="min-h-screen w-full max-w-xl mx-auto px-4 py-6 flex items-center justify-center">
      <div className="text-center space-y-4">
        <div className="w-16 h-16 mx-auto rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-spin-slow opacity-80"></div>
        <div className="space-y-2">
          <h2 className="text-white font-semibold">Loading EmotiArt...</h2>
          <p className="text-white/60 text-sm">Preparing your creative space</p>
        </div>
      </div>
    </div>
  )
}
