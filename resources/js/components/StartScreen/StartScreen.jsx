import React, { useState, useEffect } from "react"
import "../StartScreen/StartScreen.scss"

const StartScreen = ({
  isFightStarted,
  setIsFightStarted,
  isGetPokemonClicked,
  setIsGetPokemonClicked,
}) => {
  return (
    <>
      <div className="home-screen-container">
        <h1>Welcome to Pokemon!</h1>
        <button
          onClick={() => setIsFightStarted(!isFightStarted)}
          className="new-fight-btn"
        >
          Start new fight!
        </button>
        <button
          onClick={() => setIsGetPokemonClicked(!isGetPokemonClicked)}
          className="new-fight-btn"
        >
          Get a new pokemon!
        </button>
      </div>
    </>
  )
}

export default StartScreen
