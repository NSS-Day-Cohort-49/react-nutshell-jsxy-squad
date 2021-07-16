import React from "react"
import "./Articles.css"

export const ArticleItem = ({ article }) => {
    const friendClass = article.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "" : "friendArticle"
    
    return (
        <section className={`article ${friendClass}`}>
            <a className="article__title" href={article.articleURL}>{article.title}</a>
            <div className="article__synopsis">{article.synopsis}</div>
        </section>
    )
}