import React from "react";

const LinksBlock = () => {
    const linkSections = [
        {
            title: "Продажа",
            links: [
                "Продажа квартир", "Продажа участков", "Продажа промбаз и заводов",
                "Продажа коммерческой недвижимости", "Продажа бизнеса",
                "Продажа домов и дач", "Продажа гаражей и паркингов"
            ]
        },
        {
            title: "Недвижимость в городах",
            links: [
                "Абай обл.", "Аксае", "Актау", "Актобе", "Актюбинской обл.",
                "Алматинской обл.", "Алматы", "Астане", "Атырау", "Атырауской обл.",
                "Байконуре", "Балхаше", "Боралдае (Бурундай)",
                "Восточно-Казахстанской обл.", "Жамбылской обл.", "Жезказгане",
                "Жетысу обл.", "Западно-Казахстанской обл.", "Караганде",
                "Карагандинской обл.", "Каскелене", "Кокшетау", "Конаеве",
                "Костанае", "Костанайской обл.", "Кульсары", "Кызылорда",
                "Кызылординской обл.", "Лисаковске", "Мангистауской обл.",
                "Павлодаре", "Павлодарской обл.", "Петропавловске", "Риддере",
                "Рудном", "Северо-Казахстанской обл.", "Семее", "Талгаре",
                "Талдыкоргане", "Таразе", "Темиртау", "Туркестане",
                "Туркестанской обл.", "Улытау обл.", "Уральске",
                "Усть-Каменогорске", "Шахтинске", "Шымкенте", "Щучинске", "Экибастузе"
            ]
        },
        {
            title: "Аренда",
            links: [
                "Аренда квартир", "Аренда комнаты в квартире или доме",
                "Аренда промбаз и заводов", "Возьму в аренду",
                "Аренда коммерческой недвижимости",
                "Аренда гаражей и паркингов", "Аренда домов или дач"
            ]
        }
    ];

    const bottomSections = [
        {
            title: "Популярные новостройки",
            links: [
                "ЖК Горное Солнце", "ЖК Baiterek", "ЖК Комфорт Сити", "ЖК Родник",
                "ЖК Asylym", "ЖК Город 72", "ЖК Otbasym", "ЖК Достык",
                "ЖК Коргалжинский квартал", "ЖК Керемет", "ЖК Бастау", "ЖК Bailyq",
                "ЖК 99, 101, 103", "ЖК Dostyk", "ЖК на ул. Молодежная", "ЖК BILIM",
                "ЖК UMIT", "ЖК Столичный 2", "ЖК Brooklyn", "ЖК Tandau", "ЖК Zangar",
                "ЖК Standard City 2.0", "ЖК Riviera", "ЖК Qazyna", "ЖК Athletic City",
                "ЖК Austria", "ЖК The One", "ЖК Zhas Qanat", "ЖК Аврора",
                "ЖК Aq Zhaiyq", "ЖК Soho", "ЖК AURALUX", "ЖК The quayside",
                "ЖК Swissotel Bodrum Hill", "ЖК Lemon Residence",
                "ЖК Grand Oasis Towers", "ЖК Weybridge Gardens",
                "Таунхаус Helis Bodrum Houses", "ЖК Vesper", "ЖК Adamant Plus",
                "ЖК Aisafi", "ЖК Aliya", "ЖК Мирадж", "ЖК ELORDA RESIDENCE",
                "МЖК 15,16,17,18,19, 20, 21", "ЖК Nest Grand", "ЖК HORIZON",
                "ЖК GAUHARTAS", "ЖК Abai Joly", "ЖК Dara Residence", "ЖК Good life"
            ]
        },
        {
            title: "Новостройки в городах",
            links: [
                "Алматы", "Астана", "Шымкент", "Абай", "Абай", "Акмол", "Аксай", "Аксу", "Актау",
                "Актобе", "Атбасар", "Атырау", "Бесагаш", "Бирлик",
                "Боралдай (Бурундай)", "Бурабай (Боровое)", "Гульдала", "Ельтай",
                "Жана Куат", "Жанаозен", "Жанатурмыс", "Жаркент", "Жезказган",
                "Иргели", "Карабулак (п.Ключи)", "Караганда", "Каскелен", "Кокшетау",
                "Конаев", "Костанай", "Косшы", "Коянкус", "Кызылорда", "Кызылординский",
                "Макинск", "Отеген батыр", "Павлодар", "Панфилово (Табаксовхоз)",
                "Петропавловск", "Рудный", "Сарань", "Семей", "Талгар", "Талдыкорган",
                "Тараз", "Текели", "Темиртау", "Теренкара", "Туздыбастау (Калинино)",
                "Тузусай", "Туркестан", "Уральск", "Усть-Каменогорск", "Федоровка",
                "Шахтинск", "Щучинск", "Экибастуз"
            ]
        }
    ];

    const linkStyle = "text-[13px] text-[#2a5885] hover:underline whitespace-nowrap mr-3.5 mb-1 inline-block";
    const headerStyle = "text-[16px] font-bold text-[#333] mb-4";

    return (
        <section className="w-full max-w-[1200px] mx-auto px-4 py-12 bg-white">
            {/* Top Grid: 3 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-[250px_1fr_250px] gap-x-12 gap-y-10 mb-12">
                {linkSections.map((section, idx) => (
                    <div key={idx} className="flex flex-col">
                        <h2 className={headerStyle}>{section.title}</h2>
                        <div className="flex flex-wrap">
                            {section.links.map((link, lIdx) => (
                                <a key={lIdx} href="#" className={linkStyle}>
                                    {link}
                                </a>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Grid: 2 Columns */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 pt-8 border-t border-[#eee]">
                {bottomSections.map((section, idx) => (
                    <div key={idx} className="flex flex-col">
                        <h2 className={headerStyle}>{section.title}</h2>
                        <div className="flex flex-wrap">
                            {section.links.map((link, lIdx) => (
                                <a key={lIdx} href="#" className={linkStyle}>
                                    {link}
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
