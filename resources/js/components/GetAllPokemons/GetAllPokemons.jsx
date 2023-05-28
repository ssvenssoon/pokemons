import React, { useEffect, useState } from "react"
import axios from "axios"
import "../GetAllPokemons/GetAllPokemons.scss"

const GetAllPokemons = ({ setIsGetAllPokemonsClicked }) => {
  // const [pokemons, setPokemons] = useState([])

  // useEffect(() => {
  //   fetchPokemons()
  // }, [])

  // const fetchPokemons = async () => {
  //   try {
  //     const response = await axios.get("/api/pokemons")
  //     setPokemons(response.data.pokemons)
  //   } catch (error) {
  //     console.error("Error fetching pokemons:", error)
  //   }
  // }

  return (
    <div className="get-all-pokemons-wrapper">
      <button onClick={() => setIsGetAllPokemonsClicked(false)} className="back-to-start-screen-btn">
        Back to start screen
      </button>
      <h2>Pokemons</h2>
      {/* <ul>
        {pokemons?.map((pokemon) => (
          <li key={pokemon.id}>
            <h3>{pokemon.name}</h3>
            <p>Type: {pokemon.type}</p>
            <p>Level: {pokemon.level}</p>
            <img src={pokemon.image_url} alt={pokemon.name} />
          </li>
        ))}
      </ul> */}
    </div>
  )
}

export default GetAllPokemons
