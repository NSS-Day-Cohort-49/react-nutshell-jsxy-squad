import React, { useContext, useState, useEffect } from "react"
// import { UserContext } from "../users/UserProvider"
import { PlannedEventContext } from "./PlannedEventProvider"
import { useHistory, useParams } from "react-router-dom"

export const PlannedEventForm = () => {
    const { addPlannedEvent, updatePlannedEvent, getPlannedEventById } =
        useContext(PlannedEventContext)
    // const { users, getUsers } = useContext(UserContext)
    const [plannedEvent, setPlannedEvent] = useState({
        name: "",
        date: "",
        location: "",
        userId: 0,
    })

    const [isLoading, setIsLoading] = useState(true)
    const { plannedEventId } = useParams()
    const history = useHistory()

    useEffect(() => {
        // getUsers().then(() => {
        if (plannedEventId) {
            getPlannedEventById(plannedEventId).then((event) => {
                setPlannedEvent(event)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
        // })
    }, [])

    const handleControlledInputChange = (event) => {
        const newPlannedEvent = { ...plannedEvent }
        newPlannedEvent[event.target.id] = event.target.value

        setPlannedEvent(newPlannedEvent)
    }

    const handleClickSaveEvent = (event) => {
        event.preventDefault()

        if (plannedEventId === 0) {
            window.alert("Please select an Event")
        } else {
            setIsLoading(true)
            if (plannedEventId) {
                updatePlannedEvent({
                    id: plannedEvent.id,
                    name: plannedEvent.name,
                    date: plannedEvent.date,
                    location: plannedEvent.location,
                    userId: plannedEvent.userId,
                }).then(() => history.push("/plannedEvents"))
            } else {
                addPlannedEvent({
                    name: plannedEvent.name,
                    date: plannedEvent.date,
                    location: plannedEvent.location,
                    userId: plannedEvent.userId,
                }).then(() => history.push("/plannedEvents"))
            }
        }
    }

    return (
        <form className="plannedEventForm">
            <h2 className="plannedEventForm_title">New Event</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="name">Event name:</label>
                    <input
                        type="text"
                        id="name"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Event name"
                        value={plannedEvent.name}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="location">Location: </label>
                    <input
                        type="text"
                        id="location"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Location"
                        value={plannedEvent.location}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="date">Date: </label>
                    <input
                        type="date"
                        id="date"
                        required
                        autoFocus
                        className="form-control"
                        placeholder="Date"
                        value={plannedEvent.date}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <button
                className="btn btn-primary"
                disabled={isLoading}
                onClick={handleClickSaveEvent}
            >
                {plannedEventId ? "Save Event" : "Add Event"}
            </button>
        </form>
    )
}

// const userId = parseInt(plannedEvent.userId)
// const loggedInUser = sessionStorage.getItem.value
