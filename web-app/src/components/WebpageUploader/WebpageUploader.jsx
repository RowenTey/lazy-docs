const WebpageUploader = () => {
  return (
    <div className="flex flex-col text-xl gap-3 font-extrabold">
      <h1>Upload your Link</h1>
      <div className="flex flex-row gap-2">
        <input type="url" className="rounded-lg p-2"></input>
        <button>Next</button>
      </div>
    </div>
  );
};

export default WebpageUploader;
