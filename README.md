# 🎓 Student Attendance Viewer 2

A React-based student attendance dashboard with a modern flat dark UI. Built with React, Vite, and Tailwind CSS.

---

## � Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Start the dev server

```bash
npm run dev
```

App will run at **http://localhost:5173** (or the next available port).

---

## 📁 Project Structure

```
src/
├── App.jsx                       # Main app — all state, data fetching, logic
├── index.css                     # Global styles + Tailwind base imports
├── main.jsx                      # React entry point, mounts <App />
│
├── components/
│   ├── Header.jsx                # Page title with orange vertical accent bar
│   ├── StatCard.jsx              # Single stat card with a colored top border
│   ├── StatsPanel.jsx            # Grid of 5 StatCards (Total/Present/Absent/Filtered/Selected)
│   ├── FilterControls.jsx        # Segmented tabs + Low Attendance & Sort toggles
│   ├── StudentCard.jsx           # Individual student row with progress bar
│   ├── StudentList.jsx           # Renders a grid of StudentCards
│   ├── ClearSelectionButton.jsx  # Banner shown when students are selected
│   ├── LoadingSpinner.jsx        # Animated spinner while data is loading
│   ├── EmptyState.jsx            # Message shown when no students match filters
│   └── Footer.jsx                # Simple two-line bottom footer
│
└── helpers/
    ├── countStudents.js          # Pure functions to count totals
    └── filterStudents.js         # Pure functions to filter and sort students
```

---

## 🧠 Code Explained

### `App.jsx` — The Brain

This is the only file that holds state and logic. Every other component just receives data as props.

**State variables:**

```js
const [students, setStudents] = useState([])          // all loaded students
const [filterType, setFilterType] = useState('All')   // 'All', 'Present', or 'Absent'
const [selectedStudents, setSelectedStudents] = useState([])  // array of selected student IDs
const [showLowAttendance, setShowLowAttendance] = useState(false) // toggle for <75% filter
const [loading, setLoading] = useState(true)          // shows spinner while fetching
const [sortBy, setSortBy] = useState(null)            // null or 'attendance'
```

**Fetching data (`useEffect`):**

```js
useEffect(() => {
  // runs once when the page loads
  const saved = localStorage.getItem('studentAttendance2')
  if (saved) {
    setStudents(JSON.parse(saved))  // use cached data if it exists
    return
  }
  // otherwise fetch from JSONPlaceholder API
  const res = await axios.get('https://jsonplaceholder.typicode.com/users')
  // add a random attendance % (40–100) to each user
  const data = res.data.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    city: user.address.city,
    attendance: Math.floor(Math.random() * 61) + 40,
  }))
  localStorage.setItem('studentAttendance2', JSON.stringify(data)) // save to cache
  setStudents(data)
}, [])  // empty [] means this only runs once on mount
```

**Why localStorage?**
The attendance percentages are random. Without caching, they would change every time the page reloads. Saving to `localStorage` means the same values are shown every time.

**Filtering (`getFilteredStudents`):**

```js
const getFilteredStudents = () => {
  let result = [...students]                            // copy the array, don't mutate
  result = filterByType(result, filterType)             // step 1: All / Present / Absent
  result = filterLowAttendance(result, showLowAttendance) // step 2: show only <75% if toggled
  result = sortByAttendance(result, sortBy === 'attendance') // step 3: sort if toggled
  return result
}
```

Filters are applied in sequence — each step narrows down the list further.

**Selecting students (`handleStudentClick`):**

```js
const handleStudentClick = (studentId) => {
  // check if the student is already in the selected list
  // if yes → remove them (deselect)
  // if no  → add them (select)
  setSelectedStudents(newSelected)
}
```

Clicking the same card twice toggles it off. The selected IDs are stored in an array and passed down to `StudentList` → `StudentCard`, which uses `isSelected` to change the card's border color.

---

### `helpers/filterStudents.js` — Filter Logic

Three pure functions — they take in data and return new data without changing the original.

```js
// Returns only students that match the tab (All / Present / Absent)
export function filterByType(students, filterType) {
  if (filterType === 'All') return students
  // Present = attendance >= 75, Absent = attendance < 75
}

// Returns only students below 75% (used when "Low Attendance" toggle is ON)
export function filterLowAttendance(students, showLow) {
  if (!showLow) return students  // do nothing if toggle is off
  return students where attendance < 75
}

// Sorts students from highest to lowest attendance using bubble sort
export function sortByAttendance(students, shouldSort) {
  if (!shouldSort) return students  // do nothing if toggle is off
  // bubble sort: repeatedly swap adjacent items if they're out of order
}
```

---

### `helpers/countStudents.js` — Counting

Simple counting functions used by the stat cards.

```js
export function countTotal(students)   // → students.length
export function countPresent(students) // → count where attendance >= 75
export function countAbsent(students)  // → count where attendance < 75
```

---

### `components/StudentCard.jsx` — Each Student Row

Receives one student object and whether it's selected.

```jsx
// Left border color depends on attendance and selection state:
// - Orange left border  → student is selected
// - Emerald left border → present (≥ 75%)
// - Rose left border    → absent (< 75%)

// The progress bar width is set with inline style:
style={{ width: `${pct}%` }}  // pct = student.attendance
```

---

### `components/FilterControls.jsx` — Filter Bar

The three tabs (All / Present / Absent) are a **segmented control** — one `bg-orange-500` active pill inside a dark container.

The **Low Attendance** and **Sort by %** buttons are independent toggles. When active, they show a colored border + tinted background. When inactive, they look like plain gray outlines.

---

### `components/ClearSelectionButton.jsx` — Selection Banner

This component renders `null` when `selectedCount === 0`, so it simply disappears when nothing is selected. When students are selected, it shows an orange info banner with a clear button.

---

### `components/StatsPanel.jsx` + `StatCard.jsx`

`StatsPanel` calls the helper functions and passes the results into five `StatCard` components. Each `StatCard` receives an `accent` prop like `"border-t-orange-500"` which sets the colored top border via Tailwind.

---

## 🛠️ Tech Stack

| Tool | Purpose |
|---|---|
| [React 18](https://react.dev/) | UI framework |
| [Vite](https://vitejs.dev/) | Build tool & dev server |
| [Tailwind CSS v3](https://tailwindcss.com/) | Utility-first styling |
| [Axios](https://axios-http.com/) | HTTP client for API calls |
| [JSONPlaceholder](https://jsonplaceholder.typicode.com/) | Fake student data (10 users) |
