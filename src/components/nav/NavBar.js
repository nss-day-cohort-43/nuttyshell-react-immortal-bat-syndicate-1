import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";
import { NavContext } from "./NavProvider";

export const NavBar = (props) => {
  const { getUserById } = useContext(NavContext);
  const [user, setUser] = useState({});

  useEffect(() => {
    getUserById(parseInt(localStorage.getItem("nutty_user"))).then((res) => {
      setUser(res);
    });
  }, []);

  return (
    <>
      <div>Welcome, {user.username}</div>
      <ul className="navbar">
        <li className="navbar__item active">
          <Link className="navbar__link" to="/">
            IBS
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/events">
            Events
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/articles">
            Articles
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/friends">
            Friends
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/tasks">
            Tasks
          </Link>
        </li>
        <li className="navbar__item active">
          <Link className="navbar__link" to="/messages">
            Messages
          </Link>
        </li>
        <li className="navbar__item active">
          <Link
            className="navbar__link"
            onClick={() => {
              localStorage.removeItem("nutty_user");
            }}
            to="/login"
          >
            Logout
          </Link>
        </li>
      </ul>
    </>
  );
};
