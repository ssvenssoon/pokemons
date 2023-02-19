import React, { useState, useEffect } from "react"
import MovesBox from "../MovesBox/MovesBox"
import FightingBox from "../FightingBox/FightingBox"
import PokemonsInBattle from "../PokemonsInBattle/PokemonsInBattle"
import FightEventsModal from "../FightEventsModal/FightEventsModal"
import "./FightArena.scss"

const FightArena = ({ setIsFightStarted }) => {
  const [yourPokemon, setYourPokemon] = useState(null)
  const [oppositePokemon, setOppositePokemon] = useState(null)
  const [newFight, setNewFight] = useState(false)
  const [isFightClicked, setIsFightClicked] = useState(false)
  const [win, setWin] = useState(false)
  const [lost, setLost] = useState(false)
  const [moves, setMoves] = useState(null)
  const [oppositionMakesAMove, setOppositionMakesAMove] = useState(false)
  const [oppositionMadeAMove, setOppositionMadeAMove] = useState(false)
  const [oppositePokemonHealth, setOppositePokemonHealth] = useState(null)

  const getOppositionRandomMove = (moves) => {
    const randomIndex = Math.floor(Math.random() * moves.length)
    return moves[randomIndex]
  }

  useEffect(() => {
    if (yourPokemon?.health <= 0) {
      setLost(true)
    }
    if (!yourPokemon) {
      return
    } else {
      axios.put(`api/pokemon/${yourPokemon.id}`, {
        damage: yourPokemon.health,
      })
    }
  }, [oppositionMadeAMove])

  const updateOppositionHealth = (moveName, power) => {
    const newOppositeHealth = Math.max(oppositePokemon.health - power / 2, 0)

    if (newOppositeHealth <= 0) {
      setWin(true)
    } else {
      setOppositionMakesAMove(true)
      setTimeout(() => {
        const randomMove = getOppositionRandomMove(oppositePokemon.moves)
        const randomPower = randomMove.power
        setYourPokemon((prevPokemon) => ({
          ...prevPokemon,
          health: Math.max(prevPokemon.health - randomPower / 2, 0),
        }))
        setOppositionMadeAMove(!oppositionMadeAMove)
        setOppositionMakesAMove(false)
      }, 3000)
    }

    if (newOppositeHealth !== oppositePokemon.health) {
      setOppositePokemon((prevPokemon) => ({
        ...prevPokemon,
        health: newOppositeHealth,
      }))

      axios
        .put(`api/pokemon/${oppositePokemon.id}`, {
          damage: newOppositeHealth,
        })
        .then((response) => {
          setOppositePokemonHealth(newOppositeHealth)
        })
        .catch((error) => {
          console.error(error)
        })
    }
  }

  const handleClickFighting = (frontSprite) => {
    setIsFightClicked(!isFightClicked)
    setMoves(frontSprite.moves)
  }

  useEffect(() => {
    axios.get(`api/pokemon`).then((response) => {
      setYourPokemon(response.data.pokemon[0])
      setOppositePokemon(response.data.pokemon[1])
      setOppositePokemonHealth(response.data.pokemon[1].health)
    })
    setWin(false)
    setLost(false)
    setIsFightClicked(false)
  }, [newFight])

  return (
    <div className="container">
      <div className="fight-ground">
        <button
          onClick={() => setIsFightStarted(false)}
          className="back-to-start-screen-btn"
        >
          Back to start screen
        </button>
        <FightEventsModal
          setNewFight={setNewFight}
          newFight={newFight}
          win={win}
          lost={lost}
          oppositionMakesAMove={oppositionMakesAMove}
          oppositePokemon={oppositePokemon}
        />
        <div className="sprites">
          <PokemonsInBattle
            oppositePokemon={oppositePokemon}
            yourPokemon={yourPokemon}
            oppositePokemonHealth={oppositePokemonHealth}
          />
        </div>
        <div className="fighting-box-container">
          {isFightClicked ? (
            <MovesBox
              oppositionMakesAMove={oppositionMakesAMove}
              win={win}
              lost={lost}
              updateOppositionHealth={updateOppositionHealth}
              moves={moves}
              setIsFightClicked={setIsFightClicked}
            />
          ) : (
            <FightingBox
              handleClickFighting={handleClickFighting}
              yourPokemon={yourPokemon}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FightArena
