import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { MessageContext } from "./MessageProvider"
import { UserContext } from "../users/UserProvider"
import "./Messages.css"

export const MessageItem = ({ message }) => {
    const { users, getUsers } = useContext(UserContext)
    const { removeMessage } = useContext(MessageContext)
    const history = useHistory()

    useEffect(() => {
        getUsers()
    }, [])


    const sender = users.find(user => user.id === message.userId)
    console.log(users)
    const privateMessage = message.recipientId ? "privateMessage" : ""
    const toYouString = message.recipientId ? " to you" : ""
    let userButtons
    if (message.userId === parseInt(sessionStorage.getItem("nutshell_user"))) {
        userButtons = <>
                        <button onClick={() => history.push(`/messages/edit/${message.id}`)}>
                                Edit
                        </button>
                        <button onClick={() => removeMessage(message.id)}>
                                Delete Message
                        </button>
                    </>    
    }

    return (
        <>
            <section className={`message ${privateMessage}`}>
                <div className="message__sender">{sender?.name} says{toYouString}:</div>
                <div className="message__body">{message.body}</div>
                {userButtons}
            </section>
        </>
    )
}
