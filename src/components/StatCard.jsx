export default function StatCard({ icon, label, value, accent }) {
  return (
    <div className={`bg-gray-900 border border-gray-800 border-t-4 ${accent} rounded-xl p-5 hover:border-gray-600 transition-all duration-200`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-500 text-xs font-semibold uppercase tracking-widest mb-1">{label}</p>
          <p className="text-white text-3xl font-black">{value}</p>
        </div>
        <span className="text-3xl opacity-60">{icon}</span>
      </div>
    </div>
  )
}
