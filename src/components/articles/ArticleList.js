import React, { useContext, useEffect, useState } from "react"
import { ArticleContext } from "./ArticleProvider"
import { Article } from "./Article.js"
import "./Article.css"
import { useHistory } from "react-router-dom"
import { Button, Checkbox, Divider } from "semantic-ui-react"
import { useInterval } from "../useInterval"

export const ArticleList = (props) => {
    const { articles, getArticles } = useContext(ArticleContext)
    const [update, setUpdate] = useState(false)
    const history = useHistory()

    useInterval(getArticles, update ? 3000 : null)

    useEffect(() => {
        getArticles()
    }, [])
    return (
        <>
            <div className="articlesContainer">
                <div className="articlesHeader">
                    <Button primary onClick={() => history.push("/articles/create")}>
                        Add Article
                    </Button>

                    <Checkbox toggle
                        onChange={() => setUpdate(!update)}
                        label={update ? "Disable real-time updates" : "Allow real-time updates"}
                    />
                </div>

                <Divider />

                <div className="articles">
                    {
                        articles?.map(article => <Article key={article.id} article={article} />)
                    }
                </div>
            </div>
        </>
    )
}