import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./InvoiceTable.css";

const InvoiceTable = () => {
  const navigate = useNavigate();

  const [invoices, setInvoices] = useState([]);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [searchName, setSearchName] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage] = useState(10);

  const [sortField, setSortField] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const fetchInvoices = async () => {
    try {
      let url = "http://localhost:3001/invoices";
      let queryParams = [];

      if (startDate && endDate) {
        queryParams.push(`startDate=${startDate}`);
        queryParams.push(`endDate=${endDate}`);
      }
      if (searchName) {
        queryParams.push(`name=${encodeURIComponent(searchName)}`);
      }
      if (statusFilter) {
        queryParams.push(`paymentStatus=${statusFilter}`);
      }
      if (sortField) {
        queryParams.push(`sortField=${sortField}`);
        queryParams.push(`sortOrder=${sortOrder}`);
      }

      if (queryParams.length > 0) {
        url += "?" + queryParams.join("&");
      }

      const res = await axios.get(url);

      const updatedData = res.data.map(inv => ({
        ...inv,
        paymentMode: inv.paymentMode || "",
        paymentStatus: inv.paymentStatus || "Unpaid"
      }));

      setInvoices(updatedData);
      setCurrentPage(1);
    } catch (err) {
      console.error(err);
      alert("Error fetching invoices");
    }
  };

  useEffect(() => {
    fetchInvoices();
  }, [sortField, sortOrder]);

  const lastIndex = currentPage * rowsPerPage;
  const firstIndex = lastIndex - rowsPerPage;
  const currentInvoices = invoices.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(invoices.length / rowsPerPage);

  const changePage = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const handleSort = (field) => {
    const order =
      sortField === field && sortOrder === "asc" ? "desc" : "asc";
    setSortField(field);
    setSortOrder(order);
  };

  const handleEdit = (invoice) => {
    navigate(`/edit-invoice/${invoice.id}`, { state: { invoice } });
  };

  const handlePaymentModeChange = (id, value) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, paymentMode: value } : inv
      )
    );
  };

  const handlePaymentStatusChange = (id, value) => {
    setInvoices(prev =>
      prev.map(inv =>
        inv.id === id ? { ...inv, paymentStatus: value } : inv
      )
    );
  };

  const handleSave = async (invoice) => {
    try {
      await axios.put(`http://localhost:3001/invoice/${invoice.id}`, {
        paymentMode: invoice.paymentMode,
        paymentStatus: invoice.paymentStatus
      });
      alert("Payment details saved successfully");
    } catch (err) {
      console.error(err);
      alert("Failed to save payment details");
    }
  };

  return (
    <div className="invoice-table-container">
      <h2>Invoice Records</h2>

      {/* Filters */}
      <div className="filter-container">
        <div className="date-filter">
          <label>From:</label>
          <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          <label>To:</label>
          <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
        </div>

        <div className="name-filter">
          <label>Search Name:</label>
          <input
            type="text"
            value={searchName}
            onChange={(e) => setSearchName(e.target.value)}
            placeholder="Enter name..."
          />
        </div>

        <div className="status-filter">
          <label>Status:</label>
          <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="">All</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
        </div>

        <button onClick={fetchInvoices}>Filter</button>
      </div>

      {/* Table */}
      <table className="invoice-table">
        <thead>
          <tr>
            <th onClick={() => handleSort("invoiceNo")}>Invoice No</th>
            <th onClick={() => handleSort("invoicedate")}>Date</th>
            <th onClick={() => handleSort("name")}>Name</th>
            <th>Age</th>
            <th>Sex</th>
            <th>Diagnosis</th>
            <th onClick={() => handleSort("totalAmount")}>Total Amount</th>
            <th>In Words</th>
            <th>Payment Mode</th>
            <th style={{ minWidth: "160px", whiteSpace: "nowrap" }}>Status</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {currentInvoices.length > 0 ? (
            currentInvoices.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.invoiceNo}</td>
                <td>{inv.invoicedate?.substring(0, 10)}</td>
                <td>{inv.name}</td>
                <td>{inv.age}</td>
                <td>{inv.sex}</td>
                <td>{inv.diagnosis}</td>
                <td>{inv.totalAmount}</td>
                <td>{inv.inWords}</td>

                <td>
                  <select
                    value={inv.paymentMode}
                    onChange={(e) =>
                      handlePaymentModeChange(inv.id, e.target.value)
                    }
                  >
                    <option value="">Select</option>
                    <option value="Cash">Cash</option>
                    <option value="UPI">UPI</option>
                    <option value="Card">Card</option>
                  </select>
                </td>

                <td style={{ minWidth: "160px", whiteSpace: "nowrap" }}>
                  <label style={{ marginRight: "8px" }}>
                    <input
                      type="radio"
                      name={`status-${inv.id}`}
                      value="Paid"
                      checked={inv.paymentStatus === "Paid"}
                      onChange={(e) =>
                        handlePaymentStatusChange(inv.id, e.target.value)
                      }
                    /> Paid
                  </label>

                  <label>
                    <input
                      type="radio"
                      name={`status-${inv.id}`}
                      value="Unpaid"
                      checked={inv.paymentStatus === "Unpaid"}
                      onChange={(e) =>
                        handlePaymentStatusChange(inv.id, e.target.value)
                      }
                    /> Unpaid
                  </label>
                </td>

                <td>
                  <button onClick={() => handleSave(inv)}>Save</button>
                  <button style={{ marginLeft: "6px" }} onClick={() => handleEdit(inv)}>
                    Print
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="11" style={{ textAlign: "center" }}>
                No records found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="pagination">
        <button onClick={() => changePage(currentPage - 1)}>Prev</button>
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i}
            className={currentPage === i + 1 ? "active-page" : ""}
            onClick={() => changePage(i + 1)}
          >
            {i + 1}
          </button>
        ))}
        <button onClick={() => changePage(currentPage + 1)}>Next</button>
      </div>

      {/* Total Records */}
      <div style={{ marginTop: "10px", textAlign: "right", fontWeight: "bold" }}>
        Total Records: {invoices.length}
      </div>
    </div>
  );
};

export default InvoiceTable;