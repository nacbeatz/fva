"use client"

import type React from "react"

const partners = [
    { name: "Powerslide", src: "/paterners/Powerslide.svg" },
    { name: "Swings", src: "/paterners/Swings.svg" },
    { name: "Rise", src: "/paterners/rise.png" },
    { name: "Bankrashal Skate", src: "/paterners/BankrashalSkate.png" },
]

const PartnersSection: React.FC = () => {
    return (
        <section id="partners-section" className="bg-white py-12 md:py-16 lg:py-20">
            <div className="container mx-auto px-4 sm:px-6 max-w-5xl">
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 items-center gap-8 md:gap-12">
                    {partners.map((partner, index) => (
                        <img
                            key={partner.name}
                            src={partner.src || "/placeholder.svg"}
                            alt={partner.name}
                            className={`${index === 0 ? "h-8 sm:h-10 md:h-12" : "h-10 sm:h-12 md:h-16"} w-auto object-contain drop-shadow-md justify-self-center mx-auto`}
                        />
                    ))}
                </div>
            </div>
        </section>
    )
}

export default PartnersSection
