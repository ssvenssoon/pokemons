import React, { useState, useEffect } from "react"
import "./MovesBox.scss"

const MovesBox = ({ moves, setIsFightClicked }) => {
  return (
    <>
      <div className="moves-box">
        <button
          className="go-back-btn"
          onClick={() => setIsFightClicked(false)}
        >
          Go back
        </button>
        <div className="moves-container">
          {moves.map((item) => (
            <div className="moves" key={item.id}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default MovesBox
