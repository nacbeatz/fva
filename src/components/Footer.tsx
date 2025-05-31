<<<<<<< HEAD
"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import {
  ArrowUp,
  Mail,
  Phone,
  MapPin,
  Send,
  Instagram,
  Facebook,
  Twitter,
  Linkedin,
  Youtube,
  Heart,
} from "lucide-react"

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
    { name: "Instagram", icon: <Instagram className="w-5 h-5" />, href: "#instagram" },
    { name: "Facebook", icon: <Facebook className="w-5 h-5" />, href: "#facebook" },
    { name: "Twitter", icon: <Twitter className="w-5 h-5" />, href: "#twitter" },
    { name: "LinkedIn", icon: <Linkedin className="w-5 h-5" />, href: "#linkedin" },
    { name: "YouTube", icon: <Youtube className="w-5 h-5" />, href: "#youtube" },
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
          <div className="container mx-auto px-6 py-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
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
                <div className="flex items-center gap-2 text-blue-100">
                  <Heart className="w-4 h-4 text-[#EE7A3F]" />
                  <span className="text-sm">Made with passion in Africa</span>
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
                        className="text-blue-100 hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                        whileHover={{ x: 5 }}
                      >
                        <span className="w-1 h-1 bg-[#EE7A3F] rounded-full group-hover:w-2 transition-all duration-300"></span>
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
                      <Mail className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Email</p>
                      <a
                        href="mailto:info@futurevisionagency.com"
                        className="text-white hover:text-[#EE7A3F] transition-colors"
                      >
                        info@futurevisionagency.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <Phone className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Phone</p>
                      <a href="tel:+250788123456" className="text-white hover:text-[#EE7A3F] transition-colors">
                        +250 788 123 456
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-white/10 rounded-lg">
                      <MapPin className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-blue-100 text-sm">Location</p>
                      <p className="text-white">Kigali Heights, KG 7 Ave, Kigali, Rwanda</p>
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
                <form onSubmit={handleNewsletterSubmit} className="space-y-4">
                  <div className="relative">
                    <input
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
                    className="w-full bg-[#EE7A3F] hover:bg-[#ff8c42] text-white px-6 py-3 rounded-lg font-medium flex items-center justify-center gap-2 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {subscribed ? "Subscribed!" : "Subscribe"}
                    <Send className="w-4 h-4" />
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
              <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                {/* Copyright */}
                <div className="text-center md:text-left">
                  <p className="text-blue-100">
                    &copy; {new Date().getFullYear()} Future Vision Agency. All rights reserved.
                  </p>
                  <p className="text-blue-200 text-sm mt-1">
                    Empowering athletes, building champions, inspiring excellence.
                  </p>
                </div>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  <span className="text-blue-100 text-sm mr-2">Follow us:</span>
                  {socialLinks.map((social, idx) => (
                    <motion.a
                      key={idx}
                      href={social.href}
                      className="p-2 bg-white/10 hover:bg-[#EE7A3F] rounded-lg text-white transition-all duration-300 group"
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
            className="fixed bottom-8 right-8 z-50 p-4 bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#EE7A3F] hover:to-[#ff8c42] text-white rounded-full shadow-2xl transition-all duration-300 group"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            aria-label="Back to top"
            initial={{ opacity: 0, scale: 0, y: 100 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0, y: 100 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <ArrowUp className="w-6 h-6 group-hover:animate-bounce" />
            <div className="absolute inset-0 rounded-full bg-white/20 scale-0 group-hover:scale-100 transition-transform duration-300"></div>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}

export default Footer

import React, { useState, useEffect } from 'react';

const Footer: React.FC = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowButton(window.scrollY > 200);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <footer className="bg-[#0d46d7] text-white py-8 mt-12">
        <div className="container mx-auto px-6 md:px-4 flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left: Logo and Copyright */}
          <div className="text-center md:text-left">
            <div className="font-bold text-2xl mb-2">FVA</div>
            <div className="text-sm">&copy; {new Date().getFullYear()} Future Vision Agency. All rights reserved.</div>
          </div>
          {/* Center: Quick Links */}
          <div className="flex flex-col md:flex-row gap-2 md:gap-6 text-sm">
            <a href="#home" className="hover:underline">Home</a>
            <a href="#about-section" className="hover:underline">About</a>
            <a href="#competitions-section" className="hover:underline">Competitions</a>
            <a href="#support-section" className="hover:underline">Support Us</a>
            <a href="#team-section" className="hover:underline">Team</a>
            <a href="#contact-section" className="hover:underline">Contact</a>
          </div>
          {/* Right: Social Icons */}
          <div className="flex gap-4">
            <a href="#instagram" aria-label="Instagram" className="hover:text-[#EE7A3F]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>
            <a href="#facebook" aria-label="Facebook" className="hover:text-[#EE7A3F]">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385h-3.047v-3.47h3.047v-2.642c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953h-1.514c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385c5.738-.9 10.126-5.864 10.126-11.854z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {showButton && (
        <button
          className="fixed bottom-8 right-8 z-50 bg-[#0d46d7] hover:bg-[#EE7A3F] text-white p-3 rounded-full shadow-lg transition-colors"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="Back to top"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
          </svg>
        </button>
      )}
    </>
  );
};

export default Footer;
