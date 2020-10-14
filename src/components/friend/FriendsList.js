import React, { useContext, useEffect, useState, useRef } from "react"
import { FriendContext } from "./FriendProvider"
import { FriendCard } from "./FriendCard"
import { UserContext } from "../user/UserProvider"
import { Button, Divider, Modal, Input, Icon } from "semantic-ui-react"
import "./Friend.css"

export const FriendList = () => {
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
                return foundFriend
            }
        } else if (foundFriend?.id === parseInt(localStorage.getItem("nutty_user"))) {
            alert("Can't add yourself as a friend")
        } else {
            alert("User does not exist!")
        }
    }

    //returns only the friendships where the activeUserId matches the current users
    const filteredFriends = friends.filter(friend => friend.activeUserId === parseInt(localStorage.getItem("nutty_user")))

    return (
        <>
            <div className="friendsContainer">
                <div className="friendsHeader">
                    <h2><Icon name="address book" />Friends</h2>
                </div>

                <Divider />

                <Modal
                    onClose={() => setOpen(false)}
                    onOpen={() => setOpen(true)}
                    open={open}
                    trigger={<Button primary style={{ marginBottom: 25 }}>Add Friend</Button>}
                >
                    <Modal.Content>
                        <Input type="text" ref={friendName} placeholder="Friend's name..." />
                    </Modal.Content>
                    <Modal.Actions>
                        <Button
                            primary
                            className="addBtn"
                            content="Add Friend"
                            labelPosition='right'
                            onClick={() => {
                                /* Checks if the current friend exists and is not the user. 
                                Only closes the modal if the friendship checks out */
                                const friendExist = friendCheck(friendName.current.inputRef.current.value)
                                friendExist ? setOpen(false) : setOpen(true)
                            }}
                            positive
                        />
                        <Button className="cancelBtn" color='black' onClick={() => setOpen(false)}>
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
            </div>
        </>
    )
}