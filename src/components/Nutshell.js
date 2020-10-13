import React from "react";
import { Route, Redirect } from "react-router-dom";
import { ApplicationViews } from "./ApplicationViews";
import { NavBar } from "./nav/NavBar";
import { Login } from "./auth/Login";
import { Register } from "./auth/Register";
import "./Nutshell.css";
import { NavProvider } from "./nav/NavProvider";

export const Nutshell = () => (
  <>
    <Route
      render={() => {
        if (localStorage.getItem("nutty_user")) {
          return (
            <>
              <NavProvider>
                <NavBar />
                <ApplicationViews />
              </NavProvider>
            </>
          );
        } else {
          return <Redirect to="/login" />;
        }
      }}
    />

    <Route path="/login">
      <Login />
    </Route>
    <Route path="/register">
      <Register />
    </Route>
  </>
);
