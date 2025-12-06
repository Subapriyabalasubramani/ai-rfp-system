import { useEffect, useState, useCallback } from "react";
import axios from "axios";

export default function RfpDetails({ rfp, onBack }) {
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [proposalText, setProposalText] = useState("");
  const [proposals, setProposals] = useState([]);
  const [selectedVendorsToEmail, setSelectedVendorsToEmail] = useState([]);
  const [loadingSend, setLoadingSend] = useState(false);
  const [loadingAI, setLoadingAI] = useState(false);

  const fetchProposals = useCallback(() => {
    axios
      .get(`http://localhost:5172/api/proposal/by-rfp/${rfp.id}`)
      .then((res) => setProposals(res.data));
  }, [rfp.id]);

  useEffect(() => {
    axios
      .get("http://localhost:5172/api/vendor")
      .then((res) => setVendors(res.data));
    fetchProposals();
  }, [rfp, fetchProposals]);

  const sendRfpEmails = async () => {
    if (selectedVendorsToEmail.length === 0)
      return alert("Select vendors!");

    try {
      setLoadingSend(true);
      await axios.post(
        `http://localhost:5172/api/rfp/send/${rfp.id}`,
        selectedVendorsToEmail
      );
      alert("📧 RFP Emails sent to vendors!");
    } catch (err) {
      alert("Error sending emails!");
      console.error(err);
    } finally {
      setLoadingSend(false);
    }
  };

  const addProposal = async () => {
    if (!proposalText.trim())
      return alert("Paste vendor proposal text");

    try {
      setLoadingAI(true);
      await axios.post(
        `http://localhost:5172/api/proposal/add?rfpId=${rfp.id}&vendorId=${selectedVendor}`,
        proposalText,
        { headers: { "Content-Type": "application/json" } }
      );

      setProposalText("");
      fetchProposals();
    } catch (err) {
      console.error(err);
      alert("AI failed — ensure proposal text is correct");
    } finally {
      setLoadingAI(false);
    }
  };

  const recommended =
    proposals.length > 0 &&
    proposals.reduce((best, p) =>
      p.finalScore > best.finalScore ? p : best
    );

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto",
      }}
    >
      <button
        onClick={onBack}
        style={{
          padding: "8px 12px",
          borderRadius: 6,
          border: "1px solid #ccc",
          cursor: "pointer",
          background: "white",
        }}
      >
        ⬅ Back
      </button>

      <h2 style={{ marginTop: 20 }}>
        {rfp.title}Vendor Proposals
      </h2>

      <div
        style={{
          marginTop: 30,
          padding: 20,
          borderRadius: 8,
          background: "#f8f9fa",
          border: "1px solid #e0e0e0",
        }}
      >
        <h3>Send RFP to Vendors</h3>

        <p style={{ fontSize: 14, color: "#666" }}>
          Select vendors to send the official RFP email.
        </p>

        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <select
            multiple
            style={{
              width: "250px",
              height: "120px",
              padding: 8,
              borderRadius: 6,
              border: "1px solid #ccc",
            }}
            onChange={(e) =>
              setSelectedVendorsToEmail(
                Array.from(e.target.selectedOptions, (opt) => opt.value)
              )
            }
          >
            {vendors.map((v) => (
              <option key={v.id} value={v.id}>
                {v.name}
              </option>
            ))}
          </select>

          <button
            disabled={loadingSend}
            onClick={sendRfpEmails}
            style={{
              padding: "10px 18px",
              borderRadius: 6,
              border: "none",
              cursor: "pointer",
              background: "#007bff",
              color: "white",
              fontWeight: "600",
            }}
          >
            {loadingSend ? "Sending..." : "Send RFP Email"}
          </button>
        </div>
      </div>

      {/* ADD PROPOSAL SECTION */}
      <div
        style={{
          marginTop: 35,
          padding: 20,
          borderRadius: 8,
          background: "#ffffff",
          border: "1px solid #e0e0e0",
        }}
      >
        <h3>Add Vendor Proposal</h3>

        <select
          style={{
            padding: 8,
            width: "250px",
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
          onChange={(e) => setSelectedVendor(e.target.value)}
        >
          <option>Select Vendor</option>
          {vendors.map((v) => (
            <option key={v.id} value={v.id}>
              {v.name}
            </option>
          ))}
        </select>

        <textarea
          value={proposalText}
          onChange={(e) => setProposalText(e.target.value)}
          placeholder="Paste vendor proposal response here..."
          style={{
            width: "100%",
            height: 120,
            marginTop: 15,
            padding: 12,
            borderRadius: 6,
            border: "1px solid #ccc",
          }}
        />

        <button
          onClick={addProposal}
          disabled={loadingAI}
          style={{
            marginTop: 10,
            padding: "10px 18px",
            borderRadius: 6,
            background: "#28a745",
            border: "none",
            color: "white",
            cursor: "pointer",
            fontWeight: "600",
          }}
        >
          {loadingAI ? "Analyzing..." : "Add Proposal"}
        </button>
      </div>

      {/* PROPOSAL TABLE */}
      <h3 style={{ marginTop: 40 }}>Comparison Table</h3>

      {recommended && (
        <div
          style={{
            padding: 12,
            marginBottom: 12,
            borderRadius: 6,
            background: "#e6f7ff",
            border: "1px solid #91d5ff",
          }}
        >
          Recommended Vendor:{" "}
          <strong>
            {vendors.find((v) => v.id === recommended.vendorId)?.name}
          </strong>
        </div>
      )}

      <div style={{ overflowX: "auto" }}>
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            textAlign: "center",
            background: "#fff",
          }}
        >
          <thead>
            <tr>
              {[
                "Vendor",
                "Price",
                "Delivery",
                "Warranty",
                "Spec Score",
                "Risk",
                "Final Score",
              ].map((h) => (
                <th
                  key={h}
                  style={{
                    padding: 12,
                    borderBottom: "2px solid #ddd",
                    background: "#fafafa",
                  }}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {proposals.map((p) => {
              const v = vendors.find((x) => x.id === p.vendorId);
              const isBest = recommended?.id === p.id;

              return (
                <tr
                  key={p.id}
                  style={{
                    background: isBest ? "#d4edda" : "",
                    fontWeight: isBest ? "bold" : "normal",
                  }}
                >
                  <td style={{ padding: 10 }}>{v?.name}</td>
                  <td style={{ padding: 10 }}>{p.price}</td>
                  <td style={{ padding: 10 }}>{p.deliveryDays}</td>
                  <td style={{ padding: 10 }}>{p.warranty}</td>
                  <td style={{ padding: 10 }}>{p.specMatchScore}</td>
                  <td style={{ padding: 10 }}>{p.riskFactor}</td>
                  <td style={{ padding: 10 }}>{p.finalScore}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
