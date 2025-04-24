import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import myImage from '../assets/img01.png';
import myImage1 from '../assets/img002.png';
import Navigation from './Navigation';

interface FVALogoProps {
    width?: string | number;
    height?: string | number;
    className?: string;
}

const FVALogo: React.FC<FVALogoProps> = ({
    width = '200px',
    height = '100px',
    className = ''
}) => {
    return (
        <div className={`inline-block ${className}`} style={{ width, height }}>
            <svg
                viewBox="0 0 429.24 214.79"
                xmlns="http://www.w3.org/2000/svg"
                className="w-full h-full"
            >
                <path
                    d="M188.33,205.21L127.29,18.19c-2.93-8.98,3.76-18.19,13.2-18.19h.64c6.06,0,11.41,3.92,13.24,9.7l30.39,96.1c9.24,29,17.21,55.13,22.94,80.3h.64c6.06-24.86,14.98-51.94,24.54-79.99l33.12-96.73c1.92-5.62,7.2-9.39,13.14-9.39h0c9.6,0,16.31,9.52,13.08,18.56l-66.87,187.01c-1.98,5.52-7.21,9.21-13.08,9.21h-10.74c-6.01,0-11.34-3.86-13.2-9.58Z"
                    fill="#0d46d7"
                />
                <path
                    d="M337.74,0h10.74c5.87,0,11.1,3.69,13.08,9.21l66.87,187.01c3.23,9.04-3.47,18.56-13.08,18.56h0c-5.94,0-11.22-3.77-13.14-9.39l-33.12-96.73c-9.56-28.04-18.48-55.13-24.54-79.99h-.64c-5.74,25.17-13.7,51.31-22.94,80.3l-30.39,96.1c-1.83,5.77-7.18,9.7-13.24,9.7h-.64c-9.44,0-16.13-9.22-13.2-18.19L324.54,9.58c1.86-5.71,7.19-9.58,13.2-9.58Z"
                    fill="#0d46d7"
                />
                <path
                    d="M27.73,94.65V23.26h76.32c6.42,0,11.63-5.21,11.63-11.63h0c0-6.42-5.21-11.63-11.63-11.63H11.63C5.21,0,0,5.21,0,11.63v191.52c0,6.42,5.21,11.63,11.63,11.63h4.46c6.42,0,11.63-5.21,11.63-11.63v-108.51Z"
                    fill="#0d46d7"
                />
                <circle cx="65.64" cy="99.52" r="14.45" fill="#0d46d7" />
                <circle cx="346.02" cy="128.42" r="14.45" fill="#0d46d7" />
            </svg>
        </div>
    );
};

const HeroSection: React.FC = () => {
    const logoRef = useRef<HTMLDivElement>(null);

    return (
        <div className="relative w-full overflow-hidden bg-[#F3EDED] min-h-screen">
            <Navigation />
            <div className="container mx-auto px-6 pt-0 md:px-4 md:pt-32">
                <div className="flex flex-col md:grid md:grid-cols-2 gap-4 md:gap-8 items-start md:items-center min-h-[60vh] md:min-h-[80vh]">
                    <div className="relative z-10 space-y-4 md:space-y-6 lg:ml-56">
                        <div className="mt-2 md:mt-0" ref={logoRef}>
                            <FVALogo width="180px" height="90px" className="md:w-[200px] md:h-[100px]" />
                        </div>
                        <h2 className="text-7xl font-light leading-tight">
                            <span className="text-[#EE7A3F] md:inline block">BETTER</span>
                            <span className="text-[#EE7A3F] md:inline block md:ml-4">TOGETHER</span>
                        </h2>
                        <p className="text-gray-600 text-lg">
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        </p>
                        <motion.button
                            className="bg-[#0d46d7] text-white px-8 py-3 rounded-md text-lg font-medium mt-6"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            READ MORE
                        </motion.button>
                    </div>

                    <div className="relative md:order-last w-full">
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="absolute inset-0">
                                <div className="absolute top-1/4 right-1/4 w-8 h-8 bg-[#0d46d7] rounded-full opacity-40"></div>
                                <div className="absolute bottom-1/3 left-1/4 w-12 h-12 bg-[#0d46d7] rounded-full opacity-20"></div>
                                <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-[#0d46d7] rounded-full opacity-30"></div>
                            </div>

                            <div className="flex flex-col md:flex-row items-center md:items-end justify-center md:justify-end gap-4 relative">
                                <motion.img
                                    src={myImage}
                                    alt="Athlete skating"
                                    className="w-3/4 md:w-1/2 h-auto object-contain relative z-10"
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.3, duration: 0.8 }}
                                />
                                <motion.img
                                    src={myImage1}
                                    alt="Athlete skating"
                                    className="hidden md:block w-1/2 h-auto object-contain relative z-20"
                                    initial={{ y: -20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeroSection; 