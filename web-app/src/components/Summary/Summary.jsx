import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import summaryData from "../../../../data/summary.txt";
import fs from "fs"
import axios from "axios"
// import researchPpt from "../../../../output/research.ppt"


const Summary = () => {
  const [summary, setSummary] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  const readFromTxtFile = async () => {
    fetch(summaryData)
      .then(response => response.text())
      .then(data => {
        console.log(data); // The contents of the file will be logged to the console
        setSummary(data);
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }
  
  useEffect(() => {
    readFromTxtFile();
  }, [])

  const downloadFile = () => {
    const file = '../../../../output/research.ppt';
    // let url = window.URL.createObjectURL(blob);
    
    
    // create a new FileReader instance
    const reader = new FileReader();

    // read the file as a binary string
    reader.readAsBinaryString(file);

    // handle the 'load' event when the file is loaded
    reader.onload = () => {
      // create a new blob from the binary string
      const blob = new Blob([reader.result], { type: 'application/vnd.ms-powerpoint' });

      // create a URL for the blob
      const url = URL.createObjectURL(blob);
      
      const link = document.createElement('a');
      link.href = url;
      link.download = 'my_presentation.ppt';
      link.click();
    }
  }
 
  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      <div className="w-3/6 bg-slate-900 text-white text-center p-10 rounded max-w-3xl max-h-screen min-h-[80%]">
        <h1 className="font-extrabold text-4xl p-3 mb-3">Summary</h1>
        <div className="leading-8 px-5 max-h-72 overflow-auto">{summary}</div>
          <div onClick={() => downloadFile()}>
            <button
              type="button"
              className="m-4 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Get Powerpoint
            </button>
          </div>
          <Link to="/poster">
            <button
              type="button"
              className="m-4 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Get Posters
            </button>
          </Link>
          <Link to="/chatbot">
            <button
              type="button"
              className="mt-5 m-8 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Next
            </button>
          </Link>
      </div>
    </div>
  );
};

export default Summary;
