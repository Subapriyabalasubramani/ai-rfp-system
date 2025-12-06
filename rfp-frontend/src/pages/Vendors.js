import { useState, useEffect } from "react";
import axios from "axios";

export default function Vendors() {
  const [vendors, setVendors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    contactEmail: "",
    phone: ""
  });

  const fetchVendors = async () => {
    const res = await axios.get("http://localhost:5172/api/vendor");
    setVendors(res.data);
  };

  const createVendor = async () => {
    if (!form.name.trim() || !form.contactEmail.trim()) {
      alert("Name and Email Required");
      return;
    }

    await axios.post("http://localhost:5172/api/vendor", form);
    setForm({ name: "", contactEmail: "", phone: "" });
    fetchVendors();
  };

  useEffect(() => {
    fetchVendors();
  }, []);

  return (
    <div style={{ padding: "40px", maxWidth: "500px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>Vendor Management</h2>

      <div style={{ 
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginBottom: "20px"
      }}>
        
        <input
          placeholder="Vendor Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <input
          placeholder="Email"
          value={form.contactEmail}
          onChange={(e) => setForm({ ...form, contactEmail: e.target.value })}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <input
          placeholder="Phone (optional)"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
          style={{ padding: "10px", borderRadius: "6px", border: "1px solid #ccc" }}
        />

        <button
          onClick={createVendor}
          style={{
            padding: "10px",
            borderRadius: "6px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            cursor: "pointer",
            fontWeight: "bold"
          }}
        >
           Add Vendor
        </button>
      </div>

      <h3>Vendor List</h3>
      <ul style={{ paddingLeft: "20px" }}>
        {vendors.map((v) => (
          <li key={v.id} style={{ marginBottom: "6px" }}>
            <strong>{v.name}</strong> — {v.contactEmail}
          </li>
        ))}
      </ul>
    </div>
  );
}
