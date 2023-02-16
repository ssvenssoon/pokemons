import React, { useState, useEffect } from "react"
import "./FightingBox.scss"

const FightingBox = ({ handleClickFighting, yourPokemon }) => {
  return (
    <>
      <div className="fighting-box">
        <div
          onClick={() => handleClickFighting(yourPokemon)}
          className="fighting"
        >
          <p>FIGHTING</p>
          <p>Select your attack move.</p>
        </div>
        <div className="bag">
          <p>BAG</p>
          <p>Use an item.</p>
        </div>
        <div className="pokemon">
          <p>POKEMON</p>
          <p>Switch current pokemon.</p>
        </div>
        <div className="run">
          <p>RUN</p>
          <p>Escape from battle.</p>
        </div>
      </div>
    </>
  )
}

export default FightingBox
