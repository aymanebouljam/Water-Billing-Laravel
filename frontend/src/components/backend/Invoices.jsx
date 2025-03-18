import {  useEffect, useState } from "react";
import { URL } from '../common/URL'
import axios from "axios";
import { TrashIcon } from "@heroicons/react/24/solid";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
function Invoices(){
    const [id, setId] = useState(null)
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState();

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
              "background": "#191970",
              "color" :"white",
              "text-align": "center",
              "padding": "12px",
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





   return (
    <div className="px-5 py-12 w-full parts">
      {loading ? (
        <div className="flex justify-center items-center h-48 mt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <table id="partsTable" className="dataTable">
          <thead>
            <tr>
              <th>ID</th>
              <th>Objet</th>
              <th>Type</th>
              <th>N° Police</th>
              <th>Compteurs</th>
              <th>Total</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.subject}</td>
                <td>{row.type || 'Déplacement de la niche'}</td>
                <td>{row.contract || 'N/A'}</td>
                <td>{row.counter}</td>
                <td>{row.total || 'N/A'}</td>
                <td>
                    <button onClick={()=>{
                        if(confirm('Veuillez confimer la suppression')){
                            setId(row.id)
                        }
                    }}>
                        <TrashIcon className="w-4 h-4" />
                    </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
export default Invoices