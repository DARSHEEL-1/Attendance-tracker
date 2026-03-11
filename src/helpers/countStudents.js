export function countTotal(students) {
  return students.length
}

export function countPresent(students) {
  let count = 0
  for (let i = 0; i < students.length; i++) {
    if (students[i].attendance >= 75) count++
  }
  return count
}

export function countAbsent(students) {
  let count = 0
  for (let i = 0; i < students.length; i++) {
    if (students[i].attendance < 75) count++
  }
  return count
}
