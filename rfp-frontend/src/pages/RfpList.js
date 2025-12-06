import { useEffect, useState } from "react";
import axios from "axios";
import RfpDetails from "./RfpDetails";

export default function RfpList() {
  const [rfps, setRfps] = useState([]);
  const [selectedRfp, setSelectedRfp] = useState(null);

  useEffect(() => {
    axios.get("http://localhost:5172/api/rfp").then((res) => setRfps(res.data));
  }, []);

  if (selectedRfp) {
    return <RfpDetails rfp={selectedRfp} onBack={() => setSelectedRfp(null)} />;
  }

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "700px",
        margin: "auto",
      }}
    >
      <h2 style={{ marginBottom: "20px" }}>Request For Proposals</h2>

      <ul style={{ listStyle: "none", padding: 0 }}>
        {rfps.map((r) => (
          <li
            key={r.id}
            onClick={() => setSelectedRfp(r)}
            style={{
              padding: "12px 16px",
              marginBottom: "12px",
              background: "#f8f9fa",
              borderRadius: "8px",
              border: "1px solid #e0e0e0",
              cursor: "pointer",
              transition: "0.2s ease-in-out",
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#e9ecef")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#f8f9fa")}
          >
            <strong>{r.title || "Untitled RFP"}</strong>
            <span style={{ float: "right", color: "#555" }}>
              Status: {r.status}
            </span>
          </li>
        ))}
      </ul>

      {rfps.length === 0 && (
        <p style={{ color: "#888", textAlign: "center" }}>No RFPs available.</p>
      )}
    </div>
  );
}
