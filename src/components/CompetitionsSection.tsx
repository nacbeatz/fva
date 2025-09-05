"use client"

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Trophy, Clock } from "lucide-react"
import { motion } from "framer-motion"

import { useData, EventItem } from '../contexts/DataContext';

type EventStatus = "Upcoming" | "Ongoing" | "Completed";

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
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const { events: adminEvents, loading } = useData();

    // Use only Firebase/admin events
    const displayEvents = adminEvents || [];

    // Lock body scroll while modal is open
    useEffect(() => {
        if (selectedEvent) {
            const previousOverflow = document.body.style.overflow;
            document.body.style.overflow = "hidden";
            return () => {
                document.body.style.overflow = previousOverflow;
            };
        }
    }, [selectedEvent]);
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
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed text-left">
                        Join us for thrilling competitions that bring together athletes from all backgrounds to compete, learn, and
                        grow together.
                    </p>
                </motion.div>

                {/* Events Grid */}
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
                    {displayEvents.map((event: EventItem, idx) => (
                        <motion.div
                            key={idx}
                            className={`group relative flex ${event.featured ? "md:col-span-2 lg:col-span-1" : ""}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -8 }}
                        >
                            <div
                                className={`
                                relative bg-white rounded-2xl shadow-lg overflow-hidden border-2 transition-all duration-500 w-full flex flex-col
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
                                <div className={`relative overflow-hidden rounded-t-2xl ${event.featured ? "h-64 md:h-72 lg:h-64" : "h-56"}`}>
                                    <img
                                        src={event.image}
                                        alt={event.name}
                                        className={`
                                        w-full h-full object-cover transition-all duration-700 group-hover:scale-105
                                        ${event.status === "Completed" ? "grayscale" : ""}
                                        `}
                                        loading="lazy"
                                        onError={(e) => {
                                            console.error(`Failed to load image: ${event.image}`);
                                            e.currentTarget.src = '/placeholder-event.jpg';
                                        }}
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
                                <div className="p-6 flex-1 flex flex-col">
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

                                    <p className="text-gray-700 text-sm leading-relaxed flex-1 mb-6">{event.description}</p>

                                    {/* Action Button */}
                                    <div className="mt-auto">
                                        {event.status === "Upcoming" ? (
                                            <motion.button
                                                onClick={() => setSelectedEvent(event)}
                                                className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-[#FFD000] group-hover:to-[#ff8c42]"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                Learn More
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
                                            </motion.button>
                                        ) : (
                                            <motion.a
                                                href={event.link}
                                                className="inline-flex items-center gap-2 w-full justify-center bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white px-6 py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-all duration-300 group-hover:from-[#FFD000] group-hover:to-[#ff8c42]"
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                View Results
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
                                        )}
                                    </div>
                                </div>

                                {/* Decorative corner elements */}
                                <div className="absolute bottom-0 right-0 w-20 h-20 bg-gradient-to-tl from-[#0d46d7]/5 to-transparent rounded-tl-full"></div>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* No Events Message */}
                {displayEvents.length === 0 && (
                    <motion.div
                        className="text-center py-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg border border-white/20 max-w-2xl mx-auto">
                            <div className="text-6xl mb-4">🏃‍♂️</div>
                            <h3 className="text-2xl font-bold text-[#0d46d7] mb-4">No Events Yet</h3>
                            <p className="text-gray-700 mb-6">
                                Events are currently being planned. Check back soon for exciting competitions and racing opportunities!
                            </p>
                            <div className="text-sm text-gray-500">
                                Events are managed through our admin panel and will appear here once published.
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Call to Action */}
                {displayEvents.length > 0 && (
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
                )}

                {/* Modal Dialog */}
                {selectedEvent && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-pointer" onClick={() => setSelectedEvent(null)}></div>
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 10 }}
                            className="relative bg-white shadow-2xl w-[95vw] max-w-6xl max-h-[90vh] overflow-hidden"
                        >
                            {/* Close Button */}
                            <button
                                className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 hover:bg-white transition-all duration-200 shadow-lg cursor-pointer"
                                onClick={() => setSelectedEvent(null)}
                                aria-label="Close"
                            >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            {/* Modal Content - Side by Side Layout */}
                            <div className="flex flex-col lg:flex-row h-[90vh]">
                                {/* Left Side - Event Image */}
                                <div className="lg:w-1/2 relative overflow-hidden">
                                    <img
                                        src={selectedEvent.image}
                                        alt={selectedEvent.name}
                                        className="w-full h-full object-cover"
                                        loading="lazy"
                                        onError={(e) => {
                                            console.error(`Failed to load modal image: ${selectedEvent.image}`);
                                            e.currentTarget.src = '/placeholder-event.jpg';
                                        }}
                                    />
                                    {/* Gradient overlay for mobile title */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent lg:hidden"></div>
                                    <div className="absolute bottom-6 left-6 right-6 lg:hidden">
                                        <h2 className="text-2xl font-bold text-white mb-2 drop-shadow-lg">{selectedEvent.name}</h2>
                                        <div className="flex flex-wrap gap-2 text-white/90 text-sm">
                                            <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                                <Calendar className="w-3 h-3" />
                                                <span>{selectedEvent.date}</span>
                                            </div>
                                            <div className="inline-flex items-center gap-1 bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                                                <MapPin className="w-3 h-3" />
                                                <span>{selectedEvent.location}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Right Side - Event Information */}
                                <div className="lg:w-1/2 flex flex-col">
                                    <div className="flex-1 overflow-y-auto p-6 lg:p-8">
                                        {/* Title Section - Hidden on mobile */}
                                        <div className="hidden lg:block mb-6">
                                            <h2 className="text-3xl font-bold text-[#0d46d7] mb-3">{selectedEvent.name}</h2>
                                            <div className="flex flex-wrap gap-4 text-gray-600">
                                                <div className="inline-flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-[#FFD000]" />
                                                    <span className="font-medium">{selectedEvent.date}</span>
                                                </div>
                                                <div className="inline-flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-[#FFD000]" />
                                                    <span className="font-medium">{selectedEvent.location}</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <div className="mb-6">
                                            <h3 className="text-lg font-semibold text-[#0d46d7] mb-3">About This Event</h3>
                                            <p className="text-gray-700 leading-relaxed">{selectedEvent.description}</p>
                                        </div>

                                        {/* Event Details */}
                                        <div className="grid gap-4 mb-6">
                                            {/* Venue Information */}
                                            {selectedEvent.venue && (
                                                <div className="bg-gray-50 rounded-xl p-4">
                                                    <h4 className="font-semibold text-[#0d46d7] mb-2 flex items-center gap-2">
                                                        <MapPin className="w-4 h-4" />
                                                        Venue
                                                    </h4>
                                                    <p className="text-gray-700 text-sm">{selectedEvent.venue}</p>
                                                </div>
                                            )}

                                            {/* Registration Information */}
                                            {selectedEvent.registration && (
                                                <div className="bg-blue-50 rounded-xl p-4">
                                                    <h4 className="font-semibold text-[#0d46d7] mb-3 flex items-center gap-2">
                                                        <Calendar className="w-4 h-4" />
                                                        Registration
                                                    </h4>
                                                    <div className="space-y-2 text-sm">
                                                        {selectedEvent.registration.deadline && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Deadline:</span>
                                                                <span className="font-medium">{selectedEvent.registration.deadline}</span>
                                                            </div>
                                                        )}
                                                        {selectedEvent.registration.regularFee && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Fee:</span>
                                                                <span className="font-semibold text-[#0d46d7]">{selectedEvent.registration.regularFee}</span>
                                                            </div>
                                                        )}
                                                        {selectedEvent.registration.lateFee && (
                                                            <div className="flex justify-between">
                                                                <span className="text-gray-600">Late Fee:</span>
                                                                <span className="font-semibold text-orange-600">{selectedEvent.registration.lateFee}</span>
                                                            </div>
                                                        )}
                                                    </div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Categories */}
                                        {selectedEvent.categories && selectedEvent.categories.length > 0 && (
                                            <div className="mb-6">
                                                <h3 className="text-lg font-semibold text-[#0d46d7] mb-3 flex items-center gap-2">
                                                    <Trophy className="w-4 h-4" />
                                                    Competition Categories
                                                </h3>
                                                <div className="space-y-3 max-h-60 overflow-y-auto">
                                                    {selectedEvent.categories.map((cat, i) => (
                                                        <div key={i} className="border border-gray-200 rounded-xl p-4 cursor-default">
                                                            <div className="mb-2">
                                                                <h4 className="font-semibold text-gray-900 text-sm">
                                                                    {cat.title}
                                                                    {cat.distance && <span className="text-[#0d46d7] ml-1">• {cat.distance}</span>}
                                                                </h4>
                                                                {cat.genders && (
                                                                    <p className="text-gray-600 text-xs mt-1">{cat.genders}</p>
                                                                )}
                                                                {cat.notes && (
                                                                    <p className="text-gray-600 text-xs mt-1">{cat.notes}</p>
                                                                )}
                                                            </div>
                                                            {cat.prizes && (
                                                                <div className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg p-3">
                                                                    <h5 className="font-medium text-gray-900 mb-2 text-xs">Prize Money</h5>
                                                                    <div className="flex gap-3 text-xs">
                                                                        <div className="flex items-center gap-1">
                                                                            <div className="w-4 h-4 bg-yellow-500 rounded-full flex items-center justify-center text-white text-xs font-bold">1</div>
                                                                            <span className="font-semibold">{cat.prizes[0]}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <div className="w-4 h-4 bg-gray-400 rounded-full flex items-center justify-center text-white text-xs font-bold">2</div>
                                                                            <span className="font-semibold">{cat.prizes[1]}</span>
                                                                        </div>
                                                                        <div className="flex items-center gap-1">
                                                                            <div className="w-4 h-4 bg-orange-600 rounded-full flex items-center justify-center text-white text-xs font-bold">3</div>
                                                                            <span className="font-semibold">{cat.prizes[2]}</span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Awards Note */}
                                        {selectedEvent.awardsNote && (
                                            <div className="bg-gradient-to-r from-[#0d46d7]/5 to-[#FFD000]/5 rounded-xl p-4 border border-[#0d46d7]/10 mb-6">
                                                <h4 className="font-semibold text-[#0d46d7] mb-2 text-sm">Additional Information</h4>
                                                <p className="text-gray-700 text-sm">{selectedEvent.awardsNote}</p>
                                            </div>
                                        )}
                                    </div>

                                    {/* Action Button - Fixed at bottom */}
                                    {selectedEvent.isFVAEvent && (
                                        <div className="p-6 border-t border-gray-100">
                                            {selectedEvent.status === "Upcoming" ? (
                                                <motion.button
                                                    onClick={() => {
                                                        // Handle registration logic here
                                                        if (selectedEvent.link) {
                                                            window.open(selectedEvent.link, '_blank');
                                                        } else {
                                                            alert('Registration will be available soon!');
                                                        }
                                                    }}
                                                    className="w-full bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    Register Now
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                                    </svg>
                                                </motion.button>
                                            ) : selectedEvent.status === "Ongoing" ? (
                                                <motion.button
                                                    onClick={() => {
                                                        if (selectedEvent.link) {
                                                            window.open(selectedEvent.link, '_blank');
                                                        } else {
                                                            alert('Live updates coming soon!');
                                                        }
                                                    }}
                                                    className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    View Live Updates
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                    </svg>
                                                </motion.button>
                                            ) : (
                                                <motion.button
                                                    onClick={() => {
                                                        if (selectedEvent.link) {
                                                            window.open(selectedEvent.link, '_blank');
                                                        } else {
                                                            alert('Results coming soon!');
                                                        }
                                                    }}
                                                    className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer"
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    View Results
                                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                                    </svg>
                                                </motion.button>
                                            )}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}

            </div >
        </section >
    );
};

export default CompetitionsSection; 