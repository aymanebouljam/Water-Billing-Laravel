import { useEffect } from "react";
import $ from "jquery";
import "datatables.net";
import "datatables.net-dt";
import "datatables.net-dt/css/dataTables.dataTables.css";

function DataTable({ id, columns, data }) {
  useEffect(() => {
    if (data.length === 0) return;
    window.$ = window.jQuery = $;
    
    if ($.fn.DataTable.isDataTable(`#${id}`)) {
      $(`#${id}`).DataTable().destroy();
    }
    
    $(`#${id}`).DataTable({
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
          "border": "none",
          "background": "#191970",
          "color": "white",
          "text-align": "center",
          "padding": "12px",
        });
        $(".dataTables_wrapper .dataTables_paginate, .dataTables_wrapper .dataTables_info, .dataTables_wrapper .dataTables_length, .dataTables_wrapper .dataTables_filter").css({
          "color": "black"
        });      
      },
    });
  }, [data, id]);

  return (
    
    <table id={id} className="dataTable">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {Object.values(row).map((value, colIndex) => (
              <td key={colIndex}>{value}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default DataTable;
