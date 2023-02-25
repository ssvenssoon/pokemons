import React, { useState, useEffect } from "react"
import FightArena from "./components/FightArena/FightArena"
import StartScreen from "./components/StartScreen/StartScreen"
import GetNewPokemon from "./components/GetNewPokemon/GetNewPokemon"
import ChooseTrainer from "./components/ChooseTrainer/ChooseTrainer"
import "./App.scss"

const App = () => {
  const [isFightStarted, setIsFightStarted] = useState(false)
  const [isGetPokemonClicked, setIsGetPokemonClicked] = useState(false)
  const [isGetChooseTrainerClicked, setIsChooseTrainerClicked] = useState(false)
  const [yourSelectedTrainer, setYourSelectedTrainer] = useState(false)

  const handleClickedTrainer = (trainer) => {
    setYourSelectedTrainer(trainer)
  }

  return (
    <>
      {isGetPokemonClicked ? (
        <div className="container">
          <GetNewPokemon setIsGetPokemonClicked={setIsGetPokemonClicked} />
        </div>
      ) : isFightStarted ? (
        <FightArena
          yourSelectedTrainer={yourSelectedTrainer}
          setIsFightStarted={setIsFightStarted}
        />
      ) : isGetChooseTrainerClicked ? (
        <div className="container">
          <ChooseTrainer
            yourSelectedTrainer={yourSelectedTrainer}
            handleClickedTrainer={handleClickedTrainer}
            setIsChooseTrainerClicked={setIsChooseTrainerClicked}
          />
        </div>
      ) : (
        <div className="container">
          <StartScreen
            yourSelectedTrainer={yourSelectedTrainer}
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
