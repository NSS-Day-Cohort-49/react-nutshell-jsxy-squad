import React, { useState, createContext } from "react"

export const MessageContext = createContext()

export const MessageProvider = () => {
    const [messages, getMessages ] = useState([])

    const getMessages = () => {
        return fetch("localhost:8088/messages")
        .then(response => response.json())
        .then(setMessages)
    }

    const addMessage = messageObj => {
        return fetch("localhost:8088/messages", {
            method: "POST",
            headers: {
                "Content-Type:": "application.json"
            },
            body: JSON.Stringify(messageObj)
        })
        .then(getMessages)
    }

    const removeMessage = id => {
        return fetch(`localhost:8088/messages/${id}`, {
            method: "DELETE"
        })
        .then(getMessages)
    }

    return (
        <MessageContext.Provider value={{
            messages, getMessages, addMessage, removeMessage
        }}>
            {props.children}
        </MessageContext.Provider>
    )
}
