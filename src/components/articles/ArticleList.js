import React, { useContext, useEffect, useRef } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { Button } from "semantic-ui-react"

export const ArticleList = (props) => {
    const { articles, getArticles } = useContext(ArticleContext)
    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])
    return (
            <div 
            className="articles">
            <Button onClick={() => history.push("/articles/create")}>
                Add Article
            </Button>
            {
                articles?.map(article => <Article key={article.id} article={article} />)
            }
            </div>
    )
}