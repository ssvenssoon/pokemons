import React, { useState, useEffect } from "react"
import "./FightingBox.scss"

const FightingBox = ({
  handleClickFighting,
  yourPokemon,
  yourSelectedTrainer,
  handleClickedPokemons,
}) => {
  return (
    <>
      <div className="fighting-box">
        <button
          onClick={() => handleClickFighting(yourPokemon)}
          className="fighting"
        >
          <p>FIGHTING</p>
          <p>Select your attack move.</p>
        </button>
        <button className="bag">
          <p>BAG</p>
          <p>Use an item.</p>
        </button>
        <button
          onClick={() => handleClickedPokemons(yourSelectedTrainer.pokemons)}
          className="pokemon"
        >
          <p>POKEMON</p>
          <p>Switch current pokemon.</p>
        </button>
        <button className="run">
          <p>RUN</p>
          <p>Escape from battle.</p>
        </button>
      </div>
    </>
  )
}

export default FightingBox
