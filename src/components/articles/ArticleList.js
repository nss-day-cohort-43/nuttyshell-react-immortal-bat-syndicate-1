import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleCard } from "./ArticleCard"
import "./Article.css"
import { useHistory } from "react-router-dom"

export const ArticleList = () => {
    const { articles, getArticles } = useContext(ArticleContext)


    useEffect(() => {
        console.log("ArticleList: Initial render before data")
        getArticles()
    }, [])

    return (
        <div className="articles">
        {
            articles.map(loc => <Article key={loc.id} location={loc} />)
        }
        </div>
    )
}