import axios from "axios";
import { URL } from "../../common/URL";
import { useEffect, useState } from "react";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { useNavigate, useParams } from "react-router-dom";

function Parts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState([])
  const { invoice } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    setLoading(true);
    axios.get(`${URL}parts`)
      .then(res => {
        setData(res.data.data);
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, []);

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
  // handleChange 
  const handleChange = (e) => {
      const {id, value} = e.currentTarget;
      if(value > 0){
        setQuantity((prevState) => {
          return [...prevState, {partId : id, quantity : value}]
        })
      }else{
        setQuantity((prevState) => {
          return  prevState.filter(el => (
              el.id !== id
          ))
        })
      }
  }
  // handleClick
  const handleClick = async() =>{
      if(quantity.length === 0){
        alert('Veuillez désigner les quantités des pièces')
        return;
      }
      
      try{
        const filteredObject = quantity.reduce((acc, curr)=>{
              acc[curr.partId] = curr
              return acc
        },{})

        const filteredArray = Object.values(filteredObject)

        const formData = filteredArray.map(el => ({invoiceId:invoice, ...el }))

        const res = await axios.post(`${URL}bills`, formData)
        if(res.data.error){
          throw new Error(res.data.error)
        }else{
            const id = res.data.id
            navigate(`/invoice/export/${id}`)
        }
      }catch(err){
          console.error(err)
      }
  }

  return (
    <div className="px-5 py-12 container relative">
      {loading ? (
        <div className="flex justify-center items-center h-48 mt-24">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
        </div>
      ) : (
        <div>
          <button type="button" className="validate bg-secondaryBlue absolute z-10 top-14 right-8  rounded-lg flex justify-center items-center gap-x-2 py-2 px-3 hover:scale-110"  onClick={handleClick}>
            <CheckBadgeIcon className="w-6 h-6"/>
            Valider
          </button>
          <table id="partsTable" className="dataTable w-1/2">
            <thead>
              <tr>
                <th>ID</th>
                <th>Désignation</th>
                <th>Prix Unitaire</th>
                <th>Quantité</th>
              </tr>
            </thead>
            <tbody>
              {data.map(row => (
                <tr key={row.id}>
                  <td>{row.id}</td>
                  <td>{row.label}</td>
                  <td>{row.price}</td>
                  <td><input type="number" step='any' defaultValue={0} id={row.id} className="p-2 rounded-xl text-center text-black  bg-transparent border-none leading-tight focus:outline-none" min={0} onChange={handleChange}/></td>
                </tr>
              ))}
            </tbody>
        </table>
        
        
        
        </div>
      )}
    </div>
  );
}

export default Parts;