import React, { useContext, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { EventCard, UpcomingEventCard } from "./EventCard";
import { EventContext } from "./EventProvider";
import { useInterval } from "../useInterval"
import { Checkbox } from "semantic-ui-react"
import "./Event.css";

export const EventList = (_) => {
  const { events, getEvents } = useContext(EventContext);
  const [ update, setUpdate ] = useState(false)
  //   const [first, setFirst] = useState("true");

  useInterval(getEvents, update ? 3000 : null)
  
  useEffect(() => {
    getEvents()
  }, []);

  const filteredEvents = events.filter(event => { 
    return event.date >= new Date().toISOString().split("T")[0]
    })

  const history = useHistory();
  return (
    <>
      <h2>Events</h2>
      <Checkbox toggle 
          onChange={() => setUpdate(!update)}
          label={ update ? "Disable real-time updates" : "Allow real-time updates"}
      /><br />
      <button
        onClick={() => {
          history.push("events/create");
        }}
      >
        Add Event
      </button>
      <div className="events">
        {filteredEvents.map((event) => {
            if (event.id === filteredEvents[0].id) {
              return <UpcomingEventCard key={event.id} event={event} />;
            } else {
              return <EventCard key={event.id} event={event} />;
            }
        })}
      </div>
    </>
  );
};
