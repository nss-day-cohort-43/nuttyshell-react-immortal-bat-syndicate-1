import React from "react"
import { Link } from "react-router-dom"
import { Icon, Image } from "semantic-ui-react"
import logo from "../../img/ibs-logo.png"
import "./NavBar.css"

export const NavBar = (props) => {
    return (
        <section className="navbar__container">
            <ul className="navbar">
                <li className="navbar__item active">
                    <Link className="navbar__link" to="/">
                        <Image src={logo} alt="IBS logo" className="navbar__logo" />
                    </Link>
                </li>
                <li className="navbar__item active" activeClassName="navbar__item--active">
                    <Link className="navbar__link" to="/events"><Icon name="calendar alternate" />Events</Link>
                </li>
                <li className="navbar__item active" activeClassName="navbar__item--active">
                    <Link className="navbar__link" to="/articles"><Icon name="newspaper" />Articles</Link>
                </li>
                <li className="navbar__item active" activeClassName="navbar__item--active">
                    <Link className="navbar__link" to="/friends"><Icon name="address book" />Friends</Link>
                </li>
                <li className="navbar__item active" activeClassName="navbar__item--active">
                    <Link className="navbar__link" to="/tasks"><Icon name="list alternate" />Tasks</Link>
                </li>
                <li className="navbar__item active" activeClassName="navbar__item--active">
                    <Link className="navbar__link" to="/messages"><Icon name="comments" />Messages</Link>
                </li>
                <li className="navbar__item active logout">
                    <Link className="navbar__link" onClick={() => {
                        localStorage.removeItem("nutty_user")
                    }}
                        to="/login"><Icon name="eject" />Logout</Link>
                </li>
            </ul>
        </section>
    )
}
