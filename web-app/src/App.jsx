import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import WebpageUploader from "./components/WebpageUploader/WebpageUploader";
import PDFUploader from "./components/PDFUploader/PDFUploader";
import Start from "./components/Start/Start";
import Summary from "./components/Summary/Summary";
import LoadingPage from "./components/LoadingPage/LoadingPage";

function App() {
  return (
    <div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
      {/* <Start /> */}
      <Summary />
      {/* <LoadingPage /> */}
    </div>
  );
}

export default App;
