import React, { useContext, useEffect, useState } from "react"
import { PlannedEventContext } from "./PlannedEventProvider"
import { useHistory, useParams } from "react-router-dom"
import "./PlannedEvents.css"

export const PlannedEventItem = ({ plannedEvent }) => {
    const { getPlannedEventById, removePlannedEvent } =
        useContext(PlannedEventContext)

    const [, setPlannedEvent] = useState({})

    const { plannedEventId } = useParams()

    const history = useHistory()

    useEffect(() => {
        getPlannedEventById(plannedEventId).then((response) => {
            setPlannedEvent(response)
        })
    }, [])

    const customButtons =
        plannedEvent.userId ===
        parseInt(sessionStorage.getItem("nutshell_user")) ? (
            <>
                <button
                    onClick={() => {
                        removePlannedEvent(plannedEvent.id)
                        history.push("/plannedEvents")
                    }}
                >
                    Delete
                </button>
                <button
                    onClick={() => {
                        history.push(`/plannedEvents/edit/${plannedEvent.id}`)
                    }}
                >
                    Edit
                </button>
            </>
        ) : (
            ""
        )

    return (
        <>
            <article className="plannedEvent">
                <div className="event__description">
                    <h3 className="plannedEvent__name">{plannedEvent.name}</h3>
                    <div className="plannedEvent__location">
                        <b>Location:</b> {plannedEvent.location}
                    </div>
                    <div className="plannedEvent__date">
                        <b>Date:</b> {plannedEvent.date}
                    </div>
                    <div className="plannedEvent__user">
                        <b>Host:</b> {plannedEvent.user?.name}
                    </div>
                </div>
                <div className="event__buttons">{customButtons}</div>
            </article>
        </>
    )
}
