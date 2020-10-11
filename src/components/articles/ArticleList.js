import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { Button, Icon } from "semantic-ui-react"

export const ArticleList = (props) => {
    const { articles, getArticles } = useContext(ArticleContext)
    const history = useHistory()
    //fetchs the article once when the function is called
    useEffect(() => {
        getArticles()
    }, [])

    //return html for the list of articles, has a conditional that only renders 
    //if state contains the data that is brought in by the useEffect hook
    return articles ? (
            <div className="articles">
            {
                articles.map(article => <Article key={article.id} article={article} />)
            }
            <Button icon onClick={() => history.push("/articles/create")}>
                Add <Icon name='add circle' /> 
            </Button >
            </div>
    ) : null
}