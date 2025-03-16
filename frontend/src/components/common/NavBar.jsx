import { Link } from "react-router-dom"

function NavBar(){
    return(
        <>
            <nav className="bg-gray-800 h-16 flex items-center text-white font-400">
                <Link to='/'>Accueil</Link>
            </nav>
        </>
    )
}
export default NavBar