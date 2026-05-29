import React from "react";
import { useNavigate } from "react-router-dom";
import { MapPin, Heart, Phone, Share2, Images } from "lucide-react";
import { useLanguage } from "../components/LanguageContext";

export const SearchCard = ({ building, isSaved, onToggleSave }) => {
    const { t } = useLanguage();
    const navigate = useNavigate();

    const handleCardClick = () => {
        navigate(`/property/${building.id}`);
    };

    const formatPrice = (price) => {
        if (!price) return "—";
        if (price >= 1_000_000) return `${(price / 1_000_000).toFixed(1)} млн`;
        if (price >= 1_000) return `${(price / 1_000).toFixed(0)} тыс.`;
        return price.toLocaleString();
    };

    const isRent = building.type?.toLowerCase() === "for rent";

    return (
        <>
            {/* МОБИЛЬНАЯ КАРТОЧКА (Krisha-style) */}
            <div
                onClick={handleCardClick}
                className="md:hidden bg-white border-b border-gray-100 cursor-pointer active:bg-gray-50"
            >
                {/* Фото */}
                <div className="relative w-full h-[220px] overflow-hidden bg-gray-100">
                    <img
                        src={building.image}
                        className="w-full h-full object-cover"
                        alt={building.name}
                    />
                    {/* Счётчик фото */}
                    <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/60 text-white text-[12px] px-2 py-1 rounded-lg">
                        <Images size={13} />
                        <span>1/5</span>
                    </div>
                    {/* Статус-бейдж */}
                    {building.isNew && (
                        <div className="absolute top-3 left-3 bg-green-500 text-white text-[11px] font-bold px-2.5 py-1 rounded-md">
                            Новостройка
                        </div>
                    )}
                </div>

                {/* Контент */}
                <div className="px-4 pt-3 pb-4">
                    {/* Цена */}
                    <div className="flex items-start justify-between mb-1">
                        <div>
                            <div className="text-[18px] font-bold text-gray-900">
                                {isRent ? "" : "от "}{formatPrice(building.price)} <span className="text-[15px]">SAR</span>
                                {isRent && <span className="text-[13px] text-gray-500 font-normal"> / мес</span>}
                            </div>
                            {/* Теги */}
                            <div className="flex gap-1.5 mt-1.5 flex-wrap">
                                {isRent && (
                                    <span className="text-[11px] bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded">
                                        Аренда
                                    </span>
                                )}
                                {!isRent && (
                                    <span className="text-[11px] bg-blue-100 text-blue-700 font-semibold px-2 py-0.5 rounded">
                                        Продажа
                                    </span>
                                )}
                                {building.hasPhoto && (
                                    <span className="text-[11px] bg-gray-100 text-gray-600 font-medium px-2 py-0.5 rounded">
                                        Фото
                                    </span>
                                )}
                            </div>
                        </div>
                        {/* Избранное */}
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleSave && onToggleSave(building.id);
                            }}
                            className="p-2 -mr-1"
                        >
                            <Heart
                                size={22}
                                className={isSaved ? "fill-red-500 text-red-500" : "text-gray-300"}
                            />
                        </button>
                    </div>

                    {/* Тип + площадь */}
                    <div className="text-[14px] text-gray-700 mb-2">
                        {building.bedrooms}-комн. квартира · {building.area} м²
                        {building.floor && building.totalFloors ? `, ${building.floor}/${building.totalFloors} эт.` : ""}
                    </div>

                    {/* Адрес */}
                    <div className="flex items-center gap-1 text-[13px] text-gray-500 mb-3">
                        <MapPin size={13} className="shrink-0 text-gray-400" />
                        <span className="truncate">{building.location}</span>
                    </div>

                    {/* Кнопки */}
                    <div className="flex gap-2" onClick={(e) => e.stopPropagation()}>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-[#2a81dd] text-white text-[14px] font-semibold py-2.5 rounded-lg active:bg-[#1d65b0]">
                            Заказать звонок
                        </button>
                        <button className="flex-1 flex items-center justify-center gap-2 bg-green-500 text-white text-[14px] font-semibold py-2.5 rounded-lg active:bg-green-600">
                            <Phone size={15} />
                            Позвонить
                        </button>
                    </div>
                </div>
            </div>

            {/* ДЕСКТОПНАЯ КАРТОЧКА (оригинальный дизайн) */}
            <div
                onClick={handleCardClick}
                className={`hidden md:flex flex-row rounded-[40px] overflow-hidden border cursor-pointer bg-white border-black/8 hover:border-[#c9a227]/40`}
            >
                {/* Картинка */}
                <div className="relative w-[400px] h-[300px] overflow-hidden flex-shrink-0">
                    <img
                        src={building.image}
                        className="w-full h-full object-cover"
                        alt={building.name}
                    />
                    <div className="absolute top-6 left-6 flex flex-col gap-2">
                        <div className="bg-[#c9a227] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.1em]">
                            {building.status === "Available" ? t('available') : building.status}
                        </div>
                        <div className="bg-white/90 backdrop-blur-md text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.1em]">
                            {building.type?.toLowerCase() === "for sale" ? t('forSale') :
                             building.type?.toLowerCase() === "for rent" ? t('forRent') : building.type}
                        </div>
                    </div>
                </div>

                {/* Инфо */}
                <div className="flex-1 p-10 flex flex-col justify-between">
                    <div>
                        <h3 className="text-3xl font-bold mb-3 text-[#1a1a1a]">{building.name}</h3>
                        <p className="text-sm mb-4 font-medium text-black/50">{building.location}</p>
                        <div className="flex flex-wrap items-center gap-6 mb-4">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-black/5">
                                    <svg className="w-4 h-4 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>
                                </div>
                                <span className="text-xs font-bold text-black/70">{building.bedrooms} {t('beds')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-black/5">
                                    <svg className="w-4 h-4 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                                </div>
                                <span className="text-xs font-bold text-black/70">{building.bathrooms} {t('baths')}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 rounded-lg bg-black/5">
                                    <svg className="w-4 h-4 text-[#c9a227]" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" /></svg>
                                </div>
                                <span className="text-xs font-bold text-black/70">{building.area} m²</span>
                            </div>
                        </div>
                    </div>

                    <div className="flex justify-between items-end border-t pt-8 border-black/5">
                        <div className="flex gap-4">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    onToggleSave && onToggleSave(building.id);
                                }}
                                className={`p-3 rounded-xl border ${isSaved
                                    ? "bg-[#c9a227] border-[#c9a227] text-white"
                                    : "bg-black/5 border-black/10 text-black/30 hover:text-red-500 hover:border-red-500/30"
                                    }`}
                            >
                                <Heart className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="text-right">
                            <div className="flex flex-col items-end gap-1">
                                <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                                    {isRent ? t('rentalPrice') || "Rental Price" : t('salePrice') || "Sale Price"}
                                </span>
                                <span className="text-4xl font-black text-[#c9a227] tracking-tighter">
                                    SAR {building.price?.toLocaleString()}
                                    {isRent ? " / mo" : " M"}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};