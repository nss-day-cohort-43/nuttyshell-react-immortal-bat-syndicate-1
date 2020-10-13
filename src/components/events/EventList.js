import React, { useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { EventCard, UpcomingEventCard } from "./EventCard";
import { EventContext } from "./EventProvider";
import "./Event.css";

export const EventList = (_) => {
  const { events, getEvents } = useContext(EventContext);
  //   const [first, setFirst] = useState("true");

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
