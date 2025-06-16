"use client"

import type React from "react"
import { useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Navigation from "./Navigation"
import FVALogo from "./FVALogo"

const HeroSection: React.FC = () => {
    const logoRef = useRef<HTMLDivElement>(null)
    const [isExpanded, setIsExpanded] = useState(false)

    return (
        <div className="relative w-full overflow-hidden bg-[#1e40af] min-h-screen">
            <Navigation />

            {/* Background decorative elements */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Large decorative circles */}
                <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-400/20 rounded-full blur-3xl"></div>
                <div className="absolute top-1/3 -left-32 w-96 h-96 bg-blue-300/15 rounded-full blur-3xl"></div>
                <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-2xl"></div>

                {/* Small floating circles */}
                <motion.div
                    className="absolute top-1/4 right-1/3 w-4 h-4 bg-white/30 rounded-full"
                    animate={{
                        y: [0, -20, 0],
                        opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                        duration: 4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
                <motion.div
                    className="absolute top-1/2 right-1/4 w-6 h-6 bg-white/20 rounded-full"
                    animate={{
                        y: [0, 15, 0],
                        opacity: [0.2, 0.5, 0.2],
                    }}
                    transition={{
                        duration: 5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1,
                    }}
                />
                <motion.div
                    className="absolute bottom-1/3 right-1/2 w-3 h-3 bg-white/25 rounded-full"
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.25, 0.4, 0.25],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 2,
                    }}
                />
                {/* New animated circles */}
                <motion.div
                    className="absolute top-1/5 left-1/4 w-5 h-5 bg-yellow-300/30 rounded-full"
                    animate={{
                        x: [0, 20, 0],
                        opacity: [0.4, 0.7, 0.4],
                    }}
                    transition={{
                        duration: 4.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 0.5,
                    }}
                />
                <motion.div
                    className="absolute bottom-1/4 left-1/5 w-7 h-7 bg-pink-300/35 rounded-full"
                    animate={{
                        y: [0, -25, 0],
                        opacity: [0.35, 0.6, 0.35],
                    }}
                    transition={{
                        duration: 6,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                        delay: 1.5,
                    }}
                />
            </div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center w-full">
                    {/* Content Section */}
                    <div className="relative z-10 space-y-6 lg:space-y-8 lg:ml-24">
                        {/* FVA Logo/Text */}
                        <motion.div
                            className="space-y-2 mt-24"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <FVALogo width="120px" height="60px" className="md:w-[200px] md:h-[100px]" />
                        </motion.div>

                        {/* Better Together */}
                        <motion.h2
                            className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight tracking-wide"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3, duration: 0.8 }}
                        >
                            BETTER TOGETHER
                        </motion.h2>

                        {/* Description */}
                        <div className="space-y-4">
                            <motion.p
                                className="text-lg sm:text-xl text-white max-w-2xl leading-relaxed"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5, duration: 0.6 }}
                            >
                                Empowering athletes to reach their full potential through professional management, strategic partnerships, and comprehensive support in their sporting journey.
                            </motion.p>

                            <AnimatePresence>
                                {isExpanded && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.5 }}
                                        className="overflow-hidden"
                                    >
                                        <p className="text-lg sm:text-xl text-white max-w-2xl leading-relaxed">
                                            Our agency specializes in athlete representation, career development, and brand building. We work closely with our athletes to create opportunities that align with their goals and values, ensuring long-term success both in their sport and beyond.
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* CTA Button */}
                        <motion.button
                            className="bg-[#FFD000] text-[#1e40af] px-8 py-4 rounded-full text-lg font-semibold mt-8 hover:bg-[#ffd000]/90 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1 cursor-pointer"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.7, duration: 0.6 }}
                            onClick={() => setIsExpanded(!isExpanded)}
                        >
                            {isExpanded ? "READ LESS" : "READ MORE"}
                        </motion.button>
                    </div>

                    {/* Image Section */}
                    <div className="relative lg:block">
                        <motion.div
                            className="relative h-80 sm:h-96 md:h-[500px] lg:h-[700px] xl:h-[800px]"
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                        >
                            {/* Athlete silhouette/image */}
                            <div className="absolute inset-0 flex items-center justify-center lg:justify-end ml-44">
                                <motion.img
                                    src="/team/v2_hero.png"
                                    alt="Athlete skating"
                                    className="h-full w-full object-cover object-center scale-120 lg:scale-125 opacity-90"
                                    initial={{ opacity: 0, scale: 1.05 }}
                                    animate={{ opacity: 0.9, scale: 1.1 }}
                                    transition={{ delay: 0.6, duration: 0.8 }}
                                />
                            </div>



                            {/* Additional decorative elements */}
                            <div className="absolute top-1/4 right-1/4 w-6 h-6 bg-white/40 rounded-full"></div>
                            <div className="absolute bottom-1/3 left-1/3 w-8 h-8 bg-white/30 rounded-full"></div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default HeroSection
