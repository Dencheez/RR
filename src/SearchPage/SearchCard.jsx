import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { BedIcon, BathIcon, SquareIcon, SaveIcon } from "../components/Icons";
import { useLanguage } from "../components/LanguageContext";

export const SearchCard = ({ building, isSaved, onToggleSave }) => {
    const { t, isDark } = useLanguage();
    const navigate = useNavigate();

    const cardBg = isDark ? "bg-[#1a1a1a] border-white/5" : "bg-white border-black/8";
    const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
    const locationColor = isDark ? "text-white/40" : "text-black/50";
    const specBg = isDark ? "bg-white/5" : "bg-black/5";
    const specText = isDark ? "text-white/70" : "text-black/70";
    const borderDiv = isDark ? "border-white/5" : "border-black/5";
    const btnBg = isDark ? "bg-white/5 border-white/10 text-white/30" : "bg-black/5 border-black/10 text-black/30";

    const handleCardClick = () => {
        navigate(`/property/${building.id}`);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            onClick={handleCardClick}
            className={`group flex flex-col md:flex-row rounded-[32px] md:rounded-[40px] overflow-hidden border transition-all duration-500 cursor-pointer ${cardBg} hover:border-[#c9a227]/40`}
        >
            {/* Картинка */}
            <div className="relative w-full md:w-[400px] h-[250px] md:h-[300px] overflow-hidden flex-shrink-0">
                <img
                    src={building.image}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                    alt={building.name}
                />
                <div className="absolute top-6 left-6 flex flex-col gap-2">
                    <div className="bg-[#c9a227] text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.1em] shadow-lg">
                        {building.status === "Available" ? t('available') : building.status}
                    </div>
                    <div className="bg-white/90 backdrop-blur-md text-black text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-[0.1em] shadow-lg">
                        {building.type?.toLowerCase() === "for sale" ? t('forSale') : 
                         building.type?.toLowerCase() === "for rent" ? t('forRent') : building.type}
                    </div>
                </div>
            </div>

            {/* Инфо */}
            <div className="flex-1 p-6 md:p-10 flex flex-col justify-between">
                <div>
                    <h3 className={`text-2xl md:text-3xl font-bold mb-2 md:mb-3 group-hover:text-[#c9a227] transition-colors ${titleColor}`}>{building.name}</h3>
                    <p className={`text-sm mb-4 font-medium ${locationColor}`}>{building.location}</p>

                    {/* Характеристики */}
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 mb-4">
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${specBg}`}>
                                <BedIcon className="w-4 h-4 text-[#c9a227]" />
                            </div>
                            <span className={`text-xs font-bold ${specText}`}>{building.bedrooms} {t('beds')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${specBg}`}>
                                <BathIcon className="w-4 h-4 text-[#c9a227]" />
                            </div>
                            <span className={`text-xs font-bold ${specText}`}>{building.bathrooms} {t('baths')}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <div className={`p-1.5 rounded-lg ${specBg}`}>
                                <SquareIcon className="w-4 h-4 text-[#c9a227]" />
                            </div>
                            <span className={`text-xs font-bold ${specText}`}>{building.area} m²</span>
                        </div>
                    </div>
                </div>

                <div className={`flex justify-between items-end border-t pt-6 md:pt-8 ${borderDiv}`}>
                    <div className="flex gap-4">
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onToggleSave(building.id);
                            }}
                            className={`p-2.5 md:p-3 rounded-xl border transition-all duration-300 ${isSaved
                                ? "bg-[#c9a227] border-[#c9a227] text-white"
                                : `${btnBg} hover:text-red-500 hover:border-red-500/30`
                                }`}
                        >
                            <SaveIcon className={`w-4 h-4 md:w-5 md:h-5 transition-transform ${isSaved ? "scale-110" : "scale-100"}`} />
                        </button>
                    </div>
                    <div className="text-right">
                        <div className="flex flex-col items-end gap-1">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-40">
                                {building.type?.toLowerCase() === "for rent" ? t('rentalPrice') || "Rental Price" : t('salePrice') || "Sale Price"}
                            </span>
                            <span className="text-2xl md:text-4xl font-black text-[#c9a227] tracking-tighter">
                                SAR {building.price?.toLocaleString()} 
                                {building.type?.toLowerCase() === "for rent" ? " / mo" : " M"}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};