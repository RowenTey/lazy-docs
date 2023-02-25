import axios from "axios";
import React, { useState } from "react";
const PDFUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileInputChange = (e) => {
    console.log(e.target.files[0]);
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
            class="w-3/6 text-md text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
            id="file_input"
            type="file"
            onChange={handleFileInputChange}
          />
          <button
            type="submit"
            class="m-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Upload
          </button>
        </div>
      </form>
    </div>
  );
};

export default PDFUploader;
