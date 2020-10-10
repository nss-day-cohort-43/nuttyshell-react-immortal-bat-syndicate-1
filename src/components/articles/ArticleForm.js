import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, } from 'react-router-dom';
import { Button, Form, Header } from "semantic-ui-react";
import "./Article.css"
import { ArticleContext } from "./ArticleProvider";

export const ArticleForm = () => {
    const { saveArticle, update } = useContext(ArticleContext)

    const title = useRef(null)
    const synopsis = useRef(null)
    const url = useRef(null)
    
    const history = useHistory();

    const contructNewArticle = () => {
        saveArticle({
            userId: parseInt(localStorage.getItem("nutty_customer")),
            title: title.current.value,
            date: new Date,
            synopsis: synopsis.current.value,
            url: url.current.value
        }).then(() => history.push("/articles"))
        }

    return (
        // <form className="articleForm" onSubmit={ e => {
        //     e.preventDefault() // Prevent browser from submitting the form
        //     contructNewArticle()
        // }}>
        <Form className="articleForm" onSubmit={ e => {
            e.preventDefault() // Prevent browser from submitting the form
            contructNewArticle()
        }}>
            <Header as='h2' className="articleForm__title">New Article</Header>
            <Form.Input
                error={{ content: 'Please enter a title for your article', pointing: 'below' }}
                required
                fluid
                label='articleTitle'
                placeholder='Article Title'
                id='articleTitle'
                ref={title}
            />
            <Form.Input
                error={{ content: 'Please enter a synopsis for your article', pointing: 'below' }}
                required
                fluid
                label='Article Synopsis'
                placeholder='Article Synopsis'
                id='articleSynopsis'
                ref={synopsis}
            />
            <Form.Input
                error={{ content: 'Please enter a url for your article', pointing: 'below' }}
                required
                fluid
                label='articleUrl'
                placeholder='Article URL'
                id='articleUrl'
                ref={url}
            />

        {/* <fieldset>
            <div className="form-group">
                <label htmlFor="articleTitle">Article Title: </label>
                <input type="text" id="articleTitle" ref={title} required autoFocus className="form-control" placeholder="Article title" />
            </div>
        </fieldset>        
        <fieldset>
            <div className="form-group">
                <label htmlFor="articleSynopsis">Article Synopsis: </label>
                <input type="text" id="articleTitle" ref={synopsis} required autoFocus className="form-control" placeholder="Article synopsis" />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="articleTitle">Article URL: </label>
                <input type="text" id="articleUrl" ref={url} required autoFocus className="form-control" placeholder="Article url" />
            </div>
        </fieldset> */}
        <Button type="submit" className="btn btn-primary">Save Article</Button>

    </Form>
    )
}
