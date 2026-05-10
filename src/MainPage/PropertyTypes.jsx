import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Mock data for properties grouped by type
const propertyData = {
    villas: [
        { id: 1, name: "The Palms Villa", price: "3.2M SAR", img: "RR/ThePalmVilla.png" },
        { id: 4, name: "Almaty Residences", price: "4.1M SAR", img: "RR/VillaComplex.png" },
        { id: 5, name: "Luxury Estate", price: "5.5M SAR", img: "RR/ThePalmVilla.png" },
        { id: 6, name: "Modern Oasis", price: "3.8M SAR", img: "RR/VillaComplex.png" },
        { id: 7, name: "Desert Rose Villa", price: "4.2M SAR", img: "RR/ThePalmVilla.png" },
    ],
    apartments: [
        { id: 2, name: "Skyline Apartments", price: "2.8M SAR", img: "/SKYLINE.png" },
        { id: 3, name: "Al Narjis Heights", price: "2.6M SAR", img: "/3ProductCard.jpg" },
        { id: 8, name: "Downtown Studio", price: "1.2M SAR", img: "/SKYLINE.png" },
        { id: 9, name: "KAFD Premium", price: "3.5M SAR", img: "/3ProductCard.jpg" },
        { id: 10, name: "Olia Residence", price: "2.1M SAR", img: "/SKYLINE.png" },
    ],
    commercial: [
        { id: 11, name: "King Abdullah Tower", price: "15M SAR", img: "/SKYLINE.png" },
        { id: 12, name: "Business Hub", price: "8M SAR", img: "/3ProductCard.jpg" },
        { id: 13, name: "Retail Space A", price: "2.5M SAR", img: "/VillaComplex.png" },
        { id: 14, name: "Office Complex", price: "12M SAR", img: "/SKYLINE.png" },
        { id: 15, name: "Boutique Store", price: "1.8M SAR", img: "/3ProductCard.jpg" },
    ]
};

const PropertyCard = ({ item, title, isDark, navigate, textColor, mutedColor }) => {
    const [liked, setLiked] = useState(false);
    const { t } = useLanguage();

    const handleLike = (e) => {
        e.stopPropagation();
        setLiked(!liked);
    };

    return (
        <div
            onClick={() => navigate(`/property/${item.id}`)}
            className={`snap-start shrink-0 cursor-pointer w-[240px] md:w-[280px] flex flex-col rounded-2xl overflow-hidden border transition-all duration-300 ${isDark ? 'bg-[#1a1a1a] border-white/5 hover:border-white/10' : 'bg-white border-black/5 hover:border-black/10'}`}
        >
            <div className="w-full h-[180px] md:h-[220px] relative overflow-hidden group/img">
                <img
                    src={item.img}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/img:scale-110"
                />

                {/* лайк */}
                <button
                    className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-black hover:bg-white z-20 shadow-lg transition-all active:scale-90"
                    onClick={handleLike}
                >
                    <svg
                        viewBox="0 0 24 24"
                        fill={liked ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="2.5"
                        className={`w-4 h-4 z-2 absolute transition-all duration-300 ${liked ? 'text-red-500 scale-110' : 'text-black'}`}
                    >
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                    </svg>
                </button>
            </div>
            <div className="p-4 flex flex-col flex-1">
                <span className="text-[#c9a227] text-[10px] font-black uppercase tracking-[0.1em] mb-1">{title}</span>
                <h4 className={`text-[16px] font-bold mb-1 leading-tight ${textColor}`}>{item.name}</h4>
                <p className={`text-[13px] mb-4 ${mutedColor}`}>Riyadh, SA</p>

                <div className="mt-auto flex justify-between items-end">
                    <div className="flex flex-col">
                        <span className={`text-[10px] font-black uppercase tracking-widest mb-1 opacity-60 ${mutedColor}`}>
                            {item.type?.toLowerCase() === "for rent" ? t('rentalPrice') || "Rental" : t('salePrice') || "Sale"}
                        </span>
                        <span className={`text-[17px] font-black ${textColor}`}>
                            {item.price}
                            {item.type?.toLowerCase() === "for rent" && !item.price.includes('/') && " / mo"}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

const CarouselSection = ({ title, items }) => {
    const { isDark } = useLanguage();
    const navigate = useNavigate();
    const scrollRef = useRef(null);

    const scroll = (direction) => {
        if (scrollRef.current) {
            const { current } = scrollRef;
            const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
            current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
    const textColor = isDark ? "text-white" : "text-[#1a1a1a]";
    const mutedColor = isDark ? "text-white/50" : "text-black/50";
    const btnBg = isDark ? "bg-white/10 hover:bg-white/20 text-white backdrop-blur-md" : "bg-white hover:bg-gray-50 text-black shadow-lg border border-black/5";

    return (
        <div className="mb-12 relative group">
            <h3 className={`text-2xl md:text-3xl font-black mb-8 tracking-tight ${titleColor}`}>{title}</h3>

            <div className="relative">
                {/* Левая кнопка */}
                <button
                    onClick={() => scroll('left')}
                    className={`absolute left-0 top-1/2 -translate-y-1/2 -ml-6 md:-ml-8 z-30
                        w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all
                        ${btnBg} active:scale-90 hover:scale-105 shadow-xl border border-white/10`}
                >
                    <ChevronLeft size={30} />
                </button>

                {/* Контейнер карусели */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-6"
                    style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                >
                    {items.map((item) => (
                        <PropertyCard
                            key={item.id}
                            item={item}
                            title={title}
                            isDark={isDark}
                            navigate={navigate}
                            textColor={textColor}
                            mutedColor={mutedColor}
                        />
                    ))}
                </div>

                {/* Правая кнопка */}
                <button
                    onClick={() => scroll('right')}
                    className={`absolute right-0 top-1/2 -translate-y-1/2 -mr-6 md:-mr-8 z-30
                        w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center transition-all
                        ${btnBg} active:scale-90 hover:scale-105 shadow-xl border border-white/10`}
                >
                    <ChevronRight size={32} />
                </button>
            </div>
        </div>
    );
};

export default function PropertyTypes() {
    const { t, isDark } = useLanguage();

    const bg = isDark ? "bg-[#111111]" : "bg-white";

    return (
        <section className={`py-6 md:py-10 ${bg} transition-colors duration-300`}>
            <div className="max-w-[1300px] mx-auto px-4 md:px-8">
                <CarouselSection title={t('hotDealsVillas') || "Villas"} items={propertyData.villas} />
                <CarouselSection title={t('hotDealsApartments') || "Apartments"} items={propertyData.apartments} />
                <CarouselSection title={t('hotDealsCommercial') || "Commercial"} items={propertyData.commercial} />
            </div>
        </section>
    );
}
