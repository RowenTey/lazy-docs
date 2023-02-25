import axios from "axios";
import React, { useState } from "react";
const PDFUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    setFile(e.target.files[0]);
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
    <div className="flex flex-col  gap-3 text-white m-3">
      <form onSubmit={handleFormSubmit}>
        <h1 className="font-extrabold text-3xl m-3">
          Step 1: Upload your PDF File
        </h1>
        <div className="m-4">
          <input
            className="rounded-lg cursor-pointer"
            type="file"
            onChange={handleFileInputChange}
          />
          <button className="bg-white text-black p-2 rounded" type="submit">
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default PDFUploader;
