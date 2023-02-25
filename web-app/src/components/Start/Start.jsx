import React, { useEffect, useState } from "react";
import LoadingPage from "../LoadingPage/LoadingPage";
import PDFUploader from "../PDFUploader/PDFUploader";
import WebpageUploader from "../WebpageUploader/WebpageUploader";

const Start = () => {
  // 0: pdf, 1: web
  const [format, setFormat] = useState(0);

  const selectHandler = (e) => {
    setFormat((pre) => e.target.value);
  };

  return (
    <div className="bg-slate-900 text-white text-center p-10 rounded min-w-500">
      <h1 className="font-extrabold text-4xl p-3">3Chill1Chiong</h1>
      <div>
        <label htmlFor="file-format">Choose a format: </label>
        <select
          className="m-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm p-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          name="file-format"
          id="file-format"
          onChange={selectHandler}
        >
          <option value="0">PDF File</option>
          <option value="1">Webpage Link</option>
          <option value="2">Loading</option>
        </select>
      </div>
      {format == 0 && <PDFUploader />}
      {format == 1 && <WebpageUploader />}
      {format == 2 && <LoadingPage />}
      <button
        type="button"
        class="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Next
      </button>
    </div>
  );
};

export default Start;
