import { useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"

function Refresher(){
    const navigate = useNavigate()
    const { pathname } = useParams()

    useEffect(()=>{
       navigate(`/${pathname}`)
    },[navigate, pathname])

    return null
}

export default Refresher