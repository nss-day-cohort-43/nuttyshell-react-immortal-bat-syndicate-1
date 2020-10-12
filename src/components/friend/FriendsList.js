import React, { useContext, useEffect, useState, useRef } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"
import { UserContext } from "../user/UserProvider"
import { Button, Modal, Input } from "semantic-ui-react"
import "./Friend.css"

export const FriendList = () => {
    const { friends, getFriends, addFriend } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)

    const [open, setOpen] = useState(false)

    const friendName = useRef("")

    // Empty dependency array - useEffect only runs after first render
    useEffect(() => {
        getFriends().then(getUsers)
    }, [])

    const friendCheck = name => {
        const foundFriend = users.find(user => user.username.toUpperCase() === name.toUpperCase())
        
        if (foundFriend && foundFriend.id !== parseInt(localStorage.getItem("nutty_customer"))) {
            const friendshipExist = friends.find(friend => {
                if (friend.activeUserId === parseInt(localStorage.getItem("nutty_customer")) 
                    && friend.userId === foundFriend.id) {
                        return true
                } else {
                    return false
                }
            })

            if (friendshipExist) {
                alert("You are already friends!")
            } else {
                addFriend({
                    activeUserId: parseInt(localStorage.getItem("nutty_customer")),
                    userId: foundFriend.id
                })
                addFriend({
                    activeUserId: foundFriend.id,
                    userId: parseInt(localStorage.getItem("nutty_customer"))
                })
                return foundFriend
            }
        } else if (foundFriend.id === parseInt(localStorage.getItem("nutty_customer"))) {
            alert("Can't add yourself as a friend")
        } else {
            alert("User does not exist!")
        }
    }

    const filteredFriends = friends.filter(friend => friend.activeUserId === parseInt(localStorage.getItem("nutty_customer")))

    return (
        <>
            <h2>Friends</h2>
            <Modal
                basic
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={open}
                trigger={<Button>Add Friend</Button>}
            >
                <Modal.Content>
                    <Input type="text" ref={friendName} placeholder="Friend's name..." />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                    content="Add Friend"
                    labelPosition='right'
                    onClick={() => {
                        const friendExist = friendCheck(friendName.current.inputRef.current.value)
                        friendExist ? setOpen(false) : setOpen(true)
                    }}
                    positive
                    />
                    <Button color='black' onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
            <div className="friends">
				{
				    filteredFriends.map(friend => {
					    return <FriendCard key={friend.id} friend={friend} />
				    })
				}
			</div>
        </>
    )
}