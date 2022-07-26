import { useState } from 'react'
import { Routes, Route, Link } from "react-router-dom";
import reactLogo from './assets/react.svg'
import { List } from './components/List'
import { PizzaDetails } from './components/PizzaDetails';
import './App.css'

function App() {
  // const [count, setCount] = useState(0)

  return (
    <div className="App">
      <div>
      <h1>Pizza Service - Usersnack</h1>
      <Routes>
        <Route path="/" element={<List />} />
        <Route path="/pizzas/:id" element={<PizzaDetails />} />
        {/* <Route path="about" element={<About />} /> */}
      </Routes>
      </div>
      {/* <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src="/vite.svg" className="logo" alt="Vite logo" />
        </a>
        <a href="https://reactjs.org" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p> */}
    </div>
  )
}

export default App
