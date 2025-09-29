import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, ArrowLeft } from 'lucide-react';
import { useData } from '../contexts/DataContext';

export default function EventDetails() {
    const { slug } = useParams();
    const { events: adminEvents } = useData();
    const [event, setEvent] = useState<any | undefined>(undefined);

    useEffect(() => {
        // Only check for the event in admin-managed events
        const adminEvent = adminEvents.find(e => e.slug === slug);

        if (adminEvent) {
            // Convert admin event to match the structure expected by the UI
            setEvent({
                ...adminEvent,
                status: adminEvent.status || "Upcoming",
                link: adminEvent.link || "#",
                // Add any other required fields with default values
            });
        } else {
            setEvent(undefined);
        }
    }, [slug, adminEvents]);

    if (!event) {
        return (
            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <p className="text-gray-700">Event not found.</p>
                <Link to="/" className="text-[#0d46d7] font-medium inline-flex items-center gap-2 mt-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-6 py-16 max-w-5xl">
            <Link to="/" className="text-[#0d46d7] font-medium inline-flex items-center gap-2 mb-6">
                <ArrowLeft className="w-4 h-4" /> Back to Home
            </Link>

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100">
                <div className="h-72 overflow-hidden">
                    <img src={event.image} alt={event.name} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 md:p-10">
                    <h1 className="text-3xl md:text-4xl font-bold text-[#0d46d7] mb-4">{event.name}</h1>
                    <div className="flex flex-wrap gap-6 text-gray-700 mb-6">
                        <div className="inline-flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-[#FFD000]" />
                            <span className="font-medium">{event.date}</span>
                        </div>
                        <div className="inline-flex items-center gap-2">
                            <MapPin className="w-5 h-5 text-[#FFD000]" />
                            <span className="font-medium">{event.location}</span>
                        </div>
                    </div>

                    <div className="prose max-w-none">
                        <p className="text-gray-800 leading-relaxed mb-4">{event.description}</p>
                        {/* Extend with more structured details here if needed */}
                    </div>
                </div>
            </div>
        </div>
    );
}


