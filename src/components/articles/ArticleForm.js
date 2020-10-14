import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header } from "semantic-ui-react";
import "./Article.css"
import { ArticleContext } from "./ArticleProvider";

export const ArticleForm = () => {
    const { saveArticle, editArticle, getArticleById, } = useContext(ArticleContext)

    const [article, setArticle] = useState({})
    const [isLoading, setIsLoading] = useState(true)
    const { articleId } = useParams()

    const history = useHistory();
    //this is passed into onChange in the form fields, it updates state with the new value in the field
    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }
        newArticle[event.target.name] = event.target.value
        setArticle(newArticle)
    }

    useEffect(() => {
        if (articleId){
            getArticleById(articleId)
            .then(article => {
                setArticle(article)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

    //either creates the article object then saves a new or an edited article object
    const contructNewArticle = () => {
        setIsLoading(true);
        if (articleId) {
            editArticle({
                id: article.id,
                userId: parseInt(localStorage.getItem("nutty_user")),
                title: article.title,
                date: new Date(),
                synopsis: article.synopsis,
                url: article.url,
            })
                .then(() => history.push(`/articles`))
        } else {
            saveArticle({
                userId: parseInt(localStorage.getItem("nutty_user")),
                title: article.title,
                date: new Date(),
                synopsis: article.synopsis,
                url: article.url,
            })
                .then(() => history.push(`/articles`))
        }
    }
    //adds the form that the user can use to add or edit articles, if its an edit, 
    //the fields will be preloaded with the article to edit
    return (
        <>
            <div className="articleFormContainer">
                <Form className="articleForm"
                    onSubmit={e => {
                        e.preventDefault() // Prevent browser from submitting the form
                        contructNewArticle()
                    }}>
                    <Header as='h2' className="articleForm__title">New Article</Header>
                    <Form.Input
                        required
                        label='Article Title'
                        placeholder='Article Title'
                        id='articleTitle'
                        name="title"
                        onChange={handleControlledInputChange}
                        defaultValue={article.title}
                    />
                    <Form.Input
                        required
                        label='Article Synopsis'
                        placeholder='Article Synopsis'
                        id='articleSynopsis'
                        name="synopsis"
                        onChange={handleControlledInputChange}
                        defaultValue={article.synopsis}
                    />
                    <Form.Input
                        required
                        label='Article URL'
                        placeholder='Article URL'
                        id='articleUrl'
                        name="url"
                        onChange={handleControlledInputChange}
                        defaultValue={article.url}
                    />
                    <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn btn-primary">
                        {articleId ? <>Save Article</> : <>Add Article</>}
                    </Button>
                    <Button
                        type="button"
                        className="btn btn-primary"
                        onClick={() => history.push(`/articles`)}>
                        Cancel </Button>
                </Form>
            </div>
        </>
    )
}
