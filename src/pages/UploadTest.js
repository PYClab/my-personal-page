import React, { useState } from "react";
import { uploadAvatar } from "../api/api"; // 確保有這個 API function

export default function UploadTest() {
  const [file, setFile] = useState(null);
  const [imgUrl, setImgUrl] = useState("");
  const [status, setStatus] = useState("");

  const handleUpload = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("avatar", file);

    try {
      setStatus("上傳中...");
      const res = await uploadAvatar(formData);
      setImgUrl(res.data.url);
      setStatus("上傳成功！");
    } catch (err) {
      console.error(err);
      setStatus("上傳失敗");
    }
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h2>圖片上傳測試</h2>
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={handleUpload}>上傳</button>
      <p>{status}</p>
      {imgUrl && (
        <div>
          <p>Cloudinary 圖片網址：</p>
          <a href={imgUrl} target="_blank" rel="noreferrer">{imgUrl}</a>
          <br />
          <img src={imgUrl} alt="預覽" style={{ maxWidth: "200px", marginTop: "10px" }} />
        </div>
      )}
    </div>
  );
}
