import { collection, doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase/config';

// Sample team data
const sampleTeamMembers = [
    {
        id: 'sample-1',
        name: 'John Doe',
        role: 'Lead Skater',
        country: 'Rwanda',
        category: 'senior-men' as const,
        image: 'https://via.placeholder.com/300x400/0066cc/ffffff?text=Team+Member',
        bio: 'Experienced inline speed skater with 5 years of competitive experience.',
        achievements: ['Regional Champion 2023', 'National Team Member'],
        instagram: 'johndoe_skater'
    },
    {
        id: 'sample-2',
        name: 'Jane Smith',
        role: 'Speed Specialist',
        country: 'Rwanda',
        category: 'senior-ladies' as const,
        image: 'https://via.placeholder.com/300x400/cc6600/ffffff?text=Team+Member',
        bio: 'Rising star in inline speed skating with exceptional technique.',
        achievements: ['Youth Champion 2022', 'Record Holder 1000m'],
        instagram: 'jane_speedskater'
    }
];

// Sample events data
const sampleEvents = [
    {
        name: 'FVA Invitational 2025',
        date: '2025-03-15',
        location: 'Kigali Arena, Rwanda',
        description: 'Annual invitational tournament featuring top skaters from East Africa.',
        image: '/events/fva-invitational-2025.jpg',
        status: 'Upcoming',
        slug: 'fva-invitational-2025',
        featured: true,
        link: '#'
    },
    {
        name: 'Regional Speed Championships',
        date: '2025-05-20',
        location: 'Kampala, Uganda',
        description: 'Regional championship event for inline speed skating.',
        image: '/events/arena.jpeg',
        status: 'Upcoming',
        slug: 'regional-speed-championships',
        featured: false,
        link: '#'
    }
];

export const initializeSampleData = async () => {
    try {
        console.log('Initializing sample data...');

        // Add team members
        for (const member of sampleTeamMembers) {
            const memberData = {
                ...member,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };
            delete (memberData as any).id;

            await setDoc(doc(collection(db, 'team')), memberData);
            console.log(`Added team member: ${member.name}`);
        }

        // Add events
        for (const event of sampleEvents) {
            const eventData = {
                ...event,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp()
            };

            await setDoc(doc(collection(db, 'events')), eventData);
            console.log(`Added event: ${event.name}`);
        }

        console.log('Sample data initialization complete!');
        return true;
    } catch (error) {
        console.error('Error initializing sample data:', error);
        throw error;
    }
};
