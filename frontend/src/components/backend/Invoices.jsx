import {  useEffect, useState } from "react";
import { URL } from '../common/URL'
import axios from "axios";
import { PrinterIcon, TrashIcon } from "@heroicons/react/24/solid";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useNavigate } from "react-router-dom";


function Invoices(){
    const [deleteId, setDeleteId] = useState(null)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();
    const navigate = useNavigate()
    const [formData, setFormData] = useState({
      id : '',
      contract : '',
      reference : ''
    })

    const token = String(localStorage.getItem('token'))
    if(token){
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    }

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
    // Data Table
    useEffect(() => {
        if (data.length === 0) return;
        
        window.$ = window.jQuery = $;
        
        // Destroy table if it exists
        if ($.fn.DataTable.isDataTable('#partsTable')) {
          $('#partsTable').DataTable().destroy();
        }
        
        $('#partsTable').DataTable({
          columnDefs: [{ targets: -1, orderable: false }],
          language: {
            sSearch: "Rechercher : ",
            sEmptyTable: "Aucune donnée disponible",
            sZeroRecords: "Aucun élément correspondant trouvé",
            oPaginate: { sPrevious: "<", sNext: ">" },
            sInfo: "Affichage de _START_ à _END_ sur _TOTAL_ éléments", 
            sInfoEmpty: "Affichage de 0 à 0 sur 0 éléments",
            sInfoFiltered: "(filtré de _MAX_ éléments au total)"
          },
          initComplete: function() {
            setLoading(false); 
          },
          pageLength: 4,
          lengthChange: false,
          destroy: true,
          drawCallback: function () {
            $("table.dataTable, table.dataTable td, .dataTables_wrapper").css({
              "border": "none",
              "text-align": "center",
              "padding": "12px",
              "color": "black"
            });
            
            $("table.dataTable th").css({
              "border" : "none",
              "background": "#2b619b",
              "color" :"white",
              "text-align": "center",
              "padding": "12px",
              "width" : "200px"
            });
            $(".dataTables_wrapper .dataTables_paginate, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter").css({
              "color": "black"
            });      
          },
        });
      }, [data]);
     //Delete an invoice
     useEffect(()=>{
        const deleteInvoice = async () => {
            if (!deleteId) return
            try {
                const res = await axios.delete(`${URL}invoices/${deleteId}`)
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
    },[deleteId])

    // handle Input
    const handleChange = (e) =>{
        const { name , value} = e.currentTarget
        setFormData((prevState)=>(
          {...prevState, [name] : value }
        ))
    }

    // Reset form
    const resetForm = () => {
        setFormData({
          id : '',
          contract : '',
          reference : ''
        })
    }

    // handle Submit 
    const handleSubmit = async(e) => {
      e.preventDefault()
      switch(true){
        case formData.id === '' :
            alert('ID obligatoir')
            break
        case formData.contract !=='' && (isNaN(Number(formData.contract)) || !Number.isInteger(Number(formData.contract))):
            alert('Num de police doit être une nombre')
            break
        case !formData.reference.match(/^[a-zA-Z0-9]+$/):
            alert('Réference doit être alphanumérique')
            break
        default:
          try{
              const res = await axios.put(`${URL}invoices/${formData.id}/update`, formData)
              if(res.data.error){
                throw new Error(res.data.error)
              }else{
                  alert('Facture modifiée avec succés')
                  resetForm()
                  navigate('/refresher/invoices')
              }
          }catch(err){
            console.error(err)
          }
      }

    }
   return (
    <div className="px-5 py-8 w-full container">
      {loading ? (
        <div className="flex justify-center items-center h-48 mt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center gap-y-4">
         <form onSubmit={handleSubmit} className="w-1/2 pt-5">
        <div className="flex items-center border-b border-primaryBlue py-2">

          <input className="appearance-none bg-transparent border-none w-1/2 text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="ID" aria-label="id" name="id" id="id" value={formData.id} onChange={handleChange}/>

          <input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" placeholder="N° Police" aria-label="contract" name="contract" id="contract" value={formData.contract} onChange={handleChange}/>

          <input className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" step='any' min={0} placeholder="Réference" aria-label="reference" name="reference" id="reference" value={formData.reference} onChange={handleChange}/>

          <button className="w-1/6 flex-shrink-0 bg-primaryBlue hover:bg-sky-700 hover:text-white border-primaryBlue hover:border-sky-700 text-sm border-4 text-dark py-1 px-2 rounded" type="submit">
            {'Modifier'}
          </button>
          <button className="flex-shrink-0 border-transparent border-4 text-primaryBlue hover:text-sky-800 text-sm py-1 px-2 rounded" type="reset" onClick={resetForm}>
            Annuler
          </button>
        </div>
      </form>
      <table id="partsTable" className="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Référence</th>
              <th>Objet</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.reference || 'N/A'} </td>
                <td>{row.type || 'Déplacement de la niche'}</td>
                <td>{row.total.toFixed(2) || 'N/A'}</td>
                <td className="hover:scale-110">
                    <button className="mr-4" onClick={()=>{
                      navigate(`/export/${row.id}`)
                    }}>
                      <PrinterIcon className="w-4 h-4" />
                    </button>
                    <button  onClick={()=>{
                        if(confirm('Veuillez confimer la suppression')){
                            setDeleteId(row.id)
                        }
                    }}>
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
        </div>
       
      )}
    </div>
  );
}
export default Invoices