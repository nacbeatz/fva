import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const InvestInFutureSection: React.FC = () => {

    const investmentOptions = [
        {
            id: 'facilities',
            title: "Facilities & Infrastructure",
            description: "Building professional inline speed skating tracks, FVA Headquarters, Circus Arts & Fashion Hub, and athlete accommodations",
            icon: "building",
            color: "from-green-500 to-green-700",
            benefits: ["3 professional skating tracks", "FVA Headquarters & Offices", "Circus Arts & Fashion Hub", "Training camps & accommodations", "Gym & fitness center", "Transport vehicles"],
            action: "View Infrastructure Plan",
            investment: "$2M - $3M",
            timeline: "3 years",
            roi: "Sustainable operations"
        },
        {
            id: 'equipment',
            title: "Equipment & Technology",
            description: "High-quality sporting equipment and digital training tools with data-driven coaching",
            icon: "laptop-code",
            color: "from-purple-500 to-purple-700",
            benefits: ["Professional skates & bicycles", "Safety gear & uniforms", "Digital training tools", "Data-driven coaching", "Tech partnerships", "Performance analytics"],
            action: "Explore Technology",
            investment: "$500K - $1M",
            timeline: "1-2 years",
            roi: "Enhanced performance"
        },
        {
            id: 'talent',
            title: "Talent Development",
            description: "International coaches, mentors, and life support for athletes and staff",
            icon: "users",
            color: "from-blue-500 to-blue-700",
            benefits: ["International coaches", "Professional mentors", "Life support & salaries", "Athlete development", "Staff training", "Global excellence"],
            action: "Support Talent",
            investment: "$1M - $1.5M",
            timeline: "3 years",
            roi: "Champion development"
        },
        {
            id: 'manufacturing',
            title: "Local Manufacturing",
            description: "Factory and machines to produce custom sporting materials locally with retail operations",
            icon: "industry",
            color: "from-orange-500 to-orange-700",
            benefits: ["Custom sporting materials", "Local production", "Retail operations", "Job creation", "Economic impact", "Self-sustainability"],
            action: "Invest in Manufacturing",
            investment: "$500K - $1M",
            timeline: "2-3 years",
            roi: "Self-sustaining operations"
        }
    ];


    const stats = [
        { number: "$4M-$6M", label: "3-Year Strategic Plan", icon: "chart-line" },
        { number: "3", label: "Professional Skating Tracks", icon: "building" },
        { number: "100%", label: "African Youth Focus", icon: "heart" },
        { number: "Multi-Sport", label: "Sports & Technology", icon: "trophy" }
    ];

    return (
        <section className="bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-24 relative overflow-hidden">
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
                        At FVA Racing Team, we are on a mission to create opportunities for African youth through sports, Technology, and Cultural Exchange. By investing in us, you help train future champions, build sustainable projects, and inspire the next generation across Africa.
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

                {/* Investment Options Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    {investmentOptions.map((option, index) => (
                        <motion.div
                            key={option.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100 hover:shadow-2xl transition-all duration-300"
                        >
                            {/* Header */}
                            <div className="flex items-center mb-6">
                                <div className={`w-16 h-16 bg-gradient-to-br ${option.color} rounded-2xl flex items-center justify-center mr-4`}>
                                    <FontAwesomeIcon icon={["fas", option.icon as any]} className="w-8 h-8 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-800 mb-2">{option.title}</h3>
                                    <p className="text-gray-600">{option.description}</p>
                                </div>
                            </div>

                            {/* Investment Details */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="bg-gray-50 rounded-xl p-3 text-center">
                                    <div className="text-xs text-gray-500 mb-1">Investment</div>
                                    <div className="font-bold text-[#0d46d7] text-sm">{option.investment}</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 text-center">
                                    <div className="text-xs text-gray-500 mb-1">Timeline</div>
                                    <div className="font-bold text-[#0d46d7] text-sm">{option.timeline}</div>
                                </div>
                                <div className="bg-gray-50 rounded-xl p-3 text-center">
                                    <div className="text-xs text-gray-500 mb-1">ROI</div>
                                    <div className="font-bold text-green-600 text-sm">{option.roi}</div>
                                </div>
                            </div>

                            {/* Benefits */}
                            <div className="mb-6">
                                <h4 className="text-lg font-bold text-gray-800 mb-3">Key Benefits</h4>
                                <div className="grid grid-cols-1 gap-2">
                                    {option.benefits.map((benefit, idx) => (
                                        <div key={idx} className="flex items-center">
                                            <FontAwesomeIcon icon={["fas", "check-circle"]} className="w-4 h-4 text-green-500 mr-2 flex-shrink-0" />
                                            <span className="text-gray-700 text-sm">{benefit}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <motion.button
                                className="w-full bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] hover:from-[#FFD000] hover:to-[#ff8c42] text-white px-6 py-3 rounded-xl font-bold transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                {option.action}
                            </motion.button>
                        </motion.div>
                    ))}
                </div>


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
                            Be Part of Africa's Transformation
                        </h3>
                        <p className="text-xl mb-10 opacity-90 max-w-3xl mx-auto">
                            This is more than sports. It's about empowering children, youth, and adults through Inline Speed Skating, Cycling, Circus arts, music, and Technology, helping them reach global excellence without leaving Africa while addressing migration challenges and building local talent.
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
                                Invest in the Future
                            </motion.button>
                            <motion.button
                                className="border-2 border-white text-white px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-[#0d46d7] transition-all cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                View Strategic Plan
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InvestInFutureSection;
