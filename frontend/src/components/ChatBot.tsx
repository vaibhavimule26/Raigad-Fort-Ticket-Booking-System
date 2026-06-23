import { useState } from "react";
import axios from "axios";
const suggestions = [
  "What is Raigad Fort?",
  "Ticket Price of Raigad",
  "Visiting Timings",
  "Route from Pune",
  "History of Raigad Fort",
];

export default function ChatBot() {
  const [open, setOpen] = useState(false);

  const [message, setMessage] =
    useState("");

  const [response, setResponse] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const askBot = async () => {

    if (!message.trim()) return;

    try {

      setLoading(true);

      const res = await axios.get(
        "http://localhost:8081/api/chat/ask",
        {
          params: {
            message,
          },
        }
      );

      console.log(
        "BOT RESPONSE =",
        res.data
      );

      setResponse(res.data);

    } catch (error: any) {

      console.error(error);

      setResponse(
        JSON.stringify(
          error?.response?.data ||
          error.message
        )
      );

    } finally {

      setLoading(false);

    }
  };

  return (
    <>
      <button
  onClick={() => {

    if (open) {

      setMessage("");

      setResponse("");

      setLoading(false);

    }

    setOpen(!open);

  }}
  style={{
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "60px",
    height: "60px",
    borderRadius: "50%",
    border: "none",
    background: "#d22e2e",
    color: "white",
    fontSize: "24px",
    cursor: "pointer",
    zIndex: 999999,
  }}
>
  💬
</button>

      {open && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            width: "350px",
            height: "500px",
            background: "white",
            border: "1px solid #ddd",
            borderRadius: "12px",
            padding: "15px",
            boxShadow:
              "0 0 15px rgba(0,0,0,0.2)",
            zIndex: 999999,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <div
  style={{
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "10px",
  }}
>
  <h3
    style={{
      margin: 0,
    }}
  >
    🏰 Raigad AI Assistant
  </h3>

  <button
    onClick={() => {
      setMessage("");
      setResponse("");
      setLoading(false);
      setOpen(false);
    }}
    style={{
      border: "none",
      background: "transparent",
      fontSize: "20px",
      cursor: "pointer",
      color: "red",
      fontWeight: "bold",
    }}
  >
    ✖
  </button>
</div>

          <div
  style={{
    flex: 1,
    overflowY: "auto",
    border: "1px solid #eee",
    padding: "15px",
    borderRadius: "8px",
    marginBottom: "10px",
    background: "#fafafa",
  }}
>
  {loading ? (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
      }}
    >
      <div
        style={{
          width: "35px",
          height: "35px",
          border: "4px solid #ddd",
          borderTop: "4px solid #2563eb",
          borderRadius: "50%",
          animation: "spin 1s linear infinite",
        }}
      />

      <p
        style={{
          marginTop: "15px",
          fontWeight: "bold",
        }}
      >
        🤖 Raigad AI is thinking...
      </p>

      <p
        style={{
          fontSize: "13px",
          color: "#666",
        }}
      >
        Please wait a moment
      </p>
    </div>
  ) : (
    <div
      style={{
        whiteSpace: "pre-wrap",
        lineHeight: "1.6",
        fontSize: "14px",
      }}
    >
      {response || "👋 Ask me anything about Raigad Fort."}
    </div>
  )}
</div>

          <input
            type="text"
            placeholder="Ask about Raigad..."
            value={message}
            onChange={(e) =>
              setMessage(e.target.value)
            }
            style={{
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              marginBottom: "10px",
            }}
          />

          <div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "6px",
    marginBottom: "10px",
  }}
>
  {suggestions.map((item) => (
    <button
      key={item}
      onClick={() =>
        setMessage(item)
      }
      style={{
        padding: "5px 10px",
        borderRadius: "15px",
        border: "1px solid #ddd",
        background: "#f5f5f5",
        cursor: "pointer",
        fontSize: "12px",
      }}
    >
      {item}
    </button>
  ))}
</div>

          <button
            onClick={askBot}
            style={{
              padding: "10px",
              border: "none",
              background: "#2563eb",
              color: "white",
              borderRadius: "8px",
              cursor: "pointer",
            }}
          >
            Send
          </button>
        </div>
      )}
    </>
  );
}