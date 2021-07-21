import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { FriendItem } from "./FriendItem";
import { FriendContext } from "./FriendProvider";
import { UserContext } from "../users/UserProvider";

export const FriendList = () => {
    const { getFriends, removeFriend, friends, searchTerms } = useContext(FriendContext)
    const { users, getUsers} = useContext(UserContext)
    const [filteredUsers, setFiltered] = useState([]);


    useEffect(()=> {
        getUsers()
    }, [])

    useEffect(() => {
        if (searchTerms !== "") {
          // If the search field is not blank, display matching users
          const subset = users.filter(user => user.name.toLowerCase().includes(searchTerms))
          setFiltered(subset)
        } else {
          // If the search field is blank, display all users
          setFiltered(users)
        }
      }, [searchTerms, users])


    useEffect(()=> {
        getFriends()
    }, [])


    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
    
    return (
        <>
            <h1>Friends</h1>

             <div className="friends">
                {
                    friends.map(friend => {
                        if(currentUserId === friend.currentUserId){
                         return <FriendItem key={friend.id} friend={friend} />
                    }})
                  
                }
             </div>
         </>

    )
}