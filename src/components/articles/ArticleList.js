import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import { ArticleItem } from "./ArticleItem"
import "./Articles.css"

export const ArticleList = () => {
    const { articles, getArticles } = useContext(ArticleContext)
    const history = useHistory()

    useEffect(() => {
        getArticles()
    }, [])

    const reversedArticles = articles.sort((a, b) => b.id - a.id)

    return (
        <>
            <button onClick={() => {history.push("/articles/create")}}>
                New Article
            </button>
            <div className="articles">
                {
                    reversedArticles.map(article => {
                        return <ArticleItem key={article.id} article={article} />
                    })
                }
            </div>
        </>
    )
}