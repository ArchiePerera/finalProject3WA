import { NavLink } from "react-router-dom"
import "./LatestArticles.scss"


const LatestArticles = ({ arrayArticles }) => {

    const summary = (data) => {
        if (data.length > 145) {
            return data.substr(0, 145) + "..."
        } else {
            return data
        }
    }

    const title = (data) => {
        if (data.length > 30) {
            return data.substr(0, 30) + "..."
        } else {
            return data
        }
    }

    return (
        <section className="container">
            <h2>Derniers articles</h2>
            {LatestArticles.length > 0 ? 
            <div className="posts">
                {arrayArticles.map((a) => (
                    <article key={a._id} className="post">
                        <figure className="post__thumbnail">
                            <img src={`${import.meta.env.VITE_API_URL}/img-articles/${a.imageUrl}`} alt="quelque chose" />
                        </figure>
                        <NavLink to={`/article/${a._id}`}>
                            <div className="post__content">
                                <h3>{title(a.title)}</h3>
                                <p>{summary(a.summary)}</p>
                            </div>
                        </NavLink>
                        {console.log(a.author._id)}
                        <NavLink to={`/profile/${a.author._id}`}>
                            <div className="post__author">
                                <figure className="post__author-avatar">
                                    <img src={`${import.meta.env.VITE_API_URL}/img-profiles/${a.author.imageProfile}`} alt="profile" width={50}/>
                                </figure>
                                <div className="post__author-txt">
                                    <h4>{`Par ${a.author.firstName} ${a.author.lastName}`}</h4>
                                    <small>Just Now</small>
                                </div>
                            </div>
                        </NavLink>
                    </article>
                ))}
            </div> : <h3>Aucun article trouvé</h3>}
        </section>
    )
}

export default LatestArticles