import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";

export function Footer() {
    return (
        <footer className="bg-black text-gray-300 py-10">
            <div className="container mx-auto px-6">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row justify-between items-center space-y-8 md:space-y-0">
                    {/* Logo and Tagline */}
                    <div className="text-center md:text-left">
                        <a href="/" className="text-3xl font-bold text-white hover:text-red-500 transition-all">
                            Movie Station
                        </a>
                        <p className="text-sm text-gray-400 mt-2">
                            Your ultimate destination for movies and TV shows.
                        </p>
                    </div>
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <FaFacebook size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <FaTwitter size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <FaInstagram size={24} />
                        </a>
                        <a href="#" className="text-gray-400 hover:text-red-500 transition-all">
                            <FaYoutube size={24} />
                        </a>
                    </div>
                </div>

                {/* Divider */}
                <hr className="border-gray-700 my-8" />

                {/* Bottom Section */}
                <div className="text-center text-sm text-gray-400">
                    <p>© {new Date().getFullYear()} Movie Station.</p>
                </div>
            </div>
        </footer>
    );
}
