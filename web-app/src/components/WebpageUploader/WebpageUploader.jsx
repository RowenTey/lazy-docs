import React, { useState } from "react";
const WebpageUploader = () => {
  const [url, setUrl] = useState(null);

  const uploadHandler = (e) => {
    setUrl(e.target[0].value);
    console.log(e.target[0].value);
    e.preventDefault();
  };
  return (
    <div className="flex flex-col gap-3 text-white p-3 px-5">
      <h1 className="text-3xl font-extrabold m-3 mx-4">
        Step 1: Upload your Link
      </h1>
      <div className="flex flex-row gap-2 mx-4 mb-4">
        <form onSubmit={uploadHandler}>
          <input
            type="url"
            placeholder="https://example.com"
            pattern="https://.*"
            required
            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 w-3/6 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          ></input>
          <button
            type="submit"
            class="mx-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-10 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebpageUploader;
