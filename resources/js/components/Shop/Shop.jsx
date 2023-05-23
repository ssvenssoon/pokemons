import React, { useState, useEffect } from "react"
import axios from "axios"
import "./Shop.scss"

const Shop = ({ setIsShopClicked, yourSelectedTrainer, handleClickedTrainer }) => {
  const [bags, setBags] = useState(null)
  const [isBuyClicked, setIsBuyClicked] = useState(false)
  const [isInsufficientCoins, setIsInsufficientCoins] = useState(false)

  useEffect(() => {
    axios.get(`api/bags`).then((response) => {
      setBags(response.data.bag)
    })
  }, [])

  const handleBuyClicked = async (item) => {
    setIsBuyClicked(!isBuyClicked)
    try {
      if (yourSelectedTrainer) {
        await axios.post(`api/add-bag/trainer/${yourSelectedTrainer.id}`, {
          bagItem: item
        })
      }
    } catch (error) {
      if (error.response.status === 400) {
        setIsInsufficientCoins(true)
      }
    }
  }

  useEffect(() => {
    if (yourSelectedTrainer) {
      axios.get(`api/get-trainer/${yourSelectedTrainer.id}`).then((response) => {
        handleClickedTrainer(response.data.trainer)
      })
    }
  }, [isBuyClicked])

  return (
    <>
      <div className="get-pokemon-container">
        <button onClick={() => setIsShopClicked(false)} className="back-to-start-screen-btn">
          Back to start screen
        </button>

        <div className="shop-container">
          {bags?.map((item) => {
            return (
              <div key={item.id} className="shop-card">
                <li className="bag-items">
                  <h1>{item.name}</h1>
                  <img src={`../images/${item.icon}`} alt={item.name} />
                  <p className="price">Price: {item.price}</p>
                  <p className="effect">Effect: {item.description}</p>

                  <button className="shop-btn" role="button" onClick={() => handleBuyClicked(item)}>
                    Buy
                  </button>
                </li>
              </div>
            )
          })}
        </div>
      </div>

      {isInsufficientCoins && (
        <div className="error-modal">
          <div className="error-modal-content">
            <img src="https://100dayscss.com/codepen/alert.png" width="44" height="38" />
            <span class="title">Oh snap!</span>
            <p>Your trainer does not have enough coins</p>
            <div onClick={() => setIsInsufficientCoins(false)} class="button">
              Dismiss
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Shop
