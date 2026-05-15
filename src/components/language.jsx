import React, { useState, useRef, useEffect } from "react";
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
  const { language, setLanguage } = useLanguage();
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
  const btnBg = "bg-black/5 border-black/10 text-[#1a1a1a]";
  const btnHover = "hover:bg-black/10 hover:border-[#c9a227]/40";
  const dropdownBg = "bg-white/90 backdrop-blur-2xl border-black/10 shadow-2xl";
  const itemInactive = "text-[#1a1a1a]/60 hover:bg-black/5 hover:text-[#1a1a1a]";

  return (
    <div
      ref={ref}
      className="relative z-50"
    >
      <button
        onClick={() => setOpen((o) => !o)}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-2xl text-xs font-black border ${btnBg} ${btnHover} ${open ? 'border-[#c9a227] ring-4 ring-[#c9a227]/10' : ''}`}
      >
        <span className="text-lg filter saturate-[0.8]">{current.flag}</span>
        <span className="tracking-[0.2em] uppercase">{current.short}</span>
        <span
          className="text-[8px] ml-1 text-black/40"
        >
          ▼
        </span>
      </button>

        {open && (
          <div
            className={`absolute right-0 top-full mt-3 rounded-2xl overflow-hidden p-2 min-w-[180px] border shadow-[0_20px_50px_rgba(0,0,0,0.3)] ${dropdownBg}`}
          >
            <div className="px-3 py-2 mb-1 border-b border-black/5">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-black/30">Select Language</span>
            </div>
            <div className="grid gap-1">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code);
                    setOpen(false);
                  }}
                  className={`flex items-center justify-between w-full text-left px-4 py-3 text-[11px] font-bold rounded-xl group ${language === lang.code
                    ? "bg-[#c9a227] text-white shadow-[0_10px_20px_rgba(201,162,39,0.2)]"
                    : itemInactive
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{lang.flag}</span>
                    <span className="tracking-wide">{lang.label}</span>
                  </div>
                  {language === lang.code && (
                    <div className="w-1.5 h-1.5 rounded-full bg-white" />
                  )}
                </button>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default LanguageSwitcher;
