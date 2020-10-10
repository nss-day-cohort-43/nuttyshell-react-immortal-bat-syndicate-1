import React from "react";
import { Route } from "react-router-dom";
import { EventList } from "./events/EventList";
import { EventProvider } from "./events/EventProvider";
import { EventDetail } from "./events/EventDetail"
import { Home } from "./Home";
import { EventForm } from "./events/EventForm";

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
      <EventProvider>
          <Route path="/events/edit/:eventId(\d+)">
              <EventForm />
          </Route>
      </EventProvider>
      <EventProvider>
          <Route exact path="/events/create">
              <EventForm />
          </Route>
      </EventProvider>

      <ArticleProvider>
            <Route exact path="/articles"> 
                <ArticleList /> 
            </Route>

            <Route exact path="/articles/create">
                <ArticleForm />
            </Route>
        </ArticleProvider>
    </>
  );
};
