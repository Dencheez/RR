import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

const rentLinks = [
    { title: "Аренда квартир", href: "/search?action=rent&type=apartments" },
    { title: "Аренда домов", href: "/search?action=rent&type=villas" },
    { title: "Посуточно", href: "/search?action=rent&type=apartments" },
    { title: "Коммерческая недвижимость", href: "/search?action=rent&type=commercial" },
    { title: "Гаражи и паркинги", href: "/search?action=rent&type=commercial" },
    { title: "Возьму в аренду", href: "/search?action=rent" },
];

export default function RentLinks() {
    return (
        <div className="bg-white py-12">
            <div className="mx-auto max-w-[1200px] px-4">
                <h2 className="text-[24px] font-bold text-[#333] mb-8">Аренда недвижимости</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {rentLinks.map((link, idx) => (
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