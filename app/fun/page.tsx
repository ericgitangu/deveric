'use client';

import React from 'react';
import SnakeGame from '@/components/SnakeGame';
import Particles from '@/components/particles';
import TipFetcher from '@/components/TipFetcher';
import { Navigation } from '@/components/nav';
const FunPage: React.FC = () => {
    return (
        <div className="relative w-screen min-h-screen overflow-hidden bg-gradient-to-tl from-black via-zinc-600/20 to-black flex flex-col md:flex-row items-center justify-center p-4">
            <Navigation />
            {/* Particles Background */}
            <Particles className="absolute inset-0 -z-10 animate-fade-in" quantity={100} />

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center justify-center w-full space-y-8 md:space-y-0 md:space-x-8">
                {/* Snake Game Section */}
                <div className="flex flex-col items-center">
                    <SnakeGame />
                </div>

                {/* Leaderboard Section (Hidden on small screens and aligned to the right) */}
                {/* Note: In SnakeGame component, the DataGrid is already included */}
            </div>

            {/* Educational Tips at the Bottom (Visible on all screens) */}
            <TipFetcher />
        </div>
    );
};

export default FunPage;
