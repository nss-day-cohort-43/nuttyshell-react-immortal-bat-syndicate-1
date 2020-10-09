import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
    const { articles, getArticles } = useContext(ArticleContext)


    useEffect(() => {
        console.log("ArticleList: Initial render before data")
        getArticles().then(console.log)
    }, [])

    return articles ? (
        <div className="articles">
        {
            articles.map(article => <Article key={article.id} article={article} />)
        }
        </div>
    ) : null
}