import React, { useState, useEffect } from "react"
import "./BagItems.scss"

const BagItems = ({
  setIsBagItemsClicked,
  selectedItems,
  handleBagItemsDescription,
}) => {
  return (
    <>
      <div className="moves-box">
        <button
          className="go-back-btn"
          onClick={() => setIsBagItemsClicked(false)}
        >
          Go back
        </button>
        <div className="moves-container">
          {selectedItems.map((item) => (
            <div className="items-container" key={item.id}>
              <button
                // disabled={win || lost || oppositionMakesAMove}
                onClick={() => handleBagItemsDescription(item.description)}
                className="moves"
                key={item.id}
              >
                {item.name}
              </button>
              <p>({item.description})</p>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default BagItems
