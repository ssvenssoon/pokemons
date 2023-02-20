import React, { useState, useEffect } from "react"
import FightArena from "./components/FightArena/FightArena"
import ReactDOM from "react-dom"
import StartScreen from "./components/StartScreen/StartScreen"
import GetNewPokemon from "./components/GetNewPokemon/GetNewPokemon"
import "./App.scss"

const App = () => {
  const [isFightStarted, setIsFightStarted] = useState(false)
  const [isGetPokemonClicked, setIsGetPokemonClicked] = useState(false)

  return (
    <>
      {isGetPokemonClicked ? (
        <div className="container">
          <GetNewPokemon />
        </div>
      ) : isFightStarted ? (
        <FightArena setIsFightStarted={setIsFightStarted} />
      ) : (
        <div className="container">
          <StartScreen
            setIsGetPokemonClicked={setIsGetPokemonClicked}
            isGetPokemonClicked={isGetPokemonClicked}
            setIsFightStarted={setIsFightStarted}
            isFightStarted={isFightStarted}
          />
        </div>
      )}
    </>
  )
}

export default App

import { createRoot } from "react-dom/client"
const container = document.getElementById("root")
const root = createRoot(container)
root.render(<App />)
