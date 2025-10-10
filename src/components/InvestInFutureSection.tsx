import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InvestInFutureSection: React.FC = () => {
    const [activeTab, setActiveTab] = useState('partnerships');
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const investmentOptions = [
        {
            id: 'partnerships',
            title: "Strategic Partnerships",
            description: "Long-term corporate partnerships with measurable ROI and brand impact",
            icon: "handshake",
            color: "from-blue-500 to-blue-700",
            benefits: ["Brand exposure", "CSR impact", "Talent pipeline", "Market expansion", "Media coverage", "Community engagement"],
            action: "Explore Partnerships",
            investment: "$10K - $100K+",
            timeline: "12-24 months",
            roi: "15-25% annual"
        },
        {
            id: 'facilities',
            title: "Facility Development",
            description: "State-of-the-art training centers and equipment for athlete development",
            icon: "building",
            color: "from-green-500 to-green-700",
            benefits: ["Modern infrastructure", "Advanced equipment", "Training programs", "Community impact", "Legacy naming", "Tax benefits"],
            action: "View Facilities",
            investment: "$50K - $500K+",
            timeline: "6-18 months",
            roi: "20-30% annual"
        },
        {
            id: 'technology',
            title: "Tech Innovation",
            description: "Cutting-edge sports technology and data analytics partnerships",
            icon: "laptop-code",
            color: "from-purple-500 to-purple-700",
            benefits: ["Performance analytics", "Innovation showcase", "Research collaboration", "Future-ready training", "IP development", "Market leadership"],
            action: "Innovate Together",
            investment: "$25K - $200K+",
            timeline: "3-12 months",
            roi: "25-40% annual"
        },
        {
            id: 'sponsorship',
            title: "Premium Sponsorship",
            description: "Exclusive sponsorship packages for events and athlete support",
            icon: "trophy",
            color: "from-orange-500 to-orange-700",
            benefits: ["Event branding", "Athlete sponsorship", "Media exposure", "ROI tracking", "Exclusive access", "Global reach"],
            action: "View Packages",
            investment: "$5K - $50K+",
            timeline: "1-12 months",
            roi: "10-20% annual"
        }
    ];

    const testimonials = [
        {
            name: "Sarah Johnson",
            company: "TechCorp Africa",
            role: "CSR Director",
            quote: "Our partnership with FVA has delivered exceptional ROI while creating meaningful impact in African sports development.",
            avatar: "👩‍💼"
        },
        {
            name: "Michael Chen",
            company: "Global Sports Inc",
            role: "Investment Manager",
            quote: "The facility investment exceeded our expectations. The community impact and brand visibility have been outstanding.",
            avatar: "👨‍💼"
        },
        {
            name: "Amina Hassan",
            company: "Innovation Labs",
            role: "Tech Director",
            quote: "Collaborating on sports technology with FVA has opened new markets and created breakthrough innovations.",
            avatar: "👩‍🔬"
        }
    ];

    const stats = [
        { number: "50+", label: "Athletes Supported", icon: "users" },
        { number: "15+", label: "Countries Represented", icon: "globe" },
        { number: "100%", label: "Impact Focused", icon: "heart" },
        { number: "25+", label: "Corporate Partners", icon: "handshake" }
    ];

    return (
        <section id="invest-section" className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>
            <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-6 md:px-4 relative z-10">
                {/* Enhanced Header */}
                <motion.div
                    className="text-center mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="inline-block mb-6"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        viewport={{ once: true }}
                    >
                        <span className="bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white px-6 py-2 rounded-full text-sm font-semibold uppercase tracking-wide">
                            Strategic Investment Opportunities
                        </span>
                    </motion.div>
                    
                    <h2 className="text-6xl font-bold bg-gradient-to-r from-[#0d46d7] via-[#1e5bff] to-[#FFD000] bg-clip-text text-transparent mb-8">
                        Invest in the Future
                    </h2>
                    <p className="text-2xl text-gray-700 max-w-4xl mx-auto leading-relaxed mb-8">
                        Transform your business investment into lasting social impact while gaining 
                        <span className="font-semibold text-[#0d46d7]"> measurable returns</span> through strategic partnerships.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="flex items-center justify-center mb-3">
                                    <div className="w-12 h-12 bg-gradient-to-br from-[#0d46d7] to-[#1e5bff] rounded-xl flex items-center justify-center">
                                        <FontAwesomeIcon icon={["fas", stat.icon as any]} className="w-6 h-6 text-white" />
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-[#0d46d7] mb-1">{stat.number}</div>
                                <div className="text-sm text-gray-600 font-medium">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Tab Navigation */}
                <motion.div
                    className="flex flex-wrap justify-center gap-4 mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    {investmentOptions.map((option) => (
                        <motion.button
                            key={option.id}
                            onClick={() => setActiveTab(option.id)}
                            className={`px-8 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                                activeTab === option.id
                                    ? 'bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white shadow-lg'
                                    : 'bg-white text-gray-600 hover:bg-gray-50 border border-gray-200'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {option.title}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Dynamic Content Based on Active Tab */}
                <AnimatePresence mode="wait">
                    {investmentOptions.map((option) => (
                        activeTab === option.id && (
                            <motion.div
                                key={option.id}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5 }}
                                className="bg-white rounded-3xl p-12 shadow-2xl border border-gray-100 mb-16"
                            >
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                                    {/* Left Content */}
                                    <div>
                                        <div className="flex items-center mb-6">
                                            <div className={`w-20 h-20 bg-gradient-to-br ${option.color} rounded-3xl flex items-center justify-center mr-6`}>
                                                <FontAwesomeIcon icon={["fas", option.icon as any]} className="w-10 h-10 text-white" />
                                            </div>
                                            <div>
                                                <h3 className="text-3xl font-bold text-gray-800 mb-2">{option.title}</h3>
                                                <p className="text-gray-600 text-lg">{option.description}</p>
                                            </div>
                                        </div>

                                        {/* Investment Details */}
                                        <div className="grid grid-cols-3 gap-4 mb-8">
                                            <div className="bg-gray-50 rounded-2xl p-4 text-center">
                                                <div className="text-sm text-gray-500 mb-1">Investment</div>
                                                <div className="font-bold text-[#0d46d7]">{option.investment}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-4 text-center">
                                                <div className="text-sm text-gray-500 mb-1">Timeline</div>
                                                <div className="font-bold text-[#0d46d7]">{option.timeline}</div>
                                            </div>
                                            <div className="bg-gray-50 rounded-2xl p-4 text-center">
                                                <div className="text-sm text-gray-500 mb-1">Expected ROI</div>
                                                <div className="font-bold text-green-600">{option.roi}</div>
                                            </div>
                                        </div>

                                        {/* Benefits */}
                                        <div className="mb-8">
                                            <h4 className="text-xl font-bold text-gray-800 mb-4">Key Benefits</h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                {option.benefits.map((benefit, idx) => (
                                                    <div key={idx} className="flex items-center">
                                                        <FontAwesomeIcon icon={["fas", "check-circle"]} className="w-5 h-5 text-green-500 mr-3" />
                                                        <span className="text-gray-700">{benefit}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <motion.button
                                            className="bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#FFD000] hover:to-[#ff8c42] text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 cursor-pointer"
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                        >
                                            {option.action}
                                        </motion.button>
                                    </div>

                                    {/* Right Visual */}
                                    <div className="relative">
                                        <div className="bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl h-96 flex items-center justify-center">
                                            <div className="text-center">
                                                <div className="text-6xl mb-4">📊</div>
                                                <div className="text-xl font-semibold text-gray-600">Investment Analytics</div>
                                                <div className="text-gray-500">Real-time ROI tracking</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )
                    ))}
                </AnimatePresence>

                {/* Enhanced Testimonials */}
                <motion.div
                    className="mb-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-4xl font-bold text-center text-gray-800 mb-12">
                        What Our Partners Say
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                className="bg-white rounded-3xl p-8 shadow-lg border border-gray-100"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -10, scale: 1.02 }}
                            >
                                <div className="text-4xl mb-4">{testimonial.avatar}</div>
                                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                                <div className="border-t pt-4">
                                    <div className="font-bold text-gray-800">{testimonial.name}</div>
                                    <div className="text-sm text-gray-600">{testimonial.role}</div>
                                    <div className="text-sm font-semibold text-[#0d46d7]">{testimonial.company}</div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Enhanced CTA Section */}
                <motion.div
                    className="bg-gradient-to-r from-[#0d46d7] via-[#1e5bff] to-[#FFD000] rounded-3xl p-16 text-center text-white relative overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                >
                    {/* Background Pattern */}
                    <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-10"></div>
                    
                    <div className="relative z-10">
                        <h3 className="text-4xl font-bold mb-6">
                            Ready to Make a Strategic Investment?
                        </h3>
                        <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
                            Join industry leaders who are already transforming African sports through strategic partnerships. 
                            Let's discuss how your investment can create lasting impact while delivering measurable returns.
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                                <FontAwesomeIcon icon={["fas", "calendar"]} className="w-8 h-8 mb-4" />
                                <div className="font-bold text-lg mb-2">Free Consultation</div>
                                <div className="text-sm opacity-80">30-minute strategy session</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                                <FontAwesomeIcon icon={["fas", "chart-line"]} className="w-8 h-8 mb-4" />
                                <div className="font-bold text-lg mb-2">ROI Analysis</div>
                                <div className="text-sm opacity-80">Detailed impact projections</div>
                            </div>
                            <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-6">
                                <FontAwesomeIcon icon={["fas", "handshake"]} className="w-8 h-8 mb-4" />
                                <div className="font-bold text-lg mb-2">Partnership Setup</div>
                                <div className="text-sm opacity-80">Complete onboarding process</div>
                            </div>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-6 justify-center">
                            <motion.button
                                className="bg-white text-[#0d46d7] px-10 py-5 rounded-2xl font-bold text-xl hover:bg-gray-100 transition-colors cursor-pointer shadow-lg"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Schedule Strategy Call
                            </motion.button>
                            <motion.button
                                className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-[#0d46d7] transition-all cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Download Investment Guide
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InvestInFutureSection;
