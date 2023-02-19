import React, { useState, useEffect } from "react"
import "./MovesBox.scss"

const MovesBox = ({
  moves,
  setIsFightClicked,
  updateOppositionHealth,
  win,
  oppositionMakesAMove,
  lost,
}) => {
  return (
    <>
      <div className="moves-box">
        <button
          disabled={oppositionMakesAMove}
          className="go-back-btn"
          onClick={() => setIsFightClicked(false)}
        >
          Go back
        </button>
        <div className="moves-container">
          {moves.map((item) => (
            <button
              disabled={win || lost || oppositionMakesAMove}
              onClick={(e) => updateOppositionHealth(item.name, item.power)}
              className="moves"
              key={item.id}
            >
              {item.name}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default MovesBox
