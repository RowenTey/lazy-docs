import axios from "axios";
import React, { useState } from "react";

const ChatBox = ({ setMessages, loading, setLoading }) => {
	const [query, setQuery] = useState("");
	const handleSubmit = async () => {
		if (query.length == 0) {
			return;
		}
		// send request
		const message = { from: "user", content: query };
		setLoading(true);
		setMessages(prevMessage => [message, ...prevMessage]);
		setQuery("");

		// new loading message
		setTimeout(() => {
			const loadingMessage = {
				from: "chatbot",
				content: "Loading ... This might take a while",
			};
			setMessages(prevMessage => [loadingMessage, ...prevMessage]);
		}, 1000);

		const BASE_URL = "http://127.0.0.1:5000/chatbot/chat";

		try {
			const newMsg = await axios.post(BASE_URL, {
				question: query,
			});

			const response = newMsg.data?.answer[0]?.answer;

			// remove last message
			const newMessage = { from: "chatbot", content: response };

			setMessages(prevMessage => [newMessage, ...prevMessage.slice(1)]);
			setLoading(false);
		} catch (error) {}
	};

	const handleKeyDown = e => {
		if (e.key === "Enter") {
			handleSubmit();
		}
	};

	return (
		<div className="w-[96%] flex flex-row items-center justify-center ">
			<input
				name="query"
				type="text"
				placeholder="Ask me anything..."
				value={query}
				className="px-4 py-2 mr-2 rounded-md w-[840px]"
				onChange={e => setQuery(e.target.value)}
				onKeyDown={handleKeyDown}
				disabled={loading}
			/>
			<button
				type="submit"
				onClick={handleSubmit}
				className="px-4 py-2 bg-blue-200 rounded-md"
				disabled={loading}
			>
				Send
			</button>
		</div>
	);
};

export default ChatBox;
