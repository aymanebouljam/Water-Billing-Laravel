import axios from "axios";
import DataTable from "../../common/DataTable"
import { URL } from "../../common/URL";
import { useEffect, useState } from "react";
function Parts(){
    const columns = ["ID", "Désignation", "Prix Unitaire", "Quantité"]
    const [quantity, setQuantity] = useState(0)
    const [data, setData] = useState([]);
    //fetch Invoices
    const getParts= async() => {
        try{
            const res = await axios.get(`${URL}parts`)
            if(res.data.error){
                throw new Error(res.data.error)
            }else{
                setData(res.data.data)
            }

        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
        getParts()
    },[])

    const mappedData = data.map(part => (
        {
            "ID" : part.id,
            "Désignation" : part.label,
            "Prix Unitaire" : part.price,
            "Quantité" : <input type="number" id="quantity" name="quantity" value={quantity} min={0} />
        }
    ))
console.log(data)
    return(
        <div className="px-4 py-16 w-full">
            <DataTable title='Choisir les Pièces' data={mappedData} columns={columns}/>
        </div>
    )
}
export default Parts