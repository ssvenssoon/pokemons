import React, { useState, useEffect } from "react"
import "../StartScreen/StartScreen.scss"

const StartScreen = ({ isFightStarted, setIsFightStarted }) => {
  return (
    <>
      <button
        onClick={() => setIsFightStarted(!isFightStarted)}
        className="new-fight-btn"
      >
        Start new fight!
      </button>
    </>
  )
}

export default StartScreen
