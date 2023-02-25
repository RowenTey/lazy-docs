import "./PDFUploader.css";
import axios from "axios";
import React, { useState } from "react";
const PDFUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    console.log(e);
    // setFile(e.target.files[0]);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("file", file);

    try {
      await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("Upload successful!");
    } catch (error) {
      alert(`Error uploading file: ${error.message}`);
    }
  };

  return (
    <div className="pdf-box">
      <form onSubmit={handleFormSubmit}>
        <h1>Upload your PDF file</h1>
        <div className="upload-box">
          <input type="file" onChange={handleFileInputChange} />
          <button type="submit">Upload</button>
        </div>
      </form>
    </div>
  );
};

export default PDFUploader;
