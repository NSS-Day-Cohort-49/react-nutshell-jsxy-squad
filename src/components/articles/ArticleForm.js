import React, { useState, useContext, useEffect } from "react"
import { useHistory, useParams } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import "./Articles.css"

export const ArticleForm = () => {
    const { addArticle, updateArticle, getArticleById } = useContext(ArticleContext)
    const history = useHistory()
    const { articleId } = useParams()
    const [ isLoading, setIsLoading ] = useState(true)

    useEffect(() => {
        if (articleId) {
            getArticleById(articleId).then(event => {
                setArticle(event)
                setIsLoading(false)
            })
        } else {
            setIsLoading(false)
        }
    }, [])

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

        setIsLoading(true)
        if (articleId) {
            updateArticle({
                id: article.id,
                title: article.title,
                synopsis: article.synopsis,
                articleURL: article.articleURL,
                timestamp: article.timestamp,
                userId: currentUserId
            }).then(() => history.push("/"))
        } else {
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
            <button disabled={isLoading} onClick={handleClickSaveArticle}>
                {articleId ? "Update Article" : "Save Article"}
            </button>
        </form>
    )
}


