import Home from "./Home";
import Login from "./Login";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout from "./Layout";
import UploadCSV from "./UploadCSV";
import EditInvoice from "./EditInvoice";
import InvoiceForm from "./InvoiceForm";
import InvoiceTable from "./InvoiceTable";
import ProtectedRoute from "./ProtectedRoute";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* LOGIN FIRST */}
        <Route path="/login" element={<Login />} />

        {/* PROTECTED APP */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Home />} />
          <Route path="GenerateBill" element={<InvoiceForm />} />
          <Route path="upload" element={<UploadCSV />} />
          <Route path="search" element={<InvoiceTable />} />
          <Route path="edit-invoice/:id" element={<EditInvoice />} />
        </Route>

        {/* FALLBACK */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
