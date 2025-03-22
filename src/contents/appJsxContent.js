export function appJsxContent(projectName, ext) {
    return `import './App.css'
import { useState } from 'react'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <h1>${projectName}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.${ext}</code> and save to test HMR
        </p>
      </div>
    </div>
  )
}

export default App`;
}
