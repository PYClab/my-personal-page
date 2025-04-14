import React, { useEffect, useState } from "react";
import { getUsers } from "../api/api";

export default function User() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const res = await getUsers();
        setUsers(res.data);
      } catch (err) {
        console.error("取得使用者失敗", err);
      }
    };

    loadUsers();
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h2>所有使用者</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {users.map((user) => (
          <div
            key={user._id}
            style={{
              width: "150px",
              padding: "10px",
              border: "1px solid #ccc",
              borderRadius: "8px",
              textAlign: "center",
            }}
          >
            <img
              src={user.avatar || "/default.png"}
              alt="avatar"
              width="80"
              height="80"
              style={{ borderRadius: "50%", objectFit: "cover" }}
            />
            <p>{user.username}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
