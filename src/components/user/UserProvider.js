import React, { useState, createContext } from "react"

export const UserContext = createContext()

/*
 This component establishes what data can be used.
 */
export const UserProvider = (props) => {
    const [users, setUsers] = useState([])

    const getUsers = () => {
        return fetch("http://localhost:8088/users")
            .then(res => res.json())
            .then(setUsers)
    }

    const getUserById = id => {
        return fetch(`http://localhost:8088/users/${id}`)
            .then(res => res.json())
    }

    return (
        <UserContext.Provider value={{
            users, getUsers, getUserById
        }}>
            {props.children}
        </UserContext.Provider>
    )
}