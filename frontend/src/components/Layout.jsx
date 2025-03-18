import { Outlet } from "react-router-dom"
import SideBar from "./common/SideBar"

function Layout(){
    return(
        <>
            
            <div className="flex container w-full">
                <div className="h-screen inline-block"> 
                    <SideBar />
                </div> 
                <Outlet />
            </div>
           
           
        </>
    )
}   
export default Layout