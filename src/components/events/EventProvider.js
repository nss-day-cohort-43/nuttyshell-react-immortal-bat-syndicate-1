import React, { useState, createContext } from "react";
import api from "../Settings.js";

export const EventContext = createContext();

export const EventProvider = (props) => {
  const [events, setEvents] = useState([]);

  //gets events from API
  const getEvents = () => {
    return fetch("http://localhost:8088/events?_expand=user")
      .then((response) => response.json())
      .then(setEvents);
  };

  //saves event to API and then triggers state change event
  const saveEvent = (eventObj) => {
    fetch("http://localhost:8088/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    }).then(setEvents);
  };

  //deletes event from API and then triggers state change event
  const deleteEvent = (eventId) => {
    fetch(`http://localhost:8088/events/${eventId}`, {
      method: "DELETE",
    }).then(setEvents);
  };

  //updates the specific event called upon and then triggers the state change event
  const updateEvent = (eventObj) => {
    fetch(`http://localhost:8088/events/${eventObj.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventObj),
    }).then(setEvents);
  };
  return (
    <EventContext.Provider
      value={{ events, getEvents, saveEvent, deleteEvent, updateEvent }}
    >
      {props.children}
    </EventContext.Provider>
  );
};
