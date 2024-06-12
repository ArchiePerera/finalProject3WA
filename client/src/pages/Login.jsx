import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'



const Login = () => {

    const [userData, setUserData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    const changeInputHandler = (e) => {
        setUserData(prevState => {
            return {...prevState, [e.target.name] : e.target.value}
        })
    }


    return (
        <section>
            <div className="container login">
                <h2>Se connecter</h2>
                <form action="#" className='form login__form'>
                    <p className="form__error-message">Ceci est un message d'erreur</p>
                    <input type="email" placeholder='Votre email' name='email' value={userData.email} onChange={changeInputHandler} />
                    <input type="password" placeholder='Votre mot de passe' name='password' value={userData.password} onChange={changeInputHandler} />
                    <button type="submit" className='btn primary'>Se connecter</button>
                </form>
                <small>Vous n'avez pas encore de compte ? <NavLink to="/register">S'enregistrer</NavLink></small>
            </div>
        </section>
    )
}

export default Login