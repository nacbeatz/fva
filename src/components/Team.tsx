import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

interface TeamMember {
    name: string
    role: string
    country: string
    image: string
    bio: string
    achievements?: string[]
    category: "senior-ladies" | "senior-men"
}

const teamMembers: TeamMember[] = [
    {
        name: "Linda Kanku Bantumbila",
        role: "Senior Ladies' Category - Champion",
        country: "Congo",
        image: "/team/DSC_0028.jpg",
        bio: "Champion in DRC and a fierce competitor in the senior ladies' category. A skater with energy and determination to make Africa proud.",
        achievements: ["DRC Champion", "Regional Competitor"],
        category: "senior-ladies",
    },
    {
        name: "Tabitha Mumbi Mwangi",
        role: "Senior Ladies' Category - Skater & Cyclist",
        country: "Kenya",
        image: "/team/DSC_0019.jpg",
        bio: "A dedicated skater and cyclist with a passion for the sports and a strong work ethic. Known for her commitment to improving and inspiring young athletes.",
        achievements: ["Multi-Sport Athlete", "Youth Mentor"],
        category: "senior-ladies",
    },
    {
        name: "Clémence Bushishi Banyere",
        role: "Senior Ladies' Category - Rising Star",
        country: "Congo",
        image: "/team/DSC_0025.jpg",
        bio: "An active participant in the FVA Inline Speed Skating training camp, achieving top results. A rising star in the sport.",
        achievements: ["Training Camp Top Performer", "Rising Star"],
        category: "senior-ladies",
    },
    {
        name: "Geofrey Muthiani Ssendegeyo",
        role: "Senior Men's Category - International Coach",
        country: "Kenya",
        image: "/team/DSC_0012.jpg",
        bio: "A passionate skater and international coach dedicated to developing inline speed skating in Africa. A great international coach for children and youth.",
        achievements: ["International Coach", "Youth Development Expert"],
        category: "senior-men",
    },
    {
        name: "Labu Mikibi Hordy",
        role: "Senior Men's Category - Short Track Specialist",
        country: "Congo",
        image: "/team/DSC_0032.jpg",
        bio: "Specialist in short tracks and sprints, crowned champion in DRC. A dynamic competitor with a unique skill set.",
        achievements: ["DRC Champion", "Sprint Specialist"],
        category: "senior-men",
    },
    {
        name: "Ibrahima Pape Ndiaye",
        role: "Senior Men's Category - Champion",
        country: "Senegal",
        image: "/team/DSC_0034.jpg",
        bio: "Champion of Senegal and a professional hardworking athlete striving for the highest level of success.",
        achievements: ["Senegal Champion", "Professional Athlete"],
        category: "senior-men",
    },
    {
        name: "Bonheur Ishimwe",
        role: "Senior Men's Category - Emerging Talent",
        country: "Rwanda",
        image: "/team/DSC_0043.jpg",
        bio: "Emerging talent and current Rwanda GMT champion. Represents the future of African inline speed skating.",
        achievements: ["Rwanda GMT Champion", "Emerging Talent"],
        category: "senior-men",
    },
    {
        name: "Nsengiyumva Theogene",
        role: "Senior Men's Category - Hope of the Nation",
        country: "Rwanda",
        image: "/team/NSENGIYUMVA Theogene.jpg",
        bio: "A young and promising athlete from Rwanda, known for his dedication and passion for inline speed skating. He is considered one of the hopes for the future of the sport in the nation.",
        achievements: ["National Competitor", "Youth Inspiration"],
        category: "senior-men",
    },
    {
        name: "Peter Kamau",
        role: "Senior Men's Category - Determined Skater",
        country: "Uganda",
        image: "/team/Peter Kamau(Uganda)/IMG-20250621-WA0013.jpg",
        bio: "A determined and resilient skater from Uganda, Peter is known for his strong work ethic and commitment to the sport. He is an inspiration to many young skaters in his country.",
        achievements: ["National Team Member", "Community Leader"],
        category: "senior-men",
    },
]

const Team = () => {
    const [showAll, setShowAll] = useState(false)
    const [selectedPlayer, setSelectedPlayer] = useState<TeamMember | null>(null)
    const [filter, setFilter] = useState<"all" | "senior-ladies" | "senior-men">("all")

    const filteredMembers = teamMembers.filter((member) => filter === "all" || member.category === filter)
    const displayedMembers = showAll ? filteredMembers : filteredMembers.slice(0, 6)

    return (
        <section className="relative py-20 overflow-hidden">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50/30 to-orange-50/30"></div>
            <div className="absolute inset-0 bg-[url('/placeholder.svg?height=100&width=100')] bg-repeat opacity-5"></div>

            {/* Floating decorative elements */}
            <motion.div
                className="absolute top-20 right-20 w-40 h-40 rounded-full bg-gradient-to-r from-[#0d46d7]/10 to-transparent blur-3xl"
                animate={{
                    y: [0, -30, 0],
                    scale: [1, 1.2, 1],
                }}
                transition={{
                    duration: 8,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />
            <motion.div
                className="absolute bottom-40 left-10 w-60 h-60 rounded-full bg-gradient-to-l from-[#EE7A3F]/10 to-transparent blur-3xl"
                animate={{
                    y: [0, 20, 0],
                    scale: [1, 0.8, 1],
                }}
                transition={{
                    duration: 10,
                    repeat: Number.POSITIVE_INFINITY,
                    ease: "easeInOut",
                }}
            />

            <div className="container mx-auto px-6 relative z-10">
                {/* Header Section */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full mb-4 shadow-sm">
                        <FontAwesomeIcon icon={["fas", "users"]} className="w-5 h-5 text-[#FFD000]" />
                        <span className="text-sm font-medium text-gray-600">Our Athletes</span>
                    </div>
                    <h2 className="text-5xl font-bold mb-4 text-[#0d46d7] tracking-tight">
                        Meet Our <span className="text-[#FFD000]">Champions</span>
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#0d46d7] to-[#FFD000] mx-auto mb-6"></div>
                    <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
                        Discover the talented athletes who represent the future of African inline speed skating. Each member brings
                        unique skills and dedication to our team.
                    </p>
                </motion.div>

                {/* Filter Buttons */}
                <motion.div
                    className="flex justify-center gap-4 mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    viewport={{ once: true }}
                >
                    {[
                        { key: "all", label: "All Athletes", icon: <FontAwesomeIcon icon={["fas", "users"]} className="w-4 h-4" /> },
                        { key: "senior-ladies", label: "Senior Ladies", icon: <FontAwesomeIcon icon={["fas", "star"]} className="w-4 h-4" /> },
                        { key: "senior-men", label: "Senior Men", icon: <FontAwesomeIcon icon={["fas", "trophy"]} className="w-4 h-4" /> },
                    ].map((filterOption) => (
                        <motion.button
                            key={filterOption.key}
                            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-medium transition-all duration-300 cursor-pointer ${filter === filterOption.key
                                ? "bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white shadow-lg"
                                : "bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white shadow-md"
                                }`}
                            onClick={() => setFilter(filterOption.key as any)}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {filterOption.icon}
                            {filterOption.label}
                        </motion.button>
                    ))}
                </motion.div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                    <AnimatePresence mode="wait">
                        {displayedMembers.map((member, idx) => (
                            <motion.div
                                key={member.name}
                                className="group cursor-pointer"
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                whileHover={{ y: -10 }}
                                onClick={() => setSelectedPlayer(member)}
                            >
                                <div className="relative bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 group-hover:shadow-2xl transition-all duration-500">
                                    {/* Image Section */}
                                    <div className="relative h-96 overflow-hidden">
                                        <img
                                            src={member.image || "/placeholder.svg"}
                                            alt={member.name}
                                            className="object-cover object-[25%_35%] transition-all duration-700 group-hover:scale-110 w-full h-full"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                                        {/* Country Badge */}
                                        <div className="absolute top-4 right-4">
                                            <div className="bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full flex items-center gap-2 shadow-lg">
                                                <span className="text-lg">{member.country}</span>
                                            </div>
                                        </div>

                                        {/* Category Badge */}
                                        <div className="absolute top-4 left-4">
                                            <div
                                                className={`px-3 py-1.5 rounded-full text-xs font-bold text-white shadow-lg ${member.category === "senior-ladies"
                                                    ? "bg-gradient-to-r from-pink-500 to-rose-500"
                                                    : "bg-gradient-to-r from-blue-500 to-indigo-500"
                                                    }`}
                                            >
                                                {member.category === "senior-ladies" ? "LADIES" : "MEN"}
                                            </div>
                                        </div>

                                        {/* Content Overlay */}
                                        <div className="absolute bottom-0 left-0 right-0 p-6">
                                            <h3 className="text-white text-xl font-bold mb-2 group-hover:text-[#FFD000] transition-colors">
                                                {member.name}
                                            </h3>
                                            <p className="text-white/90 text-sm mb-3">{member.role}</p>

                                            {/* Achievements */}
                                            <div className="flex flex-wrap gap-1 mb-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                                {member.achievements?.slice(0, 2).map((achievement: string, i: number) => (
                                                    <span
                                                        key={i}
                                                        className="bg-[#EE7A3F]/20 backdrop-blur-sm text-white text-xs px-2 py-1 rounded-full"
                                                    >
                                                        {achievement}
                                                    </span>
                                                ))}
                                            </div>

                                            {/* View Profile Button */}
                                            <motion.div
                                                className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                                                whileHover={{ scale: 1.05 }}
                                            >
                                                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                                                    View Profile
                                                    <FontAwesomeIcon icon={["fas", "chevron-right"]} className="w-4 h-4" />
                                                </div>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>

                    {/* Meet All Athletes Button */}
                    <motion.div
                        className="text-center mt-12 col-span-full"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                        viewport={{ once: true }}
                    >
                        {!showAll && (
                            <motion.button
                                onClick={() => setShowAll(true)}
                                className="bg-[#0d46d7] hover:bg-[#FFD000] text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Meet All Athletes
                            </motion.button>
                        )}
                        {showAll && (
                            <motion.button
                                onClick={() => setShowAll(false)}
                                className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                Show Less
                            </motion.button>
                        )}
                    </motion.div>
                </div>
            </div>

            {/* Player Profile Modal */}
            <AnimatePresence>
                {selectedPlayer && (
                    <motion.div
                        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedPlayer(null)}
                    >
                        <motion.div
                            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Modal Header */}
                            <div className="relative h-64 overflow-hidden rounded-t-2xl">
                                <img
                                    src={selectedPlayer.image || "/placeholder.svg"}
                                    alt={selectedPlayer.name}
                                    className="object-cover w-full h-full"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                                <button
                                    className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors"
                                    onClick={() => setSelectedPlayer(null)}
                                >
                                    <FontAwesomeIcon icon={["fas", "times"]} className="w-5 h-5" />
                                </button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="flex items-center gap-3 mb-3">
                                        <span className="text-2xl">{selectedPlayer.country}</span>
                                    </div>
                                    <h2 className="text-white text-3xl font-bold mb-2">{selectedPlayer.name}</h2>
                                    <p className="text-white/90">{selectedPlayer.role}</p>
                                </div>
                            </div>

                            {/* Modal Content */}
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-800 mb-4">About</h3>
                                <p className="text-gray-600 mb-6 leading-relaxed">{selectedPlayer.bio}</p>

                                {selectedPlayer.achievements && (
                                    <>
                                        <h3 className="text-xl font-bold text-gray-800 mb-4">Achievements</h3>
                                        <div className="flex flex-wrap gap-2 mb-6">
                                            {selectedPlayer.achievements.map((achievement: string, i: number) => (
                                                <span
                                                    key={i}
                                                    className="bg-gradient-to-r from-[#0d46d7]/10 to-[#EE7A3F]/10 text-gray-700 px-3 py-1.5 rounded-full text-sm font-medium"
                                                >
                                                    {achievement}
                                                </span>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <div className="flex gap-4">
                                    <motion.button
                                        className="flex-1 bg-gradient-to-r from-[#0d46d7] to-[#1e5bff] text-white py-3 rounded-xl font-medium"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Follow Athlete
                                    </motion.button>
                                    <motion.button
                                        className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-medium hover:bg-gray-200 transition-colors"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Share Profile
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    )
}

export default Team
