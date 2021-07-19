import React, { useContext, useEffect, useState } from "react"
import { PlannedEventContext } from "./PlannedEventProvider"
import { useHistory, useParams } from "react-router-dom"
import "./PlannedEvents.css"

export const PlannedEventItem = ({ plannedEvent }) => {
    const { getPlannedEventById, removePlannedEvent } =
        useContext(PlannedEventContext)

    const [event, setPlannedEvent] = useState({})

    const { plannedEventId } = useParams()

    const history = useHistory()

    const handleRemove = () => {
        removePlannedEvent(event.id).then(() => {
            history.push("/plannedEvents")
        })
    }

    useEffect(() => {
        getPlannedEventById(plannedEventId).then((response) => {
            setPlannedEvent(response)
        })
    }, [])

    return (
        <>
            <section className="plannedEvent">
                <h3 className="plannedEvent__name">{plannedEvent.name}</h3>
                <div className="plannedEvent__location">
                    {plannedEvent.location}
                </div>
                <div className="plannedEvent__date">{plannedEvent.date}</div>
                <div className="plannedEvent__user">
                    {plannedEvent.user?.name}
                </div>
                <button onClick={handleRemove}>Remove Event</button>
                <button
                    onClick={() => {
                        history.push(`/plannedEvents/edit/${plannedEvent.id}`)
                    }}
                >
                    Edit
                </button>
            </section>
        </>
    )
}
