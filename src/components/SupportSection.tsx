import React from 'react';

const SupportSection: React.FC = () => {
    const partners = [
        {
            name: "Rise",
            logo: "/paterners/rise.png",
            alt: "Rise"
        },
        {
            name: "Rise",
            logo: "/paterners/rise.png",
            alt: "Rise"
        },
        {
            name: "Rise",
            logo: "/paterners/rise.png",
            alt: "Rise"
        },
        {
            name: "Rise",
            logo: "/paterners/rise.png",
            alt: "Rise"
        }
    ];

    return (
        <section id="support-section" className="bg-[#f7f4f4] py-16">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-4xl">
                <h2 className="text-4xl font-semibold mb-4 text-[#0d46d7]">Support Us</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Help us empower the next generation of athletes! Your support enables us to provide training, equipment, and opportunities for youth development.
                </p>
                <div className="mb-6">
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button className="bg-[#0d46d7] text-white px-6 py-2 rounded font-semibold hover:bg-[#EE7A3F] transition-colors">Donate</button>
                        <button className="bg-[#EE7A3F] text-white px-6 py-2 rounded font-semibold hover:bg-[#0d46d7] transition-colors">Volunteer</button>
                    </div>
                </div>
                <div className="container mx-auto px-6 md:px-4 text-center mt-24">
                    {/* Grid layout for partners */}
                    <div className="grid grid-cols-2 gap-8 sm:grid-cols-2 lg:grid-cols-4">
                        {partners.map((partner, index) => (
                            <div key={index} className="flex flex-col items-center">
                                <img
                                    src={partner.logo}
                                    alt={partner.alt}
                                    className="h-24 object-contain transition-transform duration-300 hover:scale-110"
                                />
                                <a
                                    href="https://riseint.org/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 text-[#0d46d7] hover:underline"
                                >
                                    {partner.name}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection;