import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/frontend/Home'
import Layout from './components/Layout'
import Bill from './components/frontend/Invoice/Bill' 
import Invoices from './components/backend/Invoices'
import Parts from './components/backend/Parts'
import Taxes from './components/backend/Taxes'
import Refresher from './components/common/Refresher'
import Login from './components/backend/Login'
import Logout from './components/backend/Logout'
import Auth from './components/auth/Auth'


function App() {
 

  return (
    <>
    <BrowserRouter> 
      <Routes>

        <Route path='/login' element={<Login />}/>
        <Route path='/logout' element={<Auth><Logout /></Auth>}/>
  

        <Route path='/' element={<Auth><Layout/></Auth>}>
          <Route index element={<Home />} />
          <Route path='refresher/:pathname' element={<Refresher />} />
          <Route path='invoice' element={<Bill />} />
          <Route path='invoices' element={<Invoices />} />
          <Route path='parts' element={<Parts />} />
          <Route path='taxes' element={<Taxes />} />
          <Route path='*' element={<Home/>}/>
        </Route>

      
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
