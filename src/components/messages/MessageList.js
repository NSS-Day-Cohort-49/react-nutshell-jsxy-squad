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

    return (
        <>
            <div className="messages">
                {
                    messages.map(message => {
                        return <MessageItem key={message.id} message={message} />
                    })
                }
            </div>
            <MessageForm />
        </>
    )
}
