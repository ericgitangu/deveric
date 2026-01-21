"use client";

import React, { useRef, useEffect } from "react";
import { useMousePosition } from "../../util/mouse";

interface ParticlesProps {
	className?: string;
	quantity?: number;
	staticity?: number;
	ease?: number;
	refresh?: boolean;
	twinkle?: boolean;
	constellation?: boolean;
}

export default function Particles({
	className = "",
	quantity = 30,
	staticity = 50,
	ease = 50,
	refresh = false,
	twinkle = true,
	constellation = true,
}: ParticlesProps) {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const canvasContainerRef = useRef<HTMLDivElement>(null);
	const context = useRef<CanvasRenderingContext2D | null>(null);
	const circles = useRef<Circle[]>([]);
	const mousePosition = useMousePosition();
	const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });
	const canvasSize = useRef<{ w: number; h: number }>({ w: 0, h: 0 });
	const dpr = typeof window !== "undefined" ? window.devicePixelRatio : 1;
	const animationFrame = useRef<number>(0);

	type Circle = {
		x: number;
		y: number;
		translateX: number;
		translateY: number;
		size: number;
		alpha: number;
		targetAlpha: number;
		dx: number;
		dy: number;
		magnetism: number;
		isBrightStar: boolean;
		twinkleSpeed: number;
		twinklePhase: number;
	};

	useEffect(() => {
		if (canvasRef.current) {
			context.current = canvasRef.current.getContext("2d");
		}
		initCanvas();
		animate();
		window.addEventListener("resize", initCanvas);

		return () => {
			window.removeEventListener("resize", initCanvas);
			if (animationFrame.current) {
				cancelAnimationFrame(animationFrame.current);
			}
		};
	}, []);

	useEffect(() => {
		onMouseMove();
	}, [mousePosition.x, mousePosition.y]);

	useEffect(() => {
		initCanvas();
	}, [refresh]);

	const initCanvas = () => {
		resizeCanvas();
		drawParticles();
	};

	const onMouseMove = () => {
		if (canvasRef.current) {
			const rect = canvasRef.current.getBoundingClientRect();
			const { w, h } = canvasSize.current;
			const x = mousePosition.x - rect.left - w / 2;
			const y = mousePosition.y - rect.top - h / 2;
			const inside = x < w / 2 && x > -w / 2 && y < h / 2 && y > -h / 2;
			if (inside) {
				mouse.current.x = x;
				mouse.current.y = y;
			}
		}
	};

	const resizeCanvas = () => {
		if (canvasContainerRef.current && canvasRef.current && context.current) {
			circles.current.length = 0;
			canvasSize.current.w = canvasContainerRef.current.offsetWidth;
			canvasSize.current.h = canvasContainerRef.current.offsetHeight;
			canvasRef.current.width = canvasSize.current.w * dpr;
			canvasRef.current.height = canvasSize.current.h * dpr;
			canvasRef.current.style.width = `${canvasSize.current.w}px`;
			canvasRef.current.style.height = `${canvasSize.current.h}px`;
			context.current.scale(dpr, dpr);
		}
	};

	const circleParams = (): Circle => {
		const x = Math.floor(Math.random() * canvasSize.current.w);
		const y = Math.floor(Math.random() * canvasSize.current.h);
		const translateX = 0;
		const translateY = 0;
		// 10% chance of being a bright star
		const isBrightStar = Math.random() < 0.1;
		const size = isBrightStar
			? Math.random() * 2 + 1.5 // Bright stars: 1.5-3.5px
			: Math.floor(Math.random() * 2) + 0.1; // Regular stars: 0.1-2px
		const alpha = 0;
		const targetAlpha = isBrightStar
			? parseFloat((Math.random() * 0.4 + 0.6).toFixed(2)) // Bright: 0.6-1.0
			: parseFloat((Math.random() * 0.6 + 0.1).toFixed(2)); // Regular: 0.1-0.7
		const dx = (Math.random() - 0.5) * 0.2;
		const dy = (Math.random() - 0.5) * 0.2;
		const magnetism = 0.1 + Math.random() * 4;
		// Twinkle parameters
		const twinkleSpeed = Math.random() * 0.03 + 0.01; // Speed of twinkling
		const twinklePhase = Math.random() * Math.PI * 2; // Random starting phase
		return {
			x,
			y,
			translateX,
			translateY,
			size,
			alpha,
			targetAlpha,
			dx,
			dy,
			magnetism,
			isBrightStar,
			twinkleSpeed,
			twinklePhase,
		};
	};

	const drawCircle = (circle: Circle, update = false) => {
		if (context.current) {
			const { x, y, translateX, translateY, size, alpha, isBrightStar } =
				circle;
			context.current.translate(translateX, translateY);
			context.current.beginPath();
			context.current.arc(x, y, size, 0, 2 * Math.PI);

			if (isBrightStar && alpha > 0.3) {
				// Add a subtle glow effect for bright stars
				const gradient = context.current.createRadialGradient(
					x,
					y,
					0,
					x,
					y,
					size * 3,
				);
				gradient.addColorStop(0, `rgba(255, 255, 255, ${alpha})`);
				gradient.addColorStop(0.4, `rgba(200, 220, 255, ${alpha * 0.5})`);
				gradient.addColorStop(1, "rgba(200, 220, 255, 0)");
				context.current.fillStyle = gradient;
				context.current.arc(x, y, size * 3, 0, 2 * Math.PI);
			} else {
				context.current.fillStyle = `rgba(255, 255, 255, ${alpha})`;
			}
			context.current.fill();
			context.current.setTransform(dpr, 0, 0, dpr, 0, 0);

			if (!update) {
				circles.current.push(circle);
			}
		}
	};

	const drawConstellationLines = () => {
		if (!context.current || !constellation) return;

		const brightStars = circles.current.filter(
			(c) => c.isBrightStar && c.alpha > 0.4,
		);
		const connectionDistance = 150;

		context.current.strokeStyle = "rgba(150, 180, 255, 0.15)";
		context.current.lineWidth = 0.5;

		for (let i = 0; i < brightStars.length; i++) {
			for (let j = i + 1; j < brightStars.length; j++) {
				const star1 = brightStars[i];
				const star2 = brightStars[j];
				const dx =
					star1.x + star1.translateX - (star2.x + star2.translateX);
				const dy =
					star1.y + star1.translateY - (star2.y + star2.translateY);
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < connectionDistance) {
					const opacity = 1 - distance / connectionDistance;
					context.current.strokeStyle = `rgba(150, 180, 255, ${opacity * 0.15})`;
					context.current.beginPath();
					context.current.moveTo(
						star1.x + star1.translateX,
						star1.y + star1.translateY,
					);
					context.current.lineTo(
						star2.x + star2.translateX,
						star2.y + star2.translateY,
					);
					context.current.stroke();
				}
			}
		}
	};

	const clearContext = () => {
		if (context.current) {
			context.current.clearRect(
				0,
				0,
				canvasSize.current.w,
				canvasSize.current.h,
			);
		}
	};

	const drawParticles = () => {
		clearContext();
		const particleCount = quantity;
		for (let i = 0; i < particleCount; i++) {
			const circle = circleParams();
			drawCircle(circle);
		}
	};

	const remapValue = (
		value: number,
		start1: number,
		end1: number,
		start2: number,
		end2: number,
	): number => {
		const remapped =
			((value - start1) * (end2 - start2)) / (end1 - start1) + start2;
		return remapped > 0 ? remapped : 0;
	};

	const animate = () => {
		clearContext();

		// Draw constellation lines first (behind stars)
		if (constellation) {
			drawConstellationLines();
		}

		circles.current.forEach((circle: Circle, i: number) => {
			// Handle the alpha value with twinkling
			const edge = [
				circle.x + circle.translateX - circle.size,
				canvasSize.current.w - circle.x - circle.translateX - circle.size,
				circle.y + circle.translateY - circle.size,
				canvasSize.current.h - circle.y - circle.translateY - circle.size,
			];
			const closestEdge = edge.reduce((a, b) => Math.min(a, b));
			const remapClosestEdge = parseFloat(
				remapValue(closestEdge, 0, 20, 0, 1).toFixed(2),
			);

			// Base alpha calculation
			let baseAlpha = circle.targetAlpha;
			if (remapClosestEdge <= 1) {
				baseAlpha = circle.targetAlpha * remapClosestEdge;
			}

			// Apply twinkling effect
			if (twinkle) {
				circle.twinklePhase += circle.twinkleSpeed;
				const twinkleFactor = circle.isBrightStar
					? 0.3 + Math.sin(circle.twinklePhase) * 0.3 // Bright stars: more dramatic twinkle
					: 0.7 + Math.sin(circle.twinklePhase) * 0.15; // Regular: subtle twinkle
				circle.alpha = baseAlpha * twinkleFactor;
			} else {
				if (remapClosestEdge > 1) {
					circle.alpha += 0.02;
					if (circle.alpha > circle.targetAlpha) {
						circle.alpha = circle.targetAlpha;
					}
				} else {
					circle.alpha = baseAlpha;
				}
			}

			circle.x += circle.dx;
			circle.y += circle.dy;
			circle.translateX +=
				(mouse.current.x / (staticity / circle.magnetism) - circle.translateX) /
				ease;
			circle.translateY +=
				(mouse.current.y / (staticity / circle.magnetism) - circle.translateY) /
				ease;

			// Circle gets out of the canvas
			if (
				circle.x < -circle.size ||
				circle.x > canvasSize.current.w + circle.size ||
				circle.y < -circle.size ||
				circle.y > canvasSize.current.h + circle.size
			) {
				circles.current.splice(i, 1);
				const newCircle = circleParams();
				drawCircle(newCircle);
			} else {
				drawCircle(
					{
						...circle,
						x: circle.x,
						y: circle.y,
						translateX: circle.translateX,
						translateY: circle.translateY,
						alpha: circle.alpha,
					},
					true,
				);
			}
		});
		animationFrame.current = window.requestAnimationFrame(animate);
	};

	return (
		<div className={className} ref={canvasContainerRef} aria-hidden="true">
			<canvas ref={canvasRef} />
		</div>
	);
}
