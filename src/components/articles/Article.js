import React from "react"
import "./Animal.css"
import { Link } from "react-router-dom"
import { Container } from 'semantic-ui-react'

export const Article = ({ article }) => (
    <Container className="article--container" >
        <Header as='h3'>{article.title}</Header>
        <p>Posted by: {article.user.name}</p>
        <p>Date: {new Date(article.date).toLocaleDateString('en-US')}</p>
        <p>{article.synopsis}</p>
                    <div class="article--actions">
                <a href={article.url} target="_blank">
                    Read More
                </a>

                <div class="formBtns">
                    <button id="editArticle--${article.id}" class="editBtn">Edit</button>
                    <button id="deleteArticle--${article.id}" class="trashBtn">🗑️</button>
                </div>
            </div>
    </Container>

)