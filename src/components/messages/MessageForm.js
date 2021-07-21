import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from "react-router"
import { MessageContext } from "./MessageProvider"
import { UserContext } from "../users/UserProvider"
import "./Messages.css"

export const MessageForm = () => {
    const { addMessage, updateMessage, getMessageById } = useContext(MessageContext)
    const { users, getUsers } = useContext(UserContext)
    const history = useHistory()
    const { messageId } = useParams()
    const [isLoading, setIsLoading] = useState(true)

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

    const [message, setMessage] = useState({
        body: "",
        userId: 0,
        recipientId: 0
    })

    const [privateDialog, setPrivateDialog] = useState(false)
    const [recipientId, setRecipientId] = useState(0)

    const placeholderString = recipientId ? "Message is now private" : "Type '@' to make message private"

    const handleControlledInputChange = event => {
        const newMessage = { ...message }
        newMessage[event.target.id] = event.target.value

        if (newMessage.body === "@") {
            setPrivateDialog(true)
        }

        setMessage(newMessage)
    }

    const handleDialogClose = () => {
        setPrivateDialog(false)

        setMessage({
            body: "",
            userId: 0,
            recipientId: 0
        })
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
                recipientId: recipientId
            }

            addMessage(newMessage)
                .then(setRecipientId(0))
                .then(setMessage({
                    body: "",
                    userId: 0,
                    recipientId: 0
                }))
        }
    }

    return (
        <>
            <div className="main__message__form">
                <dialog className="privateDialog" open={privateDialog}>
                    <div>Who would you like to send this private message?</div>
                    {users.map(user => {
                        return <label className="radio-group">
                            <input type="radio" value={user.id} onChange={() => setRecipientId(user.id)} />{user.name}
                        </label>
                    })}
                    <label className="radio-group">
                        <input type="radio" value="public" onChange={() => setRecipientId(0)} />Public
                    </label>
                    <button onClick={handleDialogClose}>Close</button>
                </dialog>
                <form className="messageForm">
                    <fieldset className="message__textarea">
                        <div className="form-group">
                            <textarea type="text" id="body" required autoFocus className="form-control" placeholder={placeholderString} value={message.body} onChange={handleControlledInputChange} />
                        </div>
                    </fieldset>
                    <button className="send__message__button" onClick={handleClickSendMessage}>
                        {messageId ? "Update Message" : "Send Message"}
                    </button>
                </form>
            </div>
        </>
    )
}
