import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import axios from "axios";

export const Route =
  createFileRoute("/feedback")({
    component: Feedback,
  });

function Feedback() {

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const submitFeedback =
    async () => {

      const userName =
        localStorage.getItem(
          "fullName"
        );

      await axios.post(
        "http://localhost:8081/api/feedback",
        {
          userName,
          rating,
          comment,
        }
      );

      
        alert(
  "🎉 Thank you for your feedback!"
);
    

      setComment("");
      setRating(5);
    };

  return (
  <div
    style={{
      minHeight: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#f5f7fb",
      padding: "20px",
    }}
  >
    <div
      style={{
        width: "100%",
        maxWidth: "500px",
        background: "white",
        padding: "30px",
        borderRadius: "15px",
        boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        ⭐ Rate Your Experience
      </h1>

      <label
        style={{
          fontWeight: "bold",
        }}
      >
        Rating
      </label>

      <select
        value={rating}
        onChange={(e) =>
          setRating(Number(e.target.value))
        }
        style={{
          width: "100%",
          padding: "10px",
          marginTop: "8px",
          marginBottom: "20px",
          borderRadius: "8px",
          border: "1px solid #ccc",
        }}
      >
        <option value={5}>⭐⭐⭐⭐⭐ Excellent</option>
        <option value={4}>⭐⭐⭐⭐ Very Good</option>
        <option value={3}>⭐⭐⭐ Good</option>
        <option value={2}>⭐⭐ Fair</option>
        <option value={1}>⭐ Poor</option>
      </select>

      <label
        style={{
          fontWeight: "bold",
        }}
      >
        Feedback
      </label>

      <textarea
        rows={5}
        placeholder="Share your experience..."
        value={comment}
        onChange={(e) =>
          setComment(e.target.value)
        }
        style={{
          width: "100%",
          marginTop: "8px",
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "none",
        }}
      />

      <button
        onClick={submitFeedback}
        style={{
          width: "100%",
          marginTop: "20px",
          padding: "12px",
          background: "#2563eb",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontSize: "16px",
          fontWeight: "bold",
        }}
      >
        Submit Feedback
      </button>
    </div>
  </div>
)
}