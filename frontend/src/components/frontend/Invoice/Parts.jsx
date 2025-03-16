import DataTable from "../../common/DataTable"
function Parts(){
    const columns = ["ID", "Désignation", "Prix Unitaire", "Quantité"]
    const data = [
        [1,"Tube", 1.5, <input type="number" className="appearance-none"/>],
        [2,"Tuyau", 2.5, <input type="number"/>],
        [3,"Robinet", 3.5, <input type="number"/>],
    ]
    return(
        <div className="px-4 py-16 w-full">
            <DataTable title='Choisir les Pièces' data={data} columns={columns}/>
        </div>
    )
}
export default Parts