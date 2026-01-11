import Home from './Home';
import { useState } from 'react';
import './App.css';
import Axios from 'axios';
import Sheet from "./Sheet";
import Test from './test';
import Signature from './Signature';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './Navbar';
import Layout from './Layout';
import UploadCSV from './UploadCSV';
import SearchLr from './SearchLr';
import EditInvoice from './EditInvoice';
import InvoiceForm from './InvoiceForm';
import InvoiceTable from './InvoiceTable';
function App() {
  const [fname, setFname] = useState('');
  const insert = () => {
    Axios.post('http://localhost:3001/get').then((res) => {
      console.log("success hit!" + res);
    })
  };
  return (
    <div className="App">
  
      
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
        </Route>

        {/* <Route path="LR" element={<Sheet />} /> */}
         <Route path="GenerateBill" element={<InvoiceForm />} />

           <Route path="upload" element={<UploadCSV />} />

           <Route path="search" element={<InvoiceTable />} />
          <Route path="/edit-invoice/:id" element={<EditInvoice />} />


      </Routes>
    </BrowserRouter>
    </div>
    
  );
}

export default App;
