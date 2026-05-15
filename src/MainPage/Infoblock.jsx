import React from "react";
import { useNavigate } from "react-router-dom";

const InfoBlock = () => {
    const navigate = useNavigate();

    const sections = [
        {
            title: "Новости",
            count: 9687,
            featured: {
                title: "Какие дома в Алматы снесут по реновации: опубликованы адреса",
                desc: "Под снос попадают двухэтажки и частный сектор",
                image: "https://krisha-photos.fastly.net/content/2024/05/6641e7d23d8c1995.jpg?w=320",
                link: "#"
            },
            links: [
                { text: "В каких ЖК Шымкента безопасно покупать квартиру", link: "#" },
                { text: "На что казахстанцы тратят пенсионные в 2026 году", link: "#" },
                { text: "В Казахстане предложили повысить налоги для владельцев нескольких квартир", link: "#" }
            ]
        },
        {
            title: "Статьи",
            count: 2435,
            featured: {
                title: "Когда можно не платить за услуги КСК",
                desc: "Что такое зачёт за ремонт и как им воспользоваться",
                image: "https://krisha-photos.fastly.net/content/2024/05/6641e7d23d8c1996.jpg?w=320",
                link: "#"
            },
            links: [
                { text: "Срок аренды истёк: что дальше?", link: "#" },
                { text: "Нужно ли менять документы на квартиру перед продажей", link: "#" },
                { text: "Ипотека на новостройки – 2026: условия всех банков", link: "#" }
            ]
        },
        {
            title: "PR",
            count: 269,
            featured: {
                title: "Как выглядит семейная жизнь в ритме мегаполиса: концепция жилого комплекса TUMAR",
                desc: "Алматы продолжает активно расти, а вместе с ним меняются и требования горожа...",
                image: "https://krisha-photos.fastly.net/content/2024/05/6641e7d23d8c1997.jpg?w=320",
                link: "#"
            },
            links: [
                { text: "MONOLIT GROUP: квартиры от 8.9 млн тенге рядом с Алматы", link: "#" },
                { text: "Команда Tetris Construction Group: «Мы строим только то, где сами хотели бы жить и работать»", link: "#" },
                { text: "Park Residence Apartments — уникальный проект в Шымкенте от ведущего строительного холдинга OTAU GROUP", link: "#" }
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