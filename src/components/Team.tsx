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
        name: 'Linda Kanku Bantumbila',
        role: 'Senior Ladies’ Category - Champion',
        country: 'Congo',
        image: '/team/carla-pasquinelli.jpg', // Placeholder image
        bio: 'Champion in DRC and a fierce competitor in the senior ladies’ category. A skater with energy and determination to make Africa proud.'
    },
    {
        name: 'Tabitha Mumbi Mwangi',
        role: 'Senior Ladies’ Category - Skater & Cyclist',
        country: 'Kenya',
        image: '/team/chihab-chaher.jpg', // Placeholder image
        bio: 'A dedicated skater and cyclist with a passion for the sports and a strong work ethic. Known for her commitment to improving and inspiring young athletes.'
    },
    {
        name: 'Clémence Bushishi Banyere',
        role: 'Senior Ladies’ Category - Rising Star',
        country: 'Congo',
        image: '/team/daniel-ilabaca.jpg', // Placeholder image
        bio: 'An active participant in the FVA Inline Speed Skating training camp, achieving top results. A rising star in the sport.'
    },
    {
        name: 'Geofrey Muthiani Ssendegeyo',
        role: 'Senior Men’s Category - International Coach',
        country: 'Kenya',
        image: '/team/danny-aldridge.jpg', // Placeholder image
        bio: 'A passionate skater and international coach dedicated to developing inline speed skating in Africa. A great international coach for children and youth.'
    },
    {
        name: 'Labu Mikibi Hordy',
        role: 'Senior Men’s Category - Short Track Specialist',
        country: 'Congo',
        image: '/team/eddie-chung.jpg', // Placeholder image
        bio: 'Specialist in short tracks and sprints, crowned champion in DRC. A dynamic competitor with a unique skill set.'
    },
    {
        name: 'Ibrahima Pape Ndiaye',
        role: 'Senior Men’s Category - Champion',
        country: 'Senegal',
        image: '/team/anna-royo.jpg', // Placeholder image
        bio: 'Champion of Senegal and a professional hardworking athlete striving for the highest level of success.'
    },
    {
        name: 'Bonheur Ishimwe',
        role: 'Senior Men’s Category - Emerging Talent',
        country: 'Rwanda',
        image: '/team/ben-brillante.jpg', // Placeholder image
        bio: 'Emerging talent and current Rwanda GMT champion. Represents the future of African inline speed skating.'
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
                                <p className="text-[#ffffff] bg-[#EE7A3F] p-1 rounded-sm w-14 text-sm font-medium mb-2">{member.country}</p>
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