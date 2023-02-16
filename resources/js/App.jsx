import React, { useState, useEffect } from "react"
import FightArena from "./components/FightArena/FightArena"
import ReactDOM from "react-dom"
import "./App.scss"

const App = () => {
  return <FightArena />
}

export default App

import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
