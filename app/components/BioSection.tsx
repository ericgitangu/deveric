"use client";

import Link from "next/link";
import { bioData } from "@/about/data";

export function BioSection() {
  return (
    <section className="w-full max-w-2xl mx-auto px-4 text-center">
      {/* Name and Title */}
      <div className="mb-6">
        <h2 className="text-2xl md:text-3xl font-display text-zinc-100 mb-1">
          {bioData.name}
        </h2>
        <p className="text-sm text-zinc-400">
          aka <span className="font-medium text-zinc-300">{bioData.alias}</span>
        </p>
        <p className="mt-2 text-zinc-400">
          {bioData.title} at{" "}
          <Link
            href={bioData.company.url}
            className="text-blue-400 hover:text-blue-300 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            {bioData.company.name}
          </Link>
        </p>
      </div>

      {/* Summary */}
      <p className="text-sm md:text-base text-zinc-400 leading-relaxed mb-6">
        {bioData.summary}
      </p>

      {/* Background Tags */}
      <div className="flex flex-wrap justify-center gap-2 mb-4">
        {bioData.background.map((tag) => (
          <span
            key={tag}
            className="bg-zinc-800 text-zinc-300 rounded-full px-3 py-1 text-xs"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Passions Tags */}
      <div className="flex flex-wrap justify-center gap-2">
        {bioData.passions.map((passion) => (
          <span
            key={passion}
            className="border border-zinc-600 text-zinc-400 rounded-full px-3 py-1 text-xs"
          >
            {passion}
          </span>
        ))}
      </div>
    </section>
  );
}
