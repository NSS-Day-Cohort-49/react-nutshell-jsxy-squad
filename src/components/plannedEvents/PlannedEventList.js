import React, { useContext, useEffect } from "react"
import { PlannedEventContext } from "./PlannedEventProvider"
import { PlannedEventItem } from "./PlannedEventItem"
import "./PlannedEvents.css"
import { useHistory } from "react-router-dom"

export const PlannedEventList = () => {
    const { plannedEvents, getPlannedEvents } = useContext(PlannedEventContext)

    useEffect(() => {
        getPlannedEvents()
    }, [])

    const history = useHistory()

    return (
        <div className="plannedEvents">
            <h2>Events</h2>
            <button
                onClick={() => {
                    history.push("/plannedEvents/create")
                }}
            >
                New Event
            </button>
            {plannedEvents.map((plannedEvent) => {
                return (
                    <PlannedEventItem
                        key={plannedEvent.id}
                        plannedEvent={plannedEvent}
                    />
                )
            })}
        </div>
    )
}
