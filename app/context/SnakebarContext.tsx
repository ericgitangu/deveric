"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { Snackbar, Alert } from "@mui/material";

interface SnackbarContextProps {
	showSnackbar: (
		message: string,
		severity?: "success" | "error" | "warning" | "info",
	) => void;
}

const SnackbarContext = createContext<SnackbarContextProps | undefined>(
	undefined,
);

export const SnackbarProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState<
		"success" | "error" | "warning" | "info"
	>("info");

	const showSnackbar = (
		msg: string,
		sev: "success" | "error" | "warning" | "info" = "info",
	) => {
		setMessage(msg);
		setSeverity(sev);
		setOpen(true);
	};

	const handleClose = (
		event?: React.SyntheticEvent | Event,
		reason?: string,
	) => {
		if (reason === "clickaway") {
			return;
		}
		setOpen(false);
	};

	return (
		<SnackbarContext.Provider value={{ showSnackbar }}>
			{children}
			<Snackbar
				open={open}
				autoHideDuration={3000}
				onClose={handleClose}
				anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
			>
				<Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
					{message}
				</Alert>
			</Snackbar>
		</SnackbarContext.Provider>
	);
};

export const useSnackbar = (): SnackbarContextProps => {
	const context = useContext(SnackbarContext);
	if (!context) {
		throw new Error("useSnackbar must be used within a SnackbarProvider");
	}
	return context;
};
