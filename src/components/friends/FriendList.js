import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { FriendItem } from "./FriendItem";
import { FriendContext } from "./FriendProvider";

export const FriendList = () => {
    const { getFriends, removeFriend, friends } = useContext(FriendContext)

    const [friend] = useState({})

    useEffect(()=> {
        getFriends()
    }, [])

    const history = useHistory();
    const {friendId} = useParams();
    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))



    return (
        <>
            <h1>Friends</h1>

             <div className="friends">
                {
                    friends.map(friend => {
                        if (currentUserId === friend.friend){
                         return <FriendItem key={friend.id} friend={friend} />
                    }})
                  
                }
             </div>
         </>

    )
}