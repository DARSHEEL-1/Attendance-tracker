export default function FilterControls({
  filterType, setFilterType,
  showLowAttendance, toggleLowAttendance,
  sortBy, toggleSort,
}) {
  return (
    <div className="bg-gray-900 border border-gray-800 rounded-xl p-5 mb-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Segmented filter tabs */}
        <div className="inline-flex bg-gray-800 rounded-lg p-1 gap-1">
          {[['All', '📚'], ['Present', '✅'], ['Absent', '⚠️']].map(([tab, emoji]) => (
            <button
              key={tab}
              onClick={() => setFilterType(tab)}
              className={`px-5 py-2 rounded-md text-sm font-bold transition-all duration-200 ${
                filterType === tab
                  ? 'bg-orange-500 text-white shadow-md'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              {emoji} {tab}
            </button>
          ))}
        </div>

        {/* Toggle buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleLowAttendance}
            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-200 ${
              showLowAttendance
                ? 'bg-rose-500/20 border-rose-500 text-rose-400'
                : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {showLowAttendance ? '✓ Low Attendance' : '⚠ Low Attendance'}
          </button>
          <button
            onClick={toggleSort}
            className={`px-4 py-2 rounded-lg text-sm font-bold border transition-all duration-200 ${
              sortBy === 'attendance'
                ? 'bg-orange-500/20 border-orange-500 text-orange-400'
                : 'border-gray-700 text-gray-500 hover:border-gray-500 hover:text-gray-300'
            }`}
          >
            {sortBy === 'attendance' ? '✓ Sorted by %' : '↕ Sort by %'}
          </button>
        </div>
      </div>
    </div>
  )
}
