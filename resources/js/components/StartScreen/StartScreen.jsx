import React, { useState, useEffect } from "react"
import "../StartScreen/StartScreen.scss"

const StartScreen = ({
  isFightStarted,
  setIsFightStarted,
  isGetPokemonClicked,
  setIsGetPokemonClicked,
  isGetChooseTrainerClicked,
  setIsChooseTrainerClicked,
}) => {
  return (
    <>
      <div className="home-screen-container">
        <h1>Welcome to Pokemon!</h1>
        <button
          onClick={() => setIsChooseTrainerClicked(!isGetChooseTrainerClicked)}
          className="new-fight-btn"
        >
          Go to trainers!
        </button>
        <button
          onClick={() => setIsGetPokemonClicked(!isGetPokemonClicked)}
          className="new-fight-btn"
        >
          Get a new pokemon!
        </button>
        <button
          onClick={() => setIsFightStarted(!isFightStarted)}
          className="new-fight-btn"
        >
          Start random fight!
        </button>
      </div>
    </>
  )
}

export default StartScreen
