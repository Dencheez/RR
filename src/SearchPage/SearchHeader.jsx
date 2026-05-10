import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "../components/language";
import { useLanguage } from "../components/LanguageContext";
import { Sun, Moon, User, CircleUserRound, Menu, X, Home, Key, Building2, Map, ChartNoAxesCombined } from "lucide-react";

export const SearchHeader = ({ setModalType }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { t, isDark, toggleTheme } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const headerBg = isDark
    ? "bg-[#0d0d0d]/95 backdrop-blur-xl border-white/10"
    : "bg-white/95 backdrop-blur-xl border-black/10";

  const bottomBg = isDark
    ? 'bg-[#111111]'
    : 'bg-white border-t border-black/8';

  const themeBtn = isDark
    ? "border-white/20 bg-white/10 text-white hover:border-[#c9a227] hover:text-[#c9a227]"
    : "border-black/20 bg-black/10 text-black hover:border-[#c9a227] hover:text-[#c9a227]";

  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';

  const bottomNavLinks = [
    { icon: Home, label: t('navSale'), href: '/search?action=buy' },
    { icon: Key, label: t('navRent'), href: '/search?action=rent' },
    { icon: Building2, label: t('navNewBuildings'), href: '/search?new=1' },
    { icon: Map, label: t('navMap'), href: '/map?type=villa' },
    { icon: ChartNoAxesCombined, label: t('Analytics'), href: '/analytics' },
  ];

  const handleBottomLinkClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    if (link.scroll) {
      if (location.pathname !== '/') {
        navigate('/');
        setTimeout(() => {
          const el = document.getElementById(link.scroll);
          if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 300);
      } else {
        const el = document.getElementById(link.scroll);
        if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } else {
      navigate(link.href);
    }
  };

  return (
    <header className={`fixed top-0 left-0 w-full z-[110] border-b transition-colors duration-300 ${headerBg}`}>
      <div className="max-w-[1700px] mx-auto px-4 md:px-10 h-[64px] md:h-[72px] flex items-center justify-between">
        <div className="flex-shrink-0">
          <Link to="/">
            <img
              src="RR/RiyadhRoof_Logo.png"
              alt="logo"
              className={`w-12 transition-all ${!isDark ? "brightness-1" : ""}`}
            />
          </Link>
        </div>

        {/* Right block with Language & Theme Toggle */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center transition-all duration-300 border relative ${themeBtn}`}
          >
            {isDark ? (
              <Sun size={20} strokeWidth={2.5} className="absolute z-1" />
            ) : (
              <Moon size={20} strokeWidth={2.5} className="absolute z-1" />
            )}
          </button>

          <div className="hidden md:block">
            <LanguageSwitcher />
          </div>

          {/* Burger Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className={`md:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 border ${isDark ? "border-white/10 bg-white/5 text-white" : "border-black/10 bg-black/5 text-black relative"}`}
          >
            {isMobileMenuOpen ? <X size={20} className="absolute z-1" /> : <Menu size={20} className="absolute z-1" />}
          </button>
        </div>
      </div>

      {/* ===== НИЖНЯЯ СТРОКА (навигация-разделы) ===== */}
      <div className={`hidden xl:block ${bottomBg} transition-all duration-300`}>
        <div className="max-w-[1700px] mx-auto px-10">
          <nav className="flex items-center gap-1 h-[46px]">
            {bottomNavLinks.map((link) => {
              const Icon = link.icon;
              const isActive =
                location.pathname + location.search === link.href ||
                (location.pathname.includes('/map') && link.href.startsWith('/map'));

              return (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={(e) => handleBottomLinkClick(e, link)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-medium transition-all duration-200 min-h-[38px] whitespace-nowrap group
                    ${isActive
                      ? 'text-[#c9a227] bg-[#c9a227]/8'
                      : `${textColor} hover:text-[#c9a227] hover:bg-[#c9a227]/8`}`}
                >
                  <Icon size={17} className={`shrink-0 transition-colors ${isActive ? 'text-[#c9a227]' : 'group-hover:text-[#c9a227]'}`} />
                  {link.label}
                </a>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 top-[70px] z-[100] transition-all duration-500 md:hidden ${isMobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
          } ${isDark ? 'bg-[#0d0d0d]' : 'bg-white'}`}
      >
        <div className="flex-1 overflow-y-auto px-6 py-8 space-y-2">
          {bottomNavLinks.map((link) => {
            const Icon = link.icon;
            const isActive =
              location.pathname + location.search === link.href ||
              (location.pathname.includes('/map') && link.href.startsWith('/map'));

            return (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleBottomLinkClick(e, link)}
                className={`flex items-center gap-4 px-5 py-4 rounded-2xl text-[17px] font-medium transition-all duration-200 min-h-[56px]
                  ${isActive
                    ? 'text-[#c9a227] bg-[#c9a227]/8'
                    : isDark ? 'text-white/80 hover:text-[#c9a227] hover:bg-white/5' : 'text-black/80 hover:text-[#c9a227] hover:bg-black/5'}`}
              >
                <Icon size={22} className={`${isActive ? 'text-[#c9a227]' : 'text-[#c9a227]'} shrink-0`} />
                {link.label}
              </a>
            );
          })}

          <div className={`my-4 h-px ${isDark ? 'bg-white/5' : 'bg-black/5'}`} />

          <div className="pt-4 flex justify-center">
            <LanguageSwitcher />
          </div>
        </div>
      </div>
    </header>
  );
};