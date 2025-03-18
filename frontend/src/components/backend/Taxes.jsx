import {  useEffect, useState } from "react";
import { URL } from '../common/URL'
import axios from "axios";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { useNavigate } from "react-router-dom";
function Taxes(){
  const navigate = useNavigate()
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        type : '',
        rate : ''
    })
    const [isEdited, setIsEdited] = useState(false)
    const [loading, setLoading] = useState();

    // fetchTaxes
    const getTaxes = async () => {
        setLoading(true)
       try{
            const res = await axios.get(`${URL}taxes`)
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
        getTaxes()
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
            });
            $(".dataTables_wrapper .dataTables_paginate, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter").css({
              "color": "black"
            });      
          },
        });
      }, [data]);
      // Get input
      const handleChange = (e) => {
          const {name, value} = e.currentTarget
          setFormData((prevState) => (
              {...prevState, [name] : value}
          ))
      }
      // create Tax
      const createTax = async () => {
          try{
            const res = await axios.post(`${URL}taxes`, formData)
            if(res.data.error){
              throw new Error(res.data.error)
            }else{
              alert('Taxe ajoutée avec succés')
              navigate('/refresher/taxes')
            }
          }catch(err){
            console.error(err)
          }
      }
      // Fetch Single Tax
      const fetchSingleTax = async(e) => {
          const id = e.currentTarget.dataset.id
          if(!id) return;
          try{
            const res = await axios.get(`${URL}taxes/${id}`)
            if(res.data.error){
                throw new Error(res.data.error)
            }else{
                const tax = res.data.data
                setFormData({id : tax.id, type : tax.type, rate : tax.rate})
                setIsEdited(true)
            }
          }catch(err){
            console.error(err)
          }
      }

      // edit Tax
      const editTax = async()=>{
        try{
          const res = await axios.put(`${URL}taxes/${formData.id}/update`,formData)
          if(res.data.error){
            throw new Error(res.data.error)
          }else{
            alert('Taxe modifiée avec succés')
            navigate('/refresher/taxes')
          }
        }catch(err){
          console.error(err)
        }
      }
      // handleSubmit
      const handleSubmit = (e) => {
          e.preventDefault()
        try{
          switch(true){
            case formData.type === '':
              alert('La Désignation est obligatoire')
              break;
            case formData.rate === '':
              alert('Le taux est obligatoir')
              break;
            case isNaN(Number(formData.rate)):
              alert('Le taux doit être numérique')
              break;
            default:
                isEdited ? editTax() :  createTax()
          }
      }catch(err){
        console.error(err)
      }
    }
     //Delete a Part
     const handleDelete = async (e) => {
        if(confirm('Veuillez confirmer la suppression!')){
          const id = e.currentTarget.dataset.id
          if (!id) return
          try {
              const res = await axios.delete(`${URL}taxes/${id}`)
              if (res.data.error) {
                  throw new Error(res.data.error)
              } else {
                navigate('/refresher/taxes')
              }
          } catch (err) {
              console.error(err)
          }
        }
    };

    //Reset Form 
    const resetForm = () => {
        try{
            setFormData({
              type : '',
              rate : ''
            })
            setIsEdited(false)
        }catch(err){
          console.error(err)
        }
    }



   return (
    <div className="flex flex-col w-full items-center container">
      <form onSubmit={handleSubmit} className="w-1/2 pt-5">
        <div className="flex items-center border-b border-primaryBlue py-2">

          <input className="appearance-none bg-transparent border-none w-full text-gray-800 mr-3 py-1 px-2 leading-tight focus:outline-none" type="text" placeholder="Désignation" aria-label="type" name="type" id="type" value={formData.type} onChange={handleChange}/>

          <input className="appearance-none bg-transparent border-none w-1/2 text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none" type="number" step='any' min={0} placeholder="Prix" aria-label="rate" name="rate" id="rate" value={formData.rate} onChange={handleChange}/>

          <button className="w-1/6 flex-shrink-0 bg-primaryBlue hover:bg-sky-700 hover:text-white border-primaryBlue hover:border-sky-700 text-sm border-4 text-dark py-1 px-2 rounded" type="submit">
            {isEdited ? 'Modifier' : 'Créer'}
          </button>
          <button className="flex-shrink-0 border-transparent border-4 text-primaryBlue hover:text-sky-800 text-sm py-1 px-2 rounded" type="reset" onClick={resetForm}>
            Annuler
          </button>
        </div>
      </form>

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
              <th>Désignation</th>
              <th>Taux</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map(row => (
              <tr key={row.id}>
                <td>{row.id}</td>
                <td>{row.type}</td>
                <td>{row.rate}</td>
                <td className="flex w-full h-full">
                  <button type="button" className="w-1/2  p-2 flex items-center justify-center hover:scale-125" data-id={row.id} onClick={fetchSingleTax}>
                    <PencilSquareIcon className="w-4 h-4" />
                  </button>
                  <button type="button" className="grow  p-2 flex items-center justify-center hover:scale-125" data-id={row.id} onClick={handleDelete}>
                    <TrashIcon className="w-4 h-4" />
                  </button>
                </td>
                
              </tr>
            ))}
          </tbody>
        </table>
      )}
      </div>
    </div>
    
  );
}
export default Taxes