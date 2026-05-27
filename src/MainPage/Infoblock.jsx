import React from "react";
import { useNavigate } from "react-router-dom";


const InfoBlock = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "News", // Сменили на английский для международного контекста KSA
            featured: {
                title: "Riyadh's New Residential Megaprojects: Vision 2030 Update",
                desc: "New master-planned communities launching in the northern suburbs",
                image: "https://saudihelplinegroup.com/wp-content/uploads/2024/11/World-Expo-2030-640x503.jpeg.webp",
                link: "#"
            },
            links: [
                { text: "Mortgage rates in KSA for 2026: What you need to know", link: "#" },
                { text: "How foreign investors can purchase property in Riyadh", link: "#" },
                { text: "The growth of luxury villas in Al Malqa and Hittin districts", link: "#" }
            ]
        }
    ];

    return (
        <section className="w-full max-w-[1200px] mx-auto px-4 py-12 bg-white">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {sections.map((section, idx) => (
                    <div key={idx} className="flex flex-col">
                        {/* Section Header */}
                        <div className="flex items-baseline gap-2 mb-6">
                            <h2 className="text-[22px] font-bold text-[#333] border-b-2 border-black pb-0.5 cursor-pointer hover:text-[#2a5885] hover:border-[#2a5885] transition-colors">
                                {section.title}
                            </h2>
                            <span className="text-[14px] text-gray-400 font-normal">
                                {section.count}
                            </span>
                        </div>

                        {/* Featured Item */}
                        <div className="flex gap-3 mb-6 group cursor-pointer">
                            <div className="w-[120px] h-[80px] shrink-0 overflow-hidden rounded-[4px]">
                                <img
                                    src={section.featured.image}
                                    alt={section.featured.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                                />
                            </div>
                            <div className="flex flex-col">
                                <h3 className="text-[13px] font-bold text-[#2a5885] leading-tight hover:underline mb-1">
                                    {section.featured.title}
                                </h3>
                                <p className="text-[12px] text-gray-500 leading-snug">
                                    {section.featured.desc}
                                </p>
                            </div>
                        </div>

                        {/* Link List */}
                        <div className="flex flex-col gap-3.5">
                            {section.links.map((link, lIdx) => (
                                <a
                                    key={lIdx}
                                    href={link.link}
                                    className="text-[13px] text-[#2a5885] hover:underline leading-snug"
                                >
                                    {link.text}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default InfoBlock;