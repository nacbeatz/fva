"use client"

import React from 'react';
import { Calendar, MapPin, Trophy, Clock } from "lucide-react"
import { motion } from "framer-motion"

type EventStatus = "Upcoming" | "Ongoing" | "Completed"

const events = [
    {
        name: "Spring Skating Championship",
        date: "April 20, 2024",
        location: "Kigali Arena",
        link: "#",
        image: "/team/04.avif",
        status: "Upcoming" as EventStatus,
        description: "Kick off the season with our annual championship featuring top young skaters from across the country.",
        featured: true,
    },
    {
        name: "Youth Speed Cup",
        date: "May 15, 2024",
        location: "Rubavu Stadium",
        link: "#",
        image: "/team/03.avif",
        status: "Upcoming" as EventStatus,
        description: "A thrilling speed competition for youth athletes to test their limits and race for the cup.",
    },
    {
        name: "National Roller Derby",
        date: "June 10, 2024",
        location: "Huye Sports Complex",
        link: "#",
        image: "/team/02.avif",
        status: "Upcoming" as EventStatus,
        description: "Join us for a day of action-packed roller derby with teams from all regions.",
    },
    {
        name: "Winter Classic",
        date: "February 10, 2024",
        location: "Musanze Arena",
        link: "#",
        image: "/team/01.avif",
        status: "Completed" as EventStatus,
        description: "Our annual winter event brought together top talent for a day of fun and fierce competition.",
    }
];

const statusConfig: Record<EventStatus, { colors: string; icon: React.ReactNode; label: string }> = {
    Upcoming: {
        colors: "bg-gradient-to-r from-green-400 to-emerald-500 text-white",
        icon: <Clock className="w-3 h-3" />,
        label: "Upcoming",
    },
    Ongoing: {
        colors: "bg-gradient-to-r from-yellow-400 to-orange-500 text-white",
        icon: <Trophy className="w-3 h-3" />,
        label: "Live Now",
    },
    Completed: {
        colors: "bg-gradient-to-r from-gray-400 to-gray-500 text-white",
        icon: <Trophy className="w-3 h-3" />,
        label: "Completed",
    },
};

const CompetitionsSection: React.FC = () => {
    return (
        <section id="competitions-section" className="relative py-20 overflow-hidden">
            {/* Removed: Enhanced background */}
            {/* Removed: <div className="absolute inset-0 bg-gradient-to-br from-[#f8f6f6] via-[#f2eeee] to-[#ede8e8]"></div> */}

            {/* Removed: Floating decorative elements */}
            {/* Removed: <motion.div
                className="absolute top-10 right-20 w-32 h-32 bg-[#0d46d7]/5 rounded-full blur-2xl"
                animate={{
                    y: [0, -20, 0],
                    scale: [1, 1.1, 1],
                }}
                transition={{
                    duration: 6,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            ></motion.div> */}
            {/* Removed: <motion.div
                className="absolute bottom-20 left-10 w-40 h-40 bg-[#EE7A3F]/5 rounded-full blur-2xl"
                animate={{
                    y: [0, 15, 0],
                    scale: [1, 0.9, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            ></motion.div> */}

            <div className="container mx-auto px-6 relative z-10 max-w-7xl">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
                        <Trophy className="w-5 h-5 text-[#FFD000]" />
                        <span className="text-sm font-medium text-gray-600">Competitions & Events</span>
                    </div>
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-4 text-[#0d46d7] tracking-tight">
                        Upcoming <span className="text-[#FFD000]">Competitions</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0d46d7] to-[#FFD000] mx-auto mb-6"></div>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Join us for thrilling competitions that bring together athletes from all backgrounds to compete, learn, and
                        grow together.
                    </p>
                </motion.div>

                {/* Events Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event, idx) => (
                        <motion.div
                            key={idx}
                            className={`group relative ${event.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            <div
                                className={`
                                relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-500
                                ${event.featured ? "border-[#FFD000] shadow-xl" : "border-transparent hover:border-[#0d46d7]/20"}
                                ${event.status === "Completed" ? "opacity-75" : ""}
                                group-hover:shadow-2xl
                                `}
                            >
                                {/* Featured badge */}
                                {event.featured && (
                                    <div className="absolute top-4 right-4 z-20">
                                        <div className="bg-gradient-to-r from-[#FFD000] to-[#FFD000] text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg">
                                            FEATURED
                                        </div>
                                    </div>
                                )}

                                {/* Image Section */}
                                <div className="relative h-48 overflow-hidden">
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className={`
                                        w-full h-full object-cover transition-all duration-700 group-hover:scale-110
                                        ${event.status === "Completed" ? "grayscale" : ""}
                                        `}
                                    />

                                    {/* Gradient overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>

                                    {/* Status badge */}
                                    <div className="absolute top-4 left-4">
                                        <div
                                            className={`
                                            inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-lg backdrop-blur-sm
                                            ${statusConfig[event.status].colors}
                                            `}
                                        >
                                            {statusConfig[event.status].icon}
                                            {statusConfig[event.status].label}
                                        </div>
                                    </div>
                                </div>

                                {/* Content Section */}
                                <div className="p-6">
                                    <h3 className="text-xl font-bold text-[#0d46d7] mb-3 group-hover:text-[#FFD000] transition-colors">
                                        {event.name}
                                    </h3>

                                    {/* Event Details */}
                                    <div className="space-y-2 mb-4">
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <Calendar className="w-4 h-4 text-[#FFD000]" />
                                            <span className="text-sm font-medium">{event.date}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-gray-600">
                                            <MapPin className="w-4 h-4 text-[#FFD000]" />
                                            <span className="text-sm font-medium">{event.location}</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 text-sm leading-relaxed mb-6">{event.description}</p>

                                    {/* Action Button */}
                                    <motion.a
                                        href={event.link}
                                        className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-[#FFD000] group-hover:to-[#ff8c42]"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        {event.status === "Completed" ? "View Results" : "Learn More"}
                                        <motion.svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="16"
                                            height="16"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            className="transition-transform duration-300 group-hover:translate-x-1"
                                        >
                                            <polyline points="9 18 15 12 9 6"></polyline>
                                        </motion.svg>
                                    </motion.a>
                                </div>

                                {/* Decorative corner elements */}
                                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#0d46d7]/5 to-transparent rounded-tl-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    viewport={{ once: true }}
                >
                    <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20">
                        <h3 className="text-2xl font-bold text-[#0d46d7] mb-4">Ready to Join the Competition?</h3>
                        <p className="text-gray-700 mb-6 max-w-2xl mx-auto">
                            Don't miss out on our upcoming events. Register now and be part of the action!
                        </p>
                        <motion.button
                            className="bg-gradient-to-r from-[#ffd000fc] to-[#FFD000] text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:shadow-xl transition-all duration-300"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Register for Events
                        </motion.button>
                    </div>
                </motion.div>

            </div >
        </section >
    );
};

export default CompetitionsSection; 