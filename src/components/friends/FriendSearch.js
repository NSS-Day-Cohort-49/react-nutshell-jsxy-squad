import React, { useContext } from "react"
import { FriendContext } from "./FriendProvider"

export const FriendSearch = () => {
  const { setSearchTerms } = useContext(FriendContext)

  return (
    <>
      Friend search:
      <input type="text"
        className="input--wide"
        onKeyUp={(event) => setSearchTerms(event.target.value)}
        placeholder="Find a current friend!" />
    </>
  )
}