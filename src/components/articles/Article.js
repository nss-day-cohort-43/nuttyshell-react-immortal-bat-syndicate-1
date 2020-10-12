import React, { useContext } from "react"
import "./Article.css"
import { Button, Container, Header, Icon } from 'semantic-ui-react'
import { ArticleContext } from "./ArticleProvider"
import { useHistory } from "react-router-dom"

export const Article = ({ article }) => {
    //useContext hook allows the use of functions form the articleProvider
    const { deleteArticle } = useContext(ArticleContext)
    const history = useHistory()
    //returns an article in semantic Ui elements
    return (
        <Container className="article--container" >
        <Header as='h3'>{article.title}</Header>
        <p>Posted by: {article.user.username}</p>
        <p>Date: {new Date(article.date).toLocaleDateString('en-US')}</p>
        <p>{article.synopsis}</p>
                    <div className="article--actions">
                <a href={article.url}>
                    Read More
                </a>

                <div className="formBtns">
                    {/* if the article was posted by the current user it renders buttons for edit or delete */}
                    {article.user.id === parseInt(localStorage.getItem("nutty_customer")) ? 
                    <>
                         <Button icon className="trashBtn" onClick={
                             () => {
                                 deleteArticle(article.id)
                             }}><Icon name='trash alternate outline' /></Button>
                         <Button icon onClick={() => {
                             history.push(`/articles/edit/${article?.id}`)
                             }}><Icon name='edit outline' /></Button>
                    </>
                    : null }
                </div>
        </div>
    </Container>
    )
}