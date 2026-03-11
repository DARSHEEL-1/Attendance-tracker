export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center py-20 gap-4">
      <div className="w-12 h-12 border-4 border-gray-800 border-t-orange-500 rounded-full animate-spin" />
      <p className="text-gray-500 text-sm font-medium">Loading students…</p>
    </div>
  )
}
