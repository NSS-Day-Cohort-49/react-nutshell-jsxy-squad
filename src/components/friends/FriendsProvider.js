import React, { useState, createContext } from "react"

export const FriendContext = createContext()

export const FriendProvider = (props) => {
    const [friends, setFriends] = useState([])

    const getFriendById = (id) => {
        return fetch(`http://localhost:8088/friends/${id}`).then((res) =>
            res.json()
        ) // note we don't set anything on state here. Why?
    }

    const getFriends = () => {
        return fetch("http://localhost:8088/friends")
            .then((res) => res.json())
            .then(setFriends)
    }
    const addFriend = (friendObj) => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(friendObj),
        }).then(getFriends)
    }

    const updateFriend = (friend) => {
        return fetch(`http://localhost:8088/friends/${friend.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(friend),
        }).then(getFriends)
    }

    return (
        <FriendContext.Provider
            value={{
                friends,
                getFriends,
                addFriend,
                getFriendById,
                updateFriend,
            }}
        >
            {props.children}
        </FriendContext.Provider>
    )
}
