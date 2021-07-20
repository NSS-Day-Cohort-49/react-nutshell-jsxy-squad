import React, { useContext } from "react"
import { useHistory } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import "./Articles.css"

export const ArticleItem = ({ article }) => {
    const { removeArticle } = useContext(ArticleContext)
    const history = useHistory()
    const friendClass = article.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "" : "friendArticle"

    let userButtons
    if (article.userId === parseInt(sessionStorage.getItem("nutshell_user"))) {
        userButtons = <>
                    <button onClick={() => history.push(`/articles/edit/${article.id}`)}>
                        Edit
                    </button>
                    <button onClick={() => removeArticle(article.id)}>
                        Delete
                    </button>
                </>
    }
    
    return (
        <section className={`article ${friendClass}`}>
            <a className="article__title" href={article.articleURL}>{article.title}</a>
            <div className="article__synopsis">{article.synopsis}</div>
            {userButtons}
        </section>
    )
}