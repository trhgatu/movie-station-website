import React from 'react';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export function IntroSection() {
    return (
        <div className="flex justify-between items-center py-12 px-6">
            <div className="flex-1 pr-6">
                <DotLottieReact
                    className='h-32 w-full'
                    src="https://lottie.host/144133cc-22b1-49d2-81d8-4a1fae5c4aae/bQW6oR4Scl.lottie"
                    loop
                    autoplay
                />
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



