import StatCard from './StatCard'
import { countTotal, countPresent, countAbsent } from '../helpers/countStudents'

export default function StatsPanel({ students, filtered, selected }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
      <StatCard icon="👥" label="Total"    value={countTotal(students)}   accent="border-t-orange-500" />
      <StatCard icon="✅" label="Present"  value={countPresent(students)} accent="border-t-emerald-500" />
      <StatCard icon="⚠️" label="Absent"   value={countAbsent(students)}  accent="border-t-rose-500" />
      <StatCard icon="🔍" label="Filtered" value={filtered}               accent="border-t-sky-500" />
      <StatCard icon="📌" label="Selected" value={selected}               accent="border-t-amber-500" />
    </div>
  )
}
