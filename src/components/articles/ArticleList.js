import React, { useContext, useEffect } from "react"
import { useHistory } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import { ArticleItem } from "./ArticleItem"
import { PlannedEventList } from "../plannedEvents/PlannedEventList"
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
            <section className="dashboard">
                <div className="articles__wrapper">
                    <h2 className="articles__title">Articles</h2>
                    <button className="article__button primary-button" onClick={() => {history.push("/articles/create")}}>
                        New Article
                    </button>
                    <div className="articles">
                        {
                            reversedArticles.map(article => {
                                return <ArticleItem key={article.id} article={article} />
                            })
                        }
                    </div>
                </div>
                <div className="events__wrapper">
                    <PlannedEventList />
                </div>
            </section>
        </>
    )
}