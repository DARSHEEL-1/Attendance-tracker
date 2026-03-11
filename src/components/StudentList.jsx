import StudentCard from './StudentCard'

export default function StudentList({ students, selectedStudents, onStudentClick }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {students.map(student => (
        <StudentCard
          key={student.id}
          student={student}
          isSelected={selectedStudents.includes(student.id)}
          onClick={onStudentClick}
        />
      ))}
    </div>
  )
}
