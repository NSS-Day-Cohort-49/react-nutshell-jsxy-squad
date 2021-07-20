import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { MessageContext } from "./MessageProvider"
import "./Messages.css"

export const MessageForm = () => {
    const { addMessage, updateMessage, getMessageById } = useContext(MessageContext)
    const history = useHistory()
    const { messageId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (messageId) {
            getMessageById(messageId).then(event => {
                setMessage(event)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

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

        setIsLoading(true)
        if (messageId) {
            updateMessage({
                id: message.id,
                body: message.body,
                userId: currentUserId,
                recipientId: message.recipientId
            }).then(() => history.push("/messages"))
        } else {
            const newMessage = {
                body: message.body,
                userId: currentUserId,
                recipientId: 0
            }
    
            addMessage(newMessage)
            .then(setMessage({
                body: "",
                userId: 0,
                recipientId: 0
            }))
        }
    }

    return (
        <form className="messageForm">
            <fieldset>
                <div className="form-group">
                <input type="text" id="body" required autoFocus className="form-control" placeholder="Type @+user name to send private message" value={message.body} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button disabled ={isLoading} onClick={handleClickSendMessage}>
                {messageId ? "Update Message" : "Send Message"}
            </button>
        </form>
    )
}
