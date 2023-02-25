import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

const Summary = () => {
  let url = "";
  const [summary, setSummary] = useState(
    "Donec libero ante, sagittis eu sollicitudin id, condimentum ut magna.Cras porta ac eros sed auctor. Suspendisse vitae nunc interdum,tincidunt massa non, tincidunt mi. Curabitur quis nibh tellus. Donecvitae nunc at tellus vehicula pellentesque ac eu tortor. Curabitur idipsum id arcu egestas pellentesque at eu magna. Sed volutpat malesuadaelit, quis consequat tortor efficitur eget. Nunc eget gravida erat,nec congue nisi. Curabitur id ipsum id arcu egestas pellentesque at eumagna. Sed volutpat malesuada elit, quis consequat tortor efficitureget. Nunc eget gravida erat, nec congue nisi. Curabitur id ipsum idarcu egestas pellentesque at eu magna. Sed volutpat malesuada elit,quis consequat tortor efficitur eget. Nunc eget gravida erat, neccongue nisi.Sed volutpat malesuada elit, quis consequat tortorefficitur eget. Nunc eget gravida erat, nec congue nisi. Curabitur idipsum id arcu egestas pellentesque at eu magna. Sed volutpat malesuadaelit, quis consequat tortor efficitur eget. Nunc eget gravida erat,nec congue nisi. Curabitur id ipsum id arcu egestas pellentesque at eumagna. Sed volutpat malesuada elit, quis consequat tortor efficitureget. Nunc eget gravida erat, nec congue nisi."
  );

  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      <div className="w-3/6 bg-slate-900 text-white text-center p-10 rounded max-w-3xl max-h-screen min-h-[80%]">
        <h1 className="font-extrabold text-4xl p-3 mb-3">Summary</h1>
        <div className="leading-8 px-5 max-h-72 overflow-auto">{summary}</div>
        <a href={url} download="myPpt.pptx">
          <button
            type="button"
            class="m-4 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Get Powerpoint
          </button>
        </a>
        <Link to="/poster">
          <button
            type="button"
            class="m-4 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Get Posters
          </button>
        </Link>
        <Link to="/chatbot">
          <button
            type="button"
            class="mt-5 m-8 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 text-center mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Next
          </button>
        </Link>
      </div>
    </div>
  );
};

export default Summary;
