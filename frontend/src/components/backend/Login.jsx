import axios from "axios"
import { useState } from "react"
import { URL } from '../common/URL'
import { useNavigate } from "react-router-dom"

function Login(){
    const [formData, setFormData] = useState({
        email : '',
        password : ''
    })

    const navigate = useNavigate()

    const [errors,setErrors] = useState(null)

    // handline Input
    const handleChange = (e) => {
        const { name , value } = e.currentTarget
        if(name && value){
            setFormData((prevState)=>{
                return {...prevState, [name] : value}
            })
        }
    }

    // handline Form submission
    const handleSubmit = async (e) => {
        e.preventDefault()
        const regex = "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$"

        switch(true){
            case formData.email === '' :
                setErrors({
                    email : 'Email est obligatoir'
                })
                break
            case !formData.email.match(regex):
                setErrors({
                    email : 'Email doit être en format user@email.com',
                })
                break
            case formData.password === '':
                setErrors({
                    password : 'Mot de passe est obligatoir'
                })
                break
            default :
                try{
                    const res = await axios.post(`${URL}login`, formData);
                    if(res.data.error){
                        throw new Error(res.data.error)
                    }else{
                        if(res.data.token){
                            localStorage.setItem('token', JSON.stringify(res.data.token))
                            const token = localStorage.getItem('token')
                            if(token){
                                 navigate('/')
                             }else{
                                 alert('Veuillez réassayer!')
                             }
                        }
                    }
                }catch(err){
                    console.error(err)
                }    
        }
    }
    return(
        <>
            <div className="flex w-full h-full items-center justify-center login">
                <form onSubmit={handleSubmit} className="flex flex-col w-1/3 bg-blue-950/35  backdrop-blur-lg shadow-2xl  rounded-2xl   px-6 py-8 border border-white">
                    <h1 className="text-3xl font-medium text-white text-center px-3 py-4">Authentification</h1>
                    <input type="text" id="email" name="email" className="input" placeholder="Votre Email" onChange={handleChange} value={FormData.email}/>
                    <div className="error">
                            {errors?.email}
                    </div>
                    
                    <input type="password" id="password" name="password"  className="input" placeholder="Mot de Passe" onChange={handleChange} value={FormData.password}/>
                    <div className="error">
                            {errors?.password}
                    </div>
                    
                    <div className="flex justify-center mt-5 py-3 gap-x-10">
                        <button type="submit" className="bg-greenBlue font-medium rounded-lg p-4 border border-white hover:bg-primaryBlue hover:border-black">Connexion</button>
                        <button type="rest" className="p-3 font-medium text-dark rounded-lg hover:text-white hover:border  hover:border-white">Annuler</button>
                    </div>
                </form>
            </div>
        </>
    )
}
export default Login