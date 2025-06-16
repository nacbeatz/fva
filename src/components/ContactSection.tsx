import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const ContactSection = () => {
    const [form, setForm] = useState({ name: "", email: "", message: "" })
    const [submitted, setSubmitted] = useState(false)
    const [focused, setFocused] = useState<string | null>(null)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        setSubmitted(true)
        // Reset form after submission
        setTimeout(() => {
            setForm({ name: "", email: "", message: "" })
        }, 500)
    }

    return (
        <section className="relative py-20 overflow-hidden scroll-mt-20" id="contact-section">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-orange-50"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>

            {/* Floating decorative elements */}
            <motion.div
                className="absolute top-40 right-10 w-64 h-64 rounded-full bg-gradient-to-r from-[#0d46d7]/10 to-transparent blur-3xl"
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-l from-[#EE7A3F]/10 to-transparent blur-3xl"
                animate={{
                    y: [0, 30, 0],
                    opacity: [0.5, 0.3, 0.5],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                <div className="max-w-7xl mx-auto">
                    {/* Header Section */}
                    <motion.div
                        className="text-center mb-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
                            <FontAwesomeIcon icon={["fas", "envelope"]} className="w-5 h-5 text-[#FFD000]" />
                            <span className="text-sm font-medium text-gray-600">Get In Touch</span>
                        </div>
                        <h2 className="text-5xl font-bold mb-4 text-[#0d46d7] tracking-tight">
                            Contact <span className="text-[#FFD000]">Us</span>
                        </h2>
                        <div className="w-24 h-1 bg-gradient-to-r from-[#0d46d7] to-[#FFD000] mx-auto mb-6"></div>
                        <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                            Have questions or want to get involved? Reach out to us and we'll get back to you as soon as possible!
                        </p>
                    </motion.div>

                    {/* Contact Content */}
                    <div className="grid lg:grid-cols-2 gap-12 items-start">
                        {/* Contact Form */}
                        <motion.div
                            className="order-2 lg:order-1"
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100 relative overflow-hidden">
                                {/* Decorative elements */}
                                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-[#0d46d7]/5 to-transparent rounded-bl-full"></div>
                                <div className="absolute bottom-0 left-0 w-40 h-40 bg-gradient-to-tr from-[#EE7A3F]/5 to-transparent rounded-tr-full"></div>

                                <h3 className="text-2xl font-bold text-gray-800 mb-6">Send us a message</h3>

                                <AnimatePresence mode="wait">
                                    {submitted ? (
                                        <motion.div
                                            className="flex flex-col items-center justify-center py-10"
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            exit={{ opacity: 0, scale: 0.9 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                                                <FontAwesomeIcon icon={["fas", "check-circle"]} className="w-8 h-8 text-green-600" />
                                            </div>
                                            <h4 className="text-2xl font-bold text-gray-800 mb-2">Thank You!</h4>
                                            <p className="text-gray-600 text-center mb-6">
                                                Your message has been sent successfully. We'll get back to you soon!
                                            </p>
                                            <motion.button
                                                className="text-[#0d46d7] font-medium flex items-center gap-2 cursor-pointer"
                                                onClick={() => setSubmitted(false)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                Send another message
                                                <FontAwesomeIcon icon={["fas", "arrow-right"]} className="w-4 h-4" />
                                            </motion.button>
                                        </motion.div>
                                    ) : (
                                        <motion.form
                                            onSubmit={handleSubmit}
                                            className="flex flex-col gap-6"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <div className="relative">
                                                <label
                                                    htmlFor="name"
                                                    className={`absolute left-5 ${focused === "name" || form.name
                                                        ? "-top-2.5 text-xs bg-white px-2 text-[#0d46d7]"
                                                        : "top-1/2 -translate-y-1/2 text-gray-500"
                                                        } transition-all duration-200`}
                                                >
                                                    Your Name
                                                </label>
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 text-[#0d46d7]">

                                                </div>
                                                <input
                                                    type="text"
                                                    id="name"
                                                    name="name"
                                                    value={form.name}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocused("name")}
                                                    onBlur={() => setFocused(null)}
                                                    className="pl-14 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d46d7]/20 focus:border-[#0d46d7] w-full transition-all"
                                                    required
                                                />
                                            </div>

                                            <div className="relative">
                                                <label
                                                    htmlFor="email"
                                                    className={`absolute left-5 ${focused === "email" || form.email
                                                        ? "-top-2.5 text-xs bg-white px-2 text-[#0d46d7]"
                                                        : "top-1/2 -translate-y-1/2 text-gray-500"
                                                        } transition-all duration-200`}
                                                >
                                                    Your Email
                                                </label>
                                                <div className="absolute left-5 top-1/2 -translate-y-1/2 text-[#0d46d7]">

                                                </div>
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"
                                                    value={form.email}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocused("email")}
                                                    onBlur={() => setFocused(null)}
                                                    className="pl-14 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d46d7]/20 focus:border-[#0d46d7] w-full transition-all"
                                                    required
                                                />
                                            </div>

                                            <div className="relative">
                                                <label
                                                    htmlFor="message"
                                                    className={`absolute left-5 ${focused === "message" || form.message
                                                        ? "-top-2.5 text-xs bg-white px-2 text-[#0d46d7]"
                                                        : "top-6 text-gray-500"
                                                        } transition-all duration-200`}
                                                >
                                                    Your Message
                                                </label>
                                                <div className="absolute left-2 top-6 text-[#0d46d7]">

                                                </div>
                                                <textarea
                                                    id="message"
                                                    name="message"
                                                    value={form.message}
                                                    onChange={handleChange}
                                                    onFocus={() => setFocused("message")}
                                                    onBlur={() => setFocused(null)}
                                                    className="pl-14 pr-4 py-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#0d46d7]/20 focus:border-[#0d46d7] w-full min-h-[150px] transition-all"
                                                    required
                                                />
                                            </div>

                                            <motion.button
                                                type="submit"
                                                className="bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#FFD000] hover:to-[#ffd000f5] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Send Message
                                                <FontAwesomeIcon icon={["fas", "paper-plane"]} className="w-5 h-5" />
                                            </motion.button>
                                        </motion.form>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>

                        {/* Contact Information */}
                        <motion.div
                            className="order-1 lg:order-2"
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6 }}
                            viewport={{ once: true }}
                        >
                            <div className="space-y-8">
                                {/* Contact Info Cards */}
                                <div className="grid gap-6">
                                    <motion.div
                                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-start gap-4"
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        <div className="p-3 bg-blue-50 rounded-full text-[#0d46d7]">
                                            <FontAwesomeIcon icon={["fas", "phone"]} className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800 mb-1">Phone</h5>
                                            <p className="text-gray-600">Have a question or need direct assistance?</p>
                                            <a
                                                href="tel:+250788123456"
                                                className="text-[#0d46d7] hover:text-[#EE7A3F] font-medium transition-colors flex items-center gap-1 mt-2 cursor-pointer"
                                            >
                                                +250 788 123 456
                                                <FontAwesomeIcon icon={["fas", "arrow-right"]} className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-start gap-4"
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        <div className="p-3 bg-blue-50 rounded-full text-[#0d46d7]">
                                            <FontAwesomeIcon icon={["fas", "envelope"]} className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800 mb-1">Email</h5>
                                            <p className="text-gray-600">Prefer to write us? Send us an email.</p>
                                            <a
                                                href="mailto:info@futurevisionagency.com"
                                                className="text-[#0d46d7] hover:text-[#EE7A3F] font-medium transition-colors flex items-center gap-1 mt-2 cursor-pointer"
                                            >
                                                info@futurevisionagency.com
                                                <FontAwesomeIcon icon={["fas", "arrow-right"]} className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </motion.div>
                                    <motion.div
                                        className="bg-white rounded-xl p-6 shadow-lg border border-gray-100 flex items-start gap-4"
                                        whileHover={{ y: -5, transition: { duration: 0.2 } }}
                                    >
                                        <div className="p-3 bg-blue-50 rounded-full text-[#0d46d7]">
                                            <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className="w-6 h-6" />
                                        </div>
                                        <div>
                                            <h5 className="text-lg font-semibold text-gray-800 mb-1">Our Location</h5>
                                            <p className="text-gray-600">Visit us at our office during business hours.</p>
                                            <a
                                                href="#"
                                                className="text-[#0d46d7] hover:text-[#EE7A3F] font-medium transition-colors flex items-center gap-1 mt-2 cursor-pointer"
                                            >
                                                Kigali Heights, KG 7 Ave, Kigali
                                                <FontAwesomeIcon icon={["fas", "arrow-right"]} className="w-3 h-3" />
                                            </a>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* Social Icons */}
                                <motion.div
                                    className="mt-12 text-center"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6, delay: 0.4 }}
                                    viewport={{ once: true }}
                                >
                                    <h4 className="text-2xl font-bold text-gray-800 mb-6">Connect With Us</h4>
                                    <div className="flex justify-center space-x-6">
                                        <motion.a
                                            href="#"
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label="Twitter"
                                        >
                                            <FontAwesomeIcon icon={["fab", "x-twitter"]} className="w-7 h-7 text-gray-700 group-hover:text-[#0d46d7] transition-colors" />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label="Instagram"
                                        >
                                            <FontAwesomeIcon icon={["fab", "instagram"]} className="w-7 h-7 text-gray-700 group-hover:text-[#0d46d7] transition-colors" />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label="LinkedIn"
                                        >
                                            <FontAwesomeIcon icon={["fab", "linkedin"]} className="w-7 h-7 text-gray-700 group-hover:text-[#0d46d7] transition-colors" />
                                        </motion.a>
                                        <motion.a
                                            href="#"
                                            className="w-14 h-14 bg-white rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer"
                                            whileHover={{ y: -5, scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                            aria-label="GitHub"
                                        >
                                            <FontAwesomeIcon icon={["fab", "github"]} className="w-7 h-7 text-gray-700 group-hover:text-[#0d46d7] transition-colors" />
                                        </motion.a>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ContactSection


