import React, { useState, useEffect } from "react"
import FightArena from "./components/FightArena/FightArena"
import ReactDOM from "react-dom"
import StartScreen from "./components/StartScreen/StartScreen"
import "./App.scss"

const App = () => {
  const [isFightStarted, setIsFightStarted] = useState(false)

  return (
    <>
      {!isFightStarted ? (
        <div className="container">
          <StartScreen
            setIsFightStarted={setIsFightStarted}
            isFightStarted={isFightStarted}
          />
        </div>
      ) : (
        <FightArena setIsFightStarted={setIsFightStarted} />
      )}
    </>
  )
}

export default App

import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
