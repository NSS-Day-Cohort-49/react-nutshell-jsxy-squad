import React, { useState, useEffect, useContext } from "react"
import { Link } from "react-router-dom"
import { UserContext } from "./UserProvider"

export const UserItem = ({ user }) => {
    const { users, getUsers } = useContext(UserContext)
    
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

      useEffect(()=> {
        getUsers()
    }, [])
  
    return(
    <section className="user">
        <h3 className="user__name">
        <Link to={`/friends/detail/${user.id}`}>
            {           
               user.name
            }
        </Link>
        </h3>
    </section>)
}