"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

const AboutSection: React.FC = () => {
    const [showMore, setShowMore] = useState(false)

    return (
        <section id="about-section" className="relative py-20 overflow-hidden">
            {/* Background with subtle pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#f9f7f7] to-[#f0ebeb] opacity-80 z-0"></div>

            {/* Decorative elements */}
            <div className="absolute top-20 left-10 w-40 h-40 bg-[#0d46d7]/5 rounded-full blur-3xl"></div>
            <div className="absolute bottom-20 right-10 w-60 h-60 bg-[#EE7A3F]/5 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 relative z-10 max-w-6xl">
                <div className="flex flex-col md:flex-row items-center gap-16">
                    {/* Image Column with enhanced styling */}
                    <motion.div
                        className="md:w-1/2 flex justify-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            {/* Decorative frame */}
                            <div className="absolute -inset-4 bg-white/80 rounded-2xl shadow-xl -z-10"></div>
                            <div className="absolute -inset-1 bg-gradient-to-tr from-[#0d46d7]/20 to-[#EE7A3F]/20 rounded-xl -z-5"></div>

                            {/* Main image */}
                            <div className="relative w-72 h-72 overflow-hidden rounded-lg shadow-lg border-2 border-white">
                                <img
                                    src="/team/06.avif"
                                    alt="About FVA"
                                    className="object-cover w-full h-full transition-transform duration-700 hover:scale-105"
                                />
                            </div>

                            {/* Animated accent elements */}
                            <motion.div
                                className="absolute -bottom-4 -right-4 w-20 h-20 bg-[#EE7A3F]/10 rounded-lg"
                                initial={{ rotate: 12, scale: 0 }}
                                whileInView={{ rotate: 12, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.4 }}
                                animate={{
                                    rotate: [12, 18, 12],
                                    y: [0, -8, 0],
                                    transition: {
                                        rotate: { duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                                        y: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                                    },
                                }}
                                viewport={{ once: true }}
                            ></motion.div>
                            <motion.div
                                className="absolute -top-4 -left-4 w-16 h-16 bg-[#0d46d7]/10 rounded-lg"
                                initial={{ rotate: -12, scale: 0 }}
                                whileInView={{ rotate: -12, scale: 1 }}
                                transition={{ duration: 0.8, delay: 0.6 }}
                                animate={{
                                    rotate: [-12, -18, -12],
                                    y: [0, 8, 0],
                                    transition: {
                                        rotate: { duration: 3.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                                        y: { duration: 2.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                                    },
                                }}
                                viewport={{ once: true }}
                            ></motion.div>
                        </div>
                    </motion.div>

                    {/* Content Column with enhanced typography */}
                    <motion.div
                        className="md:w-1/2 text-center md:text-left"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <div className="relative">
                            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 text-[#0d46d7] tracking-tight">
                                About FVA
                            </h2>
                            <div className="w-20 h-1 bg-[#FFD000] mb-6 mx-auto md:mx-0"></div>

                            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                                Future Vision Agency (FVA) is dedicated to empowering young athletes and promoting the spirit of teamwork, discipline, and excellence through competitive sports. Our mission is to nurture talent, foster community, and inspire the next generation of champions.
                                {showMore && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5 }}
                                    >
                                        {' '}We believe in the power of sports to transform lives, build character, and create lasting friendships. Through our programs, we provide opportunities for growth, learning, and achievement, helping every athlete reach their full potential both on and off the field.
                                    </motion.span>
                                )}
                            </p>

                            <button
                                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md text-[#0d46d7] font-medium hover:bg-[#0d46d7] hover:text-white transition-all duration-300"
                                onClick={() => setShowMore((v) => !v)}
                            >
                                {showMore ? 'Read Less' : 'Read More'}
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`transition-transform duration-300 ${showMore ? "rotate-180" : ""}`}
                                >
                                    <polyline points="6 9 12 15 18 9"></polyline>
                                </svg>
                            </button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default AboutSection


