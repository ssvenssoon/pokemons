import React, { useState, useEffect } from "react"
import "./PokemonsInBattle.scss"

const PokemonsInBattle = ({ yourPokemon, oppositePokemon }) => {
  const [yourPokemonHealth, setYourPokemonHealth] = useState(100)
  const [opponentPokemonHealth, setOpponentPokemonHealth] = useState(100)

  console.log(yourPokemon)

  return (
    <>
      <div className="your-pokemon-health">
        <h3>HP: {yourPokemonHealth}</h3>
      </div>
      <img
        className="sprite-from-front"
        src={yourPokemon?.sprite_from_back}
        alt=""
      />
      <div className="opponent-pokemon-health">
        <h3>HP: {opponentPokemonHealth}</h3>
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
