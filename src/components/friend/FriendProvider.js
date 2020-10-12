import React, { useState, createContext } from "react"

/*
    The context is imported and used by individual components
    that need data
*/
export const FriendContext = createContext()

/*
 This component establishes what data can be used.
 */
export const FriendProvider = (props) => {
    const [friends, setFriends] = useState([])

    const getFriends = () => {
        return fetch("http://localhost:8088/friends?_expand=user")
            .then(res => res.json())
            .then(setFriends)
    }

    const addFriend = friend => {
        return fetch("http://localhost:8088/friends", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(friend)
        })
        .then(getFriends)
    }

    const removeFriend = id => {
        return fetch(`http://localhost:8088/friends/${id}`, {
            method: "DELETE"
        })
        .then(getFriends)
    }

    return (
        <FriendContext.Provider value={{
            friends, getFriends, addFriend, removeFriend
        }}>
            {props.children}
        </FriendContext.Provider>
    )
}
