import React, { useState, useEffect } from "react"
import MovesBox from "../MovesBox/MovesBox"
import FightingBox from "../FightingBox/FightingBox"
import PokemonsInBattle from "../PokemonsInBattle/PokemonsInBattle"
import FightEventsModal from "../FightEventsModal/FightEventsModal"
import "./FightArena.scss"
import PokemonsBox from "../PokemonsBox/PokemonsBox"
import BagItems from "../BagItems/BagItems"
import {
  calculateNewHealth,
  getOppositionRandomMove,
  getShuffledMoves,
} from "../../helpers"

const FightArena = ({
  setIsFightStarted,
  yourSelectedTrainer,
  setYourSelectedTrainer,
}) => {
  const [yourPokemon, setYourPokemon] = useState(null)
  const [oppositePokemon, setOppositePokemon] = useState(null)
  const [newFight, setNewFight] = useState(false)
  const [fightOutcome, setFightOutcome] = useState({
    won: false,
    lost: false,
    ongoing: false,
  })
  const [isFightClicked, setIsFightClicked] = useState(false)
  const [isBagItemsClicked, setIsBagItemsClicked] = useState(false)
  const [isTrainerClicked, setIsTrainerClicked] = useState(false)
  const [moves, setMoves] = useState(null)
  const [selectedItems, setSelectedItems] = useState(null)
  const [oppositionMadeAMove, setOppositionMadeAMove] = useState(false)
  const [oppositePokemonHealth, setOppositePokemonHealth] = useState(null)
  const [selectedPokemonsFromTrainer, setSelectedPokemonsFromTrainer] =
    useState(null)

  const handleOppositionMakesAMove = () => {
    setFightOutcome({
      ongoing: true,
    })
    setTimeout(() => {
      const randomMove = getOppositionRandomMove(oppositePokemon.moves)
      const randomPower = randomMove.power
      setYourPokemon((prevPokemon) => ({
        ...prevPokemon,
        health: calculateNewHealth(prevPokemon.health, randomPower),
      }))
      setOppositionMadeAMove(!oppositionMadeAMove)
      setFightOutcome({
        ongoing: false,
      })
    }, 2000)
  }

  const updateHealthOnClickedMove = async (power) => {
    const newOppositeHealth = calculateNewHealth(oppositePokemon.health, power)

    if (newOppositeHealth <= 0) {
      setFightOutcome({
        won: true,
      })
      try {
        const response = await axios.put(
          `api/trainers/${yourSelectedTrainer.id}`,
          {
            newCoins: 100,
          }
        )
        console.log(response.data.trainer)
        setSelectedItems(response.data.trainer.bags)
        setYourSelectedTrainer(response.data.trainer)
        setSelectedPokemonsFromTrainer(response.data.trainer.pokemons)
      } catch (error) {
        console.error(error)
      }
    } else {
      handleOppositionMakesAMove()
    }

    if (newOppositeHealth !== oppositePokemon.health) {
      setOppositePokemon((prevPokemon) => ({
        ...prevPokemon,
        health: newOppositeHealth,
      }))

      try {
        await axios.put(`api/pokemon/${oppositePokemon.id}`, {
          damage: newOppositeHealth,
        })
        setOppositePokemonHealth(newOppositeHealth)
      } catch (error) {
        console.error(error)
      }
    }
  }

  const handleClickFighting = (frontSprite) => {
    setIsFightClicked(!isFightClicked)
    const shuffledMoves = getShuffledMoves(frontSprite.moves)
    const randomMoves = shuffledMoves.slice(0, 4)
    setMoves(randomMoves)
  }

  const handleClickedPokemons = (trainersPokemon) => {
    setIsTrainerClicked(!isTrainerClicked)
    setSelectedPokemonsFromTrainer(trainersPokemon)
  }

  const clickedPokemonFromTrainer = async (pokemonFromTrainer) => {
    try {
      const response = await axios.get(`api/pokemon/${pokemonFromTrainer.id}`)
      setYourPokemon(response.data)
    } catch (error) {
      console.error(error)
    }
  }

  const handleClickBag = (bags) => {
    console.log(bags)
    setSelectedItems(bags)
    setIsBagItemsClicked(!isBagItemsClicked)
  }

  const handleBagItemsDescription = async (bagDescription) => {
    try {
      if (yourPokemon) {
        const response = await axios.put(`api/heal-pokemon/${yourPokemon.id}`, {
          bagDescription: bagDescription,
        })
        setYourPokemon(response.data.data)
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const updateYourPokemonHealth = async () => {
      try {
        if (yourPokemon?.health <= 0) {
          setFightOutcome({
            lost: true,
          })
        }
        if (!yourPokemon) {
          return
        }
        await axios.put(`api/pokemon/${yourPokemon.id}`, {
          damage: yourPokemon.health,
        })
      } catch (error) {
        console.error(error)
      }
    }
    updateYourPokemonHealth()
  }, [oppositionMadeAMove])

  useEffect(() => {
    const fetchPokemon = async () => {
      try {
        const response = await axios.get(`api/pokemon`)
        if (yourSelectedTrainer) {
          setYourPokemon(null)
        } else {
          setYourPokemon(response.data.pokemon[0])
        }
        setOppositePokemon(response.data.pokemon[1])
        setOppositePokemonHealth(response.data.pokemon[1].health)
        setFightOutcome({
          won: false,
          lost: false,
        })
        setIsFightClicked(false)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPokemon()
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
        <div className="your-amount-of-coins-container">
          <img src="/images/coin.png" alt="A coin icon" />
          <p>{yourSelectedTrainer?.coins}</p>
        </div>
        <img
          src={yourSelectedTrainer.profile_pic}
          className="your-trainer-avatar"
        />
        <FightEventsModal
          yourSelectedTrainer={yourSelectedTrainer}
          setNewFight={setNewFight}
          newFight={newFight}
          fightOutcome={fightOutcome}
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
          {isFightClicked && (
            <MovesBox
              moves={moves}
              fightOutcome={fightOutcome}
              setIsFightClicked={setIsFightClicked}
              updateHealthOnClickedMove={updateHealthOnClickedMove}
            />
          )}

          {isTrainerClicked && (
            <PokemonsBox
              clickedPokemonFromTrainer={clickedPokemonFromTrainer}
              selectedPokemonsFromTrainer={selectedPokemonsFromTrainer}
              setIsTrainerClicked={setIsTrainerClicked}
            />
          )}

          {isBagItemsClicked && (
            <BagItems
              handleBagItemsDescription={handleBagItemsDescription}
              selectedItems={selectedItems}
              setIsBagItemsClicked={setIsBagItemsClicked}
            />
          )}

          {!isTrainerClicked && !isFightClicked && !isBagItemsClicked && (
            <FightingBox
              handleClickBag={handleClickBag}
              handleClickFighting={handleClickFighting}
              yourPokemon={yourPokemon}
              yourSelectedTrainer={yourSelectedTrainer}
              handleClickedPokemons={handleClickedPokemons}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default FightArena
