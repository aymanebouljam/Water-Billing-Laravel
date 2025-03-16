import { Link } from "react-router-dom"
import { ArrowRightStartOnRectangleIcon, CogIcon, DocumentCurrencyDollarIcon, HomeIcon, PencilIcon, PencilSquareIcon, PresentationChartLineIcon } from "@heroicons/react/24/solid";


function SideBar(){
    return (
        <>
            <div className="sideBar h-screen w-56 bg-gray-200 text-black font-600 text-lg">
                <ul className=" h-full flex flex-col items-center md:gap-y-4 2xl:xl:gap-y-8  p-6">
                    <li className="link">
                        <HomeIcon className="icon"></HomeIcon>
                        <Link to='/'>Acceuil</Link>
                    </li>
                    <li className="link">
                        <PencilIcon className="w-8 h-8" />
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
                    <li className="flex items-center bg-secondaryBlue justify-center gap-x-2  rounded-lg p-4 hover:bg-primaryBlue">
                        <ArrowRightStartOnRectangleIcon className="min-w-6 min-h-6" />
                        <Link to='/'>Déconnexion</Link>
                    </li>
                </ul>
            </div>
        </>
    )
}
export default SideBar