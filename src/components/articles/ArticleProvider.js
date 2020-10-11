import React, { useState, createContext } from "react"

export const ArticleContext = createContext()

//sets up all the fetch functions I'll need for the module
export const ArticleProvider = (props) => {
    const [articles, setArticles] = useState([])

    const getArticles = () => {
        return fetch('http://localhost:8088/news?_expand=user')
        .then(response => response.json())
        .then(setArticles)
    }
    
    // adds new articles to database
    const saveArticle = artObj => {
        return fetch('http://localhost:8088/news', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(artObj)
        })
    }
    
    // allows user to edit their articles
    const editArticle = artObj => {
        return fetch(`http://localhost:8088/news/${artObj.id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(artObj)
        })
    }
    
    // removes article from database
    const deleteArticle = articleId => {
        return fetch(`http://localhost:8088/news/${articleId}`, {
            method: 'DELETE'
        }).then(getArticles)
    }

    const getArticleById = (id) => {
        return fetch(`http://localhost:8088/news/${id}?_expand=user`)
            .then(res => res.json())
    }

    return (
        <ArticleContext.Provider value={{
            articles, getArticles, saveArticle, deleteArticle, editArticle, getArticleById
        }}>
            {props.children}
        </ArticleContext.Provider>
    )
}