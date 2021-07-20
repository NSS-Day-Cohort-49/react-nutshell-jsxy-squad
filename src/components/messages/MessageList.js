import React, { useContext, useEffect } from "react"
import { MessageContext } from "./MessageProvider"
import { MessageItem } from "./MessageItem"
import { MessageForm } from "./MessageForm"
import "./Messages.css"

export const MessageList = () => {
    const { messages, getMessages } = useContext(MessageContext)

    useEffect(() => {
        getMessages()
    }, [])

    const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

    const filteredMessages = messages.filter(message => {
        return message.recipientId === currentUserId || message.recipientId === 0 || message.userId === currentUserId
    })

    return (
        <>
            <div className="messages">
                {
                    filteredMessages.map(message => {
                        return <MessageItem key={message.id} message={message} />
                    })
                }
            </div>
            <MessageForm />
        </>
    )
}
