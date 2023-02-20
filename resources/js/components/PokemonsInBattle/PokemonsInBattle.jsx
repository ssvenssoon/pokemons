import React, { useState, useEffect } from "react"
import "./PokemonsInBattle.scss"

const PokemonsInBattle = ({
  yourPokemon,
  oppositePokemon,
  oppositePokemonHealth,
}) => {
  console.log(yourPokemon)
  return (
    <>
      <div className="your-pokemon-health">
        <h3>HP: {yourPokemon?.health}</h3>
      </div>
      <img
        className="sprite-from-front"
        src={yourPokemon?.sprite_from_back}
        alt=""
      />
      <div className="opponent-pokemon-health">
        <h3>HP: {oppositePokemonHealth ?? oppositePokemon?.health}</h3>
      </div>
      <img
        className="sprite-from-back"
        src={oppositePokemon?.sprite_from_front}
        alt=""
      />
    </>
  )
}

export default PokemonsInBattle
