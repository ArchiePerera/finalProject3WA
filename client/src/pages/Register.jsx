import React from 'react'
import { useState } from 'react'
import { NavLink } from 'react-router-dom'


const Register = () => {

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
            <div className="container register">
                <h2>S'enregistrer</h2>
                <form action="#" className='form register__form'>
                    <p className="form__error-message">Ceci est un message d'erreur</p>
                    <input type="text" placeholder='Votre prénom' name='firstName' value={userData.firstName} onChange={changeInputHandler} />
                    <input type="text" placeholder='Votre nom' name='lastName' value={userData.lastName} onChange={changeInputHandler} />
                    <input type="email" placeholder='Votre email' name='email' value={userData.email} onChange={changeInputHandler} />
                    <input type="password" placeholder='Votre mot de passe' name='password' value={userData.password} onChange={changeInputHandler} />
                    <button type="submit" className='btn primary'>Enregister</button>
                </form>
                <small>Vous avez déjà un compte ? <NavLink to="/login">Se connecter</NavLink></small>
            </div>
        </section>
    )
}

export default Register