import React, { useEffect, useState } from "react";
import PDFUploader from "../PDFUploader/PDFUploader";
import WebpageUploader from "../WebpageUploader/WebpageUploader";

const Start = () => {
  // 0: pdf, 1: web
  const [format, setFormat] = useState(0);

  const selectHandler = (e) => {
    setFormat((pre) => e.target.value);
  };

  return (
    <div className="bg-black text-white flex m-8 p-8">
      <h1>3Chill1Chiong</h1>
      <div>
        <label htmlFor="file-format">Choose a format: </label>
        <select name="file-format" id="file-format" onChange={selectHandler}>
          <option value="0">PDF File</option>
          <option value="1">Webpage Link</option>
        </select>
      </div>
      {format == 0 && <PDFUploader />}
      {format == 1 && <WebpageUploader />}
    </div>
  );
};

export default Start;
