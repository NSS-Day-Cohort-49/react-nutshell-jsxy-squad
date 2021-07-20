import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { FriendItem } from "./FriendItem";
import { FriendContext } from "./FriendProvider";
import { UserContext } from "../users/UserProvider";

export const FriendList = () => {
    const { getFriends, removeFriend, friends } = useContext(FriendContext)
    const { getUsers, users } = useContext(UserContext)

    useEffect(()=> {
        getFriends()
    }, [])

    



    const history = useHistory();
    const {friendId} = useParams();
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

    const friendsMap = friends.map(friend => {
        return <FriendItem key={friend.id} friend={friend} />
    })
    
    return (
        <>
            <h1>Friends</h1>

             <div className="friends">
                {
                    friends.map(friend => {
                        if (currentUserId === friend.friendId){
                         return <FriendItem key={friend.user?.id} friend={friend} />
                    }})
                  
                }
             </div>
         </>

    )
}