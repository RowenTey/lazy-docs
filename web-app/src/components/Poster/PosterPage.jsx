import React, { useRef, useState } from "react";
import Poster from "./Poster";
import leftSymbol from "../../assets/left-symbol.svg";
import html2canvas from "html2canvas";
import summaryData from "../../../../data/summary.txt";
import { Link } from "react-router-dom";

const PosterPage = () => {
	const [headline, setHeadline] = useState("Your title here");
	const [summary, setSummary] = useState(
		""
	);
	const [backgroundColor, setBackgroundcolor] = useState("#3b5aa7");
	const [textColor, setTextColor] = useState("#ffffff");
	const [file, setFile] = useState(null);

	const onFileChange = e => {
		if (e.target.files) {
			setFile(e.target.files[0]);
		}
	};

	const printRef = useRef();

	const handleDownload = async () => {
		const element = printRef.current;
		const canvas = await html2canvas(element);

		const data = canvas.toDataURL("image/jpg");
		const link = document.createElement("a");
		link.href = data;
		link.setAttribute("download", "image.png"); //or any other extension
		document.body.appendChild(link);
		link.click();
	};

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

	return (
		<div className="bg-slate-500 w-screen h-screen flex justify-center items-center relative">
			<Link
				to="/summary"
				className="absolute left-8 bg-[#0F172A] rounded-full w-[45px] p-1"
			>
				<img src={leftSymbol} />
			</Link>
			<div className="flex flex-col items-center py-[1rem] h-[90%] px-[1rem] rounded-lg text-start bg-[#0F172A] w-[1240px]">
				<h1 className="font-bold text-4xl mb-6 text-white">Poster Generator</h1>
				<div className="flex flex-row justify-between">
					<div>
						<Poster
							backgroundColor={backgroundColor}
							headline={headline}
							file={file}
							summary={summary}
							textColor={textColor}
							printRef={printRef}
						/>

						<button
							className="item-start bg-blue-400 font-bold px-2 w-full py-2 mt-4 rounded-sm"
							onClick={handleDownload}
						>
							Download Poster
						</button>
					</div>
					<div className="flex flex-col bg-[#15203b] w-[600px] px-4 ml-10 rounded-sm">
						<div className="flex flex-col">
							<h2 className="text-white text-xl font-bold py-2 mb-2">
								Headline
							</h2>
							<input
								className="bg-[#1e2e54] rounded-md py-2 px-3 text-white"
								onChange={e => setHeadline(e.target.value)}
								maxLength="30"
								value={headline}
							/>
							<h2 className="text-white  text-xl font-bold py-2">Summary</h2>
							<textarea
								className="bg-[#1e2e54] rounded-md py-2 px-3 text-white mb-2"
								cols="40"
								rows="10"
								maxLength="600"
								onChange={e => setSummary(e.target.value)}
								value={summary}
							/>
							<h2 className="text-white  text-xl font-bold py-2 mb-2">
								Background color
							</h2>
							<input
								type="color"
								value={backgroundColor}
								onChange={e => setBackgroundcolor(e.target.value)}
							/>
							<h2 className="text-white  text-xl font-bold py-2 mb-2">
								Text color
							</h2>
							<input
								type="color"
								value={textColor}
								onChange={e => setTextColor(e.target.value)}
							/>
							<h2 className="text-white  text-xl font-bold py-2 mb-2">Image</h2>
							<input
								type="file"
								accept="image/png, image/jpeg"
								onChange={onFileChange}
								className="text-white"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default PosterPage;
