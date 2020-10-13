import React, { useState, createContext } from "react";

export const EventContext = createContext();

export const EventProvider = (props) => {
  const [events, setEvents] = useState([]);

  //gets events from API
  const getEvents = () => {
    return fetch(
      "http://localhost:8088/events?_sort=date&order=desc&_expand=user"
    )
      .then((response) => response.json())
      .then(res => {
        setEvents(res)
        return res
      });
  };

  //saves event to API and then triggers state change event
  const saveEvent = (eventObj) => {
    return fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    }).then(setEvents);
  };

  //deletes event from API and then triggers state change event
  const deleteEvent = (eventId) => {
    return fetch(`http://localhost:8088/events/${eventId}`, {
      method: "DELETE",
    }).then(setEvents);
  };

  //updates the specific event called upon and then triggers the state change event
  const updateEvent = (eventObj) => {
    return fetch(`http://localhost:8088/events/${eventObj.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    }).then(setEvents);
  };
  const getEventById = (id) => {
    return fetch(
      `http://localhost:8088/events/${id}?_expand=user`
    ).then((res) => res.json());
  };
  return (
    <EventContext.Provider
      value={{
        events,
        getEvents,
        saveEvent,
        deleteEvent,
        updateEvent,
        getEventById,
      }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
