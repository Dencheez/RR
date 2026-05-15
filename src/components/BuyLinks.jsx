import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useLanguage } from "./LanguageContext";

const buyLinks = [
    { title: "Купить квартиру", href: "/search?action=buy&type=apartments" },
    { title: "Купить дом", href: "/search?action=buy&type=villas" },
    { title: "Коммерческая недвижимость", href: "/search?action=buy&type=commercial" },
    { title: "Земельные участки", href: "/search?action=buy&type=land" },
    { title: "Новостройки", href: "/search?action=buy&new=1" },
    { title: "Дачи", href: "/search?action=buy&type=villas" },
];

export default function BuyLinks() {
    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-[1200px] px-4">
                <h2 className="text-[24px] font-bold text-[#333] mb-8">Покупка недвижимости</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {buyLinks.map((link, idx) => (
                        <Link
                            key={idx}
                            to={link.href}
                            className="group flex justify-between items-center bg-[#f9f9f9] border border-[#eee] rounded-[4px] p-5 hover:bg-white hover:border-[#2a5885] hover:shadow-md transition-all"
                        >
                            <span className="text-[#333] font-bold text-[15px] group-hover:text-[#2a5885]">
                                {link.title}
                            </span>
                            <ArrowRight size={18} className="text-[#ccc] group-hover:text-[#2a5885] transition-transform group-hover:translate-x-1" />
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}