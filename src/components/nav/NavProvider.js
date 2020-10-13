import React, { useState, createContext } from "react";




export const NavContext = createContext()

export const NavProvider = (props) => {
    const [users, setUsers] = useState([]);

    const getUserById = (id) => {
    return fetch(
      `http://localhost:8088/users/${id}`
    )
      .then((response) => response.json())
      .then(res => {
        setUsers(res)
        return res
      });
  };

  return (
    <NavContext.Provider
      value={{
        getUserById,
        users
      }}
    >
      {props.children}
    </NavContext.Provider>
  );

}
