import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

interface TeamMember {
    name: string;
    role: string;
    country: string;
    image: string;
    bio: string;
}

interface PlayerProfileProps {
    player: TeamMember;
    onClose: () => void;
}

const PlayerProfile: React.FC<PlayerProfileProps> = ({ player, onClose }) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
                onClose();
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.body.style.overflow = 'hidden';

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.body.style.overflow = 'unset';
        };
    }, [onClose]);

    return (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-2 sm:p-4 animate-fadeIn">
            <div
                ref={modalRef}
                className="bg-white rounded-2xl w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[85vw] lg:max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl transform transition-all animate-slideUp flex flex-col"
            >
                <div className="relative flex flex-col h-full">
                    {/* Header with close button */}
                    <div className="absolute top-2 right-2 sm:top-0 sm:right-0 p-3 sm:p-4 z-30">
                        <motion.button
                            onClick={onClose}
                            aria-label="Close profile modal"
                            className="bg-white text-gray-800 hover:text-gray-950 rounded-full p-2 sm:p-2.5 transition-all duration-200 shadow-lg hover:shadow-xl cursor-pointer border border-gray-300"
                            whileHover={{ scale: 1.1, rotate: 90 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <FontAwesomeIcon icon={["fas", "xmark"]} className="w-6 h-6 sm:w-7 sm:h-7" />
                        </motion.button>
                    </div>

                    {/* Hero Image Section */}
                    <div className="relative h-48 sm:h-64 md:h-72 lg:h-80 flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50" />
                        <img
                            src={player.image}
                            alt={player.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6">
                            <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-2 sm:mb-3">
                                <span className="bg-[#FFD000] text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                                    {player.country}
                                </span>
                                <span className="bg-[#0d46d7] text-white px-2.5 sm:px-4 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-medium shadow-lg">
                                    {player.role}
                                </span>
                            </div>
                            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-1 sm:mb-2 drop-shadow-lg">
                                {player.name}
                            </h2>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-3 sm:p-4 md:p-6 lg:p-8 overflow-y-auto flex-grow">
                        <div className="prose max-w-none mb-4 sm:mb-6 md:mb-8">
                            <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed">{player.bio}</p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 md:gap-6">
                            <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-xl shadow-inner">
                                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 flex items-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#0d46d7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                                    </svg>
                                    Achievements
                                </h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-[#FFD000] mr-2 text-sm sm:text-base">•</span>
                                        <span className="text-gray-600 text-sm sm:text-base">Champion in {player.country}</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#FFD000] mr-2 text-sm sm:text-base">•</span>
                                        <span className="text-gray-600 text-sm sm:text-base">Active competitor in international events</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#FFD000] mr-2 text-sm sm:text-base">•</span>
                                        <span className="text-gray-600 text-sm sm:text-base">Dedicated to promoting the sport</span>
                                    </li>
                                </ul>
                            </div>

                            <div className="bg-gray-50 p-3 sm:p-4 md:p-6 rounded-xl shadow-inner">
                                <h3 className="font-bold text-lg sm:text-xl text-gray-900 mb-3 sm:mb-4 flex items-center">
                                    <svg className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-[#0d46d7]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Specialties
                                </h3>
                                <ul className="space-y-2 sm:space-y-3">
                                    <li className="flex items-start">
                                        <span className="text-[#FFD000] mr-2 text-sm sm:text-base">•</span>
                                        <span className="text-gray-600 text-sm sm:text-base">Speed Skating</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#FFD000] mr-2 text-sm sm:text-base">•</span>
                                        <span className="text-gray-600 text-sm sm:text-base">Technical Skills</span>
                                    </li>
                                    <li className="flex items-start">
                                        <span className="text-[#FFD000] mr-2 text-sm sm:text-base">•</span>
                                        <span className="text-gray-600 text-sm sm:text-base">Team Leadership</span>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-col sm:flex-row gap-3 sm:gap-4">
                            <button
                                className="flex-1 bg-[#0d46d7] text-white py-3 px-6 rounded-xl font-semibold text-lg shadow-md hover:bg-[#1e5bff] transition-colors duration-300 cursor-pointer"
                            >
                                Follow Athlete
                            </button>
                            <button
                                className="flex-1 bg-gray-100 text-gray-800 py-3 px-6 rounded-xl font-semibold text-lg shadow-md hover:bg-gray-200 transition-colors duration-300 cursor-pointer"
                            >
                                Share Profile
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PlayerProfile; 