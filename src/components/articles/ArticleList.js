import React, { useContext, useEffect } from "react"
import { ArticleContext } from "./ArticleProvider"
import { ArticleItem } from "./ArticleItem"
import "./Articles.css"

export const ArticleList = () => {
    const { articles, getArticles } = useContext(ArticleContext)

    useEffect(() => {
        getArticles()
    }, [])

    return (
        <div className="articles">
            {
                articles.map(article => {
                    {console.log(article)}
                    return <ArticleItem key={article.id} article={article} />
                })
            }
        </div>
    )
}