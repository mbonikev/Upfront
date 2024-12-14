import React, { useState } from "react";
import Groq from "groq-sdk";
import axios from "axios";

function Testai() {
  const [projectDescription, setProjectDescription] = useState("");
  const [boards, setBoards] = useState([]);
  const [loading, setLoading] = useState(false);

  const generateBoards = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:5000/api/generateBoards",
        {
          projectDescription,
        }
      );
      setBoards([]);
      const boardTitles =
      response.data.boards
          .match(/\d+\.\s([^\n]+)/g) // Match the number, period, and the title text
          ?.map((title) => title.replace(/^\d+\.\s/, "").trim()) || [];

      setBoards(boardTitles);
    } catch (error) {
      console.error("Error generating boards:", error);
      alert("Failed to generate boards. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Generate Boards</h1>
      <textarea
        value={projectDescription}
        onChange={(e) => setProjectDescription(e.target.value)}
        rows="5"
        cols="50"
        placeholder="Describe your project..."
        style={{ display: "block", margin: "10px 0", padding: "10px" }}
      />
      <button
        onClick={generateBoards}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007BFF",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
      >
        {loading ? "Generating..." : "Generate Boards"}
      </button>

      <div style={{ marginTop: "20px" }}>
        <h3>Generated Boards:</h3>
        {boards.length > 0 ? (
          <ul>
            {boards.map((board, index) => (
              <li key={index}>{board}</li>
            ))}
          </ul>
        ) : (
          <p>No boards generated yet.</p>
        )}
      </div>
    </div>
  );
}

export default Testai;
