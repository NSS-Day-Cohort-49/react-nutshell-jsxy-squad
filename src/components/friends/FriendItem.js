import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "../users/UserProvider"

export const FriendItem = ({ friend }) => {
    const { users, getUsers } = useContext(UserContext)
    
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

      useEffect(()=> {
        getUsers()
    }, [])
  

    /* const friendUser = users.find(user => user.id === friend.id) */
    let jackieboy = null

    if (friend.id !== currentUserId){
        jackieboy = friend.name
    }

    const napfriend = friend.friends?.map(friender => {
       
            return friender
    })

    const friendUser = users.find(user => user.id === friend.id)

    console.log(napfriend)



    return(
    <section className="friend">
        <h3 className="friend__name">
        <Link to={`/friends/detail/${friend.id}`}>
            { 
               friend.name
            }
        </Link>
        </h3>
    </section>)
}