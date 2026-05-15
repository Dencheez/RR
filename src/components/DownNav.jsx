import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from './LanguageContext';

const DownNav = () => {
    const { t } = useLanguage();
    const location = useLocation();

    // Определяем режим (продажа или аренда) на основе текущего пути
    const isRent = location.pathname.includes('/rent');
    const action = isRent ? 'rent' : 'buy';

    const navLinks = [
        { label: "Квартиры", type: "apartments" },
        { label: "Дома и Виллы", type: "villas" },
        { label: "Коммерческая", type: "commercial" },
        { label: "Участки", type: "land" },
    ];

    return (
        <nav className="border-b border-[#eee] bg-white hidden xl:block">
            <div className="max-w-[1200px] mx-auto px-4 h-[44px] flex items-center gap-6">
                {navLinks.map((link, idx) => {
                    const params = new URLSearchParams();
                    params.set('action', action);
                    params.set('type', link.type);
                    if (link.isNew) params.set('new', '1');

                    return (
                        <Link
                            key={idx}
                            to={`/search?${params.toString()}`}
                            className="text-[14px] text-[#333] font-medium hover:text-[#2a5885] transition-colors whitespace-nowrap"
                        >
                            {link.label}
                        </Link>
                    );
                })}
            </div>
        </nav>
    );
};

export default DownNav;