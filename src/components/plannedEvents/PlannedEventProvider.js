import React, { useState, createContext } from "react"

export const PlannedEventContext = createContext()

export const PlannedEventProvider = (props) => {
    const [plannedEvents, setPlannedEvents ] = useState([])

    const getPlannedEvents = () => {
        return fetch("localhost:8088/plannedEvents")
        .then(response => response.json())
        .then(setPlannedEvents)
    }

    const addPlannedEvent = eventObj => {
        return fetch("localhost:8088/plannedEvents", {
            method: "POST",
            headers: {
                "Content-Type:": "application.json"
            },
            body: JSON.Stringify(eventObj)
        })
        .then(getPlannedEvents)
    }

    const removePlannedEvent = id => {
        return fetch(`localhost:8088/plannedEvents/${id}`, {
            method: "DELETE"
        })
        .then(getPlannedEvents)
    }

    return (
        <PlannedEventContext.Provider value={{
            plannedEvents, getPlannedEvents, addPlannedEvent, removePlannedEvent
        }}>
            {props.children}
        </PlannedEventContext.Provider>
    )
}