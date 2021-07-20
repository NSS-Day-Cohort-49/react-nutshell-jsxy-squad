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

    useEffect(()=> {
        getUsers()
    }, [])

    



    const history = useHistory();
    const {friendId} = useParams();
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))



    const filterfriend = friends.map(friend => {
        if (friend.id === currentUserId) {
            return friend
        }
    })

    const findFrienders = friends.filter((friender)=>{
        if(friender.friendId === currentUserId){
            return friender.id
        } 
            
        })

     const mapFriends = users.friends?.map(friender => {
         return friender.userId
     }) 

     /* console.log(findFrienders)  */
    
    return (
        <>
            <h1>Friends</h1>

             <div className="friends">
                {
                    users.map(user => {
                         return <FriendItem key={user.id} friend={user} />
                    })
                  
                }
             </div>
         </>

    )
}