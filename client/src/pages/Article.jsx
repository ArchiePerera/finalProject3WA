import { useParams, NavLink } from "react-router-dom"
import axios from "axios"
import { useState, useEffect } from "react"

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
        <>
        <h1>{article.title}</h1>
        <NavLink to={"/"}>Home</NavLink>
        </>
    )


}

export default Article