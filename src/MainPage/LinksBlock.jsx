import React from "react";
import { useLanguage } from "../components/LanguageContext";

const LinksBlock = () => {
    const { t } = useLanguage();

    // Структура данных сохранена, но теперь мы используем ключи для i18next
    // Верхние секции (Sale, Rent, Locations)
    const linkSections = [
        {
            title: "Sales",
            items: ["Apartments", "Villas", "Land plots", "Commercial office", "Retail space", "Warehouses", "Parking"]
        },
        {
            title: "Popular districts", // Заменили города на районы Эр-Рияда
            items: ["Al malqa", "Hittin", "Kafd", "Olaya", "Al narjis", "Al yasmin"]
        },
        {
            title: "Rent",
            items: ["Rent apartments", "Rent villas", "Rent commercial", "Rent short term", "Rent staff housing"]
        }
    ];

    // Нижние секции (New Developments)


    const linkStyle = "text-[13px] text-[#2a5885] hover:underline whitespace-nowrap mr-3.5 mb-1 inline-block";
    const headerStyle = "text-[16px] font-bold text-[#333] mb-4";

    return (
        <section className="w-full max-w-[1200px] mx-auto px-4 py-12 bg-white">
            {/* Верхний блок */}
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_250px] gap-x-12 gap-y-10 mb-12">
                {linkSections.map((section, idx) => (
                    <div key={idx} className="flex flex-col">
                        <h2 className={headerStyle}>{t(`${section.title}`)}</h2>
                        <div className="flex flex-wrap">
                            {section.items.map((item, iIdx) => (
                                <a key={iIdx} href="#" className={linkStyle}>
                                    {t(`${item}`)}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>


        </section>
    );
};

export default LinksBlock;