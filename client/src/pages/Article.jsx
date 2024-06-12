import { useParams, NavLink } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"
import "../index.scss"

const Article = () => {

    const { id } = useParams()
    const [article, setArticle] = useState("")

    useEffect(() => {

        const fetchOneArticle = async () => {
            
            try {

                const res = await axios.get(`/api/articles/${ id }`)

                setArticle(res.data)

            }
            catch (e) {

                console.log(e)

            }
        }

        fetchOneArticle()

    }, [])


    return(
        <section>
            <article className="container article__container">
                <div className="article__wrapper">
                    <div className="article__header">
                        {article.author&&
                        <NavLink to={`/profile/${article.author._id}`}>
                            <div className="post__author">
                                <figure className="post__author-avatar">
                                    <img src={`${import.meta.env.VITE_API_URL}/img-profiles/${article.author.imageProfile}`} alt="image de profil" width={50}/>
                                </figure>
                                <div className="post__author-txt">
                                    <h4>{`Par ${article.author.firstName} ${article.author.lastName}`}</h4>
                                <small>Just Now</small>
                                </div>
                            </div>
                        </NavLink>}
                    </div>
                    <div className="article__btn">
                        <NavLink to={"/article/edit/:id"} className="btn sm success">Editer</NavLink>
                        <NavLink to={"/article/delete/:id"} className="btn sm danger">Supprimer</NavLink>
                    </div>
                </div>
                <h1>{article.title}</h1>
                <figure className="thumbnail">
                    <img src={`${import.meta.env.VITE_API_URL}/img-articles/${article.imageUrl}`} alt="Image d'illustration" />
                </figure>
                <p className="summary">{article.summary}</p>
                <div className="content">{article.content}</div>
            </article>
        </section>
    )


}

export default Article