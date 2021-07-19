import React, { useContext, useState } from "react"
import { MessageContext } from "./MessageProvider"
import "./Messages.css"

export const MessageForm = () => {
    const { addMessage } = useContext(MessageContext)

    const [ message, setMessage ] = useState({
        body: "",
        userId: 0,
        recipientId: 0
    })

    const handleControlledInputChange = event => {
        const newMessage = {...message}
        newMessage[event.target.id] = event.target.value

        setMessage(newMessage)
    }

    const handleClickSendMessage = event => {
        event.preventDefault()

        const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

        const newMessage = {
            body: message.body,
            userId: currentUserId,
            recipientId: 0
        }

        addMessage(newMessage)
    }

    return (
        <form className="messageForm">
            <fieldset>
                <div className="form-group">
                <input type="text" id="body" required autoFocus className="form-control" placeholder="Type @+user name to send private message" value={message.body} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button onClick={handleClickSendMessage}>
                Send Message
            </button>
        </form>
    )
}
