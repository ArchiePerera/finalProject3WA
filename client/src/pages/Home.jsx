import { useState, useEffect } from "react"
import axios from "axios"
import LatestArticles from "../components/LastestArticles/LatestArticles"

const Home = () => {

    const [lastArticles, setLastArticles] = useState([])

    useEffect(() => {

        const fetchArticles = async () => {

            try {

            const res = await axios.get("/api/articles") // avec le vite.config.js
         
            const recentArticles = res.data
            setLastArticles(recentArticles)

            }
            catch (e) {

                console.log(e)

            }
        }

        fetchArticles()

    }, [])


    return (
        <>
        <LatestArticles arrayArticles={lastArticles} />
        </>
    )
}

export default Home