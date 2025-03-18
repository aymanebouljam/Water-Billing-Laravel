import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './components/frontend/Home'
import Layout from './components/Layout'
import InvoiceCreate from './components/frontend/Invoice/Create'
import InvoiceParts from './components/frontend/Invoice/Parts' 
import InvoiceExport from './components/frontend/Invoice/Export' 
import Invoices from './components/backend/Invoices'
import Parts from './components/backend/Parts'
import Taxes from './components/backend/Taxes'
import Refresher from './components/common/Refresher'


function App() {
 

  return (
    <>
    <BrowserRouter> 
      <Routes>
      
        <Route path='/' element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='refresher/:pathname' element={<Refresher />} />
          <Route path='invoice/create' element={<InvoiceCreate />} />
          <Route path='invoice/parts/:invoice' element={<InvoiceParts />} />
          <Route path='invoice/export/:invoice' element={<InvoiceExport />} />
          <Route path='invoices' element={<Invoices />} />
          <Route path='parts' element={<Parts />} />
          <Route path='taxes' element={<Taxes />} />
        </Route>
      </Routes>
    </BrowserRouter>
      
    </>
  )
}

export default App
