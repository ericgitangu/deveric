// app/api/tips/route.ts

import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function GET() {
	try {
		// Construct the absolute path to tips.json
		const tipsFilePath = path.join(process.cwd(), "app", "data", "tips.json");

		// Read the file contents
		const fileContents = await fs.promises.readFile(tipsFilePath, "utf-8");

		// Parse the JSON data
		const tips = JSON.parse(fileContents);

		// Return the tips as a JSON response
		return NextResponse.json(tips, {
			status: 200,
			headers: {
				"Content-Type": "application/json",
			},
		});
	} catch (error) {
		console.error("Error reading tips.json:", error);

		// Return an error response
		return NextResponse.json(
			{ message: "Failed to fetch tips." },
			{
				status: 500,
				headers: {
					"Content-Type": "application/json",
				},
			},
		);
	}
}
