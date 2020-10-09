import React from "react"
import { Link } from "react-router-dom"
import 'semantic-ui-css/semantic.min.css'
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <ul className="navbar">
            <li className="navbar--item active">
                <Link className="navbar--link" to="/">Home</Link>
            </li>

            <li className="navbar--item">
                <Link className="navbar--link" to="/">Test 2</Link>
            </li>

            <li className="navbar--item">
                <Link className="navbar--link" to="/">Test 3</Link>
            </li>

            <li className="navbar--item">
                <Link className="navbar--link" to="/">Test 4</Link>
            </li>
        </ul>
    )
}