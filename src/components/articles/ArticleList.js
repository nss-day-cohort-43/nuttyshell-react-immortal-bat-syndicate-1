import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { Button, Icon } from "semantic-ui-react"

export const ArticleList = (props) => {
    const { articles, getArticles } = useContext(ArticleContext)
    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])

    return articles ? (
            <div className="articles">
            {
                articles.map(article => <Article key={article.id} article={article} />)
            }
            <Button icon onClick={() => history.push("/articles/create")}>
                <Icon name='add circle' /> 
            </Button >
            </div>
    ) : null
}