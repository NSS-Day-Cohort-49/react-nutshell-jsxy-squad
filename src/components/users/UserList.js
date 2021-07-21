import React, { useState, useContext, useEffect } from "react"
import { UserItem } from "./UserItem";
import { UserContext } from "../users/UserProvider";


export const UserList = () => {
    const { getUsers, users, searchTerms } = useContext(UserContext)
    const [filteredUsers, setFiltered] = useState([]);

    /* const { getFriends, removeFriend, friends, searchTerms } = useContext(FriendContext) */


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
        getUsers()
    }, [])

    
    return (
        <>
            <h1>Users</h1>

             <div className="users">
                {
                    filteredUsers.map(user => {

                       return <UserItem key={user.id} user={user} />
                    })
                  
                }
             </div>
         </>

    )
}