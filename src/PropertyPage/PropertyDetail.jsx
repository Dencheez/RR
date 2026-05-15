import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Footer from "../components/Footer";
import { useLanguage } from "../components/LanguageContext";
import { Shield, Smartphone, TreePine, CircleParking, Waves, Dumbbell, Wifi, AirVent, MapPin, X, Phone, MessageCircle } from "lucide-react";

import { properties } from "../data/properties";
import { BedIcon, BathIcon, SquareIcon, SaveIcon } from "../components/Icons";
import PropertyActionModal from "../components/PropertyActionModal";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const ContactModal = ({ isOpen, onClose, t }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 backdrop-blur-md bg-black/40" onClick={onClose}>
      {/* className="relative w-full max-w-md p-8 rounded-[40px] border bg-white border-black/5" */}

      <button
        onClick={onClose}
        className="absolute top-6 right-6 p-2 rounded-full hover:bg-black/5"
      >
        <X size={20} className="text-black/40" />
      </button>

      <div className="text-center mb-8">
        <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#c9a227] to-[#e5c158] mx-auto mb-4 flex items-center justify-center">
          <Phone size={32} className="text-white" />
        </div>
        <h3 className="text-2xl font-bold mb-2 text-[#1a1a1a]">
          {t('Contact Agent') || 'Contact Agent'}
        </h3>
        <p className="text-sm opacity-50 text-black">
          Please mention RiyadhRoof when calling
        </p>
      </div>

      <div className="space-y-4">
        <a
          href="tel:+966500000000"
          className="flex items-center gap-4 p-5 rounded-3xl border transition-all hover:scale-[1.02] active:scale-[0.98] bg-black/5 border-black/10 hover:bg-black/10"
        >
          <div className="p-3 bg-[#c9a227] rounded-2xl text-white">
            <Phone size={20} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-black">Call Now</p>
            <p className="text-lg font-bold text-black">+966 50 000 0000</p>
          </div>
        </a>

        <a
          href="https://wa.me/966500000000"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-4 p-5 rounded-3xl border border-green-500/20 bg-green-500/5 transition-all hover:scale-[1.02] active:scale-[0.98] hover:bg-green-500/10"
        >
          <div className="p-3 bg-green-500 rounded-2xl text-white">
            <MessageCircle size={20} />
          </div>
          <div className="text-left">
            <p className="text-[10px] font-black uppercase tracking-widest opacity-40 text-black">WhatsApp</p>
            <p className="text-lg font-bold text-black">Send Message</p>
          </div>
        </a>
      </div>
    </div>
  );
};



const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [isSaved, setIsSaved] = useState(false);
  const { t } = useLanguage();
  const [isActionModalOpen, setIsActionModalOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const [actionType, setActionType] = useState('buy');

  const propertyData = properties.find(p => p.id === parseInt(id)) || properties[0];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const pageBg = "bg-[#f7f5f0] text-[#1a1a1a]";
  const cardBg = "bg-white border-black/8";
  const backBtn = "bg-white/90 border-black/10 text-[#1a1a1a] hover:bg-[#c9a227] hover:text-white hover:border-[#c9a227]";
  const titleColor = "text-[#1a1a1a]";
  const textMuted = "text-gray-600";
  const textFaint = "text-gray-500";
  const borderDiv = "border-black/5";
  const amenityCard = "bg-black/5 border-black/5 hover:border-[#c9a227]/40";
  const amenityText = "text-gray-500 group-hover:text-[#1a1a1a]";
  const locationBox = "bg-black/5 border-black/10";
  const specBox = "bg-black/5 rounded-2xl";
  const outlineBtn = "border-black/10 text-[#1a1a1a] hover:bg-black/5";
  const saveBtn = "bg-black/5 border-black/10 text-black/30 hover:border-[#c9a227]";

  return (
    <div className={`min-h-screen font-sans overflow-x-hidden ${pageBg}`}>
      <button
        onClick={() => navigate(-1)}
        className={`fixed top-8 left-8 z-[100] flex items-center gap-2 backdrop-blur-xl border px-5 py-3 rounded-full group ${backBtn}`}
      >
        <span className="text-xl mb-1">←</span>
        <span className="text-[10px] font-black uppercase tracking-widest">{t('returnToProjects')}</span>
      </button>

      <main className="max-w-[1440px] mx-auto px-4 md:px-10 pt-24 md:pt-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">

          <div className="col-span-1 lg:col-span-8 order-1">
            <div className={`relative rounded-[40px] overflow-hidden border ${cardBg}`}>
              <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 5000 }}
                loop={true}
                className="property-swiper h-[400px] md:h-[600px]"
              >
                {propertyData.images.map((img, index) => (
                  <SwiperSlide key={index}>
                    <img src={img} alt={`Slide ${index}`} className="w-full h-full object-cover" />
                  </SwiperSlide>
                ))}
              </Swiper>
              <div className="absolute top-8 left-8 z-10 bg-[#c9a227] text-white text-xs font-black px-6 py-2.5 rounded-full uppercase tracking-widest">
                {propertyData.status}
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-1 lg:col-span-4 order-2 lg:row-span-3">
          <div className="lg:sticky lg:top-32 space-y-8">
            <div className={`p-6 md:p-10 rounded-[40px] border ${cardBg}`}>
              <div className="flex justify-between items-start mb-6">
                <h1 className={`text-3xl md:text-4xl font-bold tracking-tight ${titleColor}`}>{propertyData.title}</h1>
                <button
                  onClick={() => setIsSaved(!isSaved)}
                  className={`p-4 rounded-2xl border ${isSaved ? 'bg-[#c9a227] border-[#c9a227] text-white' : saveBtn}`}
                >
                  <SaveIcon className="w-6 h-6" />
                </button>
              </div>

              <div className={`flex items-center gap-2 mb-8 ${textMuted}`}>
                <MapPin className="w-5 h-5 text-[#c9a227]" />
                <span className="text-sm font-medium">{propertyData.location}</span>
              </div>

              <div className="flex flex-col gap-2 mb-8">
                <div className="flex justify-between items-baseline">
                  <span className={`text-xs font-black uppercase tracking-widest ${textFaint}`}>
                    {propertyData.type === "For Sale" ? t('salePrice') || "Sale Price" : t('rentalPrice') || "Rental Price"}
                  </span>
                  <span className="text-3xl md:text-4xl font-black text-[#c9a227] tracking-tighter">
                    {propertyData.price}
                    {propertyData.type === "For rent" && !propertyData.price.includes('/') && " / mo"}
                    {propertyData.type === "For Sale" && !propertyData.price.toLowerCase().includes('sar') && !propertyData.price.toLowerCase().includes('m') && " SAR"}
                  </span>
                </div>
              </div>

              <div className={`grid grid-cols-3 gap-2 md:gap-4 mb-10 border-y py-8 ${borderDiv}`}>
                {[
                  { icon: BedIcon, label: `${propertyData.bedrooms} ${t('beds')}` },
                  { icon: BathIcon, label: `${propertyData.bathrooms} ${t('baths')}` },
                  { icon: SquareIcon, label: `${propertyData.area} m²` }
                ].map(({ icon: Icon, label }, i) => (
                  <div key={i} className="text-center">
                    <div className={`p-2 md:p-3 rounded-2xl mb-2 flex justify-center ${specBox}`}>
                      <Icon className="w-5 md:w-6 h-5 md:h-6 text-[#c9a227]" />
                    </div>
                    <p className={`text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] ${textFaint}`}>{label}</p>
                  </div>
                ))}
              </div>

              <div className="space-y-4">
                {propertyData.type === "For Sale" ? (
                  <button
                    onClick={() => { setActionType('buy'); setIsActionModalOpen(true); }}
                    className="w-full py-4 md:py-5 bg-[#c9a227] text-white rounded-2xl font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3"
                  >
                    {t('Buy')}
                  </button>
                ) : (
                  <button
                    onClick={() => { setActionType('rent'); setIsActionModalOpen(true); }}
                    className="w-full py-4 md:py-5 rounded-2xl font-black uppercase tracking-[0.15em] text-xs flex items-center justify-center gap-3 bg-[#1a1a1a] text-white"
                  >
                    {t('Rent')}
                  </button>
                )}
                <div className="flex gap-4 pt-2">
                  <button className={`flex-1 py-3 md:py-4 border rounded-2xl font-black uppercase tracking-[0.1em] text-[10px] ${outlineBtn}`}
                    onClick={() => { setIsContactModalOpen(true); }}>{t('Contact')}</button>

                </div>

              </div>
            </div>

            {/* Trust Badge */}
            <div className="bg-gradient-to-br from-[#c9a227]/20 to-transparent p-6 md:p-8 rounded-[40px] border border-[#c9a227]/20 flex items-center gap-4 md:gap-6">
              <div className="p-3 md:p-4 bg-[#c9a227] rounded-2xl text-white">
                <Shield className="w-6 md:w-8 h-6 md:h-8" />
              </div>
              <div>
                <p className={`font-bold uppercase text-xs tracking-widest mb-1 ${titleColor}`}>{t('Authenticated')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Amenities Section */}
        <div className={`col-span-1 lg:col-span-8 order-3 p-6 md:p-12 rounded-[40px] border ${cardBg}`}>
          <h2 className={`text-2xl md:text-3xl font-bold mb-8 md:mb-10 tracking-tight ${titleColor}`}>{t('AboutProperty')}</h2>
          <p className={`leading-relaxed text-base md:text-lg mb-8 md:mb-10 ${textMuted}`}>{propertyData.description}</p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            {[
              { label: t('InfinityPool'), icon: <Waves className="text-[#c9a227]" /> },
              { label: t('SmartHome'), icon: <Smartphone className="text-[#c9a227]" /> },
              { label: t('HomeGym'), icon: <Dumbbell className="text-[#c9a227]" /> },
              { label: t('Security'), icon: <Shield className="text-[#c9a227]" /> },
              { label: t('GardenArea'), icon: <TreePine className="text-[#c9a227]" /> },
              { label: t('PrivateParking'), icon: <CircleParking className="text-[#c9a227]" /> },
              { label: t('Wifi'), icon: <Wifi className="text-[#c9a227]" /> },
              { label: t('AC'), icon: <AirVent className="text-[#c9a227]" /> }
            ].map((item, idx) => (
              <div key={idx} className={`flex flex-col items-center gap-4 p-4 md:p-6 rounded-3xl border group ${amenityCard}`}>
                <span>{item.icon}</span>
                <span className={`text-[10px] font-black uppercase tracking-[0.2em] text-center ${amenityText}`}>{item.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Location Map */}
        <div className={`col-span-1 lg:col-span-8 order-4 p-6 md:p-12 rounded-[40px] border overflow-hidden ${cardBg}`}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-0 mb-8">
            <h2 className={`text-2xl md:text-3xl font-bold tracking-tight ${titleColor}`}>{t('Location')}</h2>
            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${locationBox}`}>
              <MapPin className="w-4 h-4 text-[#c9a227]" />
              <span className={`text-xs font-bold uppercase tracking-widest ${textMuted}`}>Al Malqa, {t('Riyadh')}</span>
            </div>
            <div className={`relative h-[300px] md:h-[400px] rounded-[32px] md:rounded-[40px] overflow-hidden border ${cardBg}`}>
              <div className="w-full h-full relative">
                <iframe
                  title="Property Map"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d46215.11!2d46.63!3d24.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
                  className="w-full h-full border-none pointer-events-none grayscale opacity-80"
                  allowFullScreen=""
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white/40 via-transparent to-transparent pointer-events-none" />

                {/* Centered Property Marker */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10">
                  <div className="relative">
                    <div className="bg-[#c9a227] text-white px-6 py-3 rounded-2xl text-xs font-black whitespace-nowrap mb-4 relative z-10">
                      {propertyData.price}
                      <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-[#c9a227] rotate-45" />
                    </div>
                    <div className="w-8 h-8 rounded-full border-4 border-[#c9a227] bg-white flex items-center justify-center mx-auto">
                      <div className="w-3 h-3 rounded-full bg-[#c9a227]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />

      <PropertyActionModal
        isOpen={isActionModalOpen}
        onClose={() => setIsActionModalOpen(false)}
        type={actionType}
        property={propertyData}
      />
      {isContactModalOpen && (
        <ContactModal
          isOpen={isContactModalOpen}
          onClose={() => setIsContactModalOpen(false)}
          t={t}
        />
      )}

      <style>{`
        .property-swiper .swiper-button-next,
        .property-swiper .swiper-button-prev {
          color: white !important;
   
        }
        .property-swiper .swiper-button-next:after,
        .property-swiper .swiper-button-prev:after {
          font-size: 20px !important;
          font-weight: bold;
        }
        .property-swiper .swiper-pagination-bullet {
          background: white !important;
          opacity: 0.5;
        }
        .property-swiper .swiper-pagination-bullet-active {
          opacity: 1;
          background: #c9a227 !important;
        }
      `}</style>
    </div >
  );
};

export default PropertyDetail;
