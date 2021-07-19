import React, { useState } from "react"
import { Link } from "react-router-dom"

export const FriendItem = ({ friend }) => {
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))


    return(
    <section className="friend">
        <h3 className="friend__name">
        <Link to={`/friends/detail/${friend.id}`}>
            { friend.user.name }
        </Link>
        </h3>
    </section>)
}