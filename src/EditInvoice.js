import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./InvoiceForm.css";
import logo from "./logo2.jpg";

const EditInvoice = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    invoiceNo: "",
    date: "",
    name: "",
    age: "",
    sex: "",
    diagnosis: "",
    treatmentFrom: "",
    treatmentTo: "",
    totalDays: "",
    visitCharge: "",
    totalCharge: "",
    otherCharges: "",
    totalAmount: "",
    inWords: ""
  });

  useEffect(() => {
    if (location.state && location.state.invoice) {
      const inv = location.state.invoice;

      const formatDate = (d) => {
        if (!d) return "";
        const dateObj = new Date(d);
        const year = dateObj.getFullYear();
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const day = String(dateObj.getDate()).padStart(2, "0");
        return `${year}-${month}-${day}`;
      };

      setFormData({
        invoiceNo: inv.invoiceNo || "",
        date: inv.invoicedate ? formatDate(inv.invoicedate) : "",
        name: inv.name || "",
        age: inv.age || "",
        sex: inv.sex || "",
        diagnosis: inv.diagnosis || "",
        treatmentFrom:inv.treatmentFrom ? formatDate( inv.treatmentFrom) : "",
        treatmentTo: inv.treatmentTo ? formatDate( inv.treatmentTo) : "",
        totalDays: inv.totalDays || "",
        // treatmentFrom: inv.treatmentFrom || "",
        // treatmentTo: inv.treatmentTo || "",
        totalDays: inv.totalDays || "",
        visitCharge: inv.visitCharge || "",
        totalCharge: inv.totalCharge || "",
        otherCharges: inv.otherCharges || "",
        totalAmount: inv.totalAmount || "",
        inWords: inv.inWords || ""
      });
    }
  }, [location.state]);

  const numberToWords = (num) => {
    const a = ["", "One", "Two", "Three", "Four", "Five", "Six",
      "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
      "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"];
    const b = ["", "", "Twenty", "Thirty", "Forty", "Fifty", "Sixty", "Seventy", "Eighty", "Ninety"];
    if (num === 0) return "Zero";
    const convert = (n) => {
      if (n < 20) return a[n];
      if (n < 100) return b[Math.floor(n / 10)] + (n % 10 ? " " + a[n % 10] : "");
      if (n < 1000) return a[Math.floor(n / 100)] + " Hundred" + (n % 100 ? " " + convert(n % 100) : "");
      if (n < 100000) return convert(Math.floor(n / 1000)) + " Thousand" + (n % 1000 ? " " + convert(n % 1000) : "");
      if (n < 10000000) return convert(Math.floor(n / 100000)) + " Lakh" + (n % 100000 ? " " + convert(n % 100000) : "");
      return "";
    };
    return convert(num);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let updatedData = { ...formData, [name]: value };

    if (["visitCharge", "totalCharge", "otherCharges"].includes(name)) {
      const visit = parseFloat(updatedData.visitCharge) || 0;
      const total = parseFloat(updatedData.totalCharge) || 0;
      const other = parseFloat(updatedData.otherCharges) || 0;
      const sum = visit + total + other;
      updatedData.totalAmount = sum.toFixed(2);
      updatedData.inWords = numberToWords(Math.floor(sum)) + " Only";
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:3001/invoice/${formData.invoiceNo}`, formData);
      alert("Invoice updated successfully!");
      navigate("/invoices");
    } catch (err) {
      console.error(err);
      alert("Error updating invoice");
    }
  };

  return (
    <form className="invoice-container" onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className="header">
        <img src={logo} alt="Clinic Logo" className="logo" />
        <div className="header-text">
          <h2 className="totaltitle">TOTAL REHAB</h2>
          <p className="subtitle" style={{marginLeft:30}}>PHYSIOTHERAPY CLINIC</p><br>
          </br>
          <p className="address" style={{marginLeft:30}}>02, Urvi apartment, Lad society road, Vastrapur, Ahmedabad, 380015</p>
          <p className="contact" style={{marginLeft:30}}>Mobile: 9558337856 | Email: contact@totalrehabcare.in</p>
        </div>
      </div>

      {/* FORM */}
      <div className="row">
        <label>Invoice No:</label>
        <input name="invoiceNo" value={formData.invoiceNo} readOnly />
        <label>Date:</label>
        <input type="date" name="date" value={formData.date} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Name:</label>
        <input name="name" className="span-3" value={formData.name} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Age:</label>
        <input name="age" type="number" value={formData.age} onChange={handleChange} />
        <label>Sex:</label>
        <input name="sex" value={formData.sex} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Diagnosis:</label>
        <input name="diagnosis" className="span-3" value={formData.diagnosis} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Treatment:</label>
        <input name="treatmentFrom" value={formData.treatmentFrom} onChange={handleChange} />
        <label>To:</label>
        <input name="treatmentTo" value={formData.treatmentTo} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Total Days:</label>
        <input name="totalDays" className="span-3" type="number" value={formData.totalDays} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Visit Charge:</label>
        <input name="visitCharge" className="span-3" type="number" value={formData.visitCharge} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Total Charge:</label>
        <input name="totalCharge" className="span-3" type="number" value={formData.totalCharge} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Other Charges:</label>
        <input name="otherCharges" className="span-3" type="number" value={formData.otherCharges} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Total Amount:</label>
        <input name="totalAmount" className="span-3" value={formData.totalAmount} readOnly />
      </div>

      <div className="row">
        <label>In Words:</label>
        <input name="inWords" className="span-3" value={formData.inWords} readOnly />
      </div>

      {/* <div className="submit-row">
        <button type="submit">Update Invoice</button>
      </div> */}
    <br></br><br></br>
      <div className="footer"  style={{ textAlign: 'right' }}>TOTAL REHAB PHYSIOTHERAPY CLINIC</div>
    </form>
  );
};

export default EditInvoice;
