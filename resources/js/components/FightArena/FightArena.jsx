import React, { useState, useEffect } from "react"
import MovesBox from "../MovesBox/MovesBox"
import FightingBox from "../FightingBox/FightingBox"
import PokemonsInBattle from "../PokemonsInBattle/PokemonsInBattle"

import "./FightArena.scss"

const FightArena = () => {
  const [yourPokemon, setYourPokemon] = useState(null)
  const [oppositePokemon, setOppositePokemon] = useState(null)
  const [isFightClicked, setIsFightClicked] = useState(false)
  const [moves, setMoves] = useState(null)

  // const fetchPokemon = () => {
  //   axios
  //     .post("/api/pokemon", {
  //       name: pokemon.name,
  //       stats: pokemon.stats[0].base_stat,
  //       sprite_from_front: pokemon.sprites.front_default,
  //       sprite_from_back: pokemon.sprites.back_default,
  //     })
  //     .then((response) => {
  //       console.log(response)
  //     })
  // }

  const getClickedMove = (moveName, power) => {
    const newHealth = oppositePokemon.health - power
    console.log(oppositePokemon.health - power)

    console.log(newHealth)
    axios
      .put(`api/pokemon/${oppositePokemon.id}`, {
        damage: newHealth,
      })
      .then((response) => {
        console.log(response)
      })
  }

  const handleClickFighting = (frontSprite) => {
    setIsFightClicked(!isFightClicked)
    setMoves(frontSprite.moves)
  }

  useEffect(() => {
    axios.get(`api/pokemon`).then((response) => {
      setYourPokemon(response.data.pokemon[0])
      setOppositePokemon(response.data.pokemon[1])
    })
  }, [])

  return (
    <div className="container">
      <div className="fight-ground">
        {/* <button style={{ width: "50px" }} onClick={fetchPokemon}>
        Fetch
      </button> */}
        <div className="sprites">
          <PokemonsInBattle
            oppositePokemon={oppositePokemon}
            yourPokemon={yourPokemon}
          />
        </div>
        <div className="fighting-box-container">
          {isFightClicked ? (
            <>
              <MovesBox
                getClickedMove={getClickedMove}
                moves={moves}
                setIsFightClicked={setIsFightClicked}
              />
            </>
          ) : (
            <>
              <FightingBox
                handleClickFighting={handleClickFighting}
                yourPokemon={yourPokemon}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default FightArena
