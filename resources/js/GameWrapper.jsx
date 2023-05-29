import React, { useState, useEffect } from "react"
import FightArena from "./components/FightArena/FightArena"
import StartScreen from "./components/StartScreen/StartScreen"
import GetNewPokemon from "./components/GetNewPokemon/GetNewPokemon"
import ChooseTrainer from "./components/ChooseTrainer/ChooseTrainer"
import CreateTrainer from "./components/CreateTrainer/CreateTrainer"
import GetAllPokemons from "./components/GetAllPokemons/GetAllPokemons"
import Shop from "./components/Shop/Shop"
import "./App.scss"

const GameWrapper = () => {
  const [isFightStarted, setIsFightStarted] = useState(false)
  const [isCreateTrainerClicked, setIsCreateTrainerClicked] = useState(false)
  const [isGetAllPokemonsClicked, setIsGetAllPokemonsClicked] = useState(false)
  const [isGetPokemonClicked, setIsGetPokemonClicked] = useState(false)
  const [isGetChooseTrainerClicked, setIsChooseTrainerClicked] = useState(false)
  const [yourSelectedTrainer, setYourSelectedTrainer] = useState(false)
  const [isShopClicked, setIsShopClicked] = useState(false)

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
          setYourSelectedTrainer={setYourSelectedTrainer}
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
      ) : isShopClicked ? (
        <div className="container">
          <Shop
            setIsShopClicked={setIsShopClicked}
            yourSelectedTrainer={yourSelectedTrainer}
            handleClickedTrainer={handleClickedTrainer}
          />
        </div>
      ) : isCreateTrainerClicked ? (
        <div className="container">
          <CreateTrainer setIsCreateTrainerClicked={setIsCreateTrainerClicked} />
        </div>
      ) : isGetAllPokemonsClicked ? (
        <div className="container">
          <GetAllPokemons
            setIsGetAllPokemonsClicked={setIsGetAllPokemonsClicked}
            yourSelectedTrainer={yourSelectedTrainer}
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
            setIsShopClicked={setIsShopClicked}
            isShopClicked={isShopClicked}
            setIsCreateTrainerClicked={setIsCreateTrainerClicked}
            isCreateTrainerClicked={isCreateTrainerClicked}
            setIsGetAllPokemonsClicked={setIsGetAllPokemonsClicked}
            isGetAllPokemonsClicked={isGetAllPokemonsClicked}
          />
        </div>
      )}
    </>
  )
}

export default GameWrapper
