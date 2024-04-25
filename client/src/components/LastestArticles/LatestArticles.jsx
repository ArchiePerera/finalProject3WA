import { NavLink } from "react-router-dom"
import "./LatestArticles.scss"


const LatestArticles = ({ arrayArticles }) => {
    console.log(arrayArticles)
    return (
        <>
        <h2>Derniers articles</h2>
        {arrayArticles.map((a) => (
        <NavLink  className="latest-card" to={`/article/${a._id}`}>
            <article>
            <h3 key={a._id}>{a.title}</h3>
                <p>{a.summary}</p>
            <img src={`${import.meta.env.VITE_API_URL}/img-articles/${a.imageUrl}`} alt="quelque chose" width="200" />
            </article>
           </NavLink>
        ))}
        </>
    )
}

export default LatestArticles