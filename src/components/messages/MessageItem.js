import React, { useContext, useEffect } from "react"
import { UserContext } from "../users/UserProvider"
import "./Messages.css"

export const MessageItem = ({ message }) => {
    const { users, getUsers } = useContext(UserContext)

    useEffect(() => {
        getUsers()
    }, [])


    const sender = users.find(user => user.id === message.userId)
    console.log(users)
    const privateMessage = message.recipientId ? "privateMessage" : ""
    const toYouString = message.recipientId ? " to you" : ""

    return (
        <section className={`message ${privateMessage}`}>
            <div className="message__sender">{sender?.name} says{toYouString}:</div>
            <div className="message__body">{message.body}</div>
        </section>
    )
}
