import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = (props) => {
    const { articles, getArticles } = useContext(ArticleContext)
    const history = useHistory()

    useEffect(() => {
        console.log("ArticleList: Initial render before data")
        getArticles().then(console.log)
    }, [])

    return articles ? (
            <div className="articles">
            {
                articles.map(article => <Article key={article.id} article={article} />)
            }
            <button onClick={() => history.push("/articles/create")}>
                Add Article
            </button>
            </div>
    ) : null
}