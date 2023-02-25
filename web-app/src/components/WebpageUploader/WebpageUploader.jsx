import React, { useState } from "react";
const WebpageUploader = () => {
  const [url, setUrl] = useState(null);

  const uploadHandler = (e) => {
    setUrl(e.target[0].value);
    console.log(e.target[0].value);
    e.preventDefault();
  };
  return (
    <div className="flex flex-col text-xl gap-3 font-extrabold bg-black text-white ">
      <h1>Upload your Link</h1>
      <div className="flex flex-row gap-2">
        <form on onSubmit={uploadHandler}>
          <input
            type="url"
            placeholder="https://example.com"
            pattern="https://.*"
            required
            className="rounded-lg p-2"
          ></input>
          <button type="submit">Upload</button>
        </form>
      </div>
    </div>
  );
};

export default WebpageUploader;
