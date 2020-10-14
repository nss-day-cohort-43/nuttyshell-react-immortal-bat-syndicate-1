import React, { useContext, useEffect, useState, useRef } from "react"
import { FriendContext } from "./FriendProvider"
import { UserContext } from "../user/UserProvider"
import { Button, Modal, Input } from "semantic-ui-react"
import "./Friend.css"

export const AddFriend = ({ clickedUser, closeModal }) => {
    const { friends, getFriends, addFriend } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)

    const [open, setOpen] = useState(false)
    const friendName = useRef("")
    //Gets friends and users on load

    useEffect(() => {
        getFriends().then(getUsers)
    }, [])

    const friendCheck = name => {
        //Checks if the user exists
        const foundFriend = users.find(user => user.username.toUpperCase() === name.toUpperCase())
        //Checks if the friendship already exists and is not the user
        if (foundFriend && foundFriend.id !== parseInt(localStorage.getItem("nutty_user"))) {
            const friendshipExist = friends.find(friend => {
                if (friend.activeUserId === parseInt(localStorage.getItem("nutty_user"))
                    && friend.userId === foundFriend.id) {
                    return true
                } else {
                    return false
                }
            })

            if (friendshipExist) {
                alert("You are already friends!")
            } else {
                //When everything checks out, creates new friendship
                addFriend({
                    activeUserId: parseInt(localStorage.getItem("nutty_user")),
                    userId: foundFriend.id
                })
                addFriend({
                    activeUserId: foundFriend.id,
                    userId: parseInt(localStorage.getItem("nutty_user"))
                })
                closeModal()
                alert(`You added ${foundFriend.username}!`)
                return foundFriend
            }
        } else if (foundFriend?.id === parseInt(localStorage.getItem("nutty_user"))) {
            alert("Can't add yourself as a friend")
        } else {
            alert("User does not exist!")
        }
    }


    return (
        <>
            <Modal
                size="mini"
                onClose={() => setOpen(false)}
                onOpen={() => setOpen(true)}
                open={true}
            >
                <Modal.Content>
                    <Input fluid type="text" ref={friendName} defaultValue={clickedUser ? clickedUser : null} placeholder="Friend's name..." />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        onClick={() => {
                            /* Checks if the current friend exists and is not the user. 
                            Only closes the modal if the friendship checks out */
                            const friendExist = friendCheck(friendName.current.inputRef.current.value)
                            friendExist ? setOpen(false) : setOpen(true)
                        }}
                        primary
                    >
                        Add Friend
                    </Button>

                    <Button onClick={closeModal}>
                        Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </>
    )
}