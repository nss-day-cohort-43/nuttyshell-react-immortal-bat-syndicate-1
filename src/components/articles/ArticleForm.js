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

    // useEffect(() => {
    //     getArticle().then(getLocations)
    //  }, [])


    const contructNewArticle = () => {
        saveArticle({
            userId: posterId.current.value,
            title: title.current.value,
            date: new Date,
            synopsis: synopsis.current.value,
            url: url.current.value
        })
    }

    return (
        <form className="articleForm">
        <h2 className="articleForm__title">New Article</h2>
        <fieldset>
            <div className="form-group">
                <label htmlFor="articleTitle">Article Title: </label>
                <input type="text" id="employeeName" ref={name} required autoFocus className="form-control" placeholder="Employee name" />
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="location">Assign to location: </label>
                <select defaultValue="" name="location" ref={location} id="employeeLocation" className="form-control" >
                    <option value="0">Select a location</option>
                    {locations.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
        <fieldset>
            <div className="form-group">
                <label htmlFor="location">Caretaker for: </label>
                <select defaultValue="" name="animal" ref={animal} id="employeeAnimal" className="form-control" >
                    <option value="0">Select an animal</option>
                    {animals.map(e => (
                        <option key={e.id} value={e.id}>
                            {e.name}
                        </option>
                    ))}
                </select>
            </div>
        </fieldset>
        <button type="submit"
            onClick={evt => {
                evt.preventDefault() // Prevent browser from submitting the form
                constructNewEmployee()
            }}
            className="btn btn-primary">
            Save Employee
        </button>
    </form>
    )
})
