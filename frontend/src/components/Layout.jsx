import { Outlet } from "react-router-dom"
import NavBar from "./common/NavBar"
import SideBar from "./common/SideBar"

function Layout(){
    return(
        <>
            <NavBar />
            <div className="flex items-center justify-center">
                <SideBar />
                <Outlet />
            </div>
        </>
    )
}   
export default Layout