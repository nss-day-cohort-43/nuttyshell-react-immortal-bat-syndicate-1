import React, { useContext, useEffect, useState, useRef } from "react"
import { FriendContext } from "./FriendProvider"
import { UserContext } from "../user/UserProvider"
import { Button, Modal, Input } from "semantic-ui-react"
import "./Friend.css"

export const AddFriend = (clickedUser) => {
    const { friends, getFriends, addFriend } = useContext(FriendContext)
    const { users, getUsers } = useContext(UserContext)

    // const [open, setOpen] = useState(false)

    // const friendName = useRef("")
    // console.log("addfriend")
    //Gets friends and users on load
    useEffect(() => {
        getFriends().then(getUsers)
    }, [])

    const friendCheck = name => {
    //Checks if the user exists
        const foundFriend = users.find(user => user.username.toUpperCase() === name.toUpperCase())
        
        //Checks if the friendship already exists and is not the user
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
                //When everything checks out, creates new friendship
                addFriend({
                    activeUserId: parseInt(localStorage.getItem("nutty_customer")),
                    userId: foundFriend.id
                })
                addFriend({
                    activeUserId: foundFriend.id,
                    userId: parseInt(localStorage.getItem("nutty_customer"))
                })
                alert(`You added ${foundFriend.username}!`)
                return foundFriend
            }
        } else if (foundFriend?.id === parseInt(localStorage.getItem("nutty_customer"))) {
            alert("Can't add yourself as a friend")
        } else {
            alert("User does not exist!")
        }
    }

    //returns only the friendships where the activeUserId matches the current users
    const filteredFriends = friends.filter(friend => friend.activeUserId === parseInt(localStorage.getItem("nutty_customer")))

    // return (
    //     <>
    //         <Modal
    //             basic
    //             onClose={() => setOpen(false)}
    //             onOpen={() => setOpen(true)}
    //             open={open}
                
    //         >
    //             <Modal.Content>
    //                 <Input type="text" ref={friendName} defaultValue={clickedUser ? clickedUser : null} placeholder="Friend's name..." />
    //             </Modal.Content>
    //             <Modal.Actions>
    //                 <Button
    //                 content="Add Friend"
    //                 labelPosition='right'
    //                 onClick={() => {
    //                     /* Checks if the current friend exists and is not the user. 
    //                     Only closes the modal if the friendship checks out */
    //                     const friendExist = friendCheck(friendName.current.inputRef.current.value)
    //                     friendExist ? setOpen(false) : setOpen(true)
    //                 }}
    //                 positive
    //                 />
    //                 <Button color='black' onClick={() => setOpen(false)}>
    //                     Cancel
    //                 </Button>
    //             </Modal.Actions>
    //         </Modal>
    //     </>
    // )
}