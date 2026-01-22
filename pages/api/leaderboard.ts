import { Redis } from "@upstash/redis";
import { NextRequest, NextResponse } from "next/server";

const redis = Redis.fromEnv();

export const config = {
  runtime: "edge",
};

interface LeaderboardEntry {
  firstName: string;
  lastName: string;
  score: number;
  rating: number;
  feedback: string;
  timestamp: string;
}

const LEADERBOARD_KEY = "snake:leaderboard";
const MAX_ENTRIES = 100; // Store top 100 scores

export default async function handler(req: NextRequest): Promise<NextResponse> {
  // GET - Retrieve leaderboard
  if (req.method === "GET") {
    try {
      const entries = await redis.zrange(LEADERBOARD_KEY, 0, -1, {
        rev: true,
        withScores: true,
      });

      // Parse the entries - zrange returns [member, score, member, score, ...]
      const leaderboard: LeaderboardEntry[] = [];
      for (let i = 0; i < entries.length; i += 2) {
        try {
          const entry =
            typeof entries[i] === "string"
              ? JSON.parse(entries[i] as string)
              : entries[i];
          leaderboard.push({
            ...entry,
            score: Number(entries[i + 1]),
          });
        } catch {
          // Skip invalid entries
        }
      }

      return NextResponse.json({ leaderboard: leaderboard.slice(0, 10) });
    } catch (error) {
      console.error("Failed to fetch leaderboard:", error);
      return NextResponse.json({ leaderboard: [] });
    }
  }

  // POST - Add new entry
  if (req.method === "POST") {
    if (req.headers.get("Content-Type") !== "application/json") {
      return new NextResponse("Content-Type must be application/json", {
        status: 400,
      });
    }

    try {
      const body = await req.json();
      const { firstName, lastName, score, rating, feedback } = body;

      // Validate required fields
      if (!firstName || !lastName || typeof score !== "number") {
        return new NextResponse("Missing required fields", { status: 400 });
      }

      // Don't store 0 scores
      if (score <= 0) {
        return new NextResponse("Score must be greater than 0", { status: 400 });
      }

      const entry: Omit<LeaderboardEntry, "score"> = {
        firstName: String(firstName).slice(0, 50),
        lastName: String(lastName).slice(0, 50),
        rating: Math.min(5, Math.max(0, Number(rating) || 0)),
        feedback: String(feedback || "").slice(0, 500),
        timestamp: new Date().toISOString(),
      };

      // Create unique member ID to allow duplicate scores
      const memberId = `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

      // Add to sorted set with score as the sort value
      await redis.zadd(LEADERBOARD_KEY, {
        score: score,
        member: JSON.stringify({ ...entry, id: memberId }),
      });

      // Trim to keep only top MAX_ENTRIES
      const count = await redis.zcard(LEADERBOARD_KEY);
      if (count > MAX_ENTRIES) {
        await redis.zremrangebyrank(LEADERBOARD_KEY, 0, count - MAX_ENTRIES - 1);
      }

      return NextResponse.json({ success: true });
    } catch (error) {
      console.error("Failed to add leaderboard entry:", error);
      return new NextResponse("Failed to save score", { status: 500 });
    }
  }

  return new NextResponse("Method not allowed", { status: 405 });
}
