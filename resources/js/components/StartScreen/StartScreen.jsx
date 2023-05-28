import React, { useState, useEffect } from "react"
import "./StartScreen.scss"

const StartScreen = ({
  isFightStarted,
  setIsFightStarted,
  isGetPokemonClicked,
  setIsGetPokemonClicked,
  isGetChooseTrainerClicked,
  setIsChooseTrainerClicked,
  yourSelectedTrainer,
  setIsShopClicked,
  isShopClicked,
  isCreateTrainerClicked,
  setIsCreateTrainerClicked,
  setIsGetAllPokemonsClicked,
  isGetAllPokemonsClicked
}) => {
  return (
    <>
      <div className="home-screen-container">
        <img src={yourSelectedTrainer.profile_pic} className="your-trainer-avatar" />
        <h1>Welcome to Pokemon!</h1>
        <div className="btn-container">
          <button onClick={() => setIsFightStarted(!isFightStarted)} className="new-fight-btn">
            Start a fight!
          </button>
          <button onClick={() => setIsChooseTrainerClicked(!isGetChooseTrainerClicked)} className="new-fight-btn">
            Go to trainers!
          </button>
          <button onClick={() => setIsGetPokemonClicked(!isGetPokemonClicked)} className="new-fight-btn">
            Get a new pokemon!
          </button>
          <button onClick={() => setIsShopClicked(!isShopClicked)} className="new-fight-btn">
            Shop!
          </button>
          <button onClick={() => setIsCreateTrainerClicked(!isCreateTrainerClicked)} className="new-fight-btn">
            Create trainer!
          </button>
          <button onClick={() => setIsGetAllPokemonsClicked(!isGetAllPokemonsClicked)} className="new-fight-btn">
            All pokemons!
          </button>
        </div>
      </div>
    </>
  )
}

export default StartScreen
