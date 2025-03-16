import DataTable from "../common/DataTable";
function Taxes(){
    const columns = ["ID", "Désignation", "Taux", 'Actions']
    const data = [
        [1,"Intervention", 1.5, <button type="button" >Modifier</button>],
        [2,"TVA", 2.5,  <button type="button" >Modifier</button>],

    ]
    return(
        <div className="px-4 py-16 w-full">
            <DataTable title='Gérer les taxes' data={data} columns={columns}/>
        </div>
    )
}
export default Taxes