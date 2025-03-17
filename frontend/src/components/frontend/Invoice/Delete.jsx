import axios from "axios"
import { useEffect, useRef } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { URL } from '../../common/URL'

function Delete() {
    const navigate = useNavigate()
    const { id } = useParams()
    const hasDeleted = useRef(false) 
    
    useEffect(() => {
        if (hasDeleted.current || !id) return
        
        const deleteInvoice = async () => {
            try {
                hasDeleted.current = true 
                
                const res = await axios.delete(`${URL}invoices/${id}`)
                if (res.data.error) {
                    throw new Error(res.data.error)
                } else {
                    navigate(`/invoices?message=${res.data.message}`)
                }
            } catch (err) {
                console.error(err)
                navigate(`/invoices?message=${err}`)
            }
        }
        
        deleteInvoice()
    }, [id, navigate]) 
    
    return null
}

export default Delete