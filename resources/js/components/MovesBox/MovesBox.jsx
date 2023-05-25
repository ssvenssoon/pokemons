import React, { useState, useEffect } from "react"
import "./MovesBox.scss"

const MovesBox = ({ moves, setIsFightClicked, updateHealthOnClickedMove, fightOutcome }) => {
  return (
    <>
      <div className="moves-box">
        <button disabled={fightOutcome?.ongoing} className="go-back-btn" onClick={() => setIsFightClicked(false)}>
          Go back
        </button>
        <div className="moves-container">
          {moves.map((item) => (
            <button
              disabled={fightOutcome.won || fightOutcome.lost || fightOutcome?.ongoing}
              onClick={(e) => updateHealthOnClickedMove(item.power)}
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
