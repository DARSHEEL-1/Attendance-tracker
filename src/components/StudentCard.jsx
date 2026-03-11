export default function StudentCard({ student, isSelected, onClick }) {
  const present = student.attendance >= 75
  const pct = student.attendance

  return (
    <div
      onClick={() => onClick(student.id)}
      className={`bg-gray-900 border border-gray-800 rounded-xl p-5 cursor-pointer transition-all duration-200 border-l-4 ${
        isSelected
          ? 'border-l-orange-500 bg-orange-500/5'
          : present
            ? 'border-l-emerald-500 hover:border-gray-600'
            : 'border-l-rose-500 hover:border-gray-600'
      }`}
    >
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div className={`w-11 h-11 rounded-lg flex items-center justify-center text-white font-black text-lg flex-shrink-0 ${
          present ? 'bg-emerald-600' : 'bg-rose-600'
        }`}>
          {student.name.charAt(0)}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <p className="text-white font-bold truncate">{student.name}</p>
            {isSelected && <span className="text-orange-400 text-xs font-bold bg-orange-500/20 px-2 py-0.5 rounded-md flex-shrink-0">SELECTED</span>}
          </div>
          <p className="text-gray-500 text-xs truncate">{student.city} · {student.email}</p>
        </div>

        {/* Attendance % */}
        <div className={`text-2xl font-black flex-shrink-0 ${
          present ? 'text-emerald-400' : 'text-rose-400'
        }`}>
          {pct}%
        </div>
      </div>

      {/* Progress bar */}
      <div className="mt-3 bg-gray-800 rounded-full h-1.5 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-500 ${
            present ? 'bg-emerald-500' : 'bg-rose-500'
          }`}
          style={{ width: `${pct}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between items-center">
        <span className={`text-xs font-semibold ${
          present ? 'text-emerald-400' : 'text-rose-400'
        }`}>
          {present ? '✓ Present' : '✗ At Risk'}
        </span>
        <span className="text-gray-600 text-xs">75% threshold</span>
      </div>
    </div>
  )
}
