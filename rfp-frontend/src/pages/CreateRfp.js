import { useState } from "react";
import axios from "axios";

export default function CreateRfp() {
  const [text, setText] = useState("");
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter requirements text");
      return;
    }

    setLoading(true);
    try {
      await axios.post(
        "http://localhost:5172/api/rfp/create-from-text",
        { text }
      );
      setSuccess(true);
      setText("");

      // Auto-hide after 3 seconds
      setTimeout(() => {
        setSuccess(false);
      }, 3000);

    } catch (error) {
      console.error(error);
      alert("Failed to create RFP");
    }
    setLoading(false);
  };

  return (
    <div style={{ padding: "40px", maxWidth: "900px", margin: "auto" }}>
      <h2 style={{ marginBottom: "20px" }}>
        Create RFP from Natural Language
      </h2>

      <textarea
        placeholder="Type your requirements here..."
        value={text}
        onChange={(e) => setText(e.target.value)}
        style={{
          width: "100%",
          height: "180px",
          padding: "14px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "15px",
          resize: "vertical",
          outline: "none"
        }}
      />

      <button
        onClick={handleSubmit}
        disabled={loading}
        style={{
          marginTop: "15px",
          padding: "12px 20px",
          borderRadius: "6px",
          background: "#007bff",
          border: "none",
          cursor: "pointer",
          color: "white",
          fontSize: "16px",
          fontWeight: "600"
        }}
      >
        {loading ? "Processing..." : "Generate RFP"}
      </button>

      {success && (
        <div
          style={{
            position: "fixed",
            top: "20px",
            right: "20px",
            background: "#28a745",
            padding: "14px 20px",
            borderRadius: "6px",
            color: "white",
            fontWeight: "600",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.15)",
            animation: "fadeInOut 3s"
          }}
        >
          RFP Generated Successfully!
        </div>
      )}
    </div>
  );
}
