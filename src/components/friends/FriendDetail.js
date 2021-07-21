import React, { useContext, useEffect, useState } from "react"
import { FriendContext } from "./FriendProvider"
import { useParams, useHistory } from "react-router-dom"
import { UserContext } from "../users/UserProvider"


export const FriendDetail = () => {
    const { getFriendById, removeFriend, addFriend, friends, getFriends } = useContext(FriendContext)
    const { getUserId, getUserById } = useContext(UserContext)
    const currentUser = parseInt(sessionStorage.getItem("nutshell_user"))

    const [friend, setFriend] = useState({})
    const [user, setUser] = useState({})

    const {friendId} = useParams();  
    const history = useHistory();

    let findUser = friends.find(friend => friend.currentUserId === currentUser  &&  friend.userId === parseInt(friendId))
    const foundUser = findUser?.id

    console.log(foundUser)

      useEffect(()=> {
        getFriends()
    }, [])

     useEffect(() => {
      console.log("useEffect", friendId)
      getFriendById(friendId)
      .then((response) => {
        setFriend(response)
        })
        }, []) 

      useEffect(() => {
        console.log("useEffect", friendId)
        getUserById(friendId)
        .then((response) => {
           setUser(response)
          })
          }, [])

    const handleFriend = () => {
      if (foundUser) {
        removeFriend(foundUser)
          .then(() => {
           history.push("/friends")
         })
      }
      else {
        addFriend({
          userId:  parseInt(friendId),
          currentUserId: currentUser
        })
        .then(() => history.push(`/friends`))
      }
    }  
    return(
        <section className="friend">
        <h3 className="friend__name">{user.name}</h3>
        <button onClick={handleFriend}>
          {foundUser ? <>Remove Friend </> : <>Add Friend</>}
        </button>
        </section>
    )

}