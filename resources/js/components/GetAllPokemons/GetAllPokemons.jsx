import React, { useEffect, useState } from "react"
import axios from "axios"
import "../GetAllPokemons/GetAllPokemons.scss"
import QuestionMark from "../../../../public/images/QuestionMark.svg"

const GetAllPokemons = ({ setIsGetAllPokemonsClicked, yourSelectedTrainer }) => {
  const [pokemons, setPokemons] = useState([])
  const [page, setPage] = useState(1)
  const [confirmPokemon, setConfirmPokemon] = useState(false)
  const [clickedPokemon, setClickedPokemon] = useState(false)
  const [noSelectedTrainer, setNoSelectedTrainer] = useState(false)

  const handleClickedPokemon = (pokemon) => {
    setConfirmPokemon(!confirmPokemon)
    setClickedPokemon(pokemon)
  }

  const handleClickedYes = async () => {
    setConfirmPokemon(false)
    try {
      await axios.post(`/api/add-pokemon-to-trainer/${clickedPokemon.id}/${yourSelectedTrainer.id}`)
    } catch (error) {
      console.error("Error fetching pokemons:", error)
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(`/api/pokemons?page=${page}`)
        setPokemons(response.data.pokemons)
      } catch (error) {
        console.error("Error fetching pokemons:", error)
      }
    }

    fetchData()
  }, [page])

  useEffect(() => {
    if (yourSelectedTrainer) {
      setNoSelectedTrainer(true)
    } else {
      setNoSelectedTrainer(false)
    }
  }, [yourSelectedTrainer])

  return (
    <div className="get-all-pokemons-wrapper">
      <button onClick={() => setIsGetAllPokemonsClicked(false)} className="back-to-start-screen-btn">
        Back to start screen
      </button>
      {!noSelectedTrainer ? (
        <h2 className="select-trainer-error">Please select a trainer first!</h2>
      ) : (
        <>
          <h2>Pokemons ({pokemons.total})</h2>
          <ul className="pokemons-wrapper">
            {pokemons?.data?.map((pokemon) => (
              <div onClick={() => handleClickedPokemon(pokemon)} className="pokemon-data-container">
                <h2>{pokemon?.name.toUpperCase()}</h2>
                <img src={pokemon.sprite_from_front} alt={`${pokemon?.name}`} />
              </div>
            ))}
          </ul>
          <div className="pagination">
            <button disabled={pokemons.from === page} onClick={() => setPage(page - 1)}>
              Prev
            </button>
            <p>{pokemons.current_page}</p>
            <button disabled={pokemons.last_page === page} onClick={() => setPage(page + 1)}>
              Next
            </button>
          </div>
          {confirmPokemon && yourSelectedTrainer && (
            <div className="confirm-modal">
              <div className="confirm-modal-content">
                <img src={QuestionMark} width="44" height="38" />
                <span class="title">Wait!</span>
                <p>
                  Are you sure you want to add {clickedPokemon ? clickedPokemon.name : ""} to{" "}
                  {yourSelectedTrainer ? yourSelectedTrainer.name : ""}?
                </p>
                <div onClick={handleClickedYes} class="yes-button">
                  Yes
                </div>
                <div onClick={() => setConfirmPokemon(false)} class="no-button">
                  No
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default GetAllPokemons
