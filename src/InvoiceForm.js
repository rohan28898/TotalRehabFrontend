import { useState } from "react";
import axios from "axios";
import "./InvoiceForm.css";
import logo from "./logo.jpg";
import { BASE_URL } from "./api.js";
//console.log('base=='+BASE_URL);
const InvoiceForm = () => {
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
    totalSessions: "",
    visitCharge: "",
    totalCharge: "",
    otherCharges: "",
    totalAmount: "",
    inWords: ""
  });

  const handleClear = () => {
    setFormData({
      invoiceNo: "",
      date: "",
      name: "",
      age: "",
      sex: "",
      diagnosis: "",
      treatmentFrom: "",
      treatmentTo: "",
      totalDays: "",
      totalSessions: "",
      visitCharge: "",
      totalCharge: "",
      otherCharges: "",
      totalAmount: "",
      inWords: ""
    });
  };

  // Number to words converter
  const numberToWords = (num) => {
    const a = [
      "", "One", "Two", "Three", "Four", "Five", "Six",
      "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve",
      "Thirteen", "Fourteen", "Fifteen", "Sixteen",
      "Seventeen", "Eighteen", "Nineteen"
    ];
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

    // Recalculate totalAmount if any charges change
    if (["visitCharge", "totalCharge", "otherCharges"].includes(name)) {
      const days = parseFloat(updatedData.totalDays) || 0;
      const visit = parseFloat(updatedData.visitCharge) || 0;
      const total = parseFloat(updatedData.totalCharge) || 0;
      const other = parseFloat(updatedData.otherCharges) || 0;
      updatedData.totalCharge = (visit*days );
      
      const sum =  updatedData.totalCharge + other;
      
      updatedData.totalAmount = sum.toFixed(2);
      updatedData.inWords = numberToWords(Math.floor(sum)) + " Only";
    }

    setFormData(updatedData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(BASE_URL+"/invoice", formData);
      alert("Invoice saved successfully!");
      console.log(res.data);
    } catch (error) {
      console.error(error);
      alert("Error saving invoice");
    }
  };

  return (
    <form className="invoice-container" onSubmit={handleSubmit}>
      {/* HEADER */}
      <div className="header">
        <img src={logo} alt="Clinic Logo" className="logo" />
        <div className="header-text">
          <h2>TOTAL REHAB</h2>
          <p className="subtitle">PHYSIOTHERAPY CLINIC</p>
          <p className="address">02, Urvi apartment, Lad society road, Vastrapur, Ahmedabad, 380015</p>
          <p className="contact">Mobile: 9558337856 | Email: contact@totalrehabcare.in</p>
        </div>
      </div>

      {/* FORM */}
      <div className="row">
        <label>Invoice No:</label>
        <input name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
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
        <input type="date" name="treatmentFrom" value={formData.treatmentFrom} onChange={handleChange} />
        <label>To:</label>
        <input type="date" name="treatmentTo" value={formData.treatmentTo} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Total Days:</label>
        <input name="totalDays" className="span-3" type="number" value={formData.totalDays} onChange={handleChange} />
      </div>

      {/* <div className="row">
        <label>Total Sessions:</label>
        <input name="totalSessions" className="span-3" type="number" value={formData.totalSessions} onChange={handleChange} />
      </div> */}

      <div className="row">
        <label>Visit Charge:</label>
        <input name="visitCharge" className="span-3" type="number" value={formData.visitCharge} onChange={handleChange} />
      </div>

      <div className="row">
        <label>Total Charge:</label>
        <input name="totalCharge" className="span-3" type="number" value={formData.totalCharge} onChange={handleChange} disabled/>
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

      {/* SUBMIT & CLEAR */}
      <div className="submit-row">
        <button type="submit">Submit Invoice</button>
        <button type="button" onClick={handleClear} style={{ marginLeft: "10px" }}>Clear</button>
      </div>

      {/* FOOTER */}
      <div className="footer">TOTAL REHAB PHYSIOTHERAPY CLINIC</div>
    </form>
  );
};

export default InvoiceForm;
