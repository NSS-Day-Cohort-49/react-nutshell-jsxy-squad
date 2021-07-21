import React, { useState, useContext, useEffect } from "react"
import { FriendItem } from "./FriendItem";
import { FriendContext } from "./FriendProvider";
import { Link } from "react-router-dom"

export const FriendList = () => {
    const { getFriends, removeFriend, friends, searchTerms } = useContext(FriendContext)
    const [filteredFriends, setFiltered] = useState([]);



    useEffect(() => {
        if (searchTerms !== "") {
          const subset = friends.filter(friend => friend.user?.name.toLowerCase().includes(searchTerms))
          setFiltered(subset)
        } else {
          setFiltered(friends)
        }
      }, [searchTerms, friends])


    useEffect(()=> {
        getFriends()
    }, [])


    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
    
    return (
        <>
            <Link className="nav-link" to="/users">
                        Add a friend
            </Link>
            <h1>Friends</h1>

             <div className="friends">
                {
                    filteredFriends.map(friend => {
                        if(currentUserId === friend.currentUserId){
                         return <FriendItem key={friend.id} friend={friend} />
                    }})
                  
                }
             </div>
         </>

    )
}