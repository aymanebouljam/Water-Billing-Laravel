import DataTable from "../common/DataTable";
function Invoices(){
    const columns = ["ID", "Type", "Client", "Contract", "Counters", 'Actions']
    const data = [
        [1, 'Branchement 2/3', 'Ahmed Alami', 123, 3, <button type="button">Modifier</button>],
        [1, 'Branchement 2/3', 'Ahmed Alami', 123, 3, <button type="button">Modifier</button>],
        [1, 'Branchement 2/3', 'Ahmed Alami', 123, 3, <button type="button">Modifier</button>],
        [1, 'Branchement 2/3', 'Ahmed Alami', 123, 3, <button type="button">Modifier</button>],
        [1, 'Branchement 2/3', 'Ahmed Alami', 123, 3, <button type="button">Modifier</button>],
        [1, 'Branchement 2/3', 'Ahmed Alami', 123, 3, <button type="button">Modifier</button>],
    ]
    return(
        <div className="px-4 py-16 w-full">
            <DataTable data={data} columns={columns}/>
        </div>
    )
}
export default Invoices