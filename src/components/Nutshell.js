import React from "react"
import { Route } from "react-router-dom"
import { NavBar } from "./nav/NavBar"
import { ApplicationViews } from "./ApplicationViews"
import "./Nutshell.css"

export const Nutshell = () => (
    <>
        <NavBar />
        <ApplicationViews />
    </>
)