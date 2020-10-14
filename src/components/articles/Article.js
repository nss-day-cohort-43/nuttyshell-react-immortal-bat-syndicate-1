import React, { useContext, useEffect, useState } from "react"
import "./Article.css"
import { Button, Container, Divider, Header, Icon } from 'semantic-ui-react'
import { ArticleContext } from "./ArticleProvider"
import { useHistory } from "react-router-dom"
import { AddFriend } from "../friend/AddFriend"
import { FriendContext } from "../friend/FriendProvider"

export const Article = ({ article }) => {
    //useContext hook allows the use of functions form the articleProvider
    const { deleteArticle } = useContext(ArticleContext)

    // const { users, getUsers } = useContext(UserContext)
    const { friends, getFriends } = useContext(FriendContext)
    const history = useHistory()
    const [modal, showModal] = useState(false)
    const [ currentFriends, setCurrentFriends ] = useState([])
    useEffect(()=> {
        getFriends()
            .then(()=> {
                let currentFriendObj= (friends.filter(friendship => friendship.activeUserId === parseInt(localStorage.getItem("nutty_user"))))
                setCurrentFriends(currentFriendObj.map(friend => friend.userId))
           })
    },[])

    //returns an article in semantic Ui elements, pass as a prop a function that will set modal to false line 31
    return (
        <>
            <Container className="article--container" className={currentFriends.includes(article.user.id) ? "friendArticle" : null }>
                <Header as='h3'>{article.title}</Header>
                <p>
                    Posted by: {article.user.id === parseInt(localStorage.getItem("nutty_user"))  
                    ? `${article.user.username}(you)`
                    : currentFriends.includes(article.userId) && article.user.id !== parseInt(localStorage.getItem("nutty_user"))
                    ? `${article.user.username}` 
                    :
                    <Button size='mini' className="addButton"
                        onClick={()=>showModal(true)}
                        >
                        <Icon name="user"></Icon>
                        {article.user.username}
                    </Button>
                    }
                    {modal ? <AddFriend clickedUser={article.user.username} closeModal={()=>showModal(false)}/> : null }
                </p>
                <p>Date: {new Date(article.date).toLocaleDateString('en-US')}</p>
                <p>{article.synopsis}</p>
                <div className="article--actions">
                    <a href={article.url} target="_blank">
                        Read More
                </a>
                    <div className="formBtns">
                        {/* if the article was posted by the current user it renders buttons for edit or delete */}
                        {article.user.id === parseInt(localStorage.getItem("nutty_user")) ?
                            <>
                                <Button icon onClick={() => {
                                    history.push(`/articles/edit/${article?.id}`)
                                }}><Icon name='edit outline' /></Button>
                                <Button color="red" icon id="deleteArticle--${article.id}" className="trashBtn" onClick={
                                    () => {
                                        deleteArticle(article.id)
                                    }}><Icon name='trash alternate outline' /></Button>
                            </>
                            : null}
                    </div>
                </div>
            </Container>

            <Divider />
        </>
    )
}