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
          className="text-black m-3"
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
        type="submit"
        className="bg-white text-black py-2 px-3 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Start;
