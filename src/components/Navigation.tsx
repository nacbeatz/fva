import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../assets/logo.png';

const Navigation: React.FC = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };

        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <>
            <header className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 transition-all duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white/80 backdrop-blur-sm'}`}>
                <div className="flex items-center">
                    <Link to="/">
                        <img src={logo} alt="FVA Logo" className="w-16 h-16 transition-all duration-300" style={{ cursor: 'pointer' }} />
                    </Link>
                </div>
                <nav className="hidden md:flex text-xl space-x-8 text-gray-800 font-medium">
                    <Link to="/" className="hover:text-blue-700 transition-colors">HOME</Link>
                    <a href="#about" className="hover:text-blue-700 transition-colors">ABOUT</a>
                    <a href="#competitions" className="hover:text-blue-700 transition-colors">COMPETITIONS</a>
                    <a href="#support" className="hover:text-blue-700 transition-colors">SUPPORT US</a>
                    <Link to="/team" className="hover:text-blue-700 transition-colors">TEAM</Link>
                    <a href="#contact" className="hover:text-blue-700 transition-colors">CONTACT</a>
                    <a href="#shop" className="hover:text-blue-700 transition-colors">SHOP</a>
                </nav>
                <div className="flex items-center space-x-4">
                    <button
                        className="md:hidden p-2"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="hidden md:flex space-x-4">
                        <a href="#instagram" aria-label="Instagram">
                            <svg className="w-6 h-6 text-gray-800 hover:text-[#0d46d7] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                            </svg>
                        </a>
                        <a href="#facebook" aria-label="Facebook">
                            <svg className="w-6 h-6 text-gray-800 hover:text-[#0d46d7] transition-colors" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
                            </svg>
                        </a>
                    </div>
                </div>
            </header>

            <motion.div
                className="fixed top-24 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm md:hidden"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: isMenuOpen ? 1 : 0, y: isMenuOpen ? 0 : -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: isMenuOpen ? 'block' : 'none' }}
            >
                <nav className="flex flex-col p-4 space-y-4 text-lg text-gray-800">
                    <Link to="/" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>HOME</Link>
                    <a href="#about" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>ABOUT</a>
                    <a href="#competitions" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>COMPETITIONS</a>
                    <a href="#support" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>SUPPORT US</a>
                    <Link to="/team" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>TEAM</Link>
                    <a href="#contact" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>CONTACT</a>
                    <a href="#shop" className="hover:text-blue-700 transition-colors" onClick={() => setIsMenuOpen(false)}>SHOP</a>
                </nav>
            </motion.div>
        </>
    );
};

export default Navigation; 