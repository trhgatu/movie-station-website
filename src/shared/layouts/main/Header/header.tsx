import { useState } from "react";
import { ModeToggle } from "@/shared/components/darkmode-toggle/darkmode-toggle";


export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            className="header fixed top-0 z-50 w-full bg-white dark:bg-black border-solid border-b h-[var(--header-height)]"
        >
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-2xl font-bold">
                    <a href="/">MovieS</a>
                </div>
                <div>
                    <ModeToggle />
                </div>
                <nav className="hidden md:flex space-x-6">
                    <a href="/movies" className="hover:text-red-500 transition-all">
                        Movies
                    </a>
                    <a href="/tv-shows" className="hover:text-red-500 transition-all">
                        TV Shows
                    </a>
                    <a href="/favorites" className="hover:text-red-500 transition-all">
                        Favorites
                    </a>
                    <a href="/profile" className="hover:text-red-500 transition-all">
                        Profile
                    </a>
                </nav>
                <button
                    className="md:hidden text-2xl focus:outline-none"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    ☰
                </button>
            </div>
            {isMenuOpen && (
                <div className="md:hidden bg-gray-800">
                    <nav className="flex flex-col space-y-4 py-4 px-6">
                        <a href="/movies" className="hover:text-red-500 transition-all">
                            Movies
                        </a>
                        <a href="/tv-shows" className="hover:text-red-500 transition-all">
                            TV Shows
                        </a>
                        <a href="/favorites" className="hover:text-red-500 transition-all">
                            Favorites
                        </a>
                        <a href="/profile" className="hover:text-red-500 transition-all">
                            Profile
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
