import DataTable from "../common/DataTable";
function Parts(){
    const columns = ["ID", "Désignation", "Prix Unitaire", 'Actions']
    const data = [
        [1,"Tube", 1.5, <button type="button" >Modifier</button>],
        [2,"Tuyau", 2.5,  <button type="button" >Modifier</button>],
        [3,"Robinet", 3.5,  <button type="button" >Modifier</button>],
    ]
    return(
        <div className="px-4 py-16 w-full">
            <DataTable data={data} columns={columns}/>
        </div>
    )
}
export default Parts