export function filterByType(students, filterType) {
  if (filterType === 'All') return students
  let result = []
  for (let i = 0; i < students.length; i++) {
    if (filterType === 'Present' && students[i].attendance >= 75) result.push(students[i])
    if (filterType === 'Absent'  && students[i].attendance <  75) result.push(students[i])
  }
  return result
}

export function filterLowAttendance(students, showLow) {
  if (!showLow) return students
  let result = []
  for (let i = 0; i < students.length; i++) {
    if (students[i].attendance < 75) result.push(students[i])
  }
  return result
}

export function sortByAttendance(students, shouldSort) {
  if (!shouldSort) return students
  let result = [...students]
  for (let i = 0; i < result.length; i++) {
    for (let j = 0; j < result.length - 1; j++) {
      if (result[j].attendance < result[j + 1].attendance) {
        let temp = result[j]
        result[j] = result[j + 1]
        result[j + 1] = temp
      }
    }
  }
  return result
}
