import React, { useEffect, useRef } from 'react';
import $ from 'jquery';
import 'datatables.net';
import 'datatables.net-dt';
import 'datatables.net-dt/css/dataTables.dataTables.css';

const DynamicDataTable = ({ columns, data }) => {
  const tableRef = useRef(null);

  useEffect(() => {
    // Ensure jQuery is available
    window.$ = window.jQuery = $;

    // Determine which columns should not be orderable (e.g., those with inputs)
    const columnDefs = columns.map((col, index) => ({
      targets: index,
      orderable: !col.input, // Disable sorting for input columns
    }));

    // Initialize DataTables
    const table = $(tableRef.current).DataTable({
      info: false,
      autoWidth: false,
      columnDefs: columnDefs,
      language: {
        sProcessing: "Traitement en cours...",
        sSearch: "Rechercher : ",
        sLengthMenu: "Afficher _MENU_ éléments",
        sInfoFiltered: "(filtré de _MAX_ éléments au total)",
        sLoadingRecords: "Chargement en cours...",
        sZeroRecords: "Aucun élément à afficher",
        sEmptyTable: "Aucune donnée disponible dans le tableau",
        oPaginate: {
          sFirst: "Premier",
          sPrevious: "<",
          sNext: ">",
          sLast: "Dernier",
        },
      },
      lengthChange: false,
      pageLength: 3,
      initComplete: function () {
        $(tableRef.current).fadeIn();
      },
      drawCallback: function () {
        $(tableRef.current).css({ 'border-spacing': '0.3rem' });
        $('.dataTable th, td').css({ 'text-align': 'center' });
      },
    });

    // Cleanup: Destroy DataTables instance on unmount
    return () => {
      if (table) {
        table.destroy();
      }
    };
  }, [columns, data]); // Re-run when columns or data change

  return (
    <table ref={tableRef} className="dataTable" style={{ display: 'none' }}>
      <thead>
        <tr>
          {columns.map((col) => (
            <th key={col.key}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {columns.map((col) => (
              <td key={`${rowIndex}-${col.key}`}>
                {col.input ? (
                  <input
                    type="number"
                    id={`${col.key}-${rowIndex}`}
                    name={col.key}
                    defaultValue={row[col.key] || 0}
                  />
                ) : (
                  row[col.key]
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default DynamicDataTable;