import React from 'react';

export function IntroSection() {
    return (
        <div className="flex justify-between items-center py-12 px-6">
            <div className="flex-1 pr-6">
                <h2 className="text-4xl font-semibold mb-4">Welcome to</h2>
                <h1 className="text-7xl font-extrabold text-red-500">Movie Station</h1>

                <p className="text-lg mb-6">
                    Discover the latest movies and TV shows. Stream exclusive content and enjoy top-rated films.
                </p>
                <button className="bg-red-600 px-6 py-3 rounded-fullfont-semibold hover:bg-red-700 transition">
                    Get Started
                </button>
            </div>
        </div>
    )
}



