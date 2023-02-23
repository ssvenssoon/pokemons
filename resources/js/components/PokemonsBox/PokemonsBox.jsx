import React from "react"
import "./PokemonsBox.scss"

const PokemonsBox = ({
  setIsTrainerClicked,
  selectedPokemonsFromTrainer,
  clickedPokemonFromTrainer,
}) => {
  return (
    <>
      <div className="pokemons-box">
        <button
          className="go-back-btn"
          onClick={() => setIsTrainerClicked(false)}
        >
          Go back
        </button>
        <div className="pokemons-container">
          {selectedPokemonsFromTrainer.map((item) => (
            <button
              onClick={() => clickedPokemonFromTrainer(item)}
              key={item.id}
              className="pokemon"
            >
              <p>{item.name}</p>
              <img src={item.sprite_from_front} />
            </button>
          ))}
        </div>
      </div>
    </>
  )
}

export default PokemonsBox
