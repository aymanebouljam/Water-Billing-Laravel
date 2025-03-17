import axios from "axios";
import { URL } from "../../common/URL";
import { useEffect, useState } from "react";
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

function Parts() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

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
                <td><input type="number" defaultValue={0} className="p-2 rounded-xl text-center text-black" min={0} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default Parts;