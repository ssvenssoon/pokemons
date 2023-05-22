import React, { useState, useEffect } from "react"
import "./Shop.scss"

const Shop = ({ setIsShopClicked, yourSelectedTrainer }) => {
  const [bags, setBags] = useState(null)
  useEffect(() => {
    axios.get(`api/bags`).then((response) => {
      setBags(response.data.bag)
    })
  }, [])

  const handleBuyClicked = async (item) => {
    try {
      if (yourSelectedTrainer) {
        await axios.post(`api/add-bag/trainer/${yourSelectedTrainer.id}`, {
          bagItem: item
        })
      }
    } catch (error) {
      console.error(error)
    }
  }
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
                  <img src={`../images/${item.icon}`} />
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
    </>
  )
}

export default Shop
