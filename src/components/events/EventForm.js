import React, { useContext, useEffect, useState } from "react";
import "./Event.css";
import { EventContext } from "./EventProvider";
import { useHistory, useParams } from "react-router-dom";

export const EventForm = () => {
  const { saveEvent, getEventById, updateEvent } = useContext(EventContext);
  const [event, setEvent] = useState({});

  const [isLoading, setIsLoading] = useState(true);

  const { eventId } = useParams();
  const history = useHistory();
//   const stateAbbreviations = [
//     'AL','AK','AZ','AR','CA','CO','CT','DE','FL','GA',
//     'HI','ID','IL','IN','IA','KS','KY','LA','ME','MD',
//     'MA','MI','MN','MS','MO','MT','NE','NV','NH','NJ',
//     'NM','NY','NC','ND','OH','OK','OR','PA','RI','SC',
//     'SD','TN','TX','UT','VT','VA','WA','WV','WI','WY'
// ];

  const handleControlledInputChange = (e) => {
    const newEvent = { ...event };
    newEvent[e.target.name] = e.target.value;
    setEvent(newEvent);
  };

  useEffect(() => {
    if (eventId) {
      getEventById(eventId)
      .then((event) => {
        setEvent(event);
        setIsLoading(false);
      });
    } else {
      setIsLoading(false);
    }
  }, []);

  const constructEventObject = () => {
    setIsLoading(true);
    if (eventId) {
      //PUT - update
      updateEvent({
        id: event.id,
        name: event.name,
        date: event.date,
        address: event.address,
        city: event.city,
        state: event.state,
        zip: event.zip,
      }).then(() => history.push(`/events/detail/${event.id}`));
    } else {
      //POST - add
      saveEvent({
        name: event.name,
        date: event.date,
        address: event.address,
        city: event.city,
        state: event.state,
        zip: event.zip,
        userId: parseInt(localStorage.getItem("nutty_user"))
      }).then(() => history.push("/events"));
    }
  };
const handleSubmit = e => {
    e.preventDefault()
    constructEventObject()
}
  return (
    <form className="eventForm" onSubmit={handleSubmit}>
      <h2 className="eventForm__title">
        {eventId ? "Edit Event" : "Add Event"}
      </h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventName"> Event Name:</label>
          <input
            type="text"
            id="eventName"
            name="name"
            required
            autoFocus
            className="form-control"
            placeholder="Event Name"
            onChange={handleControlledInputChange}
            defaultValue={event.name}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventDate"> Event date:</label>
          <input
            type="date"
            id="eventDate"
            name="date"
            required
            autoFocus
            className="form-control"
            onChange={handleControlledInputChange}
            defaultValue={event.date}
          />
        </div>
        </fieldset>
        <fieldset>
        <div className="form-group">
          <label htmlFor="eventAddress"> Event address:</label>
          <input
            type="text"
            id="eventAddress"
            name="address"
            required
            autoFocus
            className="form-control"
            placeholder="Event Address"
            onChange={handleControlledInputChange}
            defaultValue={event.address}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventCity"> Event Name:</label>
          <input
            type="text"
            id="eventCity"
            name="city"
            required
            autoFocus
            className="form-control"
            placeholder="Pensacola"
            onChange={handleControlledInputChange}
            defaultValue={event.city}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventState"> Event Name:</label>
          <input
            type="text"
            id="eventState"
            name="state"
            required
            autoFocus
            className="form-control"
            placeholder="Fl"
            onChange={handleControlledInputChange}
            defaultValue={event.state}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="eventZip"> Zipcode:</label>
          <input
            type="text"
            id="eventName"
            name="zip"
            required
            autoFocus
            className="form-control"
            placeholder="00000"
            onChange={handleControlledInputChange}
            defaultValue={event.zip}
            maxLength="5" pattern="[0-9]{5}"
          />
        </div>
      </fieldset>
      <button type="submit" className="btn btn-primary" disabled={isLoading}>{eventId ? "Save Event" : "Add Event"}</button>
    </form>
  );
};
