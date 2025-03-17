import axios from "axios";
import { useState } from "react";
import { URL } from '../../common/URL'
import { useNavigate} from "react-router-dom";


function Create(){
    const navigate = useNavigate()
    const [type, setType] = useState([]);
    const [contract, setContract] = useState(true);
    const [formData, setFormData] = useState({
        client : '',
        subject : '',
        type : '',
        counter : ''
    })
    const [errors, setErrors] = useState({});

    //Handle input change
    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData((prevState) => {
            return {...prevState, [name] : value}
        }) 
        
    }
    //Handling Object selection
    const handleSelect = (e) => {
        const subject = e.target.value;
        setFormData((prevState) => {
            return {...prevState, subject}
        }) 
        switch(subject){
            case 'nouveau branchement' :
                    setType([
                        {value:'branchement 2/3', label:'Branchement de 25'},
                        {value:'branchement 1"1/2', label:'Branchement de 50'}
                    ])
                setContract(false);
                break;
            case 'modification de branchement':
                 setType([
                    {value:'modification 1/2 au 2/3', label:'modification de 20 au 25'},
                    {value:'modification 1/2 au 1"1/2', label:'modification de 20 au 50'},
                    {value:'modification 2/3 au 1"1/2', label:'modification de 25 au 50'},
                ])
                setContract(true);
                break;
            default:
                setType([])
                setContract(true)     
        }
    }
    // show Error
    const showError = (input) => {
        return (errors && errors[input] !== "") ? (
            <div className="error">{errors[input]}</div> ): ''  
    }
    // reset form

    const resetForm = () => {
        setFormData({
            client : '',
            subject : '',
            type : '',
            counter : ''
        })
        setErrors({})
    }
    //submitting form

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {}
        const nameRegex = '^[A-Za-z]+([ \'-][A-Za-z]+)* [A-Za-z]+([ \'-][A-Za-z]+)*$'
        switch(true){
            case formData.client === '':
                newErrors.client = 'Nom du client est obligatoire'
                break;
            case !formData.client.match(nameRegex):
               newErrors.client = 'Le nom du client doit être complet et alphabétique'
                break;
            case formData.client.length < 5:
                newErrors.client = 'Nom doit avoir au minimum 5 lettres'
                break;
            case formData.subject === '':
                newErrors.subject = 'Object de Branchement est obligatoire'
                break;
            case formData.type === '':
                newErrors.type = 'Type de Branchement est obligatoire'
                break;
            case contract && formData.contract === '':
                newErrors.contract = 'N° de Contract est obligatoire'
                break;
            case contract && (isNaN(Number(formData.contract)) || !Number.isInteger(Number(formData.contract)) || Number(formData.contract) <= 0):
                newErrors.contract = 'N° de Contract doit être numérique et supérieur 0'
                break;
            case formData.counter === '':
                newErrors.counter = 'Nombre de Compteurs est obligatoire'
                break;
            case isNaN(Number(formData.counter)) || !Number.isInteger(Number(formData.counter) || Number(formData.counter) <= 0):
                newErrors.counter = 'Nombre de Compteurs doit être numérique et supérieur 0'
                break;
            default :
                setErrors(null)
        }
        if(Object.keys(newErrors).length > 0){
            setErrors(newErrors)
            return;
        }else{
            setErrors({})
        }
        if(errors !== null){
            try{
                const res = await axios.post(`${URL}invoices`,formData)
                if(res.data.error){
                    throw new Error(res.data.error)
                }else{
                    alert(res.data.message)
                    navigate('/invoice/parts')
                }
            
            }catch(err){
                console.error(err)
            }
        }
        
    }
    return(
        <div className="container h-screen">  
           <form onSubmit={handleSubmit} className="h-full flex flex-col bg-white/5  backdrop-blur-lg shadow-lg w-1/2 p-6">
                <input type="text" id="client" name="client" className="input" placeholder="Nom complet du client" onChange={handleChange} value={formData.client}/>
                {
                    showError('client')
                }
                <select className="input" id="subject" name="subject" onChange={handleSelect} value={formData.subject}>
                    <option value="">-- Objet de Branchement --</option>
                    <option value="nouveau branchement">Nouveau Branchement</option>
                    <option value="modification de branchement">Modification de branchement</option>
                    <option value="déplacement de la niche">Déplacement de la niche</option>
                </select>
                {
                    showError('subject')
                }
                {type.length > 0 && (
                    <>
                        <select id="type" name="type" value={formData.type} onChange={handleChange} className="input">
                            <option value=''>-- Type de Branchement --</option>
                            {
                                type.map(el => (
                                    <option key={el.value} value={el.value}>{el.label}</option>
                                ))
                            }
                        </select>
                        {
                            showError('type')
                        }
                    </>
                )}
                {contract && 
                    <>
                        <input type="number" id="contract" name="contract" className="input" placeholder="N° de Police" value={formData.contract} onChange={handleChange} min={0}/>
                        {
                            showError('contract')
                        }
                    </>
                    
                }
                <input type="number" id="counter" name="counter" className="input" placeholder="Nombre de Compteurs" value={formData.counter} min={0}  onChange={handleChange}/>
                {
                    showError('counter')
                }
                <div className="flex justify-center items-center p-4 gap-x-6">
                    <button type="submit" className="border-2 p-3 w-40 bg-secondaryBlue rounded-lg text-lg hover:scale-110">Valider</button>
                    <button type="reset" className=" p-3 w-40 hover:bg-primaryBlue hover:border-2 hover:text-white rounded-lg text-lg" onClick = {resetForm}>Annuler</button>
                </div>
           </form>
       </div>
    )
}   
export default Create