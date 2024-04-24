import { NavLink } from "react-router-dom"


const LatestArticles = ({ arrayArticles }) => {
    console.log(arrayArticles)
    return (
        <>
        {arrayArticles.map((a) => (
            <>
            <h1 key={a._id}>{a.title}</h1>
            <p>{a.summary}</p>
            <p>{a.content}</p>
            <img src={`${import.meta.env.VITE_API_URL}/img-articles/${a.imageUrl}`} alt="quelque chose" width="200" />
            <NavLink to={`/article/${a._id}`}>Lire plus</NavLink>
            </>
        ))}
        </>
    )
}

export default LatestArticles