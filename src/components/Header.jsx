export default function Header() {
  return (
    <div className="mb-10 flex items-start gap-4">
      <div className="w-1.5 h-16 bg-gradient-to-b from-orange-400 to-amber-500 rounded-full mt-1 flex-shrink-0" />
      <div>
        <h1 className="text-4xl font-black text-white tracking-tight leading-tight">
          Student <span className="text-orange-400">Attendance</span> Viewer
        </h1>
        <p className="text-gray-500 text-base mt-1">Track and manage student attendance records</p>
      </div>
    </div>
  )
}
