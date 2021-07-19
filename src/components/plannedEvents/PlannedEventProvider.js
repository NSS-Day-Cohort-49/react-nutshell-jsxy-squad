import React, { useState, createContext } from "react"

export const PlannedEventContext = createContext()

export const PlannedEventProvider = (props) => {
    const [plannedEvents, setPlannedEvents] = useState([])

    const getPlannedEventById = (id) => {
        return fetch(
            `http://localhost:8088/plannedEvents/${id}
            `
        ).then((res) => res.json())
    }

    const getPlannedEvents = () => {
        return fetch("http://localhost:8088/plannedEvents?_expand=user")
            .then((response) => response.json())
            .then(setPlannedEvents)
    }

    const addPlannedEvent = (eventObj) => {
        return fetch("http://localhost:8088/plannedEvents?_expand=user", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(eventObj),
        }).then(getPlannedEvents)
    }

    const updatePlannedEvent = (plannedEvent) => {
        return fetch(`http://localhost:8088/plannedEvents/${plannedEvent.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(plannedEvent),
        }).then(getPlannedEvents)
    }

    const removePlannedEvent = (id) => {
        return fetch(`http://localhost:8088/plannedEvents/${id}`, {
            method: "DELETE",
        }).then(getPlannedEvents)
    }

    return (
        <PlannedEventContext.Provider
            value={{
                plannedEvents,
                getPlannedEvents,
                addPlannedEvent,
                removePlannedEvent,
                getPlannedEventById,
                updatePlannedEvent,
            }}
        >
            {props.children}
        </PlannedEventContext.Provider>
    )
}
