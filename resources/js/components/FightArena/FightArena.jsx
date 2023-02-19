import React, { useState, useEffect } from "react"
import MovesBox from "../MovesBox/MovesBox"
import FightingBox from "../FightingBox/FightingBox"
import PokemonsInBattle from "../PokemonsInBattle/PokemonsInBattle"
import WinModal from "../WinModal/WinModal"
import LostModal from "../LostModal/LostModal"
import "./FightArena.scss"

const FightArena = () => {
  const [yourPokemon, setYourPokemon] = useState(null)
  const [oppositePokemon, setOppositePokemon] = useState(null)
  const [isFightClicked, setIsFightClicked] = useState(false)
  const [win, setWin] = useState(false)
  const [lost, setLost] = useState(false)
  const [moves, setMoves] = useState(null)
  const [oppositionMadeAMove, setOppositionMadeAMove] = useState(false)
  const [oppositePokemonHealth, setOppositePokemonHealth] = useState(null)

  const getOppositionRandomMove = (moves) => {
    const randomIndex = Math.floor(Math.random() * moves.length)
    return moves[randomIndex]
  }

  useEffect(() => {
    if (!yourPokemon) {
      return
    } else {
      if (yourPokemon.health <= 0) {
        setLost(true)
      }
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
      setTimeout(() => {
        const randomMove = getOppositionRandomMove(oppositePokemon.moves)
        const randomPower = randomMove.power
        setYourPokemon((prevPokemon) => ({
          ...prevPokemon,
          health: Math.max(prevPokemon.health - randomPower / 2, 0),
        }))
        setOppositionMadeAMove(!oppositionMadeAMove)
      }, 1000)
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
  }, [])

  return (
    <div className="container">
      <div className="fight-ground">
        {win && <WinModal />}
        {lost && <LostModal />}
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
              win={win}
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
