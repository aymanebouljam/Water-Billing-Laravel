import MUIDataTable from "mui-datatables";

const options = {
    filterType: "checkbox",
    pagination: true,
};


function DataTable({data, columns}) {
    return <MUIDataTable title={"User List"} data={data} columns={columns} options={options} />;
}
export default DataTable