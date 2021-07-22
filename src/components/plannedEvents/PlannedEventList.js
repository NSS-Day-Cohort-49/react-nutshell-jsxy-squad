import React, { useContext, useEffect } from "react"
import { PlannedEventContext } from "./PlannedEventProvider"
import { PlannedEventItem } from "./PlannedEventItem"
import "./PlannedEvents.css"
import { useHistory } from "react-router-dom"

export const PlannedEventList = () => {
    const { plannedEvents, getPlannedEvents, weather, getWeather } =
        useContext(PlannedEventContext)

    useEffect(() => {
        getPlannedEvents()
    }, [])

    useEffect(() => {
        getWeather()
    }, [])

    console.log(weather)

    const fTemp = 1.8 * (weather.main?.temp - 273) + 32

    const history = useHistory()

    // filter by input date in string format

    let filteredEvents = plannedEvents.sort(
        (a, b) => Date.parse(new Date(a.date)) - Date.parse(new Date(b.date))
    )

    return (
        <>
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
                    <h6>
                        {" "}
                        Current temperature in Nashville, TN:{" "}
                        {Math.round(fTemp)}
                        <span>&#8457;</span>
                        {/* degree fahrenheit symbol */}
                    </h6>
                </div>
                {filteredEvents.map((plannedEvent) => {
                    // if event date has passed dont't display
                    if (new Date(plannedEvent.date) > new Date())
                        return (
                            <PlannedEventItem
                                key={plannedEvent.id}
                                plannedEvent={plannedEvent}
                            />
                        )
                })}
            </div>
        </>
    )
}
