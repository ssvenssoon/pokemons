import React, { useState, useEffect } from "react"
import MovesBox from "../MovesBox/MovesBox"
import FightingBox from "../FightingBox/FightingBox"
import PokemonsInBattle from "../PokemonsInBattle/PokemonsInBattle"
import WinModal from "../WinModal/WinModal"
import "./FightArena.scss"

const FightArena = () => {
  const [yourPokemon, setYourPokemon] = useState(null)
  const [oppositePokemon, setOppositePokemon] = useState(null)
  const [isFightClicked, setIsFightClicked] = useState(false)
  const [win, setWin] = useState(false)
  const [moves, setMoves] = useState(null)
  const [oppositionMadeAMove, setOppositionMadeAMove] = useState(false)
  const [oppositePokemonHealth, setOppositePokemonHealth] = useState(null)

  const getOppositionRandomMove = (moves) => {
    const randomIndex = Math.floor(Math.random() * moves.length)
    return moves[randomIndex]
  }

  useEffect(() => {
    console.log(yourPokemon?.health)
    axios.put(`api/pokemon/${yourPokemon?.id}`, {
      damage: yourPokemon?.health,
    })
  }, [oppositionMadeAMove])

  const updateOppositionHealth = (moveName, power) => {
    let newHealth = oppositePokemon.health - power / 2

    if (newHealth <= 0) {
      newHealth = 0
      setWin(true)
    } else {
      setTimeout(() => {
        const randomMove = getOppositionRandomMove(oppositePokemon.moves)
        const randomPower = randomMove.power
        setYourPokemon((prevPokemon) => ({
          ...prevPokemon,
          health: prevPokemon.health - randomPower / 2,
        }))
        setOppositionMadeAMove(true)
      }, 2000)
    }

    setOppositePokemon((prevPokemon) => ({
      ...prevPokemon,
      health: newHealth,
    }))

    axios
      .put(`api/pokemon/${oppositePokemon.id}`, {
        damage: newHealth,
      })
      .then((response) => {
        setOppositePokemonHealth(newHealth)
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
      setOppositePokemonHealth(response.data.pokemon[1].health)
    })
  }, [])

  return (
    <div className="container">
      <div className="fight-ground">
        {win && <WinModal />}
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
