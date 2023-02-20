import React, { useState, useEffect } from "react"
import "./GetNewPokemon.scss"

const GetNewPokemon = () => {
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonData, setPokemonData] = useState(null)

  const handleSubmit = (event) => {
    event.preventDefault()

    const lowerCasePokemon = pokemonName.toLowerCase()

    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemon}`)
      .then((response) => {
        setPokemonData(response.data)

        axios
          .post(`api/pokemon`, {
            name: response.data.name,
            moves: response.data.moves,
            sprite_from_front: response.data.sprites.front_default,
            sprite_from_back: response.data.sprites.back_default,
            stats: response.data.stats[0].base_stat,
          })
          .then((response) => {
            console.log(response)
          })
          .catch((error) => {
            console.error(error)
          })
      })
      .catch((error) => {
        console.error(error)
        setPokemonData(null)
      })
  }

  console.log(pokemonData)
  return (
    <div className="get-pokemon-container">
      <form onSubmit={handleSubmit}>
        <label>
          Enter pokémon name:
          <input
            type="text"
            value={pokemonName}
            onChange={(event) => setPokemonName(event.target.value)}
          />
        </label>
        <button type="submit">Get Pokémon</button>
      </form>
      {pokemonData && (
        <div className="pokemon-data-container">
          <h2>{pokemonData?.name}</h2>
          <img
            src={pokemonData.sprites?.front_default}
            alt={`${pokemonData?.name}`}
          />
        </div>
      )}
    </div>
  )
}

export default GetNewPokemon
