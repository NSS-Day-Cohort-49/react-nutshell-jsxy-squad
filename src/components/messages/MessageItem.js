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

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))
    const sender = users.find(user => user.id === message.userId)
    let senderString = `${sender?.name} says`
    if (sender.id === currentUserId) {
        senderString = "You say"
    }

    const privateMessage = message.recipientId ? "privateMessage" : ""
    let privateString = ""
    let privateRecipient = users.find(user => user.id === message.recipientId)
    if (currentUserId === message.recipientId) {
        privateString = " to you"
    }
    if (message.recipientId && currentUserId === message.userId) {
        privateString = ` to ${privateRecipient?.name}`
    }

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
                <div className="message__sender">{senderString} {privateString}:</div>
                <div className="message__body">{message.body}</div>
                {userButtons}
            </section>
        </>
    )
}
