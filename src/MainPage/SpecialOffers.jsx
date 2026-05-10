import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../components/LanguageContext";
import { ChevronLeft, ChevronRight, Plus, Tag } from "lucide-react";
import AddPropertyModal from "../components/AddPropertyModal";


// Offer data — uses translation keys, resolved with t() in render
const offerData = [
  {
    id: 1,
    tag: "-15%",
    tagType: "discount",
    taglineKey: "offer1Tagline",
    headlineKey: "offer1Headline",
    descKey: "offer1Desc",
    img: `${import.meta.env.BASE_URL}ThePalmVilla.png`,
    propertyId: 1,
  },
  {
    id: 2,
    tag: "offer2Tag",
    tagType: "new",
    taglineKey: "offer2Tagline",
    headlineKey: "offer2Headline",
    descKey: "offer2Desc",
    img: `${import.meta.env.BASE_URL}SKYLINE.png`,
    propertyId: 2,
  },
  {
    id: 3,
    tag: "offer3Tag",
    tagType: "exclusive",
    taglineKey: "offer3Tagline",
    headlineKey: "offer3Headline",
    descKey: "offer3Desc",
    img: `${import.meta.env.BASE_URL}3ProductCard.jpg`,
    propertyId: 3,
  },
];

const tagColors = {
  discount: "bg-red-500 text-white",
  new: "bg-[#2563eb] text-white",
  exclusive: "bg-[#c9a227] text-white",
  default: "bg-[#c9a227] text-white",
};


function SpecialOffers() {

  const navigate = useNavigate();
  const { t, isDark } = useLanguage();
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const scrollRef = useRef(null);

  const specialOffersList = offerData.map(o => ({
    ...o,
    tag: o.tagType === 'discount' ? o.tag : t(o.tag) || o.tag,
    tagline: t(o.taglineKey) || '',
    headline: t(o.headlineKey) || '',
    desc: t(o.descKey) || '',
  }));

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -current.offsetWidth / 2 : current.offsetWidth / 2;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const bg = isDark ? "bg-[#0a0a0a]" : "bg-[#f7f5f0]";
  // Убраны бордеры для темной темы
  const cardBg = isDark ? "bg-[#141414]" : "bg-white border border-black/8";
  const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const mutedText = isDark ? "text-white/50" : "text-black/50";
  const headlineColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const descColor = isDark ? "text-white/60" : "text-black/60";
  const taglineColor = isDark ? "text-white/40" : "text-black/40";
  const dividerColor = isDark ? "border-white/5" : "border-black/8";
  const btnBg = isDark ? "bg-white/10 hover:bg-white/20 text-white" : "bg-white hover:bg-gray-50 text-black";

  return (
    <section id="special-offers" className={`${bg} py-10 md:py-12 transition-colors duration-300`}>
      <div className="max-w-[1300px] mx-auto px-4 md:px-8">

        {/* Заголовок секции */}
        <div className="flex justify-between items-end mb-8">
          <div>
            <h2 className={`text-[26px] md:text-[34px] font-bold ${titleColor}`}>
              {t('specialOffers')}
            </h2>
            <p className={`text-[16px] mt-1 ${mutedText}`}>
              {t('specialOffersSubtitle')}
            </p>
          </div>

          {/* Видимые кнопки управления каруселью */}
          <div className="hidden md:flex gap-3">
            <button
              onClick={() => scroll('left')}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${btnBg}`}
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={() => scroll('right')}
              className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${btnBg}`}
            >
              <ChevronRight size={24} />
            </button>
          </div>
        </div>

        {/* Карусель промо-баннеров */}
        <div className="relative group">
          <div
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory scrollbar-hide pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {specialOffersList.map((offer) => (
              <div
                key={offer.id}
                className={`snap-start shrink-0 flex flex-col sm:flex-row items-stretch rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 w-[90vw] md:w-[600px] lg:w-[650px] ${cardBg}`}
                onClick={() => navigate(`/property/${offer.propertyId}`)}
              >
                {/* Левая часть — текст */}
                <div className={`flex-1 px-6 py-6 flex flex-col gap-3 border-b sm:border-b-0 sm:border-r ${dividerColor}`}>
                  {/* Тэглайн (мелкий текст сверху) */}
                  <p className={`text-[13px] ${taglineColor}`}>{offer.tagline}</p>

                  {/* Тег + Заголовок */}
                  <div className="flex items-start gap-3 flex-wrap">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[13px] font-bold shrink-0 ${tagColors[offer.tagType] || tagColors.default}`}>
                      <Tag size={13} />
                      {offer.tag}
                    </span>
                    <h3 className={`text-[20px] md:text-[22px] font-bold leading-snug ${headlineColor}`}>
                      {offer.headline}
                    </h3>
                  </div>

                  {/* Описание */}
                  <p className={`text-[14px] leading-relaxed ${descColor} flex-1`}>
                    {offer.desc}
                  </p>

                  {/* CTA кнопка */}
                  <div className="mt-2">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate(`/property/${offer.propertyId}`); }}
                      className="inline-flex items-center justify-center w-full sm:w-auto gap-2 px-6 py-3 bg-[#c9a227] hover:bg-[#b8911e] text-white text-[15px] font-semibold rounded-xl transition-all duration-200 min-h-[48px]"
                    >
                      {t('offerCta')}
                    </button>
                  </div>
                </div>

                {/* Правая часть — фото */}
                <div className="sm:w-[220px] md:w-[250px] shrink-0 h-[200px] sm:h-auto overflow-hidden">
                  <img
                    src={offer.img}
                    alt={offer.headline}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <AddPropertyModal isOpen={isAddPropertyOpen} onClose={() => setIsAddPropertyOpen(false)} />
    </section>
  );
}

export default SpecialOffers;