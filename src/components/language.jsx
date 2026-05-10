import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguage } from "./LanguageContext";

const LANGUAGES = [
  { code: "EN", label: "English", short: "EN", },
  { code: "RU", label: "Русский", short: "RU", },
  { code: "AR", label: "العربية", short: "AR", },
  { code: "ES", label: "Español", short: "ES", },
  { code: "PT", label: "Português", short: "PT", },
  { code: "FR", label: "Français", short: "FR", },
  { code: "HI", label: "हिन्दी", short: "HI", },
];

const LanguageSwitcher = () => {
  const { language, setLanguage, isDark } = useLanguage();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  const current = LANGUAGES.find((l) => l.code === language) || LANGUAGES[0];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Theme styles
  const btnBg = isDark ? "bg-white/5 border-white/10 text-white" : "bg-black/5 border-black/10 text-[#1a1a1a]";
  const btnHover = isDark ? "hover:bg-white/10 hover:border-[#c9a227]/40" : "hover:bg-black/10 hover:border-[#c9a227]/40";
  const dropdownBg = isDark ? "bg-[#111111]/90 backdrop-blur-2xl border-white/10" : "bg-white/90 backdrop-blur-2xl border-black/10 shadow-2xl";
  const itemInactive = isDark ? "text-white/60 hover:bg-white/5 hover:text-white" : "text-[#1a1a1a]/60 hover:bg-black/5 hover:text-[#1a1a1a]";

  return (
    <div
      ref={ref}
      className="relative z-50"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-black border transition-all duration-300 active:scale-95 ${btnBg} ${btnHover} ${open ? 'border-[#c9a227] ring-4 ring-[#c9a227]/10' : ''}`}
      >
        <span className="text-lg filter saturate-[0.8]">{current.flag}</span>
        <span className="tracking-[0.2em] uppercase">{current.short}</span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "circOut" }}
          className={`text-[8px] ml-1 ${isDark ? 'text-white/40' : 'text-black/40'}`}
        >
          ▼
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 15, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            className={`absolute right-0 top-full mt-3 rounded-2xl overflow-hidden p-2 min-w-[180px] border shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${dropdownBg}`}
          >
            <div className="px-3 py-2 mb-1 border-b border-white/5">
              <span className={`text-[9px] font-black uppercase tracking-[0.3em] ${isDark ? 'text-white/30' : 'text-black/30'}`}>Select Language</span>
            </div>
            <div className="grid gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between w-full text-left px-4 py-3 text-[11px] font-bold transition-all duration-300 rounded-xl group ${language === lang.code
                    ? "bg-[#c9a227] text-white shadow-[0_10px_20px_rgba(201,162,39,0.2)]"
                    : itemInactive
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg group-hover:scale-125 transition-transform duration-300">{lang.flag}</span>
                    <span className="tracking-wide">{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <motion.div layoutId="activeLang" className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default LanguageSwitcher;
