import React, { useContext, useState, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ChatContext } from "./ChatProvider"
import { Button, Container, Header, Icon, Message, Modal } from "semantic-ui-react"
import { AddFriend } from "../friend/AddFriend"
import { FriendContext } from "../friend/FriendProvider"

export const ChatCard = ({ message }) => {
    const { deleteMessage } = useContext(ChatContext)

    const currentUser = parseInt(localStorage.getItem("nutty_user"))
    const [modal, showModal] = useState(false)
    const history = useHistory()

    const { friends, getFriends } = useContext(FriendContext)
    const [ currentFriends, setCurrentFriends ] = useState([])

    useEffect(()=> {
                let currentFriendObj= (friends.filter(friendship => friendship.activeUserId === parseInt(localStorage.getItem("nutty_user"))))
                setCurrentFriends(currentFriendObj.map(friend => friend.userId))
    },[friends])

    useEffect(()=> {
        getFriends()
    },[])



    if (message.userId === currentUser && !message.targetId) {
        // global chat for current user
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "#fff" }}>
                    <Header as="h3" className="message--currentUser">{message.user.username}</Header>

                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>

                    <div className="messageBtns">
                        <Button.Group>
                            <Button icon className="editBtn" onClick={
                                () => history.push(`/messages/edit/${message.id}`)
                            }><Icon name="edit" />
                            </Button>

                            <Button icon className="deleteBtn" color="red" onClick={
                                () => deleteMessage(message.id)
                                    .then(() => history.push(`/messages`))
                            }><Icon name="trash" />
                            </Button>
                        </Button.Group>
                    </div>
                </Message>
            </Container>
        )
    } else if (message.targetId) {
        if (message.targetId === currentUser || message.userId === currentUser) {
            // private chat for current user and recipient
            return (
                <Container className="message--container">
                    <Message className="message" floating style={{ backgroundColor: "lightskyblue" }}>
                        <Header as="h3" className="message--currentUser">{message.user.username}</Header>
                        <p className="message--content">{message.message}</p>
                        <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>

                        <div className="messageBtns">
                            <Button.Group>
                                <Button icon className="editBtn" onClick={
                                    () => history.push(`/messages/edit/${message.id}`)
                                }><Icon name="edit" />
                                </Button>

                                <Button icon className="deleteBtn" color="red" onClick={
                                    () => deleteMessage(message.id)
                                        .then(() => history.push(`/messages`))
                                }><Icon name="trash" />
                                </Button>
                            </Button.Group>
                        </div>
                    </Message>
                </Container>
            )
        } else if (message.targetId !== currentUser || message.userId !== currentUser) {
            return null
        }
    } else {
        // renders global chat bubbles
        return (
            <Container className="message--container">
                <Message className="message" floating style={{ backgroundColor: "lightgreen" }}>
                { currentFriends.includes(message.userId) 
                    ? <Header as="h3" className="message--notFriend">{message.user.username}</Header>
                    :<Button size='mini' className="addButton"
                        onClick={()=>showModal(true)}
                        >
                        <Icon name="user"></Icon>
                        {message.user.username}
                    </Button>
                    }
                    {modal ? <AddFriend clickedUser={message.user.username} closeModal={()=>showModal(false)}/> : null }
                    <p className="message--content">{message.message}</p>
                    <p className="message--date" style={{ fontSize: "x-small" }}>{message.date}</p>
                </Message>
            </Container>
        )
    }
}