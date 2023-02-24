import React, { useState, useEffect } from "react"
import "./FightEventsModal.scss"

const FightEventsModal = ({
  fightOutcome,
  oppositePokemon,
  setNewFight,
  newFight,
}) => {
  return (
    <>
      {fightOutcome.won && (
        <div className="modal-container">
          <h2 className="won-modal-heading">Your pokemon won!</h2>
          <button onClick={() => setNewFight(!newFight)}>New fight!</button>
        </div>
      )}
      {fightOutcome.lost && (
        <div className="modal-container">
          <h2 className="lost-modal-heading">Your pokemon lost!</h2>
          <button onClick={() => setNewFight(!newFight)}>New fight!</button>
        </div>
      )}
      {fightOutcome.ongoing && (
        <div className="modal-container">
          <h2 className="opposition-makes-a-move-modal-heading">
            {oppositePokemon.name} makes a move...
          </h2>
        </div>
      )}
    </>
  )
}

export default FightEventsModal
