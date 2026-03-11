import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from './components/Header'
import StatsPanel from './components/StatsPanel'
import FilterControls from './components/FilterControls'
import ClearSelectionButton from './components/ClearSelectionButton'
import StudentList from './components/StudentList'
import LoadingSpinner from './components/LoadingSpinner'
import EmptyState from './components/EmptyState'
import Footer from './components/Footer'
import { filterByType, filterLowAttendance, sortByAttendance } from './helpers/filterStudents'

export default function App() {
  const [students, setStudents] = useState([])
  const [filterType, setFilterType] = useState('All')
  const [selectedStudents, setSelectedStudents] = useState([])
  const [showLowAttendance, setShowLowAttendance] = useState(false)
  const [loading, setLoading] = useState(true)
  const [sortBy, setSortBy] = useState(null)

  useEffect(() => {
    const fetchStudents = async () => {
      setLoading(true)
      try {
        const saved = localStorage.getItem('studentAttendance2')
        if (saved) {
          setStudents(JSON.parse(saved))
          setLoading(false)
          return
        }

        const res = await axios.get('https://jsonplaceholder.typicode.com/users')
        const data = []
        for (let i = 0; i < res.data.length; i++) {
          const user = res.data[i]
          data.push({
            id: user.id,
            name: user.name,
            email: user.email,
            city: user.address.city,
            attendance: Math.floor(Math.random() * 61) + 40,
          })
        }
        localStorage.setItem('studentAttendance2', JSON.stringify(data))
        setStudents(data)
      } catch (err) {
        console.error('Fetch error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStudents()
  }, [])

  const getFilteredStudents = () => {
    let result = [...students]
    result = filterByType(result, filterType)
    result = filterLowAttendance(result, showLowAttendance)
    result = sortByAttendance(result, sortBy === 'attendance')
    return result
  }

  const filteredStudents = getFilteredStudents()

  const handleStudentClick = (studentId) => {
    let alreadySelected = false
    for (let i = 0; i < selectedStudents.length; i++) {
      if (selectedStudents[i] === studentId) { alreadySelected = true; break }
    }
    let newSelected = []
    if (alreadySelected) {
      for (let i = 0; i < selectedStudents.length; i++) {
        if (selectedStudents[i] !== studentId) newSelected.push(selectedStudents[i])
      }
    } else {
      for (let i = 0; i < selectedStudents.length; i++) newSelected.push(selectedStudents[i])
      newSelected.push(studentId)
    }
    setSelectedStudents(newSelected)
  }

  const toggleLowAttendance = () => setShowLowAttendance(prev => !prev)
  const toggleSort = () => setSortBy(prev => (prev === 'attendance' ? null : 'attendance'))
  const clearSelection = () => setSelectedStudents([])

  return (
    <div className="min-h-screen bg-gray-950 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <Header />

        <StatsPanel students={students} filtered={filteredStudents.length} selected={selectedStudents.length} />

        <FilterControls
          filterType={filterType}
          setFilterType={setFilterType}
          showLowAttendance={showLowAttendance}
          toggleLowAttendance={toggleLowAttendance}
          sortBy={sortBy}
          toggleSort={toggleSort}
        />

        <ClearSelectionButton
          selectedCount={selectedStudents.length}
          onClear={clearSelection}
        />

        {loading ? (
          <LoadingSpinner />
        ) : filteredStudents.length === 0 ? (
          <EmptyState />
        ) : (
          <StudentList
            students={filteredStudents}
            selectedStudents={selectedStudents}
            onStudentClick={handleStudentClick}
          />
        )}

        <Footer />
      </div>
    </div>
  )
}
