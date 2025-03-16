import MUIDataTable from "mui-datatables";



const options = {
    filterType: "checkbox",
    rowsPerPage: 3,
    language: {
      body: {
        noMatch: "Aucune donnée disponible",
        toolTip: "Trier",
      },
      pagination: {
        next: "Suivant",
        previous: "Précédent",
        rowsPerPage: "Lignes par page",
        displayRows: "de",
      },
      toolbar: {
        search: "Rechercher",
        downloadCsv: "Télécharger CSV",
      },
      filter: {
        all: "Tous",
        title: "Filtres",
        reset: "Réinitialiser",
      },
    },
  };




function DataTable({title, data, columns}) {
    return <MUIDataTable title={title} data={data} columns={columns} options={options} pageSize={3} />
}
export default DataTable