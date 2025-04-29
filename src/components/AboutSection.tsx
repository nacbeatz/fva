import React, { useState } from 'react';
import aboutImg from '../assets/img01.png';

const AboutSection: React.FC = () => {
    const [showMore, setShowMore] = useState(false);
    return (
        <section id="about-section" className="bg-[#f7f4f4] py-16 ">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-3xl">
                <h2 className="text-4xl font-semibold mb-4 text-[#0d46d7]">About FVA</h2>
                <img src={aboutImg} alt="About FVA" className="mx-auto mb-6 w-40 h-40 object-contain rounded-full shadow-md" />
                <p className="text-lg text-gray-700 mb-6">
                    Future Vision Agency (FVA) is dedicated to empowering young athletes and promoting the spirit of teamwork, discipline, and excellence through competitive sports. Our mission is to nurture talent, foster community, and inspire the next generation of champions.
                    {showMore && (
                        <span> We believe in the power of sports to transform lives, build character, and create lasting friendships. Through our programs, we provide opportunities for growth, learning, and achievement, helping every athlete reach their full potential both on and off the field.</span>
                    )}
                </p>
                <button
                    className="text-[#0d46d7] font-semibold underline hover:text-[#EE7A3F] transition-colors"
                    onClick={() => setShowMore(v => !v)}
                >
                    {showMore ? 'Read Less' : 'Read More'}
                </button>
            </div>
        </section>
    );
};

export default AboutSection; 