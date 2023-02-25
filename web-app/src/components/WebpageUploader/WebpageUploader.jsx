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
      <h1 className="text-3xl font-extrabold m-3">Step 1: Upload your Link</h1>
      <div className="flex flex-row gap-2 mx-4 mb-4">
        <form onSubmit={uploadHandler}>
          <input
            type="url"
            placeholder="https://example.com"
            pattern="https://.*"
            required
            className="rounded-lg p-2 text-black"
          ></input>
          <button
            className="bg-white text-black p-2 rounded ml-8"
            type="submit"
          >
            Upload
          </button>
        </form>
      </div>
    </div>
  );
};

export default WebpageUploader;
