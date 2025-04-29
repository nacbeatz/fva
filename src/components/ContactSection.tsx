import React, { useState } from 'react';

const ContactSection: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <section id="contact-section" className="bg-[#f7f4f4] py-16">
            <div className="container mx-auto px-6 md:px-4 text-center max-w-4xl">
                <h2 className="text-4xl font-semibold mb-4 text-[#0d46d7]">Contact Us</h2>
                <p className="text-lg text-gray-700 mb-6">
                    Have questions or want to get involved? Reach out to us and we'll get back to you as soon as possible!
                </p>
                <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 mb-6 max-w-xl mx-auto flex flex-col gap-6 border border-gray-100">
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0d46d7]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" /></svg>
                        </span>
                        <input
                            type="text"
                            name="name"
                            placeholder="Your Name"
                            value={form.name}
                            onChange={handleChange}
                            className="pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0d46d7] w-full transition-all"
                            required
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#0d46d7]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M16 12H8m8 0a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
                        </span>
                        <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            value={form.email}
                            onChange={handleChange}
                            className="pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0d46d7] w-full transition-all"
                            required
                        />
                    </div>
                    <div className="relative">
                        <span className="absolute left-3 top-4 text-[#0d46d7]">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M8 12h8m-4-4v8" /></svg>
                        </span>
                        <textarea
                            name="message"
                            placeholder="Your Message"
                            value={form.message}
                            onChange={handleChange}
                            className="pl-10 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:border-[#0d46d7] w-full min-h-[100px] transition-all"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gradient-to-r from-[#0d46d7] to-[#EE7A3F] text-white px-8 py-3 rounded-lg font-semibold shadow-md hover:from-[#EE7A3F] hover:to-[#0d46d7] transition-all text-lg tracking-wide"
                    >
                        Send Message
                    </button>
                    {submitted && <div className="text-green-600 font-medium mt-2">Thank you! We'll be in touch soon.</div>}
                </form>
                <div className="text-gray-700 text-lg">
                    <a href="mailto:info@futurevisionagency.com" className="underline hover:text-[#0d46d7]">info@futurevisionagency.com</a> &nbsp;|&nbsp;
                    <a href="tel:+250788123456" className="underline hover:text-[#0d46d7]">+250 788 123 456</a>
                </div>
            </div>
        </section>
    );
};

export default ContactSection; 