import { useState } from "react";
import axios from "axios";

export default function CreateRfp() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim()) {
      alert("Please enter requirements text");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5172/api/rfp/create-from-text",
        { text }
      );
      setResult(response.data);
    } catch (error) {
      console.error(error);
      alert("Failed to create RFP");
    }
    setLoading(false);
  };

  return (
    <div
      style={{
        padding: "40px",
        maxWidth: "900px",
        margin: "auto"
      }}
    >
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

      {result && (
        <div
          style={{
            marginTop: "30px",
            background: "#f8f9fa",
            padding: "20px",
            borderRadius: "8px",
            border: "1px solid #e0e0e0"
          }}
        >
          <h3 style={{ marginBottom: 10 }}>Generated RFP Structure</h3>
          <pre
            style={{
              whiteSpace: "pre-wrap",
              wordWrap: "break-word",
              fontSize: "14px",
              background: "#fff",
              padding: "15px",
              borderRadius: "6px",
              border: "1px solid #ddd"
            }}
          >
            {JSON.stringify(result, null, 2)}
          </pre>
        </div>
      )}
    </div>
  );
}
