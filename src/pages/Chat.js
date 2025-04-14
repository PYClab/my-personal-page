import React, { useState, useEffect } from "react";
import { getMessages, postMessage, deleteMessage } from "../api/api";



export default function Chat({ token }) {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState("");

  const getUserId = () => {
    if (!token) return null;
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.id;
    } catch {
      return null;
    }
  };
  const userId = getUserId();

  const loadMessages = async () => {
    try {
      const res = await getMessages();
      setMessages(res.data);
    } catch (err) {
      console.error("留言載入失敗", err);
    }
  };

  // 🚀 發送留言
  const handleSubmit = async () => {
    if (!token || content.trim() === "") return;
    try {
      await postMessage({ content }, token);
      setContent("");
      loadMessages();
    } catch {
      alert("留言失敗，請確認登入狀態");
    }
  };

  // 🧹 刪除留言
  const handleDelete = async (id) => {
    try {
      await deleteMessage(id, token);
      loadMessages();
    } catch {
      alert("刪除失敗");
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  return (
    <div style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h2>留言板</h2>

      {/* 輸入區 */}
      {token ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "20px" }}>
          <textarea
            placeholder="輸入留言內容"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            style={{ padding: "8px", fontSize: "16px", resize: "none", height: "80px" }}
          />
          <button onClick={handleSubmit} style={{
            backgroundColor: "#007bff",
            color: "white",
            padding: "10px",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
            borderRadius: "5px",
            width: "120px"
          }}>
            發送留言
          </button>
        </div>
      ) : (
        <p style={{ color: "gray" }}>請先登入才能留言</p>
      )}

      {/* 顯示留言 */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {messages.map((msg) => (
          <div
            key={msg._id}
            style={{
              backgroundColor: "#007bff",
              color: "white",
              padding: "10px",
              borderRadius: "5px",
              textAlign: "left",
              position: "relative"
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
              <img
                src={msg.author?.avatar || "/default.png"}
                alt="avatar"
                width="30"
                style={{ borderRadius: "50%" }}
              />
              <strong>{msg.author?.username || "匿名"}</strong>
            </div>
            <p style={{ margin: "5px 0 0 0" }}>{msg.content}</p>
            {token && msg.author?._id === userId && (
              <button
                onClick={() => handleDelete(msg._id)}
                style={{
                  position: "absolute",
                  right: "10px",
                  top: "10px",
                  backgroundColor: "red",
                  border: "none",
                  color: "white",
                  borderRadius: "5px",
                  cursor: "pointer",
                  padding: "5px 10px"
                }}
              >
                刪除
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
