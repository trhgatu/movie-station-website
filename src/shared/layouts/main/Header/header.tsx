import { useState } from "react";
import { ModeToggle } from "@/shared/components/darkmode-toggle/darkmode-toggle";
import Link from 'next/link';

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <header
            className="header fixed top-0 z-50 w-full bg-white  dark:bg-black border-solid border-b h-[var(--header-height)]"
        >
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-2xl font-bold">
                    <Link href="/" className="hover:text-red-600 transition-all duration-200">MovieS</Link>
                </div>
                <div>
                    <ModeToggle />
                </div>
                <nav className="hidden md:flex space-x-6">
                    <Link href="/movies" className="hover:text-red-500 transition-all">
                        Movies
                    </Link>
                    <Link href="/tv-shows" className="hover:text-red-500 transition-all">
                        TV Shows
                    </Link>
                    <Link href="/favorites" className="hover:text-red-500 transition-all">
                        Favorites
                    </Link>
                    <Link href="/profile" className="hover:text-red-500 transition-all">
                        Profile
                    </Link>
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
                        <Link href="/movies" className="hover:text-red-500 transition-all">
                            Movies
                        </Link>
                        <Link href="/tv-shows" className="hover:text-red-500 transition-all">
                            TV Shows
                        </Link>
                        <Link href="/favorites" className="hover:text-red-500 transition-all">
                            Favorites
                        </Link>
                        <Link href="/profile" className="hover:text-red-500 transition-all">
                            Profile
                        </Link>
                    </nav>
                </div>
            )}
        </header>
    );
}
