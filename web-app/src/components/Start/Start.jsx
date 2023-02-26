import React, { useState } from "react";
import axios from "axios";
import LoadingPage from "../LoadingPage/LoadingPage";
import PDFUploader from "../PDFUploader/PDFUploader";
import WebpageUploader from "../WebpageUploader/WebpageUploader";
import { useNavigate } from "react-router-dom";

const Start = () => {
  // 0: pdf, 1: web
  const [format, setFormat] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("")
  const navigate = useNavigate();
  
  const selectHandler = (e) => {
    setFormat((pre) => e.target.value);
  };
  
  const handleNext = async e => {
    setIsLoading(true);
    
		const BASE_URL = "http://127.0.0.1:5000/prediction/predict";
    const req = {
      "file_path": "../data/upload.pdf",
      "from_upload": format == 0 ? true : false,
      "url": url
    }

		try {
			const response = await axios.post(BASE_URL, req, {
				headers: {
					"Content-Type": "application/json",
				},
			});
			console.log(response);
      
			setIsLoading(false);
      navigate("/summary");
			// alert("Upload successful!");
		} catch (error) {
			setIsLoading(false);
			alert(`Error uploading file: ${error.message}`);
		}
	};
  
  if (isLoading) {
    return <LoadingPage />
  }

  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
        <div className="bg-slate-900 text-white text-center p-10 rounded min-w-500">
          <h1 className="font-extrabold text-4xl p-3">LazyDocs</h1>
          <div>
            <label htmlFor="file-format">Choose a format: </label>
            <select
              className="m-3 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm p-2 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              name="file-format"
              id="file-format"
              onChange={selectHandler}
            >
              <option className="ps-0" value="0">PDF File</option>
              <option className="ps-0" value="1">Webpage Link</option>
            </select>
          </div>
          {format == 0 && <PDFUploader />}
          {format == 1 && <WebpageUploader url={url} setUrl={setUrl} />}
          <button
            type="button"
            onClick={handleNext}
            className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-md px-10 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Start;
