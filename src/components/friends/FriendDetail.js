import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "./FriendProvider"
import { useParams, useHistory } from "react-router-dom"


export const FriendDetail = () => {
    const { getFriendById, removeFriend, addFriend } = useContext(FriendContext)

    const [friend, setFriend] = useState({})

    const {friendId} = useParams();  
    const history = useHistory();

    const handleRemove = () => {
        removeFriend(friend.id)
          .then(() => {
            history.push("/friend")
          })
      }

    useEffect(() => {
      console.log("useEffect", friendId)
      getFriendById(friendId)
      .then((response) => {
        setFriend(response)
        })
        }, [])

    
    return(
        <section className="friend">
        <h3 className="friend__name">{friend.user?.name}</h3>
        <button onClick={handleRemove}>Remove Friend</button>

        </section>
    )

}