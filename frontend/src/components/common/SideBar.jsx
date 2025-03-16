import { Link } from "react-router-dom"
import { ArrowRightStartOnRectangleIcon, CogIcon, DocumentCurrencyDollarIcon, HomeIcon, PencilIcon, PresentationChartLineIcon } from "@heroicons/react/24/solid";


function SideBar(){
    return (
        <>
            <div className="sideBar h-full  w-56 bg-gray-200 text-black font-600 text-lg">
                <ul className="flex flex-col items-center h-full md:gap-y-4 2xl:xl:gap-y-8  p-4">
                    <li className="link">
                        <HomeIcon className="icon"></HomeIcon>
                        <Link to='/'>Acceuil</Link>
                    </li>
                    <li className="link">
                        <PencilIcon className="icon"></PencilIcon>
                        <Link to='/'>Nouveau</Link>
                    </li>
                    <li className="link">
                        <DocumentCurrencyDollarIcon className="icon" />
                        <Link to='/'>Facture</Link>
                    </li>
                    <li className="link">
                        <CogIcon className="icon" />
                        <Link to='/'>Pièces</Link>
                    </li>
                    <li className="link">
                        <PresentationChartLineIcon className="icon" />
                        <Link to='/'>Pièces</Link>
                    </li>
                    <li className=" bg- flex items-center bg-waterBlue justify-center gap-x-2  rounded-lg p-4 hover:bg-sky-700">
                        <ArrowRightStartOnRectangleIcon className="min-w-6 min-h-6" />
                        <Link to='/'>Déconnexion</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default SideBar