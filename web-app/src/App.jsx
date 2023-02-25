import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import WebpageUploader from "./components/WebpageUploader/WebpageUploader";
import PDFUploader from "./components/PDFUploader/PDFUploader";
import Start from "./components/Start/Start";

function App() {
  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      <WebpageUploader />
    </div>
  );
}

export default App;
