import React, { useState } from "react";
import { register, uploadAvatar } from '../api/api'; // <-- 多了 uploadAvatar
import './SignUp.css';

function SignUp() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [avatarFile, setAvatarFile] = useState(null); // <-- 新增圖片狀態
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      setMessage("Please fill out all blank！");
      return;
    }

    let avatarUrl = "/uploads/default.jpg"; // 預設頭貼（若沒上傳）

    // ✅ 若使用者有上傳頭貼，先傳給 Cloudinary
    if (avatarFile) {
      try {
        const formData = new FormData();
        formData.append("avatar", avatarFile);
        const res = await uploadAvatar(formData);
        avatarUrl = res.data.url; // Cloudinary 回傳圖片網址
      } catch (err) {
        console.error("頭貼上傳失敗", err);
        setMessage("頭貼上傳失敗");
        return;
      }
    }

    const newUser = {
      username,
      password,
      avatar: avatarUrl,
    };

    try {
      await register(newUser);
      setMessage("Register Successfully. Please login!");
      setUsername("");
      setPassword("");
      setAvatarFile(null);
    } catch (err) {
      setMessage("Register Failed. The username is existed!");
      console.error(err);
    }
  };

  return (
    <div className="register-container">
      <div className="register-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
            />
          </div>

          <div>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
            />
          </div>

          {/* 新增圖片上傳欄位 */}
          <div>
            <input
              type="file"
              accept="image/png, image/jpeg"
              onChange={(e) => setAvatarFile(e.target.files[0])}
            />
          </div>

          <button type="submit">Register</button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default SignUp;
