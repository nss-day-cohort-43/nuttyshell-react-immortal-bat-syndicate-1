//hide button for other user articles add into ternary in articles.js
                    // <button id="hideArticle--${article.id}" className="hideBtn" onClick={
                    //     () => {
                    //         deleteArticle(article.id)
                    //     }}>Hide</button>



// const [showResults, setShowResults] = React.useState(false)
//   const onClick = () => setShowResults(true)
//   return (
//     <div>
//       <input type="submit" value="Search" onClick={onClick} />
//       { showResults ? <Results /> : null }
//     </div>
//   )
// }


        {/* <Button 
            type="button" 
            className="btn btn-primary" 
            onClick={ history.push(`/articles`) }>                 
        Cancel </Button> */}


    // // allows user to edit their articles
    // const editArticle = artObj => {
    //     fetch(`http://localhost:8088/news/${artObj.id}`, {
    //         method: 'PUT',
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    //         body: JSON.stringify(artObj)
    //     })
    // }
    
    // // removes article from database
    // const deleteArticle = articleId => {
    //     return fetch(`http://localhost:8088/news/${articleId}`, {
    //         method: 'DELETE'
    //     }).then(getArticles)
    // }

    // const getArticleById = (id) => {
    //     return fetch('http://localhost:8088/news/${articleId}?_expand=users')
    //         .then(res => res.json())
    // }

//error for form
    //error={{ content: 'Please enter a url for your article', pointing: 'below' }}