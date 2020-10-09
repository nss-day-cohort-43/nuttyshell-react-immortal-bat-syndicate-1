import React from "react";
import { Route } from "react-router-dom";
import { EventList } from "./events/EventList";
import { EventProvider } from "./events/EventProvider";
import { EventDetail } from "./events/EventDetail"
import { Home } from "./Home";

export const ApplicationViews = (props) => {
  return (
    <>
      <Route exact path="/">
        <Home />
      </Route>
      <EventProvider>
        <Route exact path="/events">
          <EventList />
        </Route>
      </EventProvider>
      <EventProvider>
          <Route exact path="/events/detail/:eventId(\d+)">
              <EventDetail />
          </Route>
      </EventProvider>
    </>
  );
};
