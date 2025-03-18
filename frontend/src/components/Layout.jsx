import { Outlet } from "react-router-dom"
import SideBar from "./common/SideBar"

function Layout(){
    return(
        <>
            
            <div className="flex w-full h-full">
                <div className="inline-block"> 
                    <SideBar />
                </div> 
                <Outlet />
            </div>
           
           
        </>
    )
}   
export default Layout