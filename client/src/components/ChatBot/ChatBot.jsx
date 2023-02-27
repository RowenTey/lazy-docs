import { useState, useRef, useEffect } from "react";
import ChatBox from "./ChatBox";
import chatbotPfp from "../../assets/chatbot-pfp.png";
import userPfp from "../../assets/user-pfp.png";
import leftSymbol from "../../assets/left-symbol.svg";
import { Link } from "react-router-dom";

const ChatBot = () => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(false);
	const bottomDiv = useRef(null);

	useEffect(() => {
		bottomDiv.current?.scrollIntoView();
	});
	
	return (
		<div className="bg-slate-500 w-screen h-screen flex justify-center items-center relative">
			<Link
				to="/summary"
				className="absolute left-8 bg-[#0F172A] rounded-full w-[45px] p-1"
			>
				<img src={leftSymbol} />
			</Link>
			<div className="flex flex-col items-center py-[1rem] h-[90%] px-[1rem] rounded-lg text-start justify-end bg-[#0F172A]">
				<h1 className="font-bold text-4xl  text-white mb-4">Chatbot</h1>
				<div className="flex flex-col items-center py-[1rem] h-full px-[1rem] rounded-lg text-start justify-end bg-[#1b294b]">
					<div className="flex flex-col-reverse w-[900px] overflow-y-scroll px-[1rem] mb-6 scrollbar-hide ">
						<div ref={bottomDiv} />
						{messages.map((message, index) => (
							<div
								className={`flex items-end ${
									message.from == "chatbot" ? "flex-row" : "flex-row-reverse"
								}`}
								key={index}
							>
								<img
									src={message.from == "chatbot" ? chatbotPfp : userPfp}
									alt={message.from == "chatbot" ? "chatbot-pfp" : "user-pfp"}
									className="w-[75px] h-[75px]"
								/>
								<div
									className={`rounded-lg py-[0.5rem] px-[1rem] text-black max-w-[60%]`}
									style={{
										margin:
											message.from == "chatbot"
												? "1rem auto 15px 0"
												: "1rem 0 15px auto",
										overflowWrap: "break-word",
										backgroundColor:
											message.from == "user" ? "#86C5D8" : "#F9AEAE",
									}}
									key={`msg-${index}`}
								>
									{message?.content}
								</div>
							</div>
						))}
					</div>
					<ChatBox
						setMessages={setMessages}
						loading={loading}
						setLoading={setLoading}
					/>
				</div>
			</div>
		</div>
	);
};

export default ChatBot;
