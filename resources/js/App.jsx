import React, { useState, useEffect } from "react"
import FightArena from "./components/FightArena/FightArena"
import ReactDOM from "react-dom"
import StartScreen from "./components/StartScreen/StartScreen"
import GetNewPokemon from "./components/GetNewPokemon/GetNewPokemon"
import ChooseTrainer from "./components/ChooseTrainer/ChooseTrainer"
import "./App.scss"

const App = () => {
  const [isFightStarted, setIsFightStarted] = useState(false)
  const [isGetPokemonClicked, setIsGetPokemonClicked] = useState(false)
  const [isGetChooseTrainerClicked, setIsChooseTrainerClicked] = useState(false)
  const [yourSelectedPokemon, setYourSelectedPokemon] = useState(false)

  const handleClickedTrainer = (trainer) => {
    setYourSelectedPokemon(trainer)
  }

  return (
    <>
      {isGetPokemonClicked ? (
        <div className="container">
          <GetNewPokemon setIsGetPokemonClicked={setIsGetPokemonClicked} />
        </div>
      ) : isFightStarted ? (
        <FightArena
          yourSelectedPokemon={yourSelectedPokemon}
          setIsFightStarted={setIsFightStarted}
        />
      ) : isGetChooseTrainerClicked ? (
        <div className="container">
          <ChooseTrainer
            handleClickedTrainer={handleClickedTrainer}
            setIsChooseTrainerClicked={setIsChooseTrainerClicked}
          />
        </div>
      ) : (
        <div className="container">
          <StartScreen
            setIsGetPokemonClicked={setIsGetPokemonClicked}
            isGetPokemonClicked={isGetPokemonClicked}
            setIsFightStarted={setIsFightStarted}
            isFightStarted={isFightStarted}
            setIsChooseTrainerClicked={setIsChooseTrainerClicked}
            isGetChooseTrainerClicked={isGetChooseTrainerClicked}
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
