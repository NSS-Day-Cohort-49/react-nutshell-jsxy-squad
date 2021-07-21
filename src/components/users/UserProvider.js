import React, { useState, createContext } from "react"

export const UserContext = createContext()

export const UserProvider = (props) => {
    const [users, setUsers] = useState([])
    const [searchTerms, setSearchTerms] = useState("");

    const getUsers = () => {
        return fetch("http://localhost:8088/users?_embed=friends")
        .then(response => response.json())
        .then(setUsers)
    }

    const getUserById = (id) => {
        return fetch(`http://localhost:8088/users/${id}?_embed=friends`).then((res) =>
            res.json()
        ) 
    }


    return (
        <UserContext.Provider
            value={{
                users,
                getUsers,
                getUserById,
                searchTerms,
                setSearchTerms
            }}
        >
            {props.children}
        </UserContext.Provider>
    )
}
