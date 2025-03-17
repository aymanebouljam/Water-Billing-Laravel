import {  useEffect, useState } from "react";
import DataTable from "../common/DataTable";
import { URL } from '../common/URL'
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
function Invoices(){
    const [id, setId] = useState(null)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const [mapped, setMapped] = useState([])
   
   


    const columns = ['ID', 'Subject', 'Client', 'Contract', 'Counters', 'Total', 'Action']
    // fetchInvoices
    const getInvoices = async () => {
        setLoading(true)
       try{
            const res = await axios.get(`${URL}invoices`)
            if(res.data.error){
                throw new Error(res.data.error)
            }else{
                setData(res.data.data)
                setLoading(false)
            }
       }catch(err){
            console.error(err)
       }

    }
    useEffect(()=>{
        getInvoices()
    },[])
    //map data into 2D Array
    useEffect(()=>{
        if(data.length > 0){
            setMapped(data.map(el => ([
                el.id,
                el.type || 'Déplacement de la niche',
                el.client.toUpperCase(),
                el.contract || 'N/A',
                el.counter,
                el.total || 'N/A',
                <button onClick={() => {
                    if (confirm('Confirmez la suppression')){
                        setId(el.id)
                    } 
                }}>
                    <TrashIcon className="w-4 h-4" />
                </button>
            ])))
        }else{
            setMapped([
            ['','','','Aucun élément Disponible','','','']
        ])
        }
    
    },[data])



    //Delete an invoice
    useEffect(()=>{
        const deleteInvoice = async () => {
            if (!id) return
            try {
                const res = await axios.delete(`${URL}invoices/${id}`)
                if (res.data.error) {
                    throw new Error(res.data.error)
                } else {
                    alert(res.data.message)
                    window.location.reload()
                }
            } catch (err) {
                console.error(err)
                alert(err)
            }
        }; deleteInvoice()
    },[id])




    return(
        <div className="px-4 py-16 w-full">
            {loading ?  (
            <div className="flex justify-center items-center h-48 mt-24">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
            </div>
            ):<DataTable id='invoicesTable' data={mapped} columns={columns}/>
        }
        </div>
    )
}
export default Invoices