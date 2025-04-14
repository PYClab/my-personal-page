import React from "react";
import photo from "../assets/photo.jpg";

export default function About() {
  return (
<div style={{ display: "flex", alignItems: "center", gap: "2rem", padding: "2rem" }}>
  <img
    src={photo}
    alt="我的照片"
    style={{
      width: "200px",
      height: "200px",
      borderRadius: "50%",
      objectFit: "cover",
      boxShadow: "0 0 10px rgba(0,0,0,0.2)"
    }}
  />
  <div>
    <h1 style={{ color: "gold" }}>Welcome!</h1>
    <p style={{ color: "#f0f0f0" }}>我是Brian，這是我的個人部落格!</p>
    <p style={{ color: "#f0f0f0" }}>歡迎註冊帳號並留下你的想法！</p>
  </div>
</div>
  );
}