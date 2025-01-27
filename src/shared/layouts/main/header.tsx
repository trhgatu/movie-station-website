import { useState, useEffect } from "react";
import { ModeToggle } from "@/shared/components/darkmode-toggle/darkmode-toggle";

export function Header() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    return (
        <header
            className={`fixed top-0 z-50 w-full transition-colors duration-300 ${
                isScrolled ? "bg-white dark:bg-black shadow-lg" : "bg-transparent"
            }`}
        >
            <div className="container mx-auto flex items-center justify-between py-4 px-6">
                <div className="text-2xl font-bold">
                    <a
                        href="/"
                        className={`transition-all ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
                    >
                        MovieS
                    </a>
                </div>
                <div>
                    <ModeToggle />
                </div>
                <nav className="hidden md:flex space-x-6">
                    <a
                        href="/movies"
                        className={`transition-all ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
                    >
                        Movies
                    </a>
                    <a
                        href="/tv-shows"
                        className={`transition-all ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
                    >
                        TV Shows
                    </a>
                    <a
                        href="/favorites"
                        className={`transition-all ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
                    >
                        Favorites
                    </a>
                    <a
                        href="/profile"
                        className={`transition-all ${isScrolled ? "text-black dark:text-white" : "text-white"}`}
                    >
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
                        <a
                            href="/movies"
                            className="hover:text-red-500 transition-all text-white"
                        >
                            Movies
                        </a>
                        <a
                            href="/tv-shows"
                            className="hover:text-red-500 transition-all text-white"
                        >
                            TV Shows
                        </a>
                        <a
                            href="/favorites"
                            className="hover:text-red-500 transition-all text-white"
                        >
                            Favorites
                        </a>
                        <a
                            href="/profile"
                            className="hover:text-red-500 transition-all text-white"
                        >
                            Profile
                        </a>
                    </nav>
                </div>
            )}
        </header>
    );
}
