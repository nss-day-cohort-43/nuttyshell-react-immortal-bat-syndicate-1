import React, { useContext, useEffect, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import { Button, Form, Header } from "semantic-ui-react";
import "./Article.css"
import { ArticleContext } from "./ArticleProvider";

export const ArticleForm = () => {
    const { saveArticle, editArticle, getArticleById,  } = useContext(ArticleContext)

    const [ article, setArticle ] = useState({})
    const [ isLoading, setIsLoading ] = useState(true)
    const { articleId } = useParams()

    const history = useHistory();

    const handleControlledInputChange = (event) => {
        const newArticle = { ...article }
        newArticle[event.target.name] = event.target.value
        setArticle(newArticle)
    }

    useEffect(() => {
        let mounted = true;
        if (articleId){
            getArticleById(articleId)
            .then(article => {
                if(mounted){
                setArticle(article)
                setIsLoading(false)
                }
            })
        } else {
            setIsLoading(false)
        }
        return () => mounted = false
    }, [])

    const contructNewArticle = () => {
        setIsLoading(true);
        if ( articleId ) {
            editArticle({
                id: article.id,
                userId: parseInt(localStorage.getItem("nutty_customer")),
                title: article.title,
                date: new Date(),
                synopsis: article.synopsis,
                url: article.url,
            })
                .then(() => history.push(`/articles`))
        } else {
            saveArticle({
                userId: parseInt(localStorage.getItem("nutty_customer")),
                title: article.title,
                date: new Date(),
                synopsis: article.synopsis,
                url: article.url,
            })
                .then(() => history.push(`/articles`))
        }
    }

    return (
        <>
        <Form className="articleForm" onSubmit={ e => {
            e.preventDefault() // Prevent browser from submitting the form
            contructNewArticle()
        }}>
            <Header as='h2' className="articleForm__title">New Article</Header>
            <Form.Input
                // error={{ content: 'Please enter a title for your article', pointing: 'below' }}
                // required
                label='articleTitle'
                placeholder='Article Title'
                id='articleTitle'
                name="title"
                onChange={handleControlledInputChange} 
                defaultValue={article.title}
            />
            <Form.Input
                error={{ content: 'Please enter a synopsis for your article', pointing: 'below' }}
                required
                label='Article Synopsis'
                placeholder='Article Synopsis'
                id='articleSynopsis'
                name="synopsis"
                onChange={handleControlledInputChange} 
                defaultValue={article.synopsis}
            />
            <Form.Input
                error={{ content: 'Please enter a url for your article', pointing: 'below' }}
                required
                label='articleUrl'
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
                {/* { articleId ? <>Save Article</> : <>Add Animal</> } */}
                save </Button>
    </Form>
        {/* <Button 
            type="button" 
            className="btn btn-primary" 
            onClick={ history.push(`/articles`) }>                 
        Cancel </Button> */}
    </>
    )
}
