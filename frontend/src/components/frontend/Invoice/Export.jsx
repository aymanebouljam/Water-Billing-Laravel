import { useState } from 'react'
// import adobe from '../../../assets/images/adobe.png'
// import excel from '../../../assets/images/excel.png'
import { useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { URL } from '../../common/URL'
function Export(){
    const [invoice, setInvoice] = useState({});
    const [taxes, setTaxes] = useState([]);
    const { id } = useParams()

    const calculateSubTotal = () => {
        if(invoice.parts && invoice.parts.length > 0){
            const subTotal = invoice.parts.reduce((sum, part) => (
                sum + (part.price * part.pivot.quantity)
        ),0)
            return Number(subTotal.toFixed(2))
        }
    }

    const calculateTaxAmount = () =>{
        const subTotal =  calculateSubTotal()
        let accumilator = subTotal
        if(taxes.length > 0 && accumilator > 0){
            const taxAmounts = taxes.map(tax =>{
                   const taxAmount = accumilator * tax.rate
                    accumilator += taxAmount
                   return taxAmount.toFixed(2)
            })
            return taxAmounts
        }
        return []
    }


    useEffect(()=>{
        const fetchBills = async()=>{
            try{
                const res = await axios.get(`${URL}invoices/${id}`)
                if(res.data.error){
                    throw new Error(res.data.error)
                }else{
                    setInvoice(res.data.invoice)
                    setTaxes(res.data.taxes)
                }
            }catch(err){
                console.error(err)
            }
        }
        fetchBills()
    },[id])
    return(
     <>
        {/* <div className="export w-full flex flex-col gap-y-4 justify-center items-center">
            <h1 className='text-2xl text-white font-medium border-b-2 p-2 border-primaryBlue animate-pulse'>Télécharger la Facture</h1>
            <div className="flex items-center justify-center gap-x-16 w-1/2 h-1/2 bg-white/15  backdrop-blur-lg shadow-xl rounded-3xl  hover:animate-none">
                <img src={adobe} alt='Feuille Excel' className='w-20 h-20 animate-bounce hover:animate-none'/>
                <img src={excel} alt='Adobe PDf' className='w-20 h-20 animate-bounce hover:animate-none'/>
            </div>
        </div> */}
        <table className='w-full h-2/3'>
            <thead>
                <tr>
                    <th>Désignation</th>
                    <th>Prix Unitaire</th>
                    <th>Quantité</th>
                    <th>Total HT</th>
                </tr>
            </thead>
            <tbody>
                {(invoice?.parts?.length > 0) &&(
                    invoice.parts.map(part => (
                        <tr key={part.id}>
                            <td>{part.label}</td>
                            <td>{part.price}</td>
                            <td>{part.pivot.quantity}</td>
                            <td>{(part.price * part.pivot.quantity).toFixed(2)}</td>
                        </tr>
                    ))
                )}
                <tr>
                    <td>Total HT</td>
                    <td></td>
                    <td></td>
                    <td>{calculateSubTotal()}</td>
                </tr>
                {
                    (taxes?.length > 0) &&(
                        taxes.map((tax,index) => (
                            <tr key={tax.id}>
                                <td>{tax.type}</td>
                                <td>{tax.rate * 100}</td>
                                <td></td>
                                <td>{calculateTaxAmount()[index]}</td>
                            </tr>
                        ))
                    )
                }
                <tr>
                    <td>Total Général TTC</td>
                    <td></td>
                    <td></td>
                    <td>{invoice?.total?.toFixed(2)}</td>
                </tr>
            </tbody>
        </table>
     </>
    )
}
export default Export