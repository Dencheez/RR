import React, { useState, useRef, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LocationIcon, BedIcon, BathIcon, SquareIcon } from "../components/Icons";
import { useLanguage } from "../components/LanguageContext";
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";
import AddPropertyModal from "../components/AddPropertyModal";

function HotDeals() {
  const navigate = useNavigate();
  const { t, isDark } = useLanguage();
  const [activeCategory, setActiveCategory] = useState('All');
  const carouselRef = useRef(null);
  const controls = useAnimation();
  const [width, setWidth] = useState(0);
  const [xPos, setXPos] = useState(0);
  const [isAddPropertyOpen, setIsAddPropertyOpen] = useState(false);
  const base = import.meta.env.BASE_URL;


  const houses = [
    { id: 1, title: "The Palms Villa", price: "SAR 3.2M", detail: "Integrated community living by ROSHN", img: `${base}RR/ThePalmVilla.png`, location: "Al Malqa District, Riyadh", bedrooms: 5, bathrooms: 4, soldPercent: 75, square: 120, category: "Villas" },
    { id: 2, title: "Skyline Apartments", price: "SAR 3.2M", detail: "Premium waterfront residences", img: `${base}RR/SKYLINE.png`, location: "KAFD, Riyadh", bedrooms: 5, bathrooms: 4, soldPercent: 75, square: 120, category: "Apartments" },
    { id: 3, title: "Al Narjis Heights", price: "SAR 2.6M", detail: "Modern living at its finest", img: `${base}RR/3ProductCard.jpg`, location: "Al Narjis, Riyadh", bedrooms: 5, bathrooms: 4, soldPercent: 75, square: 120, category: "Estates" },
    { id: 4, title: "Almaty Residences", price: "SAR 2.6M", detail: "Cherry blossoms and temples.", img: `${base}RR/VillaComplex.png`, location: "Al Malqa District, Riyadh", bedrooms: 5, bathrooms: 4, soldPercent: 75, square: 120, category: "Villas" },
  ];

  const categories = [
    { key: 'All', label: t('bannerAll') || "All" },
    { key: 'Villas', label: t('bannerVillas') || "Villas" },
    { key: 'Apartments', label: t('bannerApartments') || "Apartments" },
    { key: 'Estates', label: t('bannerEstates') || "Estates" },
    { key: 'Penthouses', label: t('bannerPenthouses') || "Penthouses" },
    { key: 'Townhouses', label: t('bannerTownhouses') || "Townhouses" },
  ];

  const filteredHouses = useMemo(() => {
    return houses.filter(h => activeCategory === 'All' || h.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    if (carouselRef.current) {
      setWidth(carouselRef.current.scrollWidth - carouselRef.current.offsetWidth);
    }
    controls.start({ x: 0 });
    setXPos(0);
  }, [filteredHouses, controls]);

  const handleScroll = (direction) => {
    if (!carouselRef.current) return;
    const firstCard = carouselRef.current.querySelector('.project-card');
    const cardWidth = firstCard ? firstCard.offsetWidth + 32 : 452;
    let newPos = direction === 'left' ? xPos + cardWidth : xPos - cardWidth;
    if (newPos > 0) newPos = 0;
    if (newPos < -width) newPos = -width;
    setXPos(newPos);
    controls.start({ x: newPos, transition: { duration: 0.6, ease: "easeOut" } });
  };

  const bg = isDark ? "bg-[#0a0a0a]" : "bg-[#f7f5f0]";
  const titleColor = isDark ? "text-white" : "text-[#1a1a1a]";
  const filterInactive = isDark
    ? "bg-white/5 text-white/40 hover:text-white" // Убрал border
    : "bg-black/5 text-black/40 hover:text-[#1a1a1a]";
  const arrowBtn = isDark
    ? "hover:text-[#c9a227] bg-white/5" // Убрал border
    : "hover:text-[#c9a227] bg-black/5";

  return (
    <section id="hot-deals" className={`pt-10 md:pt-16 ${bg} pb-10 md:pb-16 relative transition-colors duration-300`}>
      <div className="mx-4 md:ml-20 md:mr-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-8">
          <div>
            <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-6 mb-6">
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-3xl md:text-4xl font-bold ${titleColor}`}
              >
                {t('hotDeals')}
              </motion.h1>


            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="flex flex-wrap gap-4"
            >
              {categories.map((cat) => (
                <button
                  key={cat.key}
                  onClick={() => setActiveCategory(cat.key)}
                  className={`px-6 py-2.5 rounded-full transition-all text-xs font-black uppercase tracking-widest ${activeCategory === cat.key
                    ? "bg-[#c9a227] text-white"
                    : filterInactive
                    }`}
                >
                  {cat.label}
                </button>
              ))}
            </motion.div>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <div className="flex gap-4">
              <button
                onClick={() => handleScroll('left')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${arrowBtn}`}
              >
                <ChevronLeft size={22} />
              </button>
              <button
                onClick={() => handleScroll('right')}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-all backdrop-blur-md ${arrowBtn}`}
              >
                <ChevronRight size={22} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Track */}
      <div className="ml-4 md:ml-20">
        <div ref={carouselRef} className="overflow-hidden">
          <motion.div
            drag="x"
            dragConstraints={{ right: 0, left: -width }}
            animate={controls}
            onDragEnd={(e, info) => { setXPos(info.point.x); }}
            className="flex gap-8 cursor-grab active:cursor-grabbing"
          >
            <AnimatePresence mode="popLayout">
              {filteredHouses.map((house, index) => (
                <motion.div
                  key={house.id}
                  layout
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  onClick={() => navigate(`/property/${house.id}`)}
                  className="project-card min-w-[85vw] md:min-w-[420px] max-w-[420px] h-[500px] md:h-[600px] relative rounded-[24px] overflow-hidden group bg-black"
                >
                  <img
                    src={house.img}
                    alt={house.title}
                    className="absolute inset-0 w-full h-full object-cover opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />

                  <div className="absolute inset-0 p-8 flex flex-col justify-end">
                    <div className="space-y-5">
                      <div>
                        <h2 className="text-3xl font-bold text-white mb-2 leading-tight">{house.title}</h2>
                        <div className="flex items-center gap-2 text-[#c9a227]">
                          <span className="font-black text-xl">{house.price}</span>
                          <span className="w-1 h-1 bg-white/20 rounded-full" />
                          <span className="text-white/40 text-[10px] font-bold flex items-center gap-1 uppercase tracking-widest">
                            <LocationIcon className="w-3 h-3" /> {house.location}
                          </span>
                        </div>
                      </div>

                      <p className="text-white/70 text-sm leading-relaxed">
                        {house.detail}
                      </p>

                      <div className="flex gap-6 py-4 border-t border-white/10">
                        <div className="flex items-center gap-2 text-white/80 text-[10px] font-black uppercase tracking-widest">
                          <BedIcon className="w-4 h-4 text-[#c9a227]" /> {house.bedrooms} {t('beds') || "Beds"}
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-[10px] font-black uppercase tracking-widest">
                          <BathIcon className="w-4 h-4 text-[#c9a227]" /> {house.bathrooms} {t('baths') || "Baths"}
                        </div>
                        <div className="flex items-center gap-2 text-white/80 text-[10px] font-black uppercase tracking-widest">
                          <SquareIcon className="w-4 h-4 text-[#c9a227]" /> {house.square} m²
                        </div>
                      </div>

                      <div className="w-full pb-2">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-[10px] font-black uppercase tracking-widest text-white/40">{t('soldStatus') || "Sold"}</span>
                          <span className="text-[10px] font-black text-[#c9a227]">{house.soldPercent}%</span>
                        </div>
                        <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${house.soldPercent}%` }}
                            className="h-full bg-[#c9a227]"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="absolute top-6 left-6 px-3 py-1 bg-white/5 backdrop-blur-md rounded-full text-[9px] font-black uppercase tracking-widest text-white/60">
                    {t(`banner${house.category}`) || house.category}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            <div className="min-w-[80px]" />
          </motion.div>
        </div>
      </div>

      <AddPropertyModal isOpen={isAddPropertyOpen} onClose={() => setIsAddPropertyOpen(false)} />
    </section>
  );
}

export default HotDeals;
