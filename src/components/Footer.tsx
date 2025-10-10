"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const Footer = () => {
  const [showButton, setShowButton] = useState(false)
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about-section" },
    { name: "Competitions", href: "#competitions-section" },
    { name: "Team", href: "#team-section" },
    { name: "Support Us", href: "#support-section" },
    { name: "Contact", href: "#contact-section" },
  ]

  const socialLinks = [
    { name: "Instagram", icon: <FontAwesomeIcon icon={["fab", "instagram"]} className="w-5 h-5" />, href: "https://instagram.com/fvaracing" },
    { name: "Facebook", icon: <FontAwesomeIcon icon={["fab", "facebook"]} className="w-5 h-5" />, href: "https://facebook.com/profile.php?id=61557043743602" },
    { name: "TikTok", icon: <FontAwesomeIcon icon={["fab", "tiktok"]} className="w-5 h-5" />, href: "https://tiktok.com/@fva.racing.team" },
    { name: "Twitter", icon: <FontAwesomeIcon icon={["fab", "x-twitter"]} className="w-5 h-5" />, href: "https://x.com/fva_racing" },
  ]

  return (
    <>
      <footer className="relative bg-gradient-to-br from-[#0d46d7] via-[#1e5bff] to-[#0d46d7] text-white overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>

        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-x-32 -translate-y-32"></div>
        <div className="absolute bottom-0 right-0 w-80 h-80 bg-[#EE7A3F]/10 rounded-full blur-3xl translate-x-40 translate-y-40"></div>

        <div className="relative z-10">
          {/* Main Footer Content */}
          <div className="container mx-auto px-4 sm:px-8 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-8 md:gap-x-12">
              {/* Brand Section */}
              <motion.div
                className="lg:col-span-1"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
              >
                <div className="mb-6">
                  <h3 className="text-3xl font-bold mb-4">FVA</h3>
                  <p className="text-blue-100 leading-relaxed">
                    Empowering the next generation of African athletes through inline speed skating. Building champions,
                    fostering community, and inspiring excellence.
                  </p>
                </div>

              </motion.div>

              {/* Quick Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6">Quick Links</h4>
                <ul className="space-y-3">
                  {quickLinks.map((link, idx) => (
                    <li key={idx}>
                      <motion.a
                        href={link.href}
                        className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-1 h-1 bg-[#FFD000] rounded-full group-hover:w-2 transition-all duration-300"></span>
                        {link.name}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6">Contact Info</h4>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FontAwesomeIcon icon={["fas", "envelope"]} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Email</p>
                      <a
                        href="mailto:info@futurevisionagency.com"
                        className="text-white hover:text-[#FFD000] transition-colors cursor-pointer"
                      >
                        info@futurevisionagency.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FontAwesomeIcon icon={["fas", "phone"]} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Phone</p>
                      <a href="tel:+32465655192" className="text-white hover:text-[#FFD000] transition-colors cursor-pointer">
                        +32 465 65 51 92
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <FontAwesomeIcon icon={["fas", "map-marker-alt"]} className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Location</p>
                      <p className="text-white">500 Avenue de L' Umuganda, Gisenyi City, Rwanda</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <h4 className="text-xl font-bold mb-6">Stay Updated</h4>
                <p className="text-blue-100 mb-6">
                  Subscribe to our newsletter for the latest updates on competitions, events, and athlete achievements.
                </p>
                <form onSubmit={handleNewsletterSubmit} className="space-y-4 mr-2 md:mr-0">
                  <div className="relative">
                    <label htmlFor="newsletter-email" className="sr-only">Email address</label>
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-blue-200 focus:outline-none focus:ring-2 focus:ring-[#EE7A3F] focus:border-transparent transition-all"
                      required
                    />
                  </div>
                  <motion.button
                    type="submit"
                    className="w-full bg-[#FFD000] hover:bg-[#ffd000f3] text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                    <FontAwesomeIcon icon={["fas", "paper-plane"]} className="w-4 h-4" />
                  </motion.button>
                </form>
                {subscribed && (
                  <motion.p
                    className="text-green-300 text-sm mt-2"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    Thank you for subscribing!
                  </motion.p>
                )}
              </motion.div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="border-t border-white/10">
            <div className="container mx-auto px-6 py-8">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
                {/* Copyright */}
                <div className="text-center sm:text-left">
                  <p className="text-blue-100">
                    &copy; {new Date().getFullYear()} Future Vision Agency. All rights reserved.
                  </p>
                  <p className="text-blue-200 text-sm mt-1">
                    Empowering athletes, building champions, inspiring excellence.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <span className="text-blue-100 text-sm mr-2 hidden sm:inline">Follow us:</span>
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 hover:bg-[#FFD000] rounded-lg text-white transition-all duration-300 group cursor-pointer"
                      whileHover={{ y: -3, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={social.name}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Back to Top Button */}
      <AnimatePresence>
        {showButton && (
          <motion.button
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#EE7A3F] hover:to-[#ff8c42] text-white rounded-full shadow-lg transition-all duration-300 group cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.3 }}
          >
            <FontAwesomeIcon icon={["fas", "arrow-up"]} className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer

