import { BrowserRouter, Route, Routes } from 'react-router-dom'
import NavBar from './components/common/NavBar'
import SideBar from './components/common/SideBar'

function App() {
 

  return (
    <>
    <BrowserRouter> 
    <NavBar /> 
    <SideBar /> 
     
    </BrowserRouter>
      
    </>
  )
}

export default App
