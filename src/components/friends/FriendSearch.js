import React, { useContext } from "react"
import { UserContext } from "../users/UserProvider"
import "./Animal.css"

export const AnimalSearch = () => {
  const { setSearchTerms } = useContext(UserContext)

  return (
    <>
      Friend search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Search for a new friend! " />
    </>
  )
}