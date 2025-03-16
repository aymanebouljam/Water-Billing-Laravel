import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/common/frontend/Home'
import Layout from './components/Layout'
import InvoiceCreate from './components/common/frontend/Invoice/Create' 
import InvoiceParts from './components/common/frontend/Invoice/Parts' 

function App() {
 

  return (
    <>
    <BrowserRouter> 
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='invoice/create' element={<InvoiceCreate />} />
          <Route path='invoice/parts' element={<InvoiceParts />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
