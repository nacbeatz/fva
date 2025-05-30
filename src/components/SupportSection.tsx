"use client"

import { useState, useEffect, useRef } from "react"
// Removed: import Image from "next/image"
import { motion } from "framer-motion"
import { Heart, Users, ArrowRight, ArrowLeft, ExternalLink, ChevronRight } from "lucide-react"

const partners = [
    {
        name: "RISE",
        logo: "/paterners/rise.png",
        alt: "RISE",
        url: "https://riseint.org/",
    },
    {
        name: "CROXDEV",
        logo: "/paterners/rise.png",
        alt: "CROXDEV",
        url: "#",
    },
    {
        name: "FVA",
        logo: "/paterners/rise.png",
        alt: "FVA",
        url: "#",
    },
    {
        name: "AKARIHO TECH",
        logo: "/paterners/rise.png",
        alt: "AKARIHO TECH",
        url: "#",
    },
    {
        name: "ONESKATER",
        logo: "/paterners/rise.png",
        alt: "ONESKATER",
        url: "#",
    },
]

const supportOptions = [
    {
        title: "Make a Donation",
        description: "Your financial support helps us provide equipment, training, and opportunities for young athletes.",
        icon: <Heart className="w-6 h-6" />,
        buttonText: "Donate Now",
        color: "from-[#0d46d7] to-[#1e5bff]",
    },
    {
        title: "Volunteer Your Time",
        description: "Share your skills and passion by volunteering at our events or helping with training sessions.",
        icon: <Users className="w-6 h-6" />,
        buttonText: "Join as Volunteer",
        color: "from-[#EE7A3F] to-[#ff8c42]",
    },
]

const SupportSection = () => {
    const [activePartnerIndex, setActivePartnerIndex] = useState(0)
    const [visiblePartners, setVisiblePartners] = useState(3)
    const carouselRef = useRef<HTMLDivElement>(null)

    // Determine visible partners based on screen size
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setVisiblePartners(1)
            } else if (window.innerWidth < 1024) {
                setVisiblePartners(2)
            } else {
                setVisiblePartners(3)
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)
        return () => window.removeEventListener("resize", handleResize)
    }, [])

    // Auto-rotate partners
    useEffect(() => {
        const interval = setInterval(() => {
            nextPartner()
        }, 4000)
        return () => clearInterval(interval)
    }, [activePartnerIndex, visiblePartners])

    const nextPartner = () => {
        setActivePartnerIndex((prev) => (prev + 1) % (partners.length - visiblePartners + 1))
    }

    const prevPartner = () => {
        setActivePartnerIndex((prev) => (prev - 1 + partners.length) % (partners.length - visiblePartners + 1))
    }

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Removed: Background with gradient */}
            {/* Removed: <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50 opacity-80"></div> */}
            {/* Removed: <div className="absolute inset-0 bg-[url('/placeholder.svg')] bg-repeat opacity-5"></div> */}

            {/* Removed: Decorative elements */}
            {/* Removed: <motion.div
                className="absolute top-40 left-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#0d46d7]/10 to-transparent blur-3xl"
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            /> */}
            {/* Removed: <motion.div
                className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-l from-[#EE7A3F]/10 to-transparent blur-3xl"
                animate={{
                    y: [0, 30, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            /> */}

            <div className="container mx-auto px-6 relative z-10">
                {/* Support Us Section */}
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
                            <Heart className="w-5 h-5 text-[#EE7A3F]" />
                            <span className="text-sm font-medium text-gray-600">Support Our Mission</span>
                        </div>
                        <h2 className="text-5xl font-bold mb-4 text-[#0d46d7] tracking-tight">
                            Help Us <span className="text-[#EE7A3F]">Make a Difference</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#0d46d7] to-[#EE7A3F] mx-auto mb-6"></div>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Your support enables us to provide training, equipment, and opportunities for youth development in sports.
                            Together, we can empower the next generation of athletes.
                        </p>
                    </motion.div>

                    {/* Support Options */}
                    <div className="grid md:grid-cols-2 gap-8 mb-24">
                        {supportOptions.map((option, idx) => (
                            <motion.div
                                key={idx}
                                className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: idx * 0.2 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                            >
                                <div className="p-8">
                                    <div className="flex items-start gap-5">
                                        <div className={`p-3 rounded-xl bg-gradient-to-r ${option.color} text-white shadow-lg`}>
                                            {option.icon}
                                        </div>
                                        <div>
                                            <h3 className="text-2xl font-bold text-gray-800 mb-3">{option.title}</h3>
                                            <p className="text-gray-600 mb-6">{option.description}</p>
                                        </div>
                                    </div>

                                    <motion.button
                                        className={`w-full py-4 px-6 rounded-xl text-white font-medium flex items-center justify-center gap-2 bg-gradient-to-r ${option.color} shadow-lg`}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {option.buttonText}
                                        <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Partners Section */}
                    <motion.div
                        className="mb-12 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
                            <Users className="w-5 h-5 text-[#0d46d7]" />
                            <span className="text-sm font-medium text-gray-600">Our Partners</span>
                        </div>
                        <h2 className="text-4xl font-bold mb-8 text-[#0d46d7]">Trusted By</h2>
                    </motion.div>

                    {/* Partners Carousel */}
                    <div className="relative max-w-5xl mx-auto px-10">
                        {/* Carousel Navigation */}
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 z-10">
                            <motion.button
                                className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:text-[#0d46d7] disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={prevPartner}
                                disabled={activePartnerIndex === 0}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ArrowLeft className="w-5 h-5" />
                            </motion.button>
                        </div>

                        <div className="absolute right-0 top-1/2 -translate-y-1/2 z-10">
                            <motion.button
                                className="p-3 rounded-full bg-white shadow-md text-gray-700 hover:text-[#0d46d7] disabled:opacity-50 disabled:cursor-not-allowed"
                                onClick={nextPartner}
                                disabled={activePartnerIndex >= partners.length - visiblePartners}
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                            >
                                <ArrowRight className="w-5 h-5" />
                            </motion.button>
                        </div>

                        {/* Carousel Content */}
                        <div className="overflow-hidden" ref={carouselRef}>
                            <motion.div
                                className="flex gap-8"
                                animate={{
                                    x: `-${(activePartnerIndex * 100) / visiblePartners}%`,
                                }}
                                transition={{ type: "spring", stiffness: 100, damping: 20 }}
                            >
                                {partners.map((partner, idx) => (
                                    <motion.div
                                        key={idx}
                                        className={`flex-shrink-0 w-[calc(100%/${visiblePartners})] p-6`}
                                        whileHover={{ y: -5 }}
                                    >
                                        <div className="bg-white rounded-xl p-6 shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col items-center justify-center border border-gray-100">
                                            <div className="relative w-full h-24 mb-4">
                                                <img
                                                    src={partner.logo}
                                                    alt={partner.alt}
                                                    className="object-contain w-full h-full"
                                                    style={{ maxHeight: '100px' }}
                                                />
                                            </div>
                                            <motion.a
                                                href={partner.url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="inline-flex items-center gap-1.5 text-[#0d46d7] font-medium hover:text-[#EE7A3F] transition-colors"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                {partner.name}
                                                <ExternalLink className="w-3.5 h-3.5" />
                                            </motion.a>
                                        </div>
                                    </motion.div>
                                ))}
                            </motion.div>
                        </div>

                        {/* Carousel Indicators */}
                        <div className="flex justify-center gap-2 mt-8">
                            {Array.from({ length: partners.length - visiblePartners + 1 }).map((_, idx) => (
                                <button
                                    key={idx}
                                    className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${idx === activePartnerIndex ? "bg-[#0d46d7] w-8" : "bg-gray-300 hover:bg-gray-400"
                                        }`}
                                    onClick={() => setActivePartnerIndex(idx)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Call to Action */}
                    <motion.div
                        className="mt-24 text-center"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-gradient-to-r from-[#0d46d7]/10 to-[#EE7A3F]/10 rounded-2xl p-10 shadow-lg backdrop-blur-sm">
                            <h3 className="text-3xl font-bold text-[#0d46d7] mb-4">Become a Partner</h3>
                            <p className="text-gray-700 mb-8 max-w-2xl mx-auto">
                                Join our growing network of partners and help us make a difference in the lives of young athletes.
                                Together, we can create more opportunities and foster the next generation of champions.
                            </p>
                            <motion.button
                                className="bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Partner With Us
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default SupportSection