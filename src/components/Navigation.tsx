"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Instagram, Facebook, Twitter, Linkedin } from "lucide-react"

const Navigation = () => {
    const [isScrolled, setIsScrolled] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [activeSection, setActiveSection] = useState("home")

    const navigationItems = [
        { name: "HOME", href: "#home", id: "home" },
        { name: "ABOUT", href: "#about-section", id: "about-section" },
        { name: "COMPETITIONS", href: "#competitions-section", id: "competitions-section" },
        { name: "TEAM", href: "#team-section", id: "team-section" },
        { name: "SUPPORT", href: "#support-section", id: "support-section" },
        { name: "CONTACT", href: "#contact-section", id: "contact-section" },
    ]

    const socialLinks = [
        { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#instagram" },
        { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#facebook" },
        { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#twitter" },
        { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#linkedin" },
    ]

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50)

            // Update active section based on scroll position
            const sections = navigationItems.map((item) => item.id)
            const currentSection = sections.find((section) => {
                const element = document.getElementById(section)
                if (element) {
                    const rect = element.getBoundingClientRect()
                    return rect.top <= 100 && rect.bottom >= 100
                }
                return false
            })

            if (currentSection) {
                setActiveSection(currentSection)
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const scrollToSection = (sectionId: string) => {
        if (sectionId === "home") {
            window.scrollTo({ top: 0, behavior: "smooth" })
        } else {
            const element = document.getElementById(sectionId)
            if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "start" })
            }
        }
        setIsMenuOpen(false)
    }

    return (
        <>
            {/* Main Navigation */}
            <motion.header
                className={`fixed top-0 left-0 right-0 w-full z-50 transition-all duration-500 ${isScrolled
                    ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-100"
                    : "bg-white/80 backdrop-blur-sm"
                    }`}
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <div className="container mx-auto px-6">
                    <div className="flex items-center justify-between h-20">
                        {/* Logo */}
                        <motion.div
                            className="flex items-center cursor-pointer"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => scrollToSection("home")}
                        >
                            <div className="relative">
                                <div className="absolute inset-0 bg-gradient-to-r from-[#0d46d7]/20 to-[#EE7A3F]/20 rounded-full blur-lg"></div>
                                <img
                                    src="/logo.png"
                                    alt="FVA Logo"
                                    width={60}
                                    height={60}
                                    className="relative rounded-full border-2 border-white shadow-lg"
                                />
                            </div>
                            <div className="ml-3 hidden sm:block">
                                <h1 className="text-xl font-bold text-[#0d46d7]">FVA</h1>
                                <p className="text-xs text-gray-500">Future Vision Agency</p>
                            </div>
                        </motion.div>

                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center space-x-8">
                            {navigationItems.map((item, index) => (
                                <motion.button
                                    key={item.name}
                                    className={`relative px-4 py-2 text-sm font-medium transition-all duration-300 ${activeSection === item.id ? "text-[#0d46d7]" : "text-gray-700 hover:text-[#0d46d7]"
                                        }`}
                                    onClick={() => scrollToSection(item.id)}
                                    whileHover={{ y: -2 }}
                                    initial={{ opacity: 0, y: -20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.5 }}
                                >
                                    {item.name}
                                    {activeSection === item.id && (
                                        <motion.div
                                            className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#0d46d7] to-[#EE7A3F]"
                                            layoutId="activeTab"
                                            initial={{ scaleX: 0 }}
                                            animate={{ scaleX: 1 }}
                                            transition={{ duration: 0.3 }}
                                        />
                                    )}
                                </motion.button>
                            ))}
                        </nav>

                        {/* Desktop Social Links & CTA */}
                        <div className="hidden lg:flex items-center space-x-4">
                            {/* Social Links */}
                            <div className="flex items-center space-x-3">
                                {socialLinks.slice(0, 2).map((social, idx) => (
                                    <motion.a
                                        key={social.name}
                                        href={social.href}
                                        className="p-2 text-gray-600 hover:text-[#0d46d7] transition-colors"
                                        whileHover={{ scale: 1.2, rotate: 5 }}
                                        whileTap={{ scale: 0.9 }}
                                        aria-label={social.name}
                                    >
                                        {social.icon}
                                    </motion.a>
                                ))}
                            </div>

                            {/* CTA Button */}
                            <motion.button
                                className="bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#EE7A3F] hover:to-[#ff8c42] text-white px-6 py-2.5 rounded-full font-medium shadow-lg hover:shadow-xl transition-all duration-300"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => scrollToSection("support-section")}
                            >
                                Join Us
                            </motion.button>
                        </div>

                        {/* Mobile Menu Button */}
                        <motion.button
                            className="lg:hidden p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <AnimatePresence mode="wait">
                                {isMenuOpen ? (
                                    <motion.div
                                        key="close"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: 90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <X className="w-6 h-6 text-[#0d46d7]" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="menu"
                                        initial={{ rotate: 90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        exit={{ rotate: -90, opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        <Menu className="w-6 h-6 text-[#0d46d7]" />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.button>
                    </div>
                </div>
            </motion.header>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMenuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            className="fixed top-20 left-4 right-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 z-50 lg:hidden overflow-hidden"
                            initial={{ opacity: 0, y: -20, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -20, scale: 0.95 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            <div className="p-6">
                                {/* Mobile Navigation Links */}
                                <nav className="space-y-4">
                                    {navigationItems.map((item, index) => (
                                        <motion.button
                                            key={item.name}
                                            className={`w-full text-left px-4 py-3 rounded-xl font-medium transition-all duration-300 ${activeSection === item.id
                                                ? "bg-gradient-to-r from-[#0d46d7]/10 to-[#EE7A3F]/10 text-[#0d46d7] border border-[#0d46d7]/20"
                                                : "text-gray-700 hover:bg-gray-50"
                                                }`}
                                            onClick={() => scrollToSection(item.id)}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ delay: index * 0.05, duration: 0.3 }}
                                            whileHover={{ x: 5 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <div className="flex items-center justify-between">
                                                {item.name}
                                                {activeSection === item.id && (
                                                    <motion.div
                                                        className="w-2 h-2 bg-[#0d46d7] rounded-full"
                                                        initial={{ scale: 0 }}
                                                        animate={{ scale: 1 }}
                                                        transition={{ duration: 0.2 }}
                                                    />
                                                )}
                                            </div>
                                        </motion.button>
                                    ))}
                                </nav>

                                {/* Mobile Social Links */}
                                <motion.div
                                    className="mt-6 pt-6 border-t border-gray-200"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3, duration: 0.3 }}
                                >
                                    <p className="text-sm font-medium text-gray-500 mb-4">Follow Us</p>
                                    <div className="flex items-center space-x-4">
                                        {socialLinks.map((social, idx) => (
                                            <motion.a
                                                key={social.name}
                                                href={social.href}
                                                className="p-3 bg-gray-50 hover:bg-[#0d46d7] hover:text-white rounded-xl transition-all duration-300"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                whileTap={{ scale: 0.9 }}
                                                aria-label={social.name}
                                            >
                                                {social.icon}
                                            </motion.a>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Mobile CTA */}
                                <motion.button
                                    className="w-full mt-6 bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#EE7A3F] hover:to-[#ff8c42] text-white px-6 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                                    onClick={() => scrollToSection("support-section")}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.3 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    Join Our Team
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    )
}

export default Navigation
