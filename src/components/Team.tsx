import React, { useState } from 'react';
import Navigation from './Navigation';

interface TeamMember {
    name: string;
    role: string;
    country: string;
    image: string;
    bio: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Anna Royo',
        role: 'ARTISTIC & FREESTYLE ATHLETE',
        country: 'SPAIN',
        image: '/team/anna-royo.jpg',
        bio: 'Anna is a passionate skater with 10+ years of experience in artistic and freestyle skating.'
    },
    {
        name: 'Ben Brillante',
        role: 'FREESTYLE ATHLETE & FILMMAKER',
        country: 'FRANCE',
        image: '/team/ben-brillante.jpg',
        bio: 'Ben combines his love for skating and filmmaking to inspire the next generation.'
    },
    {
        name: 'Cameron Talbott',
        role: 'STREET ATHLETE',
        country: 'UNITED STATES',
        image: '/team/eddie-chung.jpg',
        bio: 'Cameron is known for his creative street skating and dedication to the sport.'
    },
    {
        name: 'Carla Pasquinelli',
        role: 'STREET ATHLETE',
        country: 'FRANCE',
        image: '/team/carla-pasquinelli.jpg',
        bio: 'Carla brings energy and style to every competition.'
    },
    {
        name: 'Chihab Chaher',
        role: 'FREESTYLE ATHLETE',
        country: 'FRANCE',
        image: '/team/daniel-ilabaca.jpg',
        bio: 'Chihab is a freestyle specialist with a passion for teaching.'
    },
    {
        name: 'Daniel Ilabaca',
        role: 'FREESTYLE ATHLETE',
        country: 'UNITED KINGDOM',
        image: '/team/daniel-ilabaca.jpg',
        bio: 'Daniel is a world traveler and freestyle champion.'
    },
    {
        name: 'Danny Aldridge',
        role: 'URBAN ATHLETE & VIDEO HOST',
        country: 'UNITED KINGDOM',
        image: '/team/danny-aldridge.jpg',
        bio: 'Danny hosts skating events and is a mentor to many young athletes.'
    },
    {
        name: 'Eddie Chung',
        role: 'FREESTYLE',
        country: 'UNITED STATES',
        image: '/team/eddie-chung.jpg',
        bio: 'Eddie is a freestyle skater with a flair for performance.'
    }
];

const Team: React.FC = () => {
    const [showAll, setShowAll] = useState(false);
    const displayedMembers = showAll ? teamMembers : teamMembers.slice(0, 3);
    return (
        <div className="bg-[#f7f4f4] py-16">
            <Navigation />
            <div className="container mx-auto px-4">
                <h2 className="text-[#0d46d7] text-4xl font-bold mb-8 text-center">Meet Our Team</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                    {displayedMembers.map(member => (
                        <div
                            key={member.name}
                            className="relative group cursor-pointer overflow-hidden bg-white rounded-lg shadow-md"
                        >
                            <div className="aspect-w-3 aspect-h-4">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover filter grayscale transition-all duration-300 group-hover:scale-105"
                                />
                            </div>
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                                <p className="text-[#0d46d7] text-sm font-medium mb-2">{member.country}</p>
                                <h3 className="text-white text-xl font-bold mb-1">{member.name}</h3>
                                <p className="text-white/80 text-sm mb-1">{member.role}</p>
                                <p className="text-white/70 text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300 mt-2">{member.bio}</p>
                            </div>
                        </div>
                    ))}
                </div>
                {!showAll && (
                    <button
                        className="mx-auto block bg-[#0d46d7] text-white px-6 py-2 rounded font-semibold hover:bg-[#EE7A3F] transition-colors"
                        onClick={() => setShowAll(true)}
                    >
                        Meet All
                    </button>
                )}
            </div>
        </div>
    );
};

export default Team; 