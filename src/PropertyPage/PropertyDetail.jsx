import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { properties } from "../data/properties";
import Header from "../components/header";
import Footer from "../components/Footer";
import {
  Heart, Bookmark, ChevronLeft, ChevronRight,
  X
} from "lucide-react";
import { useLanguage } from '../components/LanguageContext';


const PLACEHOLDER = "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=1200";

const ARTICLES = [
  { img: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400", title: "Как не потерять деньги при покупке недвижимости", time: "4 мин. на чтение" },
  { img: "https://images.unsplash.com/photo-1582407947304-fd86f28f3b48?w=400", title: "Покупаем квартиру: все шаги от задатка до регистрации…", time: "5 мин. на чтение" },
  { img: "https://images.unsplash.com/photo-1551836022-deb4988cc6c0?w=400", title: "Как проверить продавца недвижимости онлайн", time: "3 мин. на чтение" },
];

/* ── price chart ── */
function PriceChart() {
  const p1 = [820, 850, 840, 870, 855, 880, 875, 895, 888, 910, 900, 920];
  const p2 = [950, 980, 970, 1000, 990, 1010, 1005, 1020, 1015, 1040, 1030, 1058];
  const W = 340, H = 100, mn = 800, mx = 1080;
  const y = v => H - ((v - mn) / (mx - mn)) * H;
  const x = i => (i / (p1.length - 1)) * W;
  const d1 = p1.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');
  const d2 = p2.map((v, i) => `${i === 0 ? 'M' : 'L'}${x(i)},${y(v)}`).join(' ');
  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full h-24">
      <path d={d1} fill="none" stroke="#90caf9" strokeWidth="2" />
      <path d={d2} fill="none" stroke="#1565c0" strokeWidth="2" />
      <circle cx={x(11)} cy={y(p1[11])} r="4" fill="#43a047" />
    </svg>
  );
}

/* ── Lightbox modal ── */
function Lightbox({ images, startIndex, onClose }) {
  const [idx, setIdx] = useState(startIndex);
  const prev = useCallback(() => setIdx(i => (i - 1 + images.length) % images.length), [images.length]);
  const next = useCallback(() => setIdx(i => (i + 1) % images.length), [images.length]);

  useEffect(() => {
    const handler = e => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose, prev, next]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 1000,
        background: "rgba(0,0,0,.82)", display: "flex",
        flexDirection: "column", alignItems: "center", justifyContent: "center"
      }}
    >
      {/* close */}
      <button
        onClick={onClose}
        style={{ position: "absolute", top: 20, right: 20, background: "rgba(255,255,255,.15)", border: "none", borderRadius: "50%", width: 40, height: 40, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
      ><X size={20} color="#fff" /></button>

      {/* main image */}
      <div onClick={e => e.stopPropagation()} style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "center", width: "100%", maxWidth: 780 }}>
        <button onClick={prev} style={lbNav("left")}><ChevronLeft size={28} color="#fff" /></button>
        <img
          src={images[idx]}
          alt=""
          style={{ maxWidth: "100%", maxHeight: "72vh", objectFit: "contain", borderRadius: 6, display: "block" }}
          onError={e => { e.target.src = PLACEHOLDER; }}
        />
        <button onClick={next} style={lbNav("right")}><ChevronRight size={28} color="#fff" /></button>
      </div>

      {/* thumbnails row */}
      <div onClick={e => e.stopPropagation()} style={{ display: "flex", gap: 6, marginTop: 14, flexWrap: "wrap", justifyContent: "center", maxWidth: "90vw" }}>
        {images.map((src, i) => (
          <div key={i} onClick={() => setIdx(i)} style={{ width: 64, height: 46, borderRadius: 4, overflow: "hidden", cursor: "pointer", border: i === idx ? "2px solid #f5c518" : "2px solid transparent", opacity: i === idx ? 1 : 0.6, transition: "opacity .2s" }}>
            <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.src = PLACEHOLDER; }} />
          </div>
        ))}
      </div>

      {/* counter */}
      <div style={{ color: "#fff", fontSize: 13, marginTop: 10, opacity: .7 }}>{idx + 1} / {images.length}</div>
    </div>
  );
}

/* ═══════════════════════════ MAIN ═══════════════════════════ */
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
    { label: "Тип дома", value: property.category || "Монолитный" },
    { label: "Жилой комплекс", value: property.name },
    { label: "Год постройки", value: "2020" },
    { label: "Этаж", value: property.bedrooms ? `${property.bedrooms} из ${property.bedrooms + 4}` : "8 из 12" },
    {
      label: "Площадь",
      value: `${property.area} м²${property.bathrooms ? `, Площадь кухни — ${property.bathrooms * 8} м²` : ""}`,
      colored: true
    },
    { label: "Состояние квартиры", value: "Свежий ремонт", bold: true },
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
    { label: "Безопасность", value: "Охрана, домофон, видеонаблюдение" },
    { label: "Бывшее общежитие", value: "Нет" },
    { label: "Возможен обмен", value: "Нет" },
  ];

  return (
    <div style={{ background: "#fff", minHeight: "100vh", color: "#222", fontFamily: "Inter, sans-serif" }}>
      <Header />

      {/* ─────────── full-width content ─────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "14px 24px 56px" }}>

        {/* breadcrumb */}
        <nav style={{ fontSize: 13, color: "#888", marginBottom: 10 }}>
          <span style={{ color: "#1a73e8", cursor: "pointer" }} onClick={() => navigate("/")}>RiyadhRoof</span>
          <span style={{ margin: "0 6px" }}>/</span>
          <span>{isSale ? "Продажа" : "Аренда"}</span>
        </nav>

        {/* title row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 16, marginBottom: 18 }}>
          <h1 style={{ fontSize: 20, fontWeight: 700, margin: 0, flex: 1, lineHeight: 1.4, color: "#1a1a1a" }}>
            {property.title || property.name}
            {property.area && ` · ${property.area} м²`}
            {property.location && ` — ${property.location}`}
          </h1>
          <div style={{ display: "flex", gap: 10, flexShrink: 0 }}>
            <button style={outBtn}>
              <Bookmark size={14} style={{ marginRight: 5, color: "#1a73e8" }} />
              <span style={{ color: "#1a73e8", fontSize: 13 }}>Оставить заметку</span>
            </button>
            <button onClick={() => setSaved(!saved)} style={outBtn}>
              <Heart size={14} style={{ marginRight: 5, color: saved ? "#e53935" : "#1a73e8", fill: saved ? "#e53935" : "none" }} />
              <span style={{ color: "#1a73e8", fontSize: 13 }}>В Избранное</span>
            </button>
          </div>
        </div>

        {/* ═══ two-column main ═══ */}
        <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 28, alignItems: "start" }}>

          {/* ── LEFT ── */}
          <div>
            <div style={{ fontSize: 26, fontWeight: 800, color: "#111", marginBottom: 18 }}>
              {property.priceFull || property.price}
            </div>

            {/* spec table */}
            <div style={{ borderTop: "1px solid #eee" }}>
              {specs.map(({ label, value, colored, bold }) => (
                <div key={label} style={{ display: "flex", gap: 12, padding: "9px 0", borderBottom: "1px solid #f2f2f2", alignItems: "flex-start" }}>
                  <span style={{ color: "#999", fontSize: 13, minWidth: 120, flexShrink: 0 }}>{label}</span>
                  <span style={{ fontSize: 13, color: colored ? "#e8951a" : "#222", fontWeight: bold ? 600 : 400, lineHeight: 1.4 }}>{value}</span>
                </div>
              ))}
            </div>

            {/* agent */}
            <div style={{ marginTop: 20, border: "1px solid #e8e8e8", borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 12, color: "#999", marginBottom: 10 }}>Автор объявления</div>
              <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: "50%", background: "linear-gradient(135deg,#c9a227,#e5c158)", display: "flex", alignItems: "center", justifyContent: "center", color: "#fff", fontWeight: 700, fontSize: 18, flexShrink: 0 }}>А</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>RR Агент</div>
                  <div style={{ background: "#f5c518", color: "#111", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "2px 8px", display: "inline-block", marginTop: 3 }}>RiyadhRoof Агент</div>
                </div>
              </div>
              <div style={{ fontSize: 12, color: "#444", marginBottom: 5 }}><span style={{ color: "#1a73e8", marginRight: 6 }}>✓</span>Качество работы под контролем RiyadhRoof</div>
              <div style={{ fontSize: 12, color: "#444", marginBottom: 14 }}><span style={{ color: "#1a73e8", marginRight: 6 }}>✓</span>Реальные фото и описание</div>
              <button
                onClick={() => setPhoneRevealed(true)}
                style={{ width: "100%", padding: "9px 0", borderRadius: 6, border: "1px solid #ddd", background: "#fff", cursor: "pointer", fontSize: 14, fontWeight: 600, color: phoneRevealed ? "#111" : "#c9a227" }}
              >
                {phoneRevealed ? "+966 50 000 0000" : "Показать телефон"}
              </button>
            </div>
          </div>

          {/* ── RIGHT: photos ── */}
          <div>
            {/* main photo — clickable */}
            <div
              onClick={() => setLightboxOpen(true)}
              style={{ position: "relative", borderRadius: 6, overflow: "hidden", background: "#111", marginBottom: 8, cursor: "zoom-in" }}
            >
              <img
                src={images[activeImg]}
                alt="property"
                style={{ width: "100%", height: 480, objectFit: "cover", display: "block" }}
                onError={e => { e.target.src = PLACEHOLDER; }}
              />
              {images.length > 1 && (
                <>
                  <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i - 1 + images.length) % images.length); }} style={navBtn("left")}>
                    <ChevronLeft size={22} color="#fff" />
                  </button>
                  <button onClick={e => { e.stopPropagation(); setActiveImg(i => (i + 1) % images.length); }} style={navBtn("right")}>
                    <ChevronRight size={22} color="#fff" />
                  </button>
                  <div style={{ position: "absolute", bottom: 10, right: 14, background: "rgba(0,0,0,.55)", color: "#fff", fontSize: 12, borderRadius: 4, padding: "2px 8px" }}>
                    {activeImg + 1} / {images.length}
                  </div>
                </>
              )}
            </div>

            {/* thumbnails */}
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              {images.map((src, i) => (
                <div
                  key={i}
                  onClick={() => setActiveImg(i)}
                  style={{ width: 72, height: 52, borderRadius: 4, overflow: "hidden", cursor: "pointer", border: i === activeImg ? "2px solid #f5c518" : "2px solid transparent", flexShrink: 0 }}
                >
                  <img src={src} alt="" style={{ width: "100%", height: "100%", objectFit: "cover" }} onError={e => { e.target.src = PLACEHOLDER; }} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Map ── */}
        <div style={{ marginTop: 36 }}>
          <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 12 }}>{t('Объявление на карте')}</div>
          <div style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e0e0e0", height: 260 }}>
            <iframe title="map" src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d46215.11!2d46.63!3d24.81!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2ssa!4v1700000000000!5m2!1sen!2ssa" style={{ width: "100%", height: "100%", border: "none" }} allowFullScreen loading="lazy" />
          </div>
        </div>

        {/* ── О квартире ── */}
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

        {/* ── Description ── */}
        <div style={{ marginTop: 36, paddingTop: 28, borderTop: "1px solid #eee" }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 12, color: "#111" }}>Описание</h2>
          <p style={{ fontSize: 14, lineHeight: 1.85, color: "#333", whiteSpace: "pre-line" }}>
            {property.description}
            {property.features?.length ? `\n\n• ${property.features.join("\n• ")}` : ""}
            {"\n\nОтличный вариант для семьи, ценящей комфорт и удобное расположение."}
          </p>
        </div>


        {/* ── Similar listings ── */}
        <div style={{ marginTop: 52 }}>
          <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "#111" }}>{t('Similar Listings')}</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {properties.filter(p => p.id !== property.id).slice(0, 4).map(p => (
              <div key={p.id} onClick={() => navigate(`/property/${p.id}`)}
                style={{ borderRadius: 8, overflow: "hidden", border: "1px solid #e8e8e8", cursor: "pointer", background: "#fff", transition: "box-shadow .2s" }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 4px 18px rgba(0,0,0,.12)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "none"}
              >
                <div style={{ position: "relative" }}>
                  <img src={p.images?.[0] || p.image || PLACEHOLDER} alt={p.title} style={{ width: "100%", height: 190, objectFit: "cover", display: "block" }} onError={e => { e.target.src = PLACEHOLDER; }} />
                  <div style={{ position: "absolute", top: 10, left: 10, background: "#f5c518", color: "#111", fontSize: 11, fontWeight: 700, borderRadius: 4, padding: "3px 8px" }}>RiyadhRoof Агент</div>
                </div>
                <div style={{ padding: "12px 14px 16px" }}>
                  <div style={{ fontSize: 14, color: "#1a73e8", fontWeight: 500, lineHeight: 1.4, marginBottom: 8 }}>{p.title || p.name}{p.area && ` · ${p.area} м²`}</div>
                  <div style={{ fontSize: 16, fontWeight: 700, color: "#111", marginBottom: 8 }}>{p.priceFull || p.price}</div>
                  <div style={{ fontSize: 12, color: "#888" }}>{p.location?.split(",")[0] || "Эр-Рияд"}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      <Footer />

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox images={images} startIndex={activeImg} onClose={() => setLightboxOpen(false)} />
      )}
    </div>
  );
}

/* ── styles ── */
const outBtn = {
  display: "flex", alignItems: "center", padding: "7px 14px",
  border: "1px solid #d0d0d0", borderRadius: 6, background: "#fff",
  cursor: "pointer", whiteSpace: "nowrap"
};

const navBtn = side => ({
  position: "absolute", top: "50%", transform: "translateY(-50%)",
  [side]: 10, background: "rgba(0,0,0,.45)", border: "none",
  borderRadius: "50%", width: 36, height: 36, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2
});

const lbNav = side => ({
  position: "absolute", top: "50%", transform: "translateY(-50%)",
  [side]: -52, background: "rgba(255,255,255,.15)", border: "none",
  borderRadius: "50%", width: 44, height: 44, cursor: "pointer",
  display: "flex", alignItems: "center", justifyContent: "center", zIndex: 2
});
