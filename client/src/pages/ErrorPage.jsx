import React from 'react'
import { NavLink } from 'react-router-dom'

const ErrorPage = () => {
    return (
        <section className="error">
            <NavLink className="btn primary" to="/">Home</NavLink>
            <h1>404</h1>
            <h2>Page introuvable</h2>
        </section>
    )
}

export default ErrorPage