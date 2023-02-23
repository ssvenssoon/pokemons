import React, { useState, useEffect } from "react"
import "./BagItems.scss"

const BagItems = ({ setIsBagItemsClicked }) => {
  return (
    <>
      <div className="moves-box">
        <button
          // disabled={oppositionMakesAMove}
          className="go-back-btn"
          onClick={() => setIsBagItemsClicked(false)}
        >
          Go back
        </button>
        <div className="moves-container">
          {/* {yourBagItems.map((item) => (
            <button
              // disabled={win || lost || oppositionMakesAMove}
              // onClick={(e) => updateOppositionHealth(item.name, item.power)}
              className="moves"
              key={item.id}
            >
              {item.name}
            </button>
          ))} */}
        </div>
      </div>
    </>
  )
}

export default BagItems
