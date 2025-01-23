export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-6">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
                    {/* Logo */}
                    <div className="text-2xl font-bold text-white">
                        <a href="/" className="hover:text-red-500 transition-all">
                            MovieHub
                        </a>
                    </div>

                    {/* Navigation Links */}
                    <nav className="flex space-x-6">
                        <a href="/about" className="hover:text-red-500 transition-all">
                            About
                        </a>
                        <a href="/contact" className="hover:text-red-500 transition-all">
                            Contact
                        </a>
                        <a href="/privacy" className="hover:text-red-500 transition-all">
                            Privacy Policy
                        </a>
                        <a href="/terms" className="hover:text-red-500 transition-all">
                            Terms of Service
                        </a>
                    </nav>
                </div>

                {/* Divider */}
                <hr className="border-gray-700 my-6" />

                {/* Bottom Section */}
                <div className="text-center text-sm">
                    <p>© {new Date().getFullYear()} MovieHub. All rights reserved.</p>
                    <p className="mt-2">
                        Made with <span className="text-red-500">❤️</span> by Movie Enthusiasts.
                    </p>
                </div>
            </div>
        </footer>
    );
}
