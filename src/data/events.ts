export type EventStatus = "Upcoming" | "Ongoing" | "Completed";

export interface EventItem {
    slug: string;
    name: string;
    date: string;
    location: string;
    link: string;
    image: string;
    status: EventStatus;
    description: string;
    featured?: boolean;
    venue?: string;
    registration?: {
        deadline?: string;
        regularFee?: string;
        lateFee?: string;
    };
    awardsNote?: string;
    categories?: Array<{
        title: string;
        distance?: string;
        ageRange?: string;
        genders?: string;
        prizes?: [string, string, string];
        notes?: string;
    }>;
}

export const events: EventItem[] = [
    {
        slug: "east-african-speed-skating-marathon",
        name: "East African Speed Skating Marathon",
        date: "13th December 2025",
        location: "Kigali, Rwanda",
        link: "#",
        image: "/events/g7Event.jpeg",
        status: "Upcoming",
        description: "Regional marathon with multiple age categories and distances, prizes, medals and certificates for participants.",
        featured: true,
        venue: "Amahoro National Stadium, Remera",
        registration: {
            deadline: "15th November 2025",
            regularFee: "15,000 Rwf",
            lateFee: "20,000 Rwf",
        },
        awardsNote: "The winners will get the medals too. Every participant will get a certificate.",
        categories: [
            {
                title: "Senior men 19+",
                distance: "42km full marathon",
                prizes: ["120,000 Rwf", "100,000 Rwf", "80,000 Rwf"],
            },
            {
                title: "Half marathon",
                distance: "21km",
            },
            {
                title: "Juniors 17-18 and Senior women",
                distance: "21km",
                notes: "Each category competing separately",
                prizes: ["100,000 Rwf", "80,000 Rwf", "60,000 Rwf"],
            },
            {
                title: "15-16 years",
                distance: "12km",
                genders: "For both genders",
                prizes: ["50,000 Rwf", "40,000 Rwf", "30,000 Rwf"],
            },
            {
                title: "13-14 years",
                distance: "10km",
                genders: "For both genders",
                prizes: ["40,000 Rwf", "30,000 Rwf", "20,000 Rwf"],
            },
        ],
    },
    {
        slug: "spring-skating-championship",
        name: "Spring Skating Championship",
        date: "April 20, 2024",
        location: "Kigali Arena",
        link: "#",
        image: "/events/arena.jpeg",
        status: "Upcoming",
        description: "Kick off the season with our annual championship featuring top young skaters from across the country.",
        featured: true,
    },
    {
        slug: "youth-speed-cup",
        name: "East African Speed Skating Marathon 2025",
        date: "13th December 2025",
        location: "Kigali, Rwanda",
        link: "#",
        image: "/events/fva-invitational-2025.jpg",
        status: "Upcoming",
        description: "Regional marathon with multiple age categories and distances, prizes, medals and certificates for participants.",
        venue: "Amahoro National Stadium, Remera",
        registration: {
            deadline: "15th November 2025",
            regularFee: "15,000 Rwf",
            lateFee: "20,000 Rwf",
        },
        awardsNote: "The winners will get the medals too. Every participant will get a certificate.",
        categories: [
            {
                title: "Senior men 19+",
                distance: "42km full marathon",
                prizes: ["120,000 Rwf", "100,000 Rwf", "80,000 Rwf"],
            },
            {
                title: "Half marathon",
                distance: "21km",
            },
            {
                title: "Juniors 17-18 and Senior women",
                distance: "21km",
                notes: "Each category competing separately",
                prizes: ["100,000 Rwf", "80,000 Rwf", "60,000 Rwf"],
            },
            {
                title: "15-16 years",
                distance: "12km",
                genders: "For both genders",
                prizes: ["50,000 Rwf", "40,000 Rwf", "30,000 Rwf"],
            },
            {
                title: "13-14 years",
                distance: "10km",
                genders: "For both genders",
                prizes: ["40,000 Rwf", "30,000 Rwf", "20,000 Rwf"],
            },
        ],
    },
];

export function getEventBySlug(slug: string): EventItem | undefined {
    return events.find(e => e.slug === slug);
}

