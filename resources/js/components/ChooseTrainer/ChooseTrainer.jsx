import React, { useState, useEffect } from "react"
import "./ChooseTrainer.scss"

const ChooseTrainer = ({ setIsChooseTrainerClicked, handleClickedTrainer }) => {
  const [trainers, setTrainers] = useState(null)

  useEffect(() => {
    axios.get(`api/trainers`).then((response) => {
      setTrainers(response.data.trainers)
    })
  }, [])

  return (
    <>
      <div className="choose-pokemon-container">
        <button
          onClick={() => setIsChooseTrainerClicked(false)}
          className="back-to-start-screen-btn"
        >
          Back to start screen
        </button>
        <ul className="trainers-ul">
          {trainers?.map((item) => {
            return (
              <>
                <div onClick={() => handleClickedTrainer(item)}>
                  <img
                    className="trainers-profile-pic"
                    src={item.profile_pic}
                    alt={item.name + "-image"}
                  />
                  <li className="trainers-list-item">{"Name: " + item.name}</li>
                  <li className="trainers-list-item">{"Age: " + item.age}</li>
                </div>
              </>
            )
          })}
        </ul>
      </div>
    </>
  )
}

export default ChooseTrainer
