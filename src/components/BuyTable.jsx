import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

const propertyBuy = [
    { id: 1, title: "2-комн. квартира · 70.8 м² · 9/18 этаж", price: "65 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 33, address: "Шевченко-Ауэзова" },
    { id: 2, title: "1-комн. квартира · 38.7 м² · 4/12 этаж", price: "35 млн SAR", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1000", location: "Эр-Рияд", photosCount: 12, address: "Мангилик Ел" },
    { id: 3, title: "3-комн. квартира · 140 м² · 7/13 этаж", price: "~ 118.5 млн SAR", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 25, address: "Достык-Аль-Фараби" },
    { id: 4, title: "3-комн. квартира · 95.4 м² · 5/10 этаж", price: "50 млн SAR", image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 18, address: "пр. Кунаева" },
    { id: 5, title: "3-комн. квартира · 70 м² · 3/12 этаж", price: "~ 71 млн SAR", image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80&w=1000", location: "Эр-Рияд", photosCount: 15, address: "Абая-Правды" },
    { id: 6, title: "1-комн. квартира · 33 м² · 1/5 этаж", price: "20.5 млн SAR", image: "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 8, address: "ул. Ленина" },
    { id: 7, title: "3-комн. квартира · 93.6 м² · 2/12 этаж", price: "58 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 20, address: "Самал-2" },
    { id: 8, title: "3-комн. квартира · 116 м² · 16/16 этаж", price: "64 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 30, address: "Хайвилл" },
    { id: 9, title: "3-комн. квартира · 77.63 м²", price: "~ 35.7 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 10, address: "мкр. Орбита" },
    { id: 10, title: "2-комн. квартира · 45 м² · 2/4 этаж", price: "35 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 14, address: "Розыбакиева" },
    { id: 11, title: "2-комн. квартира · 68 м² · 7/10 этаж", price: "45 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 22, address: "мкр. Нурсая" },
    { id: 12, title: "1-комн. квартира · 31 м² · 4/5 этаж", price: "20 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 9, address: "мкр. Аксай" },
    { id: 13, title: "2-комн. квартира · 65 м² · 8/9 этаж", price: "~ 35 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 11, address: "пр. Абилкайыр хана" },
    { id: 14, title: "3-комн. квартира · 86.4 м² · 5/9 этаж", price: "52 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 21, address: "Гоголя-Муратбаева" },
    { id: 15, title: "3-комн. квартира · 70 м² · 3/6 этаж", price: "44.5 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 13, address: "ул. Торайгырова" },
    { id: 16, title: "3-комн. квартира · 40.25 м² · 6/12 этаж", price: "~ 13.7 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 7, address: "мкр. Шанырак" },
    { id: 17, title: "1-комн. квартира · 49.6 м²", price: "~ 36.3 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 19, address: "ул. Аль-Фараби" },
    { id: 18, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "34 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
    { id: 19, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "34 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
    { id: 20, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "34 млн SAR", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
];

const propertyRent = [
    { id: 1, title: "Свободное назначение, офисы", price: "800 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 5, address: "Бостандыкский р-н" },
    { id: 2, title: "1-комн. квартира · 40 м² · 10/10 этаж", price: "22 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 10, address: "мкр. Таугуль" },
    { id: 3, title: "Свободное назначение, офисы", price: "12 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 8, address: "Медеуский р-н" },
    { id: 4, title: "2-комн. квартира · 44 м² · 1/4 этаж", price: "22 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 12, address: "мкр. Коктем" },
    { id: 5, title: "1-комн. квартира · 47 м² · 5/14 этаж", price: "14 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 15, address: "Тимирязева-Байзакова" },
    { id: 6, title: "Часть дома · 2 комнаты · 35 м²", price: "16 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 6, address: "р-н Татарки" },
    { id: 7, title: "2-комн. квартира · 78 м² · 11/16 этаж", price: "49 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 20, address: "ЖК Керемет" },
    { id: 8, title: "2-комн. квартира · 50 м² · 3/3 этаж", price: "15 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 14, address: "Сейфуллина-Райымбека" },
    { id: 9, title: "2-комн. квартира · 60 м² · 2/5 этаж", price: "15 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Самал" },
    { id: 10, title: "3-комн. квартира · 40 м² · 3/14 этаж", price: "19 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 9, address: "мкр. Жулдыз" },
    { id: 11, title: "2-комн. квартира · 44 м² · 2/14 этаж", price: "12 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 11, address: "мкр. Кулагер" },
    { id: 12, title: "1-комн. квартира · 68 м² · 4 этаж мкр", price: "12 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 13, address: "мкр. Айнабулак" },
    { id: 13, title: "Дом · 5 комнат · 300 м² мкр Акжар", price: "100 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 25, address: "мкр. Акжар" },
    { id: 14, title: "Свободное назначение, офисы,", price: "30 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 4, address: "Турксибский р-н" },
    { id: 15, title: "Свободное назначение, офисы,", price: "25 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 4, address: "Турксибский р-н" },
    { id: 16, title: "Свободное назначение, офисы,", price: "20 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 4, address: "Турксибский р-н" },
    { id: 17, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "15 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
    { id: 18, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "10 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
    { id: 19, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "20 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
    { id: 20, title: "2-комн. квартира · 42.6 м² · 4/5 этаж", price: "25 млн SAR", image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&q=80&w=1200", location: "Эр-Рияд", photosCount: 16, address: "мкр. Жетысу" },
];

// Размер страницы карусели (сколько колонок видно за раз)
const COLS_PER_PAGE = 10;

const SmallCard = ({ item }) => {
    const navigate = useNavigate();

    return (
        <div
            className="flex flex-col w-[110px] shrink-0 cursor-pointer relative bg-white transition-all hover:scale-[1.5] hover:z-[100] rounded-sm group origin-center"
            onClick={() => navigate(`/property/${item.id}`)}
        >
            <div className="relative w-full h-[75px] overflow-hidden rounded-sm bg-gray-100">
                <img src={item.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                <div className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] font-bold px-1 py-0.5 rounded-sm leading-tight">
                    {item.price}
                </div>
            </div>
            <div className="bg-white pt-1 px-0.5 pb-1">
                <p className="text-[10px] text-[#333] leading-[1.3] line-clamp-2 group-hover:text-[#2a5885]">
                    {item.title}
                </p>
            </div>
        </div>
    );
};

// Карусель с двумя рядами карточек и стрелками
const CardCarousel = ({ items }) => {
    const scrollRef = useRef(null);

    const scroll = (dir) => {
        if (!scrollRef.current) return;
        // Ширина одной карточки (110px) + gap (8px) * COLS_PER_PAGE
        const pageWidth = (110 + 8) * COLS_PER_PAGE;
        scrollRef.current.scrollBy({ left: dir === "right" ? pageWidth : -pageWidth, behavior: "smooth" });
    };

    // Разбиваем на 2 ряда: нечётные индексы в первый ряд, чётные во второй
    const row1 = items.filter((_, i) => i % 2 === 0);
    const row2 = items.filter((_, i) => i % 2 === 1);

    return (
        <div className="relative z-10 hover:z-[50]">
            {/* Стрелка влево */}
            <button
                onClick={() => scroll("left")}
                className="absolute left-0 top-[120px] -translate-y-1/2 z-10 -translate-x-[14px]  w-7 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
                <ChevronLeft size={16} className="absolute z-10" />
            </button>

            {/* Прокручиваемая область */}
            <div
                ref={scrollRef}
                className="overflow-x-auto pt-3 pb-12 -mt-3 -mb-12 max-w-full ml-9"
                style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
            >
                <div className="flex flex-col gap-2 px-2">
                    {/* Ряд 1 */}
                    <div className="flex gap-2">
                        {row1.map((item) => (
                            <SmallCard key={item.id + "-r1"} item={item} />
                        ))}
                    </div>
                    {/* Ряд 2 */}
                    <div className="flex gap-2">
                        {row2.map((item) => (
                            <SmallCard key={item.id + "-r2"} item={item} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Стрелка вправо */}
            <button
                onClick={() => scroll("right")}
                className="absolute right-0 top-[120px] -translate-y-1/2 z-20 translate-x-[14px] w-7 h-10 bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:bg-gray-50 hover:text-gray-700"
            >
                <ChevronRight size={16} className="absolute z-10" />
            </button>
        </div>
    );
};


function BuyTable() {
    const { t } = useLanguage();


    return (
        <div className="w-full max-w-[1300px] mx-auto py-6 font-sans text-sm relative">
            {/* Header */}
            <div className="flex items-baseline gap-3 mb-4 px-4">
                <h1 className="text-[19px] font-bold text-[#2a5885]">Горячие предложения недвижимости в Казахстане</h1>
            </div>

            <div className="border border-gray-200 overflow-visible">
                {/* Sale Section */}
                <section className="mb-0 pb-4 overflow-visible">
                    <div className="flex flex-wrap items-baseline gap-4 mb-3 px-4 border-b border-gray-100 py-2">
                        <h2 className="text-[17px] font-normal">Продажа жилья</h2>
                    </div>

                    <div className="px-5 overflow-visible">
                        <CardCarousel items={propertyBuy} />
                    </div>
                </section>

                {/* Rent Section */}
                <section className="overflow-visible bg-[#fdf7e3] pt-3 pb-4">
                    <div className="flex flex-wrap items-baseline gap-4 mb-3 px-4 border-b border-yellow-100 py-2">
                        <h2 className="text-[17px] font-normal">Продажа коммерческой недвижимости</h2>
                    </div>

                    <div className="px-5 overflow-visible">
                        <CardCarousel items={propertyRent} />
                    </div>
                </section>
            </div>

            <style>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    );
}

export default BuyTable;