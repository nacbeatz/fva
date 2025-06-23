import React from 'react';

const SupportSection: React.FC = () => {
    return (
        <section id="support-section" className="bg-white py-16">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-4xl">
                <h2 className="text-4xl font-semibold mb-4 text-[#0d46d7]">Support Us</h2>
                <p className="text-lg text-gray-700 mb-6 text-left">
                    Help us empower the next generation of athletes! Your support enables us to provide training, equipment, and opportunities for youth development.
                </p>
                <div className="mb-6">
                    <div className="flex justify-center gap-4 flex-wrap">
                        <button className="bg-[#0d46d7] text-white px-6 py-2 rounded font-semibold hover:bg-[#FFD000] transition-colors">Donate</button>
                        <button className="bg-[#FFD000] text-white px-6 py-2 rounded font-semibold hover:bg-[#0d46d7] transition-colors">Volunteer</button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default SupportSection; 
