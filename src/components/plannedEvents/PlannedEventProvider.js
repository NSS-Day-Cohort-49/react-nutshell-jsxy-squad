import React, { useState, createContext } from "react"

export const PlannedEventContext = createContext()

export const PlannedEventProvider = (props) => {
    const [plannedEvents, setPlannedEvents] = useState([])
    const [weather, setWeather] = useState([])

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

    const getWeather = () => {
        return fetch("https://api.openweathermap.org/data/2.5/weather?q=Nashville&appid=1b98bfa12f2c243fbc6f1f5732fbf2b5")
            .then((response) => response.json())
            .then(setWeather)
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
                getWeather,
                weather
            }}
        >
            {props.children}
        </PlannedEventContext.Provider>
    )
}
