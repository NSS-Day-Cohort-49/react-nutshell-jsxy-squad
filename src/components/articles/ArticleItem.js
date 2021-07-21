import React, { useContext, useEffect } from "react"
import { useHistory, Link } from "react-router-dom"
import { ArticleContext } from "./ArticleProvider"
import { UserContext } from "../users/UserProvider"
import "./Articles.css"

export const ArticleItem = ({ article }) => {
    const { removeArticle } = useContext(ArticleContext)
    const { users, getUsers } = useContext(UserContext)
    const history = useHistory()

    useEffect(() => {
        getUsers()
    }, [])

    const author = users.find(user => user.id === article.userId)

    const friendClass = article.userId === parseInt(sessionStorage.getItem("nutshell_user")) ? "" : "friendArticle"

    const postedByString = "Posted by: "

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
            <h5 className="article__author"> {postedByString}
                <Link to={`/friends/detail/${author?.id}`}>
                    {author?.name}
                </Link>
            </h5>
            <a className="article__title" href={article.articleURL}>{article.title}</a>
            <div className="article__synopsis">{article.synopsis}</div>
            {userButtons}
        </section>
    )
}