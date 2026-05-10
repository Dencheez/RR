import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "../components/language";
import { useLanguage } from "../components/LanguageContext";
import { Sun, Moon, User, CircleUserRound, Menu, X, Home, Key, Building2, Map, ChartNoAxesCombined } from "lucide-react";
import AuthModal from "../components/AuthModal";

const Header = () => {
  const { t, isDark, toggleTheme, user } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === '/';

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

  const topBg = isScrolled
    ? isDark
      ? 'bg-[#0a0a0a]/95 backdrop-blur-3xl shadow-2xl'
      : 'bg-white/97 bg-white shadow-lg border-b border-black/8'
    : isDark
      ? 'bg-[#0a0a0a]/80 backdrop-blur-xl'
      : 'bg-white/90 backdrop-blur-xl';

  const bottomBg = isDark
    ? 'bg-[#111111]'
    : 'bg-white border-b border-black/8';

  const textColor = isDark ? 'text-white' : 'text-[#1a1a1a]';
  const mutedText = isDark ? 'text-white/50' : 'text-black/50';

  return (
    <>
      {/* ===== ВЕРХНЯЯ СТРОКА (логотип + утилиты) ===== */}
      <div className={`fixed top-0 left-0 w-full z-[100] transition-all duration-300 ${topBg}`}>
        <div className="flex items-center justify-between max-w-[1700px] mx-auto px-4 md:px-8 h-[60px] md:h-[68px]">

          {/* Логотип */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src="RR/RiyadhRoof_Logo.png"
              alt="RiyadhRoof"
              className="w-14 md:w-[72px] transition-all duration-300"
            />
          </a>

          {/* Правая часть */}
          <div className="flex items-center gap-2 md:gap-4">

            {/* Переключатель темы */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 relative
                ${isDark ? 'bg-white/5 text-white' : 'border border-black/10 bg-black/5 text-black'}`}
            >
              {isDark ? <Sun size={18} strokeWidth={2} className="absolute z-1" /> : <Moon size={18} strokeWidth={2} className="absolute z-1" />}
            </button>

            {/* Профиль / Войти (десктоп) */}
            <div className="hidden sm:block">
              {user ? (
                <button
                  onClick={() => navigate('/profile')}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border border-[#c9a227]/50 bg-[#c9a227]/10 text-[#c9a227] hover:bg-[#c9a227] hover:text-white transition-all duration-300 min-h-[44px]"
                >
                  <CircleUserRound size={18} />
                  {t('Profile') || 'Profile'}
                </button>
              ) : (
                <button
                  onClick={() => setIsAuthOpen(true)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px]
                    ${isDark ? 'bg-white/5 text-white hover:bg-white/10' : 'border border-black/15 bg-black/5 text-black hover:bg-black/10'}`}
                >
                  <User size={18} />
                  {t('login')}
                </button>
              )}
            </div>

            {/* Переключатель языка (десктоп) */}
            <div className="hidden md:block">
              <LanguageSwitcher />
            </div>

            {/* Бургер (мобайл) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`xl:hidden w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300
                ${isDark ? 'bg-white/5 text-white' : 'border border-black/10 bg-black/5 text-black'}`}
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ===== НИЖНЯЯ СТРОКА (навигация-разделы) ===== */}
        <div className={`hidden xl:block ${bottomBg} transition-all duration-300`}>
          <div className="max-w-[1700px] mx-auto px-8">
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
      </div>

      {/* ===== МОБИЛЬНОЕ МЕНЮ ===== */}
      {isMobileMenuOpen && (
        <div className={`fixed inset-0 z-[150] flex flex-col xl:hidden ${isDark ? 'bg-[#0a0a0a]' : 'bg-white'}`}>
          {/* Шапка меню */}
          <div className={`flex justify-between items-center px-6 py-5 border-b ${isDark ? 'border-white/5' : 'border-black/8'}`}>
            <img src="/RiyadhRoof_Logo.png" alt="logo" className="w-16" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className={`w-11 h-11 rounded-full flex items-center justify-center
                ${isDark ? 'bg-white/5 text-white' : 'border border-black/10 bg-black/5 text-black'}`}
            >
              <X size={22} />
            </button>
          </div>

          {/* Навигация */}
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

            {/* Профиль в мобайл-меню */}
            {user ? (
              <button
                onClick={() => { setIsMobileMenuOpen(false); navigate('/profile'); }}
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[17px] font-medium text-[#c9a227] min-h-[56px]"
              >
                <CircleUserRound size={22} />
                Profile
              </button>
            ) : (
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsAuthOpen(true); }}
                className={`w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[17px] font-medium min-h-[56px]
                  ${isDark ? 'text-white/80 hover:bg-white/5' : 'text-black/80 hover:bg-black/5'}`}
              >
                <User size={22} />
                {t('login')}
              </button>
            )}

            <div className="pt-4">
              <LanguageSwitcher />
            </div>
          </div>
        </div>
      )}

      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </>
  );
};

export default Header;