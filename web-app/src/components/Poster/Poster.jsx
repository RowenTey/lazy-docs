import React from "react";
import placeholder from "../../assets/placeholder-image.png";

const Poster = ({
	backgroundColor,
	summary,
	headline,
	file: image,
	textColor,
	printRef,
}) => {
	let imageUrl = "";

	try {
		imageUrl = URL.createObjectURL(image);
	} catch (error) {}

	console.log(image);
	return (
		<div
			className={`w-[450px] h-[600px]`}
			style={{
				backgroundColor: backgroundColor,
			}}
			ref={printRef}
		>
			<h1
				className="text-center text-2xl py-3 font-bold"
				style={{
					color: textColor,
				}}
			>
				{headline}
			</h1>
			<div className="px-6">
				<img
					src={imageUrl !== "" ? imageUrl : placeholder}
					className="object-cover w-[170px] h-[170px] float-left mr-4 mb-2 mt-1"
					alt="Image"
				/>
				<p
					className="px-2 pb-2 font-normal"
					style={{
						color: textColor,
					}}
				>
					{summary}
				</p>
			</div>
		</div>
	);
};

export default Poster;
