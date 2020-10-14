import React, { useContext } from "react"
import { Button, Icon } from "semantic-ui-react"
import { FriendContext } from "./FriendProvider"

export const FriendCard = ({ friend }) => {
    const { friends, removeFriend } = useContext(FriendContext)

    return (
        <section className="friend">
            <h3 className="friend__name">{friend.user.username}</h3>
            <Button icon negative type="button" style={{ marginLeft: 10 }} onClick={() => {
                //returns the inverse of the friendship
                const foundFriendship = friends.find(friendship => {
                    return (friendship.activeUserId === friend.userId && friendship.userId === parseInt(localStorage.getItem("nutty_user")))
                })
                //removes both friendship ids from the database
                removeFriend(friend.id)
                removeFriend(foundFriendship.id)
            }}><Icon name="trash" /></Button>
        </section>
    )
}