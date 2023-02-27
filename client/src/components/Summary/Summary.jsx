import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import summaryData from "../../../../data/summary.txt";
import leftSymbol from "../../assets/left-symbol.svg";

const Summary = () => {
	const [summary, setSummary] = useState("");

	const readFromTxtFile = async () => {
		fetch(summaryData)
			.then(response => response.text())
			.then(data => {
				setSummary(data);
			})
			.catch(error => {
				console.error("Error:", error);
			});
	};

	useEffect(() => {
		readFromTxtFile();
	}, []);

	return (
		<div className="bg-slate-500 w-screen h-screen flex justify-center items-center">
			<Link
				to="/"
				className="absolute left-8 bg-[#0F172A] rounded-full w-[45px] p-1"
			>
				<img src={leftSymbol} />
			</Link>
			<div className="w-3/6 bg-slate-900 text-white text-center p-10 rounded max-w-3xl max-h-screen min-h-[80%] flex flex-col justify-center items-center gap-2">
				<h1 className="font-extrabold text-4xl p-3 mb-3">Summary</h1>
				<div className="leading-8 px-5 max-h-72 overflow-auto">{summary}</div>
				<div className="flex gap-3">
					<Link
						to="../../../public/research.ppt"
						target="_blank"
						download
					>
						<button
							type="button"
							className="m-4 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						>
							Get Powerpoint
						</button>
					</Link>
					<Link to="/poster">
						<button
							type="button"
							className="m-4 mt-8 text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
						>
							Get Posters
						</button>
					</Link>
				</div>
				
				<Link to="/chatbot">
					<button
						type="button"
						className="mt-3 text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 font-medium rounded-full text-sm px-10 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
					>
						Next
					</button>
				</Link>
			</div>
		</div>
	);
};

export default Summary;
