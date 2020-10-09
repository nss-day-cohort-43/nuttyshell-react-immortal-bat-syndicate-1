import React from "react"
import { Route } from "react-router-dom"
import { ArticleList } from "./articles/ArticleList"
import { ArticleProvider } from "./articles/ArticleProvider"
import { Home } from "./Home"

export const ApplicationViews = (props) => {
    return (
        <>
            <Route exact path="/">
                <Home />
            </Route>

            <ArticleProvider>
                <Route exact path="/articles"render={props => 
                    <ArticleList {...props} /> } >
                </Route>

                <Route exact path="/articles/create">
                    <ArticleForm />
                </Route>
            </ArticleProvider>
        </>
    )
}