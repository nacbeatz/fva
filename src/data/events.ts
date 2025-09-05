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

// Static events removed - all events are now managed through the admin panel
export const events: EventItem[] = [];

// This function is kept for backwards compatibility but will only work with admin events
export function getEventBySlug(slug: string): EventItem | undefined {
    return events.find(event => event.slug === slug);
}