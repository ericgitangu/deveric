import React, { useEffect, useState } from "react";
import axios from "axios";

interface Tip {
	id: number;
	domain: string;
	tip: string;
}

const TipFetcher: React.FC = () => {
	const [tips, setTips] = useState<Tip[]>([]);
	const [currentTip, setCurrentTip] = useState<Tip | null>(null);

	useEffect(() => {
		const fetchTips = async () => {
			try {
				const response = await axios.get<Tip[]>("/api/tips");
				setTips(response.data);
			} catch (error) {
				console.error("Error fetching tips:", error);
			}
		};

		fetchTips();
	}, []);

	useEffect(() => {
		if (tips.length === 0) return;

		const updateTip = () => {
			const randomTip = tips[Math.floor(Math.random() * tips.length)];
			setCurrentTip(randomTip);
		};

		// Initial tip
		updateTip();

		const interval = setInterval(updateTip, 15000); // Update every 15 seconds

		return () => clearInterval(interval);
	}, [tips]);

	if (!currentTip) return null;

	return (
		<div className="mt-8 p-4 bg-gray-800 rounded-md text-white text-center w-full max-w-md">
			<h3 className="text-lg font-semibold">Dev Tip 💡</h3>
			<p className="mt-2">
				<span className="font-bold">{currentTip.domain}:</span> {currentTip.tip}
			</p>
		</div>
	);
};

export default TipFetcher;
