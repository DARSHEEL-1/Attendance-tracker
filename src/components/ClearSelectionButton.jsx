export default function ClearSelectionButton({ selectedCount, onClear }) {
  if (selectedCount === 0) return null

  return (
    <div className="flex items-center justify-between bg-orange-500/10 border border-orange-500/30 rounded-xl px-5 py-3 mb-6">
      <span className="text-orange-400 text-sm font-semibold">
        📌 {selectedCount} student{selectedCount !== 1 ? 's' : ''} selected
      </span>
      <button
        onClick={onClear}
        className="text-sm font-bold text-gray-400 hover:text-white border border-gray-700 hover:border-gray-500 px-4 py-1.5 rounded-lg transition-all duration-200"
      >
        ✕ Clear
      </button>
    </div>
  )
}
