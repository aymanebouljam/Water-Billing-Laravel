import { Outlet } from "react-router-dom"
import NavBar from "./common/NavBar"
import SideBar from "./common/SideBar"

function Layout(){
    return(
        <>
            <NavBar />
            <div className="flex ">
                <div className="h-screen inline-block bg-red-300"> 
                    <SideBar />
                </div> 
                <Outlet />
            </div>
           
           
        </>
    )
}   
export default Layout