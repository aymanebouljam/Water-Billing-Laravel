import { Outlet } from "react-router-dom"
import NavBar from "./common/NavBar"
import SideBar from "./common/SideBar"

function Layout(){
    return(
        <>
            
            <div className="flex container">
                <div className="h-screen inline-block"> 
                    <SideBar />
                </div> 
                <Outlet />
            </div>
           
           
        </>
    )
}   
export default Layout