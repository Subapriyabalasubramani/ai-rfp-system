import { useState } from "react";
import CreateRfp from "./pages/CreateRfp";
import Vendors from "./pages/Vendors";
import RfpList from "./pages/RfpList";

function App() {
  const [page, setPage] = useState("create");

  const navButtonStyle = (active) => ({
    padding: "10px 18px",
    marginRight: "10px",
    borderRadius: "6px",
    border: "none",
    cursor: "pointer",
    background: active ? "#007bff" : "#e0e0e0",
    color: active ? "white" : "#000",
    fontWeight: active ? "700" : "500",
    transition: "0.2s"
  });

  return (
    <div style={{ padding: 20 }}>
      <div style={{ marginBottom: "25px" }}>
        <button
          style={navButtonStyle(page === "create")}
          onClick={() => setPage("create")}
        >
          Create RFP
        </button>

        <button
          style={navButtonStyle(page === "rfp-list")}
          onClick={() => setPage("rfp-list")}
        >
          RFPs
        </button>

        <button
          style={navButtonStyle(page === "vendors")}
          onClick={() => setPage("vendors")}
        >
          Vendors
        </button>
      </div>

      {page === "create" && <CreateRfp />}
      {page === "rfp-list" && <RfpList />}
      {page === "vendors" && <Vendors />}
    </div>
  );
}

export default App;
