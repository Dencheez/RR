import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import LanguageSwitcher from "./language";
import { useLanguage } from "./LanguageContext";
import { User, CircleUserRound, Menu, X, Home, Key, Building2, Map, ChartNoAxesCombined, Plus } from "lucide-react";
import AuthModal from "./AuthModal";

const Header = () => {
  const { t, user } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [authReason, setAuthReason] = useState(null);
  const base = import.meta.env.BASE_URL;

  const handlePostAdClick = () => {
    if (user) {
      navigate('/add-property');
    } else {
      setAuthReason('addProperty');
      setIsAuthOpen(true);
    }
  };


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isHome = location.pathname === '/';

  const searchParams = new URLSearchParams(location.search);

  const bottomNavLinks = [
    { label: t('navSale'), href: '/buy', action: 'buy', icon: Home },
    { label: t('navRent'), href: '/rent', action: 'rent', icon: Key },
  ];

  const handleBottomLinkClick = (e, link) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    navigate(link.href);
  };

  const topBg = isScrolled
    ? 'bg-white/97 bg-white border-b border-black/8'
    : 'bg-white/90 backdrop-blur-xl';

  const bottomBg = 'bg-white border-b border-black/8';

  const textColor = 'text-[#1a1a1a]';
  const mutedText = 'text-black/50';

  return (
    <>
      {/* ===== ВЕРХНЯЯ СТРОКА (логотип + утилиты) ===== */}
      <div className={` top-0 left-0 w-full z-[100] ${topBg}`}>
        <div className="flex items-center justify-between max-w-[1700px] mx-auto px-4 md:px-8 h-[60px] md:h-[68px]">

          {/* Логотип */}
          <a href="/" className="flex items-center shrink-0">
            <img
              src={`${base}RiyadhRoof_Logo.png`}
              alt="RiyadhRoof"
              className="w-14 md:w-[72px]"
            />
          </a>

          {/* Правая часть */}
          <div className="flex items-center gap-2 md:gap-4">

            <div className="hidden sm:block">
              <button
                className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px] border border-black/15 bg-black/5 text-black hover:bg-black/10"
                onClick={handlePostAdClick}
              >
                {t('addPropertyBtn') || 'Подать объявление'}
              </button>
            </div>


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
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 min-h-[44px] border border-black/15 bg-black/5 text-black hover:bg-black/10"
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
              className="xl:hidden w-10 h-10 rounded-full flex items-center justify-center border border-black/10 bg-black/5 text-black"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* ===== НИЖНЯЯ СТРОКА (навигация-разделы) ===== */}
        <div className={`hidden xl:block ${bottomBg}`}>
          <div className="max-w-[1700px] mx-auto px-8">
            <nav className="flex items-center gap-1 h-[46px]">
              {bottomNavLinks.map((link) => {
                const Icon = link.icon;
                const isActive =
                  location.pathname === link.href ||
                  ((location.pathname === '/search' || location.pathname === '/map') && searchParams.get('action') === link.action);

                return (
                  <a
                    key={link.label}
                    href={link.href}
                    onClick={(e) => handleBottomLinkClick(e, link)}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg text-[15px] font-medium min-h-[38px] whitespace-nowrap group
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
        <div className="fixed inset-0 z-[150] flex flex-col xl:hidden bg-white">
          {/* Шапка меню */}
          <div className="flex justify-between items-center px-6 py-5 border-b border-black/8">
            <img src={`${base}RiyadhRoof_Logo.png`} alt="logo" className="w-16" />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="w-11 h-11 rounded-full flex items-center justify-center border border-black/10 bg-black/5 text-black"
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
                      : 'text-black/80 hover:text-[#c9a227] hover:bg-black/5'}`}
                >
                  <Icon size={22} className={`${isActive ? 'text-[#c9a227]' : 'text-[#c9a227]'} shrink-0`} />
                  {link.label}
                </a>
              );
            })}

            {/* Подать объявление в мобайл-меню (iOS / Mobile-friendly) */}
            <button
              onClick={() => {
                setIsMobileMenuOpen(false);
                handlePostAdClick();
              }}
              className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[17px] font-medium min-h-[56px] text-black/80 hover:text-[#c9a227] hover:bg-[#c9a227]/8 transition-all duration-200"
            >
              <Plus size={22} className="text-[#c9a227] shrink-0" />
              {t('addPropertyBtn') || 'Подать объявление'}
            </button>

            <div className="my-4 h-px bg-black/5" />

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
                className="w-full flex items-center gap-4 px-5 py-4 rounded-2xl text-[17px] font-medium min-h-[56px] text-black/80 hover:bg-black/5"
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

      <AuthModal 
        isOpen={isAuthOpen} 
        onClose={() => {
          setIsAuthOpen(false);
          setAuthReason(null);
        }} 
        onSuccess={() => {
          if (authReason === 'addProperty') {
            navigate('/add-property');
          } else {
            navigate('/profile');
          }
          setAuthReason(null);
        }}
      />
    </>
  );
};

export default Header;