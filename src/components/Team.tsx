import React from 'react';
import Navigation from './Navigation';

interface TeamMember {
    name: string;
    role: string;
    country: string;
    image: string;
}

const teamMembers: TeamMember[] = [
    {
        name: 'Anna Royo',
        role: 'ARTISTIC & FREESTYLE ATHLETE',
        country: 'SPAIN',
        image: '/team/anna-royo.jpg'
    },
    {
        name: 'Ben Brillante',
        role: 'FREESTYLE ATHLETE & FILMMAKER',
        country: 'FRANCE',
        image: '/team/ben-brillante.jpg'
    },
    {
        name: 'Cameron Talbott',
        role: 'STREET ATHLETE',
        country: 'UNITED STATES',
        image: '/team/eddie-chung.jpg'
    },
    {
        name: 'Carla Pasquinelli',
        role: 'STREET ATHLETE',
        country: 'FRANCE',
        image: '/team/carla-pasquinelli.jpg'
    },
    {
        name: 'Chihab Chaher',
        role: 'FREESTYLE ATHLETE',
        country: 'FRANCE',
        image: '/team/daniel-ilabaca.jpg'
    },
    {
        name: 'Daniel Ilabaca',
        role: 'FREESTYLE ATHLETE',
        country: 'UNITED KINGDOM',
        image: '/team/daniel-ilabaca.jpg'
    },
    {
        name: 'Danny Aldridge',
        role: 'URBAN ATHLETE & VIDEO HOST',
        country: 'UNITED KINGDOM',
        image: '/team/danny-aldridge.jpg'
    },
    {
        name: 'Eddie Chung',
        role: 'FREESTYLE',
        country: 'UNITED STATES',
        image: '/team/eddie-chung.jpg'
    }
];

const Team: React.FC = () => {
    return (
        <div className="bg-[#F3EDED] min-h-screen">
            <Navigation />
            <div className="container mx-auto px-4 pt-24">
                {/* Team Header */}
                <div className="mb-12">
                    <h1 className="text-[#0d46d7] text-6xl font-bold mb-8">Team</h1>
                    <div className="flex gap-8 text-black text-lg">
                        <button className="border-b-2 border-[#0d46d7] pb-2">TEAM</button>
                        <button className="hover:border-b-2 hover:border-[#0d46d7] pb-2 opacity-70 hover:opacity-100 transition-all">
                            ROLLERBLADE BLANK TEAM
                        </button>
                        <button className="hover:border-b-2 hover:border-[#0d46d7] pb-2 opacity-70 hover:opacity-100 transition-all">
                            ROLLERBLADE AMBASSADORS
                        </button>
                    </div>
                </div>

                {/* Team Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {teamMembers.map((member, index) => (
                        <div
                            key={member.name}
                            className="relative group cursor-pointer overflow-hidden"
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
                                <p className="text-white/80 text-sm">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Team; 