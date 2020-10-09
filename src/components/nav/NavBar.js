import React from "react"
import { Link } from "react-router-dom"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar__item active">
                <Link className="navbar__link" to="/">IBS</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/events">Events</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/articles">Articles</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/friends">Friends</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/tasks">Tasks</Link>
            </li>
            <li className="navbar__item active">
                <Link className="navbar__link" to="/messages">Messages</Link>
            </li>
            <li className="navbar__item active">
                {localStorage.removeItem("nutty_customer")}
                <Link className="navbar__link" to="/login">Logout</Link>
            </li>
        </ul>
    )
}
