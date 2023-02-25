import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import Start from "./components/Start/Start";
import Summary from "./components/Summary/Summary";
import LoadingPage from "./components/LoadingPage/LoadingPage";
import ChatBot from "./components/ChatBot/ChatBot";
import PosterPage from "./components/Poster/PosterPage";

import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
	return (
		<Router>
			<Routes>
				<Route exact path="/" element={<Start />}></Route>
				<Route exact path="/loading" element={<LoadingPage />}></Route>
				<Route exact path="/summary" element={<Summary />}></Route>
				<Route exact path="/chatbot" element={<ChatBot />}></Route>
				<Route exact path="/poster" element={<PosterPage />}></Route>
			</Routes>
		</Router>
	);
}

export default App;
