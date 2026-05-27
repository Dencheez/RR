import React from 'react'
import { useNavigate } from 'react-router-dom';

const HotOffers = () => {
    const hotOffers = [
        { id: 101, title: "2-room apartment • 72.2 m²", price: "17 700 000", location: "Al Malqa District", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200" },
        { id: 102, title: "4-room villa • 240 m²", price: "69 000 000", location: "Olaya Street", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200" },
        { id: 103, title: "Studio • 45 m²", price: "12 500 000", location: "KAFD Area", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200" },
        { id: 104, title: "Penthouse • 350 m²", price: "85 000 000", location: "Al Narjis District", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200" },
        { id: 105, title: "3-room apartment • 115 m²", price: "24 200 000", location: "Al Wadi District", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200" },
        { id: 106, title: "Townhouse • 180 m²", price: "32 500 000", location: "Al Yasmin District", image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=200" },
        { id: 107, title: "Villa • 420 m²", price: "120 000 000", location: "Hittin District", image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=200" },
        { id: 108, title: "Duplex • 210 m²", price: "45 000 000", location: "Al Aqiq District", image: "https://brickwoodhomes.com.au/wp-content/uploads/2024/03/IMG-20211123-WA0003.jpg" },
    ];

    const Carusel = [
        { id: 101, title: "2-room apartment • 72.2 m²", price: "17 700 000", location: "Al Malqa District", image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=200" },
        { id: 102, title: "4-room villa • 240 m²", price: "69 000 000", location: "Olaya Street", image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=200" },
        { id: 103, title: "Studio • 45 m²", price: "12 500 000", location: "KAFD Area", image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=200" },
        { id: 104, title: "Penthouse • 350 m²", price: "85 000 000", location: "Al Narjis District", image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=200" },
        { id: 105, title: "3-room apartment • 115 m²", price: "24 200 000", location: "Al Wadi District", image: "https://images.unsplash.com/photo-1484154218962-a197022b5858?w=200" },
        { id: 106, title: "Townhouse • 180 m²", price: "32 500 000", location: "Al Yasmin District", image: "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=200" },
    ];

    // Форматирование цены (добавляет пробелы: 17 700 000 ₸)
    const formatPrice = (priceStr) => {
        const num = parseInt(priceStr.replace(/\s/g, ""), 10);
        return num.toLocaleString("ru-RU") + " ₸";
    };

    const navigate = useNavigate();

    return (
        <div className="w-full font-sans text-sm bg-white min-h-screen pb-10 md:hidden">

            {/* 1. ВЕРТИКАЛЬНАЯ ЛЕНТА (hotOffers) */}
            <div className="px-4 pt-4 mb-6">
                <h1 className="text-[20px] font-bold text-[#2a5885] mb-4 leading-tight">
                    Горячие предложения недвижимости
                </h1>

                <div className="flex flex-col">
                    {hotOffers.map((item) => (
                        <div
                            key={item.id}
                            className="flex gap-4 py-4 border-b border-gray-100 active:bg-gray-50"
                            onClick={() => navigate(`/property/${item.id}`)}
                        >
                            {/* Фото слева */}
                            <div className="w-[125px] h-[95px] shrink-0 bg-gray-100 rounded-xl overflow-hidden">
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                            </div>

                            {/* Инфа справа (Цена -> Параметры -> Локация) */}
                            <div className="flex flex-col justify-start pt-0.5 min-w-0">
                                <div className="text-[18px] font-bold text-gray-900 leading-none mb-1.5">
                                    {formatPrice(item.price)}
                                </div>
                                <div className="text-[14px] text-gray-800 font-normal leading-snug line-clamp-2 mb-1">
                                    {item.title}
                                </div>
                                <div className="text-[12px] text-gray-400 truncate">
                                    {item.location}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* 2. ГОРИЗОНТАЛЬНЫЙ СКРОЛЛ (Carusel) — Застройщики / Рекомендуемые */}
            <div className="bg-gray-50/70 py-5 border-y border-gray-100">
                <h2 className="text-[19px] font-bold text-gray-900 mb-3.5 px-4">
                    Застройщики
                </h2>

                {/* Скролл-контейнер пальцем влево-вправо */}
                <div
                    className="flex gap-3 overflow-x-auto px-4 pb-1"
                    style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                >
                    {Carusel.map((item) => (
                        <div
                            key={item.id + "-slide"}
                            className="flex flex-col w-[240px] shrink-0 bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm active:scale-[0.99] transition-transform duration-150"
                            onClick={() => navigate(`/property/${item.id}`)}
                        >
                            {/* Картинка с плашкой */}
                            <div className="w-full h-[140px] bg-gray-100 relative">
                                <img src={item.image} alt="" className="w-full h-full object-cover" />
                                <span className="absolute top-2 left-2 bg-[#25a7eb] text-white text-[11px] font-medium px-2 py-0.5 rounded-md">
                                    Рассрочка
                                </span>
                            </div>

                            {/* Описание и кнопка */}
                            <div className="p-3 flex flex-col flex-grow justify-between gap-3">
                                <div>
                                    <h3 className="text-[16px] font-bold text-gray-900 truncate mb-0.5">
                                        {item.location}
                                    </h3>
                                    <p className="text-[13px] text-gray-500 line-clamp-1">
                                        {item.title}
                                    </p>
                                </div>

                                {/* Кнопка "Позвонить" */}
                                <button className="w-full bg-[#12b828] text-white font-bold text-[14px] py-2.5 rounded-xl active:bg-[#0fa122] transition-colors">
                                    Позвонить
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Стили для ограничения строк в описании */}
            <style>{`
                .line-clamp-2 {
                    display: -webkit-box;
                    -webkit-line-clamp: 2;
                    -webkit-box-orient: vertical;
                    overflow: hidden;
                }
            `}</style>
        </div>
    )
}

export default HotOffers;