import { useState } from "react";

function Create(){
    const [type, setType] = useState();
    const [contract, setContract] = useState(true);
    const handleSelect = (e) => {
        const subject = e.target.value;
        switch(subject){
            case 'nouveau branchement' :
                setType(<select className="input" onChange=''>
                        <option value="">-- Type de Branchement --</option>
                        <option value="branchement 3/2">Branchement de 25</option>
                        <option value='branchement 1"1/2'>Branchement de 50</option>
                    </select>)
                setContract(false);
                break;
            case 'modification de branchement':
                setType(<select className="input" onChange=''>
                    <option value="">-- Type de Branchement --</option>
                    <option value='modification 1/2 au 3/2'>modification de 20 au 25</option>
                    <option value='modification 1/2 au 1"1/2'>modification de 20 au 50</option>
                    <option value='modification de 3/2 au 1"1/2'>modification de 25 au 50</option>
                </select>)
                setContract(true);
                break;
            default:
                setType('')
                setContract(true)
                break;      
        }
    }
    return(
        <div className="container h-screen">  
           <form className="h-full flex flex-col bg-white/5  backdrop-blur-lg shadow-lg w-1/2 p-8">
                <input type="text" id="client" Name="client" className="input" placeholder="Nom complet du client"/>
                <select className="input" onChange={handleSelect}>
                    <option value="">-- Objet de Branchement --</option>
                    <option value="nouveau branchement">Nouveau Branchement</option>
                    <option value="modification de branchement">Modification de branchement</option>
                    <option value="déplacement de la niche">Déplacement de la niche</option>
                </select>
                {type && type}
                {contract && 
                    <input type="number" id="contract" name="contract" className="input" placeholder="N° de Police" />
                }
                <input type="number" id="counter" name="counter" className="input" placeholder="Nombre de Compteurs"/>
                <div className="flex justify-center items-center p-4 gap-x-6">
                    <button type="submit" className="border-2 p-3 w-40 bg-secondaryBlue rounded-lg text-lg hover:scale-110">Valider</button>
                    <button type="reset" className=" p-3 w-40 hover:bg-primaryBlue hover:border-2 hover:text-white rounded-lg text-lg">Annuler</button>
                </div>
           </form>
       </div>
    )
}   
export default Create