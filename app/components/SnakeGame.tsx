// /components/SnakeGame.tsx

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Button, Tooltip } from '@mui/material';
import { useSnackbar } from '@/context/SnakebarContext';
import { useSwipeable } from 'react-swipeable';

interface LeaderboardEntry {
    id: number;
    name: string;
    score: number;
    timestamp: string;
}

const SnakeGame: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [snake, setSnake] = useState<Array<{ x: number; y: number }>>([{ x: 10, y: 10 }]);
    const [direction, setDirection] = useState<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>('RIGHT');
    const [food, setFood] = useState<{ x: number; y: number }>({ x: 15, y: 15 });
    const [score, setScore] = useState(0);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [isGameRunning, setIsGameRunning] = useState(false);
    const [isPaused, setIsPaused] = useState(false);
    const [speed, setSpeed] = useState(200); // milliseconds
    const [dynamicCanvasSize, setDynamicCanvasSize] = useState(300); // Initial canvas size for mobile

    const { showSnackbar } = useSnackbar();

    const gridSize = 20;

    // Refs to hold the latest direction and snake state
    const directionRef = useRef<'UP' | 'DOWN' | 'LEFT' | 'RIGHT'>(direction);
    const snakeRef = useRef<Array<{ x: number; y: number }>>(snake);

    useEffect(() => {
        directionRef.current = direction;
    }, [direction]);

    useEffect(() => {
        snakeRef.current = snake;
    }, [snake]);

    // Load leaderboard from localStorage on mount
    useEffect(() => {
        const storedLeaderboard = localStorage.getItem('leaderboard');
        if (storedLeaderboard) {
            setLeaderboard(JSON.parse(storedLeaderboard));
        }
    }, []);

    // Save leaderboard to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem('leaderboard', JSON.stringify(leaderboard));
    }, [leaderboard]);

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
        window.addEventListener('resize', updateCanvasSize);
        return () => window.removeEventListener('resize', updateCanvasSize);
    }, []);

    // Define moveSnake before useEffect to prevent hoisting issues
    const moveSnake = useCallback(() => {
        const currentSnake = snakeRef.current;
        const currentDirection = directionRef.current;

        const head = { ...currentSnake[currentSnake.length - 1] };
        switch (currentDirection) {
            case 'UP':
                head.y -= 1;
                break;
            case 'DOWN':
                head.y += 1;
                break;
            case 'LEFT':
                head.x -= 1;
                break;
            case 'RIGHT':
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
            setScore(prev => prev + 1);
            setFood(randomFoodPosition());

            // Optionally, increase speed as score increases
            if (speed > 50) {
                setSpeed(prevSpeed => prevSpeed - 5);
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
                case 'ArrowUp':
                    if (directionRef.current !== 'DOWN') setDirection('UP');
                    break;
                case 'ArrowDown':
                    if (directionRef.current !== 'UP') setDirection('DOWN');
                    break;
                case 'ArrowLeft':
                    if (directionRef.current !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'ArrowRight':
                    if (directionRef.current !== 'LEFT') setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => {
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isGameRunning, isPaused]);

    const randomFoodPosition = () => {
        let newX: number, newY: number;
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
        } while (snakeRef.current.some(segment => segment.x === newX && segment.y === newY));

        return { x: newX, y: newY };
    };

    const endGame = () => {
        const playerName = prompt('Game Over! Enter your name:');
        if (playerName) {
            const newEntry: LeaderboardEntry = {
                id: Date.now(),
                name: playerName,
                score: score,
                timestamp: new Date().toLocaleString(),
            };
            setLeaderboard(prev =>
                [...prev, newEntry].sort((a, b) => b.score - a.score).slice(0, 10)
            );
            showSnackbar('Game Over! Your score has been recorded.', 'warning');
        }
        // Reset game
        resetGame();
    };

    const resetGame = () => {
        setIsGameRunning(false);
        setIsPaused(false);
        setSnake([{ x: 10, y: 10 }]);
        setDirection('RIGHT');
        setFood(randomFoodPosition());
        setScore(0);
        setSpeed(200);
    };

    // Render the game on the canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            const ctx = canvas.getContext('2d');
            if (ctx) {
                // Clear canvas
                ctx.fillStyle = 'black';
                ctx.fillRect(0, 0, dynamicCanvasSize, dynamicCanvasSize);

                // Draw food
                ctx.fillStyle = 'purple';
                ctx.fillRect(food.x * gridSize, food.y * gridSize, gridSize, gridSize);

                // Draw snake
                ctx.fillStyle = 'lime';
                snake.forEach(segment => {
                    ctx.fillRect(segment.x * gridSize, segment.y * gridSize, gridSize, gridSize);
                });
            }
        }
    }, [snake, food, dynamicCanvasSize]);

    // Swipe handlers
    const handlers = useSwipeable({
        onSwiped: (eventData) => {
            const { dir } = eventData;

            switch (dir) {
                case 'Up':
                    if (directionRef.current !== 'DOWN') setDirection('UP');
                    break;
                case 'Down':
                    if (directionRef.current !== 'UP') setDirection('DOWN');
                    break;
                case 'Left':
                    if (directionRef.current !== 'RIGHT') setDirection('LEFT');
                    break;
                case 'Right':
                    if (directionRef.current !== 'LEFT') setDirection('RIGHT');
                    break;
                default:
                    break;
            }
        },
        preventScrollOnSwipe: true,
        trackMouse: false,
    });

    // Define columns for DataGrid
    const columns: GridColDef[] = [
        { field: 'name', headerName: 'Name', width: 150, headerClassName: 'text-black' },
        { field: 'score', headerName: 'Score', width: 120, type: 'number', headerClassName: 'text-black' },
        { field: 'timestamp', headerName: 'Timestamp', width: 180, headerClassName: 'text-black' },
    ];

    return (
        <div className="relative flex flex-col items-center space-y-4 w-full mt-12 px-4">
            {/* Start Game Button with Tooltip */}
            {!isGameRunning && (
                <Tooltip title="Use Arrow Keys (Desktop) or Swipe Gestures (Mobile) to Control the Snake">
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setIsGameRunning(true)}
                        className="mt-4"
                        sx={{
                            paddingX: 4,
                            paddingY: 1.5,
                            fontWeight: 'bold',
                            borderRadius: '8px',
                            textTransform: 'uppercase',
                            backgroundColor: '#3b82f6',
                            '&:hover': {
                                backgroundColor: '#2563eb',
                            },
                            transition: 'transform 0.2s, background-color 0.3s',
                        }}
                        aria-label="Start Game"
                    >
                        Start Game
                    </Button>
                </Tooltip>
            )}

            {/* Pause/Resume Button */}
            {isGameRunning && (
                <Button
                    variant="outlined"
                    color="secondary"
                    onClick={() => {
                        if (isPaused) {
                            setIsPaused(false);
                            showSnackbar('Game Resumed', 'info');
                        } else {
                            setIsPaused(true);
                            showSnackbar('Game Paused', 'info');
                        }
                    }}
                    className="mt-2"
                    sx={{
                        paddingX: 3,
                        paddingY: 1,
                        fontWeight: 'bold',
                        borderRadius: '8px',
                        textTransform: 'uppercase',
                    }}
                    aria-label={isPaused ? 'Resume Game' : 'Pause Game'}
                >
                    {isPaused ? 'Resume Game' : 'Pause Game'}
                </Button>
            )}

            {/* Swipeable Game Canvas */}
            {isGameRunning && (
                <div {...handlers} className="flex justify-center w-full max-w-xs md:max-w-md relative">
                    <canvas
                        ref={canvasRef}
                        width={dynamicCanvasSize}
                        height={dynamicCanvasSize}
                        className="border-2 border-white touch-none"
                        aria-label="Snake Game Canvas"
                        role="img"
                    />
                    {/* Visual Indicators for Swipe Controls */}
                    <div className="absolute bottom-4 flex space-x-2">
                        <span className="text-white">Swipe:</span>
                        <span className="text-white">⬆️ ⬇️ ⬅️ ➡️</span>
                    </div>
                </div>
            )}

            {/* Score Display */}
            {isGameRunning && (
                <div className="text-white text-lg">Score: {score}</div>
            )}

            {/* Leaderboard */}
            <div className="w-full max-w-2xl">
                <h2 className="text-white text-xl mb-2">Scoreboard</h2>
                <div className="h-60">
                    <DataGrid
                        rows={leaderboard}
                        columns={columns}
                        // Update the pagination props based on your DataGrid version
                        paginationModel={{ page: 0, pageSize: 5 }}
                        pageSizeOptions={[5]}
                        disableRowSelectionOnClick
                        autoHeight
                        hideFooter
                        sx={{
                            backgroundColor: '#1f2937',
                            color: '#d1d5db',
                            '& .MuiDataGrid-columnHeaders': {
                                backgroundColor: '#374151',
                                color: '#d1d5db',
                            },
                            '& .MuiDataGrid-row:nth-of-type(odd)': {
                                backgroundColor: '#1f2937',
                            },
                            '& .MuiDataGrid-row:nth-of-type(even)': {
                                backgroundColor: '#111827',
                            },
                        }}
                    />
                </div>
            </div>
        </div>
    );

};

export default SnakeGame;
