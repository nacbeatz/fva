import React from 'react';
import img01 from '../assets/img01.png';
import img002 from '../assets/img002.png';
import img2 from '../assets/img2.png';
import img1 from '../assets/img1.png';

type EventStatus = 'Upcoming' | 'Ongoing' | 'Completed';

const events = [
    {
        name: 'Spring Skating Championship',
        date: 'April 20, 2024',
        location: 'Kigali Arena',
        link: '#',
        image: img01,
        status: 'Upcoming' as EventStatus,
        description: 'Kick off the season with our annual championship featuring top young skaters from across the country.'
    },
    {
        name: 'Youth Speed Cup',
        date: 'May 15, 2024',
        location: 'Rubavu Stadium',
        link: '#',
        image: img002,
        status: 'Upcoming' as EventStatus,
        description: 'A thrilling speed competition for youth athletes to test their limits and race for the cup.'
    },
    {
        name: 'National Roller Derby',
        date: 'June 10, 2024',
        location: 'Huye Sports Complex',
        link: '#',
        image: img2,
        status: 'Upcoming' as EventStatus,
        description: 'Join us for a day of action-packed roller derby with teams from all regions.'
    },
    {
        name: 'Winter Classic',
        date: 'February 10, 2024',
        location: 'Musanze Arena',
        link: '#',
        image: img1,
        status: 'Completed' as EventStatus,
        description: 'Our annual winter event brought together top talent for a day of fun and fierce competition.'
    }
];

const statusColors: Record<EventStatus, string> = {
    'Upcoming': 'bg-green-100 text-green-700',
    'Ongoing': 'bg-yellow-100 text-yellow-700',
    'Completed': 'bg-gray-200 text-gray-600'
};

const CompetitionsSection: React.FC = () => {
    return (
        <section id="competitions-section" className="bg-[#F3EDED] py-16">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-4xl">
                <h2 className="text-4xl font-semibold mb-4 text-[#0d46d7]">Competitions</h2>
                <p className="text-lg text-gray-700 mb-8">
                    Stay tuned for our upcoming competitions and events! We bring together athletes from all backgrounds to compete, learn, and grow together.
                </p>
                <div className="grid gap-6 md:grid-cols-3">
                    {events.map((event, idx) => (
                        <div
                            key={idx}
                            className={`bg-white rounded-lg shadow-md p-0 flex flex-col items-center border-2 ${idx === 0 ? 'border-[#EE7A3F]' : 'border-transparent'} ${event.status === 'Completed' ? 'opacity-60 grayscale' : ''}`}
                        >
                            <div className="relative w-full h-40 overflow-hidden rounded-t-lg">
                                <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                                <span className={`absolute top-2 left-2 px-3 py-1 rounded-full text-xs font-semibold ${statusColors[event.status]}`}>{event.status}</span>
                            </div>
                            <div className="p-4 flex flex-col items-center flex-1 w-full">
                                <h3 className="text-xl font-bold text-[#0d46d7] mb-1">{event.name}</h3>
                                <div className="text-gray-600 mb-1">{event.date}</div>
                                <div className="text-gray-500 mb-2">{event.location}</div>
                                <p className="text-gray-700 text-sm mb-4 flex-1">{event.description}</p>
                                <a href={event.link} className="mt-auto bg-[#EE7A3F] text-white px-4 py-2 rounded hover:bg-[#0d46d7] transition-colors">Learn More</a>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CompetitionsSection; 