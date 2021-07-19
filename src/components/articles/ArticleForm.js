import React, { useState, useContext } from "react"
import { useHistory } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import "./Articles.css"

export const ArticleForm = () => {
    const { addArticle } = useContext(ArticleContext)
    const history = useHistory()

    const [ article, setArticle] = useState({
        title: "",
        synopsis: "",
        articleURL: "",
        userId: 0,
        timestamp: 0
    })

    const handleControlledInputChange = event => {
        const newArticle = {...article}
        newArticle[event.target.id] = event.target.value

        setArticle(newArticle)
    }

    const handleClickSaveArticle = event => {
        event.preventDefault()

        const currentUserId = parseInt(sessionStorage.getItem("nutshell_user"))

        const newArticle = {
            title: article.title,
            synopsis: article.synopsis,
            articleURL: article.articleURL,
            userId: currentUserId,
            timestamp: Date.now()
        }

        addArticle(newArticle)
        .then(() => history.push("/"))
    }

    

    return (
        <form className="articleForm">
            <h3 className="articleForm__title">New Article</h3>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Article Title:</label>
                    <input type="text" id="title" required autoFocus className="form-control" placeholder="Article title" value={article.title} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="synopsis">Article Synopsis:</label>
                    <input type="text" id="synopsis" required autoFocus className="form-control" placeholder="Synopsis" value={article.synopsis} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="articleURL">Article link:</label>
                    <input type="text" id="articleURL" required autoFocus className="form-control" placeholder="Paste URL here" value={article.articleURL} onChange={handleControlledInputChange} />
                </div>
            </fieldset>
            <button onClick={handleClickSaveArticle}>
                Save Article
            </button>
        </form>
    )
}


