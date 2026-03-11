export default function EmptyState() {
  return (
    <div className="border border-dashed border-gray-800 rounded-xl py-20 text-center">
      <p className="text-5xl mb-4">🔍</p>
      <p className="text-white font-bold text-lg">No students found</p>
      <p className="text-gray-600 text-sm mt-1">Try changing your filters</p>
    </div>
  )
}
