import React from 'react';

const ContactSection: React.FC = () => {
    return (
        <section id="contact-section" className="bg-[#F3EDED] py-16">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-4xl">
                <h2 className="text-4xl font-semibold mb-4 text-[#0d46d7]">Contact Us</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Have questions or want to get involved? Reach out to us and we'll get back to you as soon as possible!
                </p>
            </div>
        </section>
    );
};

export default ContactSection; 