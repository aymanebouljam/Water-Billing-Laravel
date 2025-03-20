import { Link } from "react-router-dom"
import { ArrowRightStartOnRectangleIcon, CogIcon, DocumentCurrencyDollarIcon, HomeIcon, PencilIcon,  PresentationChartLineIcon } from "@heroicons/react/24/solid";


function SideBar(){
    return (
        <>
            <div className="sideBar h-screen bg-gray-200 text-black font-600 text-lg border-r-2 border-secondaryBlue ">
                <ul className=" h-full flex flex-col items-center md:gap-y-4 2xl:xl:gap-y-8  p-6">
                    <Link className="link" to="/">
                        <li className="list">
                            <HomeIcon className="icon" />
                            Acceuil
                        </li>
                    </Link>

                    <Link className="link" to="/invoice">
                        <li className="list">
                            <PencilIcon className="w-8 h-8" />
                            Nouveau
                        </li>
                    </Link>

                    <Link className="link" to="/invoices">
                        <li className="list">
                            <DocumentCurrencyDollarIcon className="icon" />
                            Facture
                        </li>
                    </Link>

                    <Link className="link" to="/parts">
                        <li className="list">
                            <CogIcon className="icon" />
                            Pièces
                        </li>
                    </Link>

                    <Link className="link" to="/taxes">
                        <li className="list">
                            <PresentationChartLineIcon className="icon" />
                            Taxes
                        </li>
                    </Link>

                    <Link to="/logout" className="flex items-center bg-secondaryBlue justify-center gap-x-2 rounded-lg p-4 mt-auto hover:bg-primaryBlue hover:text-white">
                        <li className="flex items-center gap-x-2">
                            <ArrowRightStartOnRectangleIcon className="min-w-6 min-h-6" />
                            Déconnexion
                        </li>
                    </Link>

                </ul>
            </div>
        </>
    )
}
export default SideBar