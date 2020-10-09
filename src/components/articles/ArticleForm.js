import React, { useContext, useEffect, useRef, useState } from "react"
import { useHistory, useParams } from 'react-router-dom';
import "./Article.css"
import { ArticleContext } from "./ArticleProvider";

export const ArticleForm = (props => {
    const { saveArticle } = useContext(ArticleContext)

    const [ article, setArticle ] = useState({})

    const title = useRef(null)
    const posterId = useRef(null)
    const synopsis = useRef(null)
    const url = useRef(null)
    
    const history = useHistory();

    
    // useEffect(() => {
    //     getArticle().then(getLocations)
    //  }, [])


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
        <form className="articleForm">
        <h2 className="articleForm__title">New Article</h2>
        <fieldset>
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
        </fieldset>
        <button type="submit"
            onClick={evt => {
                evt.preventDefault() // Prevent browser from submitting the form
                contructNewArticle()
            }}
            className="btn btn-primary">
            Save Article
        </button>
    </form>
    )
})
