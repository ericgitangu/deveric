// /components/SnakeGame.tsx

import React, { useState, useEffect, useRef, useCallback } from "react";
import { useSwipeable } from "react-swipeable";
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight, Play, Pause } from "lucide-react";
import { GameOverModal } from "./GameOverModal";
import { useHapticSnackbar } from "@/context/HapticSnackbarContext";
import { HapticButton } from "./HapticButton";

const SnakeGame: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([
		{ x: 10, y: 10 },
	]);
	const [direction, setDirection] = useState<"UP" | "DOWN" | "LEFT" | "RIGHT">(
		"RIGHT",
	);
	const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 15 });
	const [score, setScore] = useState(0);
	const [isGameRunning, setIsGameRunning] = useState(false);
	const [isPaused, setIsPaused] = useState(false);
	const [speed, setSpeed] = useState(200); // milliseconds
	const [dynamicCanvasSize, setDynamicCanvasSize] = useState(300); // Initial canvas size for mobile
	const [showGameOverModal, setShowGameOverModal] = useState(false);
	const [finalScore, setFinalScore] = useState(0);

	const { showSnackbar, triggerHaptic } = useHapticSnackbar();

	const gridSize = 20;

	// Refs to hold the latest direction and snake state
	const directionRef = useRef<"UP" | "DOWN" | "LEFT" | "RIGHT">(direction);
	const snakeRef = useRef<Array<{ x: number; y: number }>>(snake);

	useEffect(() => {
		directionRef.current = direction;
	}, [direction]);

	useEffect(() => {
		snakeRef.current = snake;
	}, [snake]);

	// Adjust canvas size based on window width to ensure responsiveness
	useEffect(() => {
		const updateCanvasSize = () => {
			const width = window.innerWidth;
			if (width < 500) {
				setDynamicCanvasSize(300);
			} else if (width < 768) {
				setDynamicCanvasSize(350);
			} else {
				setDynamicCanvasSize(400);
			}
		};

		updateCanvasSize();
		window.addEventListener("resize", updateCanvasSize);
		return () => window.removeEventListener("resize", updateCanvasSize);
	}, []);

	// Define moveSnake before useEffect to prevent hoisting issues
	const moveSnake = useCallback(() => {
		const currentSnake = snakeRef.current;
		const currentDirection = directionRef.current;

		const head = { ...currentSnake[currentSnake.length - 1] };
		switch (currentDirection) {
			case "UP":
				head.y -= 1;
				break;
			case "DOWN":
				head.y += 1;
				break;
			case "LEFT":
				head.x -= 1;
				break;
			case "RIGHT":
				head.x += 1;
				break;
		}

		// Check wall collision
		if (
			head.x < 0 ||
			head.x >= dynamicCanvasSize / gridSize ||
			head.y < 0 ||
			head.y >= dynamicCanvasSize / gridSize
		) {
			endGame();
			return;
		}

		// Check self collision
		for (let segment of currentSnake) {
			if (segment.x === head.x && segment.y === head.y) {
				endGame();
				return;
			}
		}

		const newSnake = [...currentSnake, head];

		// Check food collision
		if (head.x === food.x && head.y === food.y) {
			setScore((prev) => prev + 1);
			setFood(randomFoodPosition());

			// Optionally, increase speed as score increases
			if (speed > 50) {
				setSpeed((prevSpeed) => prevSpeed - 5);
			}
		} else {
			newSnake.shift();
		}

		setSnake(newSnake);
	}, [food, speed, dynamicCanvasSize]);

	// Handle game loop with pause functionality
	useEffect(() => {
		if (isGameRunning && !isPaused) {
			const interval = setInterval(moveSnake, speed);
			return () => clearInterval(interval);
		}
	}, [isGameRunning, isPaused, speed, moveSnake]);

	// Handle keyboard controls
	useEffect(() => {
		if (!isGameRunning || isPaused) return;

		const handleKeyDown = (e: KeyboardEvent) => {
			switch (e.key) {
				case "ArrowUp":
					if (directionRef.current !== "DOWN") setDirection("UP");
					break;
				case "ArrowDown":
					if (directionRef.current !== "UP") setDirection("DOWN");
					break;
				case "ArrowLeft":
					if (directionRef.current !== "RIGHT") setDirection("LEFT");
					break;
				case "ArrowRight":
					if (directionRef.current !== "LEFT") setDirection("RIGHT");
					break;
				default:
					break;
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isGameRunning, isPaused]);

	const randomFoodPosition = () => {
		let newX: number;
		let newY: number;
		let attempts = 0;
		const maxAttempts = 100;

		do {
			newX = Math.floor(Math.random() * (dynamicCanvasSize / gridSize));
			newY = Math.floor(Math.random() * (dynamicCanvasSize / gridSize));
			attempts++;
			if (attempts > maxAttempts) {
				// If unable to find a position, end the game
				endGame();
				return { x: 10, y: 10 }; // Reset position
			}
		} while (
			snakeRef.current.some(
				(segment) => segment.x === newX && segment.y === newY,
			)
		);

		return { x: newX, y: newY };
	};

	const endGame = () => {
		setFinalScore(score);
		setIsGameRunning(false);
		setIsPaused(false);
		triggerHaptic("warning");
		setShowGameOverModal(true);
	};

	const handleScoreSubmit = async (data: {
		firstName: string;
		lastName: string;
		feedback: string;
		rating: number;
	}) => {
		try {
			const response = await fetch("/api/leaderboard", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					...data,
					score: finalScore,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to submit score");
			}
		} catch (error) {
			console.error("Error submitting score:", error);
			throw error;
		}
	};

	const handleModalClose = () => {
		setShowGameOverModal(false);
		resetGame();
	};

	const resetGame = () => {
		setIsGameRunning(false);
		setIsPaused(false);
		setSnake([{ x: 10, y: 10 }]);
		setDirection("RIGHT");
		setFood(randomFoodPosition());
		setScore(0);
		setSpeed(200);
	};

	// Render the game on the canvas
	useEffect(() => {
		const canvas = canvasRef.current;
		if (canvas) {
			const ctx = canvas.getContext("2d");
			if (ctx) {
				// Clear canvas
				ctx.fillStyle = "black";
				ctx.fillRect(0, 0, dynamicCanvasSize, dynamicCanvasSize);

				// Draw food
				ctx.fillStyle = "purple";
				ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

				// Draw snake
				ctx.fillStyle = "lime";
				snake.forEach((segment) => {
					ctx.fillRect(
						segment.x * gridSize,
						segment.y * gridSize,
						gridSize,
						gridSize,
					);
				});
			}
		}
	}, [snake, food, dynamicCanvasSize]);

	// Swipe handlers
	const handlers = useSwipeable({
		onSwiped: (eventData) => {
			const { dir } = eventData;

			switch (dir) {
				case "Up":
					if (directionRef.current !== "DOWN") setDirection("UP");
					break;
				case "Down":
					if (directionRef.current !== "UP") setDirection("DOWN");
					break;
				case "Left":
					if (directionRef.current !== "RIGHT") setDirection("LEFT");
					break;
				case "Right":
					if (directionRef.current !== "LEFT") setDirection("RIGHT");
					break;
				default:
					break;
			}
		},
		preventScrollOnSwipe: true,
		trackMouse: false,
	});

	return (
		<div className="relative flex flex-col items-center space-y-4 w-full mt-12 px-4">
			{/* Start Game Button */}
			{!isGameRunning && !showGameOverModal && (
				<div className="text-center space-y-4">
					<p className="text-zinc-400 text-sm max-w-xs">
						Use Arrow Keys (Desktop) or Swipe Gestures (Mobile) to Control the Snake
					</p>
					<HapticButton
						onClick={() => {
							triggerHaptic("success");
							setIsGameRunning(true);
						}}
						variant="primary"
						hapticType="success"
						ariaLabel="Start Game"
						className="flex items-center gap-2"
					>
						<Play className="w-5 h-5" />
						Start Game
					</HapticButton>
				</div>
			)}

			{/* Pause/Resume Button */}
			{isGameRunning && (
				<HapticButton
					variant="secondary"
					hapticType="click"
					onClick={() => {
						if (isPaused) {
							setIsPaused(false);
							showSnackbar("Game Resumed", "info");
						} else {
							setIsPaused(true);
							showSnackbar("Game Paused", "info");
						}
					}}
					ariaLabel={isPaused ? "Resume Game" : "Pause Game"}
					className="flex items-center gap-2"
				>
					{isPaused ? (
						<>
							<Play className="w-4 h-4" />
							Resume Game
						</>
					) : (
						<>
							<Pause className="w-4 h-4" />
							Pause Game
						</>
					)}
				</HapticButton>
			)}

			{/* Swipeable Game Canvas */}
			{isGameRunning && (
				<div
					{...handlers}
					className="flex justify-center w-full max-w-xs md:max-w-md relative"
				>
					<canvas
						ref={canvasRef}
						width={dynamicCanvasSize}
						height={dynamicCanvasSize}
						className="border-2 border-zinc-600 rounded-lg touch-none"
						aria-label="Snake Game Canvas"
						role="img"
					/>
					{/* Visual Indicators for Swipe Controls */}
					<div className="absolute bottom-4 flex items-center space-x-2 bg-zinc-900/80 px-3 py-1 rounded-full">
						<span className="text-zinc-400 text-xs">Swipe:</span>
						<span className="text-zinc-300 flex items-center gap-0.5">
							<ChevronUp className="w-4 h-4" />
							<ChevronDown className="w-4 h-4" />
							<ChevronLeft className="w-4 h-4" />
							<ChevronRight className="w-4 h-4" />
						</span>
					</div>
				</div>
			)}

			{/* Score Display */}
			{isGameRunning && (
				<div className="flex items-center gap-2 bg-zinc-900/80 px-4 py-2 rounded-xl">
					<span className="text-zinc-400">Score:</span>
					<span className="text-2xl font-bold text-lime-400">{score}</span>
				</div>
			)}

			{/* Game Over Modal */}
			<GameOverModal
				isOpen={showGameOverModal}
				score={finalScore}
				onClose={handleModalClose}
				onSubmit={handleScoreSubmit}
			/>
		</div>
	);
};

export default SnakeGame;
