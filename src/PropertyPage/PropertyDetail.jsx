import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";
import Header from "../components/header";
import { Heart, Share2, ChevronLeft, ChevronRight, X, MapPin, Phone, Images, Flag, Eye } from "lucide-react";
import { useLanguage } from '../components/LanguageContext';

const PLACEHOLDER = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200";

function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);
  useEffect(() => {
    const h = e => { if (e.key === "Escape") onClose(); if (e.key === "ArrowLeft") prev(); if (e.key === "ArrowRight") next(); };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, [onClose, prev, next]);
  return (
    <div onClick={onClose} className="fixed inset-0 z-[1000] bg-black/85 flex flex-col items-center justify-center">
      <button onClick={onClose} className="absolute top-5 right-5 bg-white/15 rounded-full w-10 h-10 flex items-center justify-center"><X size={20} color="#fff" /></button>
      <div onClick={e => e.stopPropagation()} className="relative flex items-center justify-center w-full max-w-3xl">
        <button onClick={prev} className="absolute left-[-44px] bg-white/15 rounded-full w-10 h-10 flex items-center justify-center border-0"><ChevronLeft size={26} color="#fff" /></button>
        <img src={images[idx]} alt="" className="max-w-full max-h-[72vh] object-contain rounded-md block" onError={e => { e.target.src = PLACEHOLDER; }} />
        <button onClick={next} className="absolute right-[-44px] bg-white/15 rounded-full w-10 h-10 flex items-center justify-center border-0"><ChevronRight size={26} color="#fff" /></button>
      </div>
      <div className="flex gap-1.5 mt-3 flex-wrap justify-center max-w-[90vw]">
        {images.map((src, i) => (
          <div key={i} onClick={() => setIdx(i)} className="w-16 h-11 rounded overflow-hidden cursor-pointer flex-shrink-0" style={{ border: i === idx ? "2px solid #f5c518" : "2px solid transparent", opacity: i === idx ? 1 : 0.6 }}>
            <img src={src} alt="" className="w-full h-full object-cover" onError={e => { e.target.src = PLACEHOLDER; }} />
          </div>
        ))}
      </div>
      <div className="text-white text-[13px] mt-2.5 opacity-70">{idx + 1} / {images.length}</div>
    </div>
  );
}

export default function PropertyDetail() {
  const { t } = useLanguage();
  const { id } = useParams();
  const navigate = useNavigate();
  const property = properties.find(p => p.id === parseInt(id)) || properties[0];
  const images = property.images?.length ? property.images : [PLACEHOLDER];

  const [activeImg, setActiveImg] = useState(0);
  const [saved, setSaved] = useState(false);
  const [phoneRevealed, setPhoneRevealed] = useState(false);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => { window.scrollTo(0, 0); }, [id]);

  const isSale = property.type === "For Sale";

  const specs = [
    { label: "Город", value: "Эр-Рияд, Саудовская Аравия" },
    { label: "Площадь", value: `${property.area} м²` },
    { label: "Санузел", value: "совмещённый" },
    { label: "Высота потолков", value: "2.9 м" },
  ];

  const houseRows = [
    { label: "Тип дома", value: property.category || "Монолитный" },
    { label: "Год постройки", value: "2020" },
    { label: "Этаж", value: property.bedrooms ? `${property.bedrooms} из ${property.bedrooms + 4}` : "8 из 12" },
  ];

  const aboutRows = [
    { label: "Санузел", value: "2 с/у и более" },
    { label: "Балкон", value: "Лоджия" },
    { label: "Дверь", value: "Бронированная" },
    { label: "Интернет", value: "Через TV кабель" },
    { label: "Парковка", value: "Паркинг" },
    { label: "Квартира меблирована", value: "Частично" },
    { label: "Пол", value: "Ламинат" },
    { label: "Высота потолков", value: "2.9 м" },
    { label: "Безопасность", value: "Охрана, домофон" },
    { label: "Бывшее общежитие", value: "Нет" },
    { label: "Возможен обмен", value: "Нет" },
  ];

  return (
    <div className="bg-white min-h-screen text-[#222] font-[Inter,sans-serif]">
      <Header />

      {/* ══ MOBILE LAYOUT ══ */}
      <div className="md:hidden">
        {/* Photo carousel */}
        <div className="relative w-full bg-gray-100" style={{ height: 280 }}>
          <img
            src={images[activeImg]}
            alt="property"
            className="w-full h-full object-cover"
            onError={e => { e.target.src = PLACEHOLDER; }}
            onClick={() => setLightboxOpen(true)}
          />
          {images.length > 1 && (
            <>
              <button onClick={() => setActiveImg(i => (i - 1 + images.length) % images.length)}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-black/45 rounded-full w-9 h-9 flex items-center justify-center border-0">
                <ChevronLeft size={20} color="#fff" className="absolute z-10" />
              </button>
              <button onClick={() => setActiveImg(i => (i + 1) % images.length)}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-black/45 rounded-full w-9 h-9 flex items-center justify-center border-0">
                <ChevronRight size={20} color="#fff" className="absolute z-10" />
              </button>
              <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-black/55 text-white text-[12px] px-2 py-1 rounded-lg">
                <Images size={13} /><span>{activeImg + 1}/{images.length}</span>
              </div>
            </>
          )}
          {/* Top actions */}
          <div className="absolute top-72 right-3 flex gap-2">
            <button onClick={() => setSaved(!saved)} className="bg-white/90 rounded-full w-9 h-9 flex items-center justify-center shadow relative z-0 action:">
              <Heart size={18} className={saved ? "fill-red-500 text-red-500" : "text-gray-500 absolute z-10"} />
            </button>
            <button className="bg-white/90 rounded-full w-9 h-9 flex items-center justify-center shadow">
              <Share2 size={17} className="text-gray-500 absolute z-10" />
            </button>
          </div>
          {/* Agent logo */}
          <div className="absolute bottom-3 left-3 bg-[#c9a227] text-white text-[11px] font-bold px-2.5 py-1 rounded">
            RR Agent
          </div>
        </div>

        {/* Content */}
        <div className="px-4 pt-4 pb-40">
          {/* Price */}
          <div className="text-[22px] font-bold text-gray-900 mb-1">
            {isSale ? "от " : ""}{property.price?.toLocaleString()} SAR
            {!isSale && <span className="text-[14px] text-gray-500 font-normal"> / мес</span>}
          </div>
          {/* Tags */}
          <div className="flex gap-2 mb-3">
            <span className="text-[11px] bg-amber-100 text-amber-700 font-semibold px-2 py-0.5 rounded">Ипотека</span>
            <span className="text-[11px] bg-green-100 text-green-700 font-semibold px-2 py-0.5 rounded">Акции</span>
          </div>
          {/* Title */}
          <div className="text-[15px] text-gray-800 mb-3">
            {property.bedrooms}-комн. квартира · {property.area} м²
          </div>

          {/* Map embed */}
          <div className="rounded-xl overflow-hidden border border-gray-200 mb-3" style={{ height: 180 }}>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d46215.11!2d46.63!3d24.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
              className="w-full h-full border-0" allowFullScreen loading="lazy" />
          </div>

          {/* Address */}
          <div className="flex items-start gap-2 mb-4">
            <MapPin size={16} className="text-gray-400 mt-0.5 shrink-0" />
            <div>
              <div className="text-[14px] text-gray-800">{property.location}</div>
              <div className="text-[12px] text-gray-500">Эр-Рияд</div>
            </div>
          </div>

          {/* О квартире */}
          <h2 className="text-[18px] font-bold text-gray-900 mb-3">О квартире</h2>
          <div className="mb-4">
            {specs.map(({ label, value }) => (
              <div key={label} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-[14px] text-gray-500">{label}</span>
                <span className="text-[14px] text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* О доме */}
          <h2 className="text-[18px] font-bold text-gray-900 mt-6 mb-3">О доме</h2>

          {/* Agent card */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-xl mb-4 cursor-pointer">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#c9a227] to-[#e5c158] flex items-center justify-center text-white font-bold text-lg shrink-0">А</div>
            <div className="flex-1">
              <div className="font-bold text-[14px] text-gray-900">RR Агент</div>
              <div className="text-[11px] font-bold bg-[#f5c518] text-[#111] px-2 py-0.5 rounded inline-block mt-1">RiyadhRoof Агент</div>
            </div>
            <ChevronRight size={18} className="text-gray-400" />
          </div>

          <div className="mb-4">
            {houseRows.map(({ label, value }) => (
              <div key={label} className="flex justify-between py-3 border-b border-gray-100">
                <span className="text-[14px] text-gray-500">{label}</span>
                <span className="text-[14px] text-gray-800 font-medium">{value}</span>
              </div>
            ))}
          </div>

          {/* Warning box */}
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-[13px] text-amber-800 mb-6 leading-relaxed">
            Реклама размещена с целью изучения спроса. Договоры будут заключаться только после предоставления необходимых гарантий.
          </div>

          {/* Описание */}
          <h2 className="text-[18px] font-bold text-gray-900 mb-3">Описание</h2>
          <p className="text-[14px] text-gray-700 leading-relaxed mb-6" style={{ whiteSpace: "pre-line" }}>
            {property.description || "Отличный вариант для семьи, ценящей комфорт и удобное расположение."}
            {property.features?.length ? `\n\n• ${property.features.join("\n• ")}` : ""}
          </p>

          {/* Agent info block */}
          <div className="bg-gray-50 rounded-xl p-4 mb-6">
            <div className="font-bold text-[15px] text-gray-900 mb-1">RR Агент</div>
            <span className="text-[11px] font-bold bg-green-500 text-white px-2 py-0.5 rounded">Застройщик</span>
          </div>

          {/* Report + Meta */}
          <button className="w-full flex items-center justify-center gap-2 border border-gray-200 rounded-xl py-3 text-[14px] text-gray-500 mb-4">
            <Flag size={15} /> Пожаловаться на объявление
          </button>
          <div className="flex justify-between text-[12px] text-gray-400 mb-6">
            <span>ID: {property.id || "123456"}</span>
            <span>29 мая 2026</span>
            <span className="flex items-center gap-1"><Eye size={13} /> 12 400</span>
          </div>

          {/* Similar listings */}
          <h2 className="text-[18px] font-bold text-gray-900 mb-4">Похожие объявления</h2>
          <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4">
            {properties.filter(p => p.id !== property.id).slice(0, 5).map(p => (
              <div key={p.id} onClick={() => navigate(`/property/${p.id}`)}
                className="flex-shrink-0 w-40 cursor-pointer">
                <div className="relative rounded-xl overflow-hidden mb-2" style={{ height: 120 }}>
                  <img src={p.images?.[0] || p.image || PLACEHOLDER} alt={p.title}
                    className="w-full h-full object-cover"
                    onError={e => { e.target.src = PLACEHOLDER; }} />
                  {p.isNew && <div className="absolute top-2 left-2 bg-green-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">Новостройка</div>}
                </div>
                <div className="text-[13px] font-bold text-gray-900 mb-0.5">~ {p.price?.toLocaleString()} SAR</div>
                <div className="text-[11px] text-gray-500">{p.bedrooms}-комн. · {p.area} м²</div>
              </div>
            ))}
          </div>
        </div>

        {/* Fixed bottom CTA */}
        <div 
          className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-3 z-50 flex gap-2"
          style={{ paddingBottom: 'calc(12px + env(safe-area-inset-bottom, 0px))' }}
        >
          <button className="flex-1 bg-[#2a81dd] text-white text-[14px] font-semibold py-3 rounded-xl">Заказать звонок</button>
          <button onClick={() => setPhoneRevealed(true)}
            className="flex-1 bg-green-500 text-white text-[14px] font-semibold py-3 rounded-xl flex items-center justify-center gap-2">
            <Phone size={16} />{phoneRevealed ? "+966 50 000 0000" : "Позвонить"}
          </button>
        </div>
      </div>

      {/* ══ DESKTOP LAYOUT ══ */}
      <div className="hidden md:block" style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px 56px" }}>
        <nav style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>
          <span style={{ color: "#1a73e8", cursor: "pointer" }} onClick={() => navigate("/")}>RiyadhRoof</span>
          <span style={{ margin: "0 6px" }}>/</span>
          <span>{isSale ? "Продажа" : "Аренда"}</span>
        </nav>

        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, flex: 1, lineHeight: 1.4, color: "#1a1a1a" }}>
            {property.title || property.name}
            {property.area && ` · ${property.area} м²`}
            {property.location && ` — ${property.location}`}
          </h1>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button onClick={() => setSaved(!saved)} style={{ display: "flex", alignItems: "center", padding: "7px 14px", border: "1px solid #d0d0d0", borderRadius: 6, background: "#fff", cursor: "pointer" }}>
              <Heart size={14} style={{ marginRight: 5, color: saved ? "#e53935" : "#c9a227", fill: saved ? "#e53935" : "none" }} />
              <span style={{ color: "#c9a227", fontSize: 13 }}>В Избранное</span>
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 28, alignItems: "start" }}>
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#111", marginBottom: 18 }}>{property.priceFull || property.price}</div>
            <div style={{ borderTop: "1px solid #eee" }}>
              {[...specs, ...houseRows].map(({ label, value }) => (
                <div key={label} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: "1px solid #f2f2f2", alignItems: "flex-start" }}>
                  <span style={{ color: "#999", fontSize: 13, minWidth: 120, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, color: "#222", lineHeight: 1.4 }}>{value}</span>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 20, border: "1px solid #e8e8e8", borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>Автор объявления</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#e5c158)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18 }}>А</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>RR Агент</div>
                  <div style={{ background: "#f5c518", color: "#111", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "2px 8px", display: "inline-block", marginTop: 3 }}>RiyadhRoof Агент</div>
                </div>
              </div>
              <button onClick={() => setPhoneRevealed(true)}
                style={{ width: "100%", padding: "9px 0", borderRadius: 6, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, color: phoneRevealed ? "#111" : "#c9a227" }}>
                {phoneRevealed ? "+966 50 000 0000" : "Показать телефон"}
              </button>
            </div>
          </div>

          <div>
            <div onClick={() => setLightboxOpen(true)} style={{ position: "relative", borderRadius: 6, overflow: "hidden", background: "#111", marginBottom: 8, cursor: "zoom-in" }}>
              <img src={images[activeImg]} alt="property" style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }} onError={e => { e.target.src = PLACEHOLDER; }} />
              {images.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }}
                    style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", left: 10, background: "rgba(0,0,0,.45)", border: "none", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                    <ChevronLeft size={28} color="#fff" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }}
                    style={{ position: "absolute", top: "50%", transform: "translateY(-50%)", right: 10, background: "rgba(0,0,0,.45)", border: "none", borderRadius: "50%", width: 50, height: 50, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2 }}>
                    <ChevronRight size={28} color="#fff" />
                  </button>
                  <div style={{ position: "absolute", bottom: 10, right: 14, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 12, borderRadius: 4, padding: "2px 8px" }}>{activeImg + 1} / {images.length}</div>
                </>
              )}
            </div>
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {images.map((src, i) => (
                <div key={i} onClick={() => setActiveImg(i)} style={{ width: 72, height: 52, borderRadius: 4, overflow: "hidden", cursor: "pointer", border: i === activeImg ? "2px solid #f5c518" : "2px solid transparent", flexShrink: 0 }}>
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.src = PLACEHOLDER; }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>Объявление на карте</div>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", height: 260 }}>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d46215.11!2d46.63!3d24.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa"
              style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen loading="lazy" />
          </div>
        </div>

        <div style={{ marginTop: 36 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 18, color: "#111" }}>О квартире</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "14px 28px" }}>
            {aboutRows.map(({ label, value }) => (
              <div key={label}>
                <div style={{ fontSize: 12, color: "#c9a227", marginBottom: 3 }}>{label}</div>
                <div style={{ fontSize: 14, fontWeight: 500, color: "#111" }}>{value}</div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid #eee" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#111" }}>Описание</h2>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#333", whiteSpace: "pre-line" }}>
            {property.description}{property.features?.length ? `\n\n• ${property.features.join("\n• ")}` : ""}
            {"\n\nОтличный вариант для семьи, ценящей комфорт и удобное расположение."}
          </p>
        </div>

        <div style={{ marginTop: 52 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#111" }}>Похожие объявления</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {properties.filter(p => p.id !== property.id).slice(0, 3).map(p => (
              <div key={p.id} onClick={() => navigate(`/property/${p.id}`)}
                style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e8e8e8", cursor: "pointer", background: "#fff" }}>
                <img src={p.images?.[0] || p.image || PLACEHOLDER} alt={p.title} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} onError={e => { e.target.src = PLACEHOLDER; }} />
                <div style={{ padding: "12px 14px 16px" }}>
                  <div style={{ fontSize: 14, color: "#1a73e8", fontWeight: 500, marginBottom: 8 }}>{p.title || p.name}{p.area && ` · ${p.area} м²`}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 4 }}>{p.priceFull || p.price}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{p.location?.split(",")[0] || "Эр-Рияд"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {lightboxOpen && <Lightbox images={images} startIndex={activeImg} onClose={() => setLightboxOpen(false)} />}
    </div>
  );
}
