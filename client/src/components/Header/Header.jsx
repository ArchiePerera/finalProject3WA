import { Link } from "react-router-dom"
import Logo from "../../assets/logo/logoTransparency.png"
import { FaBars } from "react-icons/fa"
import { AiOutlineClose } from "react-icons/ai"
import "./Header.scss"

const Header = () => {

    return (
        <nav>
            <div className="logo">
                <Link to="/" className="logo__img">
                    <img src={Logo} alt="logo" width={100}/>
                </Link>
                <div className="logo__txt">
                    <h1>
                        <span>Ressources</span>
                        <span>cinématographiques</span>
                        <span>Universitaires</span>
                    </h1>
                </div>
            </div>
            <div className="menu">
                <ul>
                    <Link to="/profile/:id">Archie Perera</Link>
                    <Link to="/article/add">Créer un article</Link>
                    <Link to="/authors">Voir les auteurs</Link>
                    <Link to="/logout">Se déconnecter</Link>
                </ul>
                <button className="menu__toggle-btn">
                    <AiOutlineClose />
                </button>
            </div>
        </nav>
    )

}

export default Header