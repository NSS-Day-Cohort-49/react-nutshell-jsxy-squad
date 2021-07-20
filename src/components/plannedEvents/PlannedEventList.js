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

    // filter by input date in string format

    let filteredEvents = plannedEvents.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
    )

    return (
        <div className="event__head">
            <div className="plannedEvents">
                <h2>Events</h2>
                <button
                    onClick={() => {
                        history.push("/plannedEvents/create")
                    }}
                >
                    New Event
                </button>
            </div>
            {filteredEvents.map((plannedEvent) => {
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
