import { Link } from "react-router-dom"

function NavBar(){
    return(
        <>
            <nav className="bg-gray-800">
                <Link to='/'>Accueil</Link>
            </nav>
        </>
    )
}
export default NavBar