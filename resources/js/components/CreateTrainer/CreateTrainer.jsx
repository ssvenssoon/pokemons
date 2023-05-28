import React, { useState } from "react"
import axios from "axios"
import "../CreateTrainer/CreateTrainer.scss"

const CreateTrainer = ({ setIsCreateTrainerClicked }) => {
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const [image, setImage] = useState("")
  const [errorMessage, setErrorMessage] = useState("")
  const [successMessage, setSuccessMessage] = useState("")

  const handleInputChange = (e) => {
    const { name, value } = e.target

    if (name === "name") {
      setName(value)
    } else if (name === "age") {
      setAge(value)
    } else if (name === "image") {
      setImage(e.target.files[0])
    }
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()

    const formData = new FormData()
    formData.append("name", name)
    formData.append("age", age)
    formData.append("image", image)

    axios
      .post("/api/create-trainer", formData)
      .then((response) => {
        setSuccessMessage("Trainer created successfully!")
        setErrorMessage("")
        setName("")
        setAge("")
        setImage("")
        console.log(response)
      })
      .catch((error) => {
        setErrorMessage("Failed to create the trainer.")
        setSuccessMessage("")
      })
  }

  return (
    <div className="create-trainer-container">
      <button onClick={() => setIsCreateTrainerClicked(false)} className="back-to-start-screen-btn">
        Back to start screen
      </button>
      <h2>Create Trainer</h2>
      <form onSubmit={handleFormSubmit}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={name} onChange={handleInputChange} />
        </div>
        <div>
          <label>Age:</label>
          <input type="number" name="age" value={age} onChange={handleInputChange} />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" accept="image/*" onChange={handleInputChange} />
        </div>
        <button type="submit">Create</button>
      </form>
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  )
}

export default CreateTrainer
