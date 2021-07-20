import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "./FriendProvider"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"


export const FriendDetail = () => {
    const { getFriendById, removeFriend, addFriend } = useContext(FriendContext)
    const { getUserId, getUserById } = useContext(UserContext)

    const [friend, setFriend] = useState({})
    const [user, setUser] = useState({})

    const {friendId} = useParams();  
    const history = useHistory();

    const handleRemove = () => {
        removeFriend(friend.id)
          .then(() => {
            history.push("/friends")
          })
      }

    /* useEffect(() => {
      console.log("useEffect", friendId)
      getFriendById(friendId)
      .then((response) => {
        setFriend(response)
        })
        }, []) */

      useEffect(() => {
        console.log("useEffect", friendId)
        getUserById(friendId)
        .then((response) => {
           setUser(response)
          })
          }, [])

    
    return(
        <section className="friend">
        <h3 className="friend__name">{user.name}</h3>
        <button onClick={handleRemove}>Remove Friend</button>

        </section>
    )

}