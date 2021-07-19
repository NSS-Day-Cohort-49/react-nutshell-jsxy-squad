import React, { useContext } from "react"
import { ArticleContext } from "./ArticleProvider"
import "./Articles.css"

export const ArticleItem = ({ article }) => {
    const { removeArticle } = useContext(ArticleContext)
    const friendClass = article.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "" : "friendArticle"

    let deleteButton
    if (article.userId === parseInt(sessionStorage.getItem("nutshell_user"))) {
        deleteButton = <button onClick={() => removeArticle(article.id)}>
                            Delete Article
                    </button>
    }
    
    return (
        <section className={`article ${friendClass}`}>
            <a className="article__title" href={article.articleURL}>{article.title}</a>
            <div className="article__synopsis">{article.synopsis}</div>
            {deleteButton}
        </section>
    )
}